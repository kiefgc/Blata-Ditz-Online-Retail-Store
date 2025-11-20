import { Order } from "../models/Order.js";
import { Product } from "../models/Product.js";
import { Customer } from "../models/Customer.js";

export async function getAllOrders(req, res) {
  try {
    //admin sees all orders
    if (req.user.role === "admin") {
      const orders = await Order.getAll();
      res.status(200).json(orders);
      return;
    } else {
      //customer sees only their order
      const customerOrders = await Order.findByCustomerId(req.user.id);
      res.status(200).json(customerOrders);
      return;
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getOrderById(req, res) {
  try {
    const { id } = req.params;
    const order = await Order.findByOrderId(id);

    if (!order) return res.status(404).json({ message: "Order not found" });

    // if not admin; customer only access their own orders
    if (req.user.role !== "admin") {
      if (order.customer_id !== req.user.id) {
        return res.status(403).json({ message: "Access denied to this order" });
      }
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function createOrder(req, res) {
  try {
    const {
      order_status, //ENUM('pending', 'processing', 'completed', 'cancelled')
      total_amount,
      payment_status, //ENUM('pending', 'paid', 'failed')
      payment_method,
      shipping_address,
    } = req.body;

    if (
      !order_status ||
      !payment_status ||
      !payment_method ||
      !shipping_address ||
      total_amount !== 0 //covers null since were getting this from orderdetails
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // if (total_amount <= 0) {
    //   return res
    //     .status(400)
    //     .json({ message: "Total amount must be a positive number" });
    // }

    const newOrder = await Order.create({
      customer_id: req.user.id, //auto set to logged-in user
      order_status, //enum
      total_amount,
      payment_status, //enum
      payment_method,
      shipping_address,
    });

    res
      .status(201)
      .json({ message: "Order created successfully", data: newOrder });
  } catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({ message: error.message });
  }
}

export async function updateOrder(req, res) {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!updates || Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No data provided for update" });
    }

    delete updates.order_id;
    delete updates.created_at;
    delete updates.updated_at;

    // if (
    //   updates.order_status &&
    //   !["pending", "processing", "completed", "cancelled"].includes(
    //     updates.order_status
    //   )
    // ) {
    //   errors.push("Invalid order status");
    // }

    const result = await Order.update(id, updates);

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function deleteOrder(req, res) {
  try {
    const { id } = req.params;
    const result = await Order.delete(id);

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
