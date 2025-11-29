import { Category } from "../models/Category.js";

export async function getAllCategories(req, res) {
  try {
    const categories = await Category.getAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getCategoryById(req, res) {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function createCategory(req, res) {
  try {
    const { category_name, description } = req.body;

    if (!category_name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    await Category.create({ category_name, description, is_active: false });
    res.status(201).json({ message: "Category created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function updateCategory(req, res) {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!updates || Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No data provided for update" });
    }

    const result = await Category.update(id, updates);

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Category not found" });
    }

    if (result.modifiedCount === 0) {
      return res.status(200).json({ message: "No changes made" });
    }

    res.status(200).json({ message: "Category updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function deleteCategory(req, res) {
  try {
    const { id } = req.params;
    const result = await Category.delete(id);

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
