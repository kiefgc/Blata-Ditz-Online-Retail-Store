import { Inventory } from "../models/Inventory.js";

export async function getInventory(req, res) {
  try {
    const items = await Inventory.collection().find().toArray();
    res.status(200).json(items);
  } catch (error) {
    console.error("Get inventory error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

export async function getInventoryItem(req, res) {
  try {
    const { productId } = req.params;
    const item = await Inventory.findByProductId(productId);

    if (!item) {
      return res.status(404).json({ message: "Inventory record not found" });
    }

    res.status(200).json(item);
  } catch (error) {
    console.error("Get inventory item error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

export async function createInventory(req, res) {
  try {
    const { product_id, stock_quantity, reorder_level, max_stock_level } =
      req.body;

    if (!product_id) {
      return res.status(400).json({ message: "product_id is required" });
    }

    const exists = await Inventory.findByProductId(product_id);
    if (exists) {
      return res
        .status(400)
        .json({ message: "Inventory record already exists" });
    }

    const newItem = {
      product_id,
      stock_quantity: stock_quantity ?? 0,
      reorder_level: reorder_level ?? 10,
      max_stock_level: max_stock_level ?? 0,
    };

    await Inventory.create(newItem);

    res
      .status(201)
      .json({ message: "Inventory record created", data: newItem });
  } catch (error) {
    console.error("Create inventory error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

export async function updateInventory(req, res) {
  try {
    const { productId } = req.params;
    const updates = req.body;

    if (!updates || Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No update fields provided" });
    }

    const result = await Inventory.update(productId, updates);

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Inventory record not found" });
    }

    res.status(200).json({ message: "Inventory updated successfully" });
  } catch (error) {
    console.error("Update inventory error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

export async function deleteInventory(req, res) {
  try {
    const { productId } = req.params;

    const result = await Inventory.delete(productId);

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Inventory record not found" });
    }

    res.status(200).json({ message: "Inventory deleted successfully" });
  } catch (error) {
    console.error("Delete inventory error:", error);
    res.status(500).json({ message: "Server error" });
  }
}
