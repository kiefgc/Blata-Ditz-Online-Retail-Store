import React, { useState, useEffect, useMemo } from "react";
import api from "../api/api.js";
import "../pages/pop-ups/Cart.css";

function Cart({ onClose, customerId }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!customerId) return;

    const fetchCartData = async () => {
      try {
        // 1️⃣ Fetch cart for the customer
        const cartRes = await api.get(`/cart/${customerId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const cart = cartRes.data.cart;

        if (!cart || !cart.items.length) {
          setCartItems([]);
          setLoading(false);
          return;
        }

        // 2️⃣ Fetch only products in the cart
        const productIds = cart.items.map((item) => item.product_id);
        const productsRes = await api.get("/products", {
          params: { ids: productIds.join(",") }, // your backend should support filtering by IDs
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const products = productsRes.data;

        // 3️⃣ Combine cart items with product details
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

  const handleQuantityChange = (productId, newQuantity) => {
    const quantity = Math.max(0, newQuantity);

    setCartItems((prevItems) => {
      const updatedItems = prevItems
        .map((item) => (item.id === productId ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0);
      return updatedItems;
    });
  };

  const handleDecrementOrRemove = (item) => {
    if (item.quantity > 1) {
      handleQuantityChange(item.id, item.quantity - 1);
    } else if (item.quantity === 1) {
      setCartItems((prevItems) => prevItems.filter((i) => i.id !== item.id));
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
                      className="quantity-button"
                      onClick={() => handleDecrementOrRemove(item)}
                    >
                      -
                    </button>
                    <span className="item-qty-value">{item.quantity}</span>
                    <button
                      className="qty-button plus"
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
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
          <button className="checkout-button" disabled={cartIsEmpty}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
