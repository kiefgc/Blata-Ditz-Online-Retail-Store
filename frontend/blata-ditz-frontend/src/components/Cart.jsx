import React, { useEffect, useState } from "react";
import api from "../api/api.js";
import "../pages/pop-ups/Cart.css";

function Cart({ onClose, customerId }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!customerId) return;

    const fetchCartData = async () => {
      try {
        const cartRes = await api.get(`/cart/${customerId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        const cart = cartRes.data.cart;

        if (!cart || !cart.items.length) {
          setCartItems([]);
          setLoading(false);
          return;
        }

        const productsRes = await api.get("/products");
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
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart:", error);
        setCartItems([]);
        setLoading(false);
      }
    };

    fetchCartData();
  }, [customerId]);

  const total = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  if (loading) return <div className="cart-popup">Loading cart...</div>;

  return (
    <div className="cart-popup" onClick={(e) => e.stopPropagation()}>
      <div className="cart-header">
        <button className="close-cart-button" onClick={onClose}>
          &times;
        </button>
      </div>

      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <div className="cart-list">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-line1">
                <span className="item-name">{item.name}</span>
                <span className="item-qty">Qty: {item.quantity}</span>
              </div>
              <span className="item-price">
                Php {(item.quantity * item.price).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="cart-footer">
        <div className="cart-total">
          <span>Subtotal:</span>
          <span>Php {total.toFixed(2)}</span>
        </div>
        <div className="cart-footer-checkout">
          <button className="checkout-button">Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
