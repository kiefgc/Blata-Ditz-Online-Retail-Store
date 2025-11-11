import { Admin } from "../models/Admin.js";
import { Customer } from "../models/Customer.js";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function seedFirstAdmin() {
  const existing = await Admin.findByEmail(process.env.ADMIN_EMAIL);
  if (!existing) {
    await Admin.create({
      username: "admin",
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      role: "admin",
    });
    console.log("First admin account created");
  }
}

export async function createAdmin(req, res) {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res.status(400).json({ message: "Missing required fields" });

    const existing = await Admin.findByEmail(email);
    if (existing)
      return res
        .status(400)
        .json({ message: "Admin with this email already exists" });

    await Admin.create({ username, email, password, role: "admin" });
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
} //May remove later on

export async function getUserById(req, res) {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await Customer.collection().findOne(
      { _id: new ObjectId(id) },
      { projection: { password: 0 } }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { password, ...userData } = user;

    res.status(200).json(userData);
  } catch (error) {
    console.error("Get user ID by error: ", error);
    res.status(500).json({ message: "Server error" });
  }
}
