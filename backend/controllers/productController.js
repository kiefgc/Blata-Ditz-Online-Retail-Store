import { Product } from "../models/Product.js";
import { Inventory } from "../models/Inventory.js";
import { Category } from "../models/Category.js";
import { Supplier } from "../models/Supplier.js";

export async function getAllProducts(req, res) {
  try {
    const { category, search } = req.query;
    const filters = {};

    if (category) filters.category_ids = category;
    if (search) filters.product_name = { $regex: search, $options: "i" };

    const products = await Product.getAll(filters);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getProductById(req, res) {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function createProduct(req, res) {
  try {
    const {
      product_name,
      description,
      unit_price,
      cost_price,
      category_ids,
      supplier_id,
    } = req.body;

    if (!product_name || !description || !unit_price || !cost_price)
      return res.status(400).json({ message: "Missing required fields" });

    const unitPriceNum = parseFloat(unit_price);
    const costPriceNum = parseFloat(cost_price);

    if (unitPriceNum <= 0 || costPriceNum <= 0)
      return res.status(400).json({
        message: "Unit price and cost price must be positive numbers",
      });

    if (unitPriceNum < costPriceNum)
      return res
        .status(400)
        .json({ message: "Unit price cannot be lower than cost price" });

    const result = await Product.create({
      product_name,
      description,
      unit_price: unitPriceNum,
      cost_price: costPriceNum,
      category_ids: category_ids || [],
      supplier_id: supplier_id || null,
      is_active: false,
    });

    const productId = result.insertedId;

    await Inventory.collection().insertOne({
      product_id: productId,
      stock_quantity: 0,
      reorder_level: 10,
      max_stock_level: 0,
      last_restocked: null,
      updated_at: new Date(),
    });

    res.status(201).json({
      message: "Product and inventory record created successfully",
      product_id: productId,
    });
  } catch (error) {
    console.error("Create product error:", error);
    res.status(500).json({ message: error.message });
  }
}

export async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!updates || Object.keys(updates).length === 0)
      return res.status(400).json({ message: "No data provided for update" });

    delete updates.product_id;
    delete updates.created_at;
    delete updates.updated_at;

    if (updates.unit_price !== undefined) {
      const unitPriceNum = parseFloat(updates.unit_price);
      if (unitPriceNum <= 0)
        return res.status(400).json({ message: "Unit price must be positive" });
      updates.unit_price = unitPriceNum;
    }

    if (updates.cost_price !== undefined) {
      const costPriceNum = parseFloat(updates.cost_price);
      if (costPriceNum <= 0)
        return res.status(400).json({ message: "Cost price must be positive" });
      updates.cost_price = costPriceNum;
    }

    if (updates.unit_price !== undefined && updates.cost_price !== undefined) {
      if (updates.unit_price < updates.cost_price)
        return res
          .status(400)
          .json({ message: "Unit price cannot be lower than cost price" });
    }

    const result = await Product.update(id, updates);

    if (result.matchedCount === 0)
      return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function deleteProduct(req, res) {
  try {
    const { id } = req.params;
    const result = await Product.delete(id);

    if (result.deletedCount === 0)
      return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
