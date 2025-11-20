import { OrderDetails } from "../models/OrderDetails.js";
import { Order } from "../models/Order.js";
import { Product } from "../models/Product.js";
import { ObjectId } from "mongodb";

export async function getOrderDetailsByOrderId(req, res) {
  try {
    const { order_id } = req.params;

    if (!ObjectId.isValid(order_id)) {
      return res.status(400).json({ message: "Invalid Order ID" });
    }

    const order = await Order.getById(order_id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (req.user.role === "customer") {
      if (order.customer_id.toString() !== req.user.id.toString()) {
        return res.status(403).json({ message: "Unauthorized" });
      }
    }

    const orderDetails = await OrderDetails.getByOrderId(order_id);
    res.status(200).json(orderDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function addOrderDetail(req, res) {
  try {
    const { order_id, product_id, quantity, unit_price } = req.body;

    if (!order_id || !product_id || !quantity || !unit_price) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!ObjectId.isValid(order_id) || !ObjectId.isValid(product_id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    if (quantity <= 0 || unit_price <= 0) {
      return res.status(400).json({ message: "Positive numbers only" });
    }

    const order = await Order.getById(order_id);
    if (!order) {
      return res.status(404).json({ message: "Order does not exist" });
    }

    const product = await Product.getById(product_id);
    if (!product) {
      return res.status(404).json({ message: "Product does not exist" });
    }

    const subtotal = quantity * unit_price;

    await OrderDetails.create({
      order_id,
      product_id,
      quantity,
      unit_price,
      subtotal,
    });

    res.status(201).json({ message: "Order detail added successfully" });
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
      (updates.unit_price && updates.unit_price <= 0)
    ) {
      return res.status(400).json({ message: "Positive numbers only" });
    }

    delete updates.order_id;
    delete updates.product_id;

    const existing = await OrderDetails.collection().findOne({
      _id: new ObjectId(id),
    });

    if (!existing) {
      return res.status(404).json({ message: "Order detail not found" });
    }

    const qty = updates.quantity || existing.quantity;
    const price = updates.unit_price || existing.unit_price;

    updates.subtotal = qty * price;

    await OrderDetails.update(id, updates);

    res.status(200).json({ message: "Order detail updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function deleteOrderDetail(req, res) {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const result = await OrderDetails.delete(id);

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Order detail not found" });
    }

    res.status(200).json({ message: "Order detail deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
