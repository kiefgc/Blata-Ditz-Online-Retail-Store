import { Order } from "../models/Order.js";
import { Product } from "../models/Product.js";
import { getDB } from "../config/db.js";
import { ObjectId } from "mongodb";

const toObjectId = (id) => new ObjectId(id);

export async function createOrder(req, res) {
  try {
    const { customer_id, payment_method, shipping_address, items } = req.body;

    // Authorisation Logic
    if (req.user.role === "customer") {
      if (customer_id && customer_id !== req.user.id) {
        return res.status(403).json({
          message: "Customers cannot assign orders to other users",
        });
      }
    } else if (req.user.role === "admin") {
      if (!customer_id) {
        return res.status(400).json({
          message: "customer_id is required for admin-created orders",
        });
      }
    } else {
      return res.status(403).json({ message: "Unauthorized role" });
    }

    const finalCustomerId =
      req.user.role === "customer" ? req.user.id : customer_id;

    // Basic Validation
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res
        .status(400)
        .json({ message: "Order must include at least one item" });
    }

    if (!payment_method || !shipping_address) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    // Fetch product prices from DB and compute
    const productsCollection = getDB().collection("products");
    let total_amount = 0;

    const orderDetails = [];

    for (const item of items) {
      // Ensure quantity is valid
      if (!item.product_id || !item.quantity || item.quantity <= 0) {
        return res.status(400).json({
          message: "Each item must include valid product_id and quantity",
        });
      }

      const product = await productsCollection.findOne({
        _id: new ObjectId(item.product_id),
      });

      if (!product) {
        return res
          .status(404)
          .json({ message: `Product not found: ${item.product_id}` });
      }

      const unit_price = product.unit_price;
      const subtotal = unit_price * item.quantity;

      total_amount += subtotal;

      orderDetails.push({
        product_id: product._id,
        quantity: item.quantity,
        unit_price,
        subtotal,
      });
    }

    // Create Order
    const newOrder = await Order.create({
      customer_id: finalCustomerId,
      order_status: "pending",
      payment_status: "pending",
      payment_method,
      shipping_address,
      total_amount,
    });

    // Insert Order Details with the Order ID
    const orderDetailsWithId = orderDetails.map((d) => ({
      order_id: newOrder._id,
      ...d,
    }));

    await getDB().collection("order_details").insertMany(orderDetailsWithId);

    res.status(201).json({
      message: "Order created successfully",
      data: {
        order: newOrder,
        order_details: orderDetailsWithId,
      },
    });
  } catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({ message: error.message });
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
    const { order_status, payment_status } = req.body;

    // Build allowed fields dynamically
    const updates = {};

    // Validate order_status if provided
    if (order_status !== undefined) {
      if (!Order.orderStatuses.includes(order_status)) {
        return res.status(400).json({ message: "Invalid order status" });
      }
      updates.order_status = order_status;
    }

    // Validate payment_status if provided
    if (payment_status !== undefined) {
      if (!Order.paymentStatuses.includes(payment_status)) {
        return res.status(400).json({ message: "Invalid payment status" });
      }
      updates.payment_status = payment_status;
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No valid fields to update" });
    }

    const result = await Order.update(id, updates);

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order updated successfully" });
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
