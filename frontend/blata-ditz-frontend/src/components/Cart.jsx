import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api.js";
import "../pages/pop-ups/Cart.css";

function Cart({ onClose, customerId }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCart = async (initial = false) => {
    if (initial) setLoading(true);

    try {
      const cartRes = await api.get(`/cart/${customerId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      const cart = cartRes.data.cart;

      if (!cart || !cart.items.length) {
        setCartItems([]);
        if (initial) setLoading(false);
        return;
      }

      const productIds = cart.items.map((item) => item.product_id);
      const productsRes = await api.get("/products", {
        params: { ids: productIds.join(",") },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const products = productsRes.data;

      const combinedItems = cart.items.map((item) => {
        const product = products.find((p) => p._id === item.product_id);
        return {
          id: item.product_id,
          name: product?.product_name || "Unknown Product",
          price: product?.unit_price || 0,
          quantity: item.quantity,
        };
      });

      setCartItems(combinedItems);
      if (initial) setLoading(false);
    } catch (err) {
      console.error("Fetch cart error:", err);
      setCartItems([]);
      if (initial) setLoading(false);
    }
  };

  useEffect(() => {
    if (!customerId) return;
    fetchCart(true);
  }, [customerId]);

  const updateQuantity = async (productId, newQty) => {
    const customer_id = localStorage.getItem("customer_id");
    const token = localStorage.getItem("token");

    if (!customer_id || !token) return;

    if (newQty <= 0) {
      return removeItem(productId);
    }

    try {
      await api.patch(
        `/cart/${customer_id}/update`,
        { product_id: productId, quantity: newQty },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      fetchCart();
    } catch (err) {
      console.error("Update quantity error:", err);
    }
  };

  const removeItem = async (productId) => {
    const customer_id = localStorage.getItem("customer_id");
    const token = localStorage.getItem("token");

    try {
      await api.delete(`/cart/${customer_id}/remove/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchCart();
    } catch (err) {
      console.error("Remove item error:", err);
    }
  };

  const total = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);
  }, [cartItems]);

  const cartIsEmpty = cartItems.length === 0;

  if (loading) return <div className="cart-popup">Loading cart...</div>;

  return (
    <div className="cart-popup" onClick={(e) => e.stopPropagation()}>
      <div className="cart-header">
        <p>Cart</p>
        <button className="close-cart-button" onClick={onClose}>
          &times;
        </button>
      </div>

      {cartIsEmpty ? (
        <p className="empty-cart">
          Your cart is currently empty. Add some items!
        </p>
      ) : (
        <div className="cart-list">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="item-details-row">
                <span className="item-name" title={item.name}>
                  {item.name}
                </span>
                <div className="controls-and-price">
                  <div className="quantity-controls">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span className="item-qty-value">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <span className="item-price-total">
                    ₱ {(item.quantity * item.price).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="cart-footer">
        <div className="cart-total">
          <span>Total:</span>
          <span>₱ {total.toFixed(2)}</span>
        </div>
        <div className="cart-footer-checkout">
          <button
            className="checkout-button"
            disabled={cartIsEmpty}
            onClick={() => navigate("/checkout/information")}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
