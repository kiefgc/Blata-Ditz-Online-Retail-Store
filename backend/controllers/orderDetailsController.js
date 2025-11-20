import { Order_Details } from "../models/Order_Details";
import { Order } from "../models/Order";
import { Product } from "../models/Product.js";

export async function getOrderDetailsByOrderId(req, res) {
  try {
    const { order_id } = req.params;
    const orderDetails = await Order_Details.getByOrderId(order_id);
    res.status(200).json(orderDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function addOrderDetail(req, res) {
  try {
    const { order_id, product_id, quantity, unit_price, subtotal } = req.body;

    if (!order_id || !product_id || !quantity || !unit_price || !subtotal) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (quantity <= 0 || unit_price <= 0 || subtotal <= 0) {
      return res.status(400).json({ message: "Positive numbers only" });
    }

    await Order_Details.create({
      order_id,
      product_id,
      quantity,
      unit_price,
      subtotal,
    });

    res.status(201).json({ message: "Order details added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function updateOrderDetail(req, res) {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!updates || Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No update provided" });
    }

    if (
      (updates.quantity && updates.quantity <= 0) ||
      (updates.unit_price && updates.unit_price <= 0) ||
      (updates.subtotal && updates.subtotal <= 0)
    ) {
      return res.status(400).json({ message: "Positive numbers only" });
    }

    delete updates.order_id;
    delete updates.product_id;

    const result = await Order_Details.update(id, updates);
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Order detail not found" });
    }
    res.status(200).json({ message: "Order detail updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function deleteOrderDetail(req, res) {
  try {
    const { id } = req.params;
    const result = await Order_Details.delete(id);
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Order detail not found" });
    }
    res.status(200).json({ message: "Order detail deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
