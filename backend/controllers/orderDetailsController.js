import { Order_Details } from "../models/Order_Details.js";
import { Order } from "../models/Order.js";
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
    const { order_id, product_id, quantity } = req.body;

    if (!order_id || !product_id || !quantity) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (quantity <= 0) {
      return res
        .status(400)
        .json({ message: "Quantity must be a positive number" });
    }

    //get product from db
    const product = await Product.findById(product_id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const unit_price = product.unit_price;
    const subtotal = quantity * unit_price;

    await Order_Details.create({
      order_id,
      product_id,
      quantity,
      unit_price,
      subtotal,
    });

    const allOrderDetails = await Order_Details.getByOrderId(order_id);
    const totalAmount = allOrderDetails.reduce(
      (sum, item) => sum + item.subtotal,
      0
    );
    await Order.update(order_id, { total_amount: totalAmount });

    res.status(201).json({
      message: "Order details added successfully",
      totalAmount: totalAmount,
    });
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
