import { Order } from "../models/Order.js";
import { getDB } from "../config/db.js";
import { ObjectId } from "mongodb";

const toObjectId = (id) => new ObjectId(id);

export async function createOrder(req, res) {
  try {
    const {
      customer_id,
      payment_method,
      shipping_address,
      items,
      order_status,
      payment_status,
    } = req.body;

    if (req.user.role === "customer") {
      if (customer_id && customer_id !== req.user.id) {
        return res
          .status(403)
          .json({ message: "Customers cannot assign orders to other users" });
      }
    } else if (req.user.role === "admin") {
      // admin must provide a valid customer_id
      if (!customer_id)
        return res.status(400).json({
          message: "customer_id is required for admin-created orders",
        });
    } else {
      return res.status(403).json({ message: "Unauthorized role" });
    }

    const finalCustomerId =
      req.user.role === "customer" ? req.user.id : customer_id;

    // Validate order details
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res
        .status(400)
        .json({ message: "Order must include at least one item" });
    }
    if (!payment_method || !shipping_address) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const total_amount = items.reduce(
      (sum, item) => sum + item.quantity * item.unit_price,
      0
    );

    const newOrder = await Order.create({
      customer_id: finalCustomerId,
      order_status: order_status || "pending",
      payment_status: payment_status || "pending",
      payment_method,
      shipping_address,
      total_amount,
    });

    // Insert order details
    const orderDetails = items.map((item) => ({
      order_id: newOrder._id,
      product_id: toObjectId(item.product_id),
      quantity: item.quantity,
      unit_price: item.unit_price,
      subtotal: item.quantity * item.unit_price,
    }));

    await getDB().collection("order_details").insertMany(orderDetails);

    res
      .status(201)
      .json({ message: "Order created successfully", data: newOrder });
  } catch (error) {
    console.error("Create order error:", error);
    res.status(400).json({ message: error.message });
  }
}

export async function getAllOrders(req, res) {
  try {
    let orders;
    if (req.user.role === "admin") {
      orders = await Order.getAll();
    } else if (req.user.role === "customer") {
      orders = await Order.findByCustomerId(req.user.id);
    } else {
      return res.status(403).json({ message: "Unauthorized role" });
    }

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getOrderById(req, res) {
  try {
    const { id } = req.params;
    const order = await Order.getOrderWithDetails(id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (
      req.user.role === "customer" &&
      order.customer_id.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: "Access denied to this order" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function updateOrderStatus(req, res) {
  try {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Only admins can update order status" });
    }

    const { id } = req.params;
    const { order_status } = req.body;

    if (!order_status || !Order.orderStatuses.includes(order_status)) {
      return res.status(400).json({ message: "Invalid order status" });
    }

    const result = await Order.update(id, { order_status });
    if (result.matchedCount === 0)
      return res.status(404).json({ message: "Order not found" });

    res.status(200).json({ message: "Order status updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function updateOrderByCustomer(req, res) {
  try {
    if (req.user.role !== "customer") {
      return res
        .status(403)
        .json({ message: "Only customers can update their orders" });
    }

    const { id } = req.params;
    const updates = req.body;

    const allowedFields = [
      "shipping_address",
      "payment_method",
      "order_status",
    ];
    Object.keys(updates).forEach((key) => {
      if (!allowedFields.includes(key)) delete updates[key];
    });

    if (updates.order_status && updates.order_status !== "cancelled") {
      return res
        .status(403)
        .json({ message: "Customers can only cancel orders" });
    }

    const order = await Order.getById(id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    if (order.customer_id.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied to this order" });
    }

    const result = await Order.update(id, updates);
    res.status(200).json({ message: "Order updated successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function deleteOrder(req, res) {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admins may delete orders" });
    }

    const { id } = req.params;
    const result = await Order.deleteOrder(id);

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
