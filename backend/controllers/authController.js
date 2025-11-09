import { Customer } from "../models/Customer.js";
import { Admin } from "../models/Admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
      const token = jwt.sign(
        { id: admin._id, role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      return res.status(200).json({
        message: "Admin login successful",
        token,
        role: "admin",
      });
    }

    const customer = await Customer.findByUsernameOrEmail(email, email);
    if (customer && (await bcrypt.compare(password, customer.password))) {
      const token = jwt.sign(
        { id: customer._id, role: "customer" },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      return res.status(200).json({
        message: "Customer login successful",
        token,
        role: "customer",
      });
    }

    res.status(401).json({ message: "Invalid email or password" });
  } catch (error) {
    console.error("Login error: ", error);
    res.status(500).json({ message: "Server error" });
  }
}
