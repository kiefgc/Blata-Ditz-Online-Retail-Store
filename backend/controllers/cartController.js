import { Cart } from "../models/Cart.js";
import * as orderController from "./orderController.js";

export async function getCart(req, res) {
  try {
    const { customer_id } = req.params;

    if (req.user.role === "customer" && req.user.id !== customer_id) {
      return res.status(403).json({
        message: "You are not allowed to view another user's cart",
      });
    }

    const cart = await Cart.findByCustomerId(customer_id);

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    return res.status(200).json({ cart });
  } catch (err) {
    console.error("Get cart error:", err);
    res.status(500).json({ message: err.message });
  }
}

export async function addItem(req, res) {
  try {
    const { customer_id } = req.params;
    const { product_id, quantity } = req.body;

    if (!product_id || !quantity || quantity <= 0) {
      return res.status(400).json({ message: "Invalid product or quantity" });
    }

    if (req.user.role === "customer" && req.user.id !== customer_id) {
      return res.status(403).json({
        message: "You cannot modify another user's cart",
      });
    }

    let cart = await Cart.findByCustomerId(customer_id);

    if (!cart) cart = await Cart.create(customer_id);

    const items = [...cart.items];

    const index = items.findIndex(
      (i) => i.product_id.toString() === product_id
    );

    if (index >= 0) {
      items[index].quantity += quantity;
    } else {
      items.push({
        product_id: await Cart.toObjectId(product_id),
        quantity,
      });
    }

    await Cart.updateItems(customer_id, items);

    return res.status(200).json({
      message: "Item added to cart",
      cart: { ...cart, items },
    });
  } catch (err) {
    console.error("Add item error:", err);
    res.status(500).json({ message: err.message });
  }
}

export async function updateQuantity(req, res) {
  try {
    const { customer_id } = req.params;
    const { product_id, quantity } = req.body;

    if (!product_id || quantity < 1)
      return res.status(400).json({ message: "Invalid request" });

    if (req.user.role === "customer" && req.user.id !== customer_id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const cart = await Cart.findByCustomerId(customer_id);
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const items = [...cart.items];
    const index = items.findIndex(
      (i) => i.product_id.toString() === product_id
    );

    if (index < 0) return res.status(404).json({ message: "Item not in cart" });

    items[index].quantity = quantity;
    await Cart.updateItems(customer_id, items);

    return res.status(200).json({ message: "Quantity updated", items });
  } catch (err) {
    console.error("Update qty error:", err);
    res.status(500).json({ message: err.message });
  }
}

export async function removeItem(req, res) {
  try {
    const { customer_id, product_id } = req.params;

    if (req.user.role === "customer" && req.user.id !== customer_id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const cart = await Cart.findByCustomerId(customer_id);
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const items = cart.items.filter(
      (i) => i.product_id.toString() !== product_id
    );
    await Cart.updateItems(customer_id, items);

    return res.status(200).json({ message: "Item removed from cart", items });
  } catch (err) {
    console.error("Remove item error:", err);
    res.status(500).json({ message: err.message });
  }
}

export async function deleteCart(req, res) {
  try {
    const { customer_id } = req.params;

    if (req.user.role === "customer" && req.user.id !== customer_id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Cart.delete(customer_id);

    return res.status(200).json({ message: "Cart cleared" });
  } catch (err) {
    console.error("Delete cart error:", err);
    res.status(500).json({ message: err.message });
  }
}

export async function checkoutCart(req, res) {
  try {
    const customer_id = req.user.id;

    const cart = await Cart.findByCustomerId(customer_id);
    if (!cart || !cart.items.length) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const orderPayload = {
      customer_id,
      payment_method: req.body.payment_method,
      shipping_address: req.body.shipping_address,
      items: cart.items.map((i) => ({
        product_id: i.product_id,
        quantity: i.quantity,
      })),
    };

    let orderResult;
    const fakeRes = {
      status: (code) => ({
        json: (data) => {
          orderResult = { code, data };
          return { code, data };
        },
      }),
    };
    await orderController.createOrder({ ...req, body: orderPayload }, fakeRes);

    if (orderResult && orderResult.code === 201) {
      await Cart.delete(customer_id);
    }

    return res.status(orderResult.code).json(orderResult.data);
  } catch (err) {
    console.error("Checkout cart error:", err);
    res.status(500).json({ message: err.message });
  }
}
