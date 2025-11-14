import { Admin } from "../models/Admin.js";
import { Customer } from "../models/Customer.js";
import * as validators from "../utils/validators.js";

// Seed in first admin account
export async function seedFirstAdmin() {
  const existing = await Admin.findByEmail(process.env.ADMIN_EMAIL);
  if (!existing) {
    await Admin.create({
      username: "admin",
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      role: "admin",
      is_active: true,
      last_login: null,
    });
    console.log("First admin account created");
  }
}

export async function createAdmin(req, res) {
  try {
    const { username, email, password, full_name } = req.body;

    if (!username || !email || !password || !full_name) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!validators.isValidUsername(username)) {
      return res.status(400).json({
        message: "Username must be 3-20 letters/numbers",
      });
    }

    if (!validators.isValidEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (!validators.isValidPassword(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters, include uppercase, lowercase, and a number",
      });
    }

    const existing = await Admin.findByEmail(email);
    if (existing) {
      return res.status(400).json({
        message: "Admin with this email already exists",
      });
    }

    await Admin.create({
      username,
      email,
      password,
      full_name,
      role: "admin",
      is_active: true,
      last_login: null,
    });

    res.status(201).json({ message: "Admin created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getAllAdmins(req, res) {
  try {
    const admins = await Admin.getAll();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getUserById(req, res) {
  try {
    const { id } = req.params;

    const user = await Customer.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { password, ...userData } = user;

    res.status(200).json(userData);
  } catch (error) {
    console.error("Get user by ID error:", error);
    res.status(500).json({ message: "Server error" });
  }
}
