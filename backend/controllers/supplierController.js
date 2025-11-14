import { Supplier } from "../models/Supplier.js";
import * as validators from "../utils/validators.js";

export async function getAllSuppliers(req, res) {
  try {
    /* not sure if this is needed
    const { search } = req.query;
    if (search) filters.name = { $regex: search, $options: "i" };
    */
    const suppliers = await Supplier.getAll();
    res.status(200).json(suppliers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getSupplierById(req, res) {
  try {
    const { id } = req.params;
    const supplier = await Supplier.findById(id);

    if (!supplier)
      return res.status(404).json({ message: "Supplier not found" });

    res.status(200).json(supplier);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function addSupplier(req, res) {
  try {
    const { supplier_name, contact_person, email, phone, address } = req.body;

    if (!supplier_name || !contact_person || !email || !phone || !address)
      return res.status(400).json({ message: "Missing required fields" });

    const errors = [];
    if (email && !validators.isValidEmail(email)) {
      errors.push("Invalid email format");
    }
    if (!validators.isValidPhone(phone)) {
      errors.push("Invalid phone number");
    }
    if (errors.length > 0) {
      return res.status(400).json({ message: errors });
    }

    const existingSupplier = await Supplier.findByEmail(email);
    if (existingSupplier)
      return res
        .status(400)
        .json({ message: "Supplier with this email already exists" });

    await Supplier.create({
      supplier_name,
      contact_person,
      email,
      phone,
      address,
      is_active: true,
    });

    res.status(201).json({ message: "Supplier added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function updateSupplier(req, res) {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!updates || Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No data provided for update" });
    }

    delete updates._id;
    delete updates.created_at;
    delete updates.updated_at;

    const errors = [];

    if (updates.email && !validators.isValidEmail(updates.email)) {
      errors.push("Invalid email format");
    }
    if (updates.phone && !validators.isValidPhone(updates.phone)) {
      errors.push("Invalid phone number");
    }

    if (errors.length > 0) {
      return res.status(400).json({ message: errors });
    }

    const result = await Supplier.update(id, updates);

    if (result.matchedCount === 0)
      return res.status(404).json({ message: "Supplier not found" });

    if (result.modifiedCount === 0)
      return res.status(200).json({ message: "No changes made" });

    res.status(200).json({ message: "Supplier updated successfully" });
  } catch (error) {
    console.error("Update supplier error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

export async function deleteSupplier(req, res) {
  try {
    const { id } = req.params;
    const result = await Supplier.delete(id);

    if (result.deletedCount === 0)
      return res.status(404).json({ message: "Supplier not found" });

    res.status(200).json({ message: "Supplier deleted successfully" });
  } catch (error) {
    console.error("Delete supplier error:", error);
    res.status(500).json({ message: error.message });
  }
}
