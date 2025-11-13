import { Customer } from "../models/Customer.js";
import { Admin } from "../models/Admin.js";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import * as validators from "../utils/validators.js";

function generateTokens(user) {
  const accessToken = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );

  return { accessToken, refreshToken };
}

export async function register(req, res) {
  try {
    const { username, email, password, first_name, last_name, phone, address } =
      req.body;

    if (
      !username ||
      !email ||
      !password ||
      !first_name ||
      !last_name ||
      !phone ||
      !address
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const errors = [];

    if (!validators.isValidUsername(username)) {
      errors.push("Username must be 3-20 letters/numbers");
    }
    if (!validators.isValidEmail(email)) {
      errors.push("Invalid email format");
    }
    if (!validators.isValidPassword(password)) {
      errors.push(
        "Password must be at least 8 characters, include uppercase, lowercase, and number"
      );
    }
    if (!validators.isValidPhone(phone)) {
      errors.push("Invalid phone number");
    }

    if (errors.length > 0) {
      return res.status(400).json({ message: errors });
    }

    const existingUser = await Customer.findByUsernameOrEmail(username, email);
    if (existingUser)
      return res
        .status(400)
        .json({ message: "Username or email already exists" });

    await Customer.create({
      username,
      email,
      password,
      first_name,
      last_name,
      phone,
      address,
    });
    res.status(201).json({ message: "Customer created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getProfile(req, res) {
  try {
    const { id, role } = req.user;

    let user;
    if (role === "admin") {
      user = await Admin.findById(id);
    } else {
      user = await Customer.findById(id);
    }

    if (!user) return res.status(400).json({ message: "User not found" });

    const { password, ...userData } = user;
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Email and password are required" });

    const admin = await Admin.findByEmail(email);
    if (admin && (await bcrypt.compare(password, admin.password))) {
      const { accessToken, refreshToken } = generateTokens({
        _id: admin._id,
        role: "admin",
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({
        message: "Admin login successful",
        accessToken,
        role: "admin",
      });
    }

    const customer = await Customer.findByUsernameOrEmail(email, email);
    if (customer && (await bcrypt.compare(password, customer.password))) {
      const { accessToken, refreshToken } = generateTokens({
        _id: customer._id,
        role: "customer",
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({
        message: "Customer login successful",
        accessToken,
        role: "customer",
      });
    }

    res.status(401).json({ message: "Invalid email or password " });
  } catch (error) {
    console.error("Login error: ", error);
    res.status(500).json({ message: "Server error" });
  }
}

export async function refreshToken(req, res) {
  try {
    const token = req.cookies.refreshToken;
    if (!token)
      return res.status(401).json({ message: "No refresh token provided" });

    jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, user) => {
      if (err)
        return res.status(403).json({ message: "Invalid refresh token" });

      const accessToken = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "15m" }
      );

      res.status(200).json({ accessToken });
    });
  } catch (error) {
    console.error("Refresh token error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

export async function logout(req, res) {
  res.clearCookie("refreshToken", { httpOnly: true, sameSite: "Strict" });
  res.status(200).json({ message: "Logged out successfully" });
}

export async function updateProfile(req, res) {
  try {
    const { id, role } = req.user;
    const updates = req.body;

    if (!updates || Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No data provided for update" });
    }

    delete updates.role;
    delete updates._id;
    delete updates.created_at;

    const errors = [];

    if (updates.username && !validators.isValidUsername(updates.username)) {
      errors.push("Username must be 3-20 letters/numbers");
    }

    if (updates.email && !validators.isValidEmail(updates.email)) {
      errors.push("Invalid email format");
    }

    if (updates.password && !validators.isValidPassword(updates.password)) {
      errors.push(
        "Password must be at least 8 characters, include uppercase, lowercase, and number"
      );
    }

    if (errors.length > 0) {
      return res.status(400).json({ message: errors });
    }

    // If password is valid, hash it
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    const Model = role === "admin" ? Admin : Customer;

    const result = await Model.collection().updateOne(
      { _id: new ObjectId(id) },
      { $set: updates }
    );

    if (result.modifiedCount === 0) {
      return res
        .status(400)
        .json({ message: "No changes made or user not found" });
    }

    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

export async function deleteProfile(req, res) {
  try {
    const { id, role } = req.user;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const Model = role === "admin" ? Admin : Customer;

    const result = await Model.collection().deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error("Delete accoount error: ", error);
    res.status(500).json({ message: "Server error" });
  }
}
