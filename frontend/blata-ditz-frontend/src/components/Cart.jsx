import React from "react";
import "../pages/pop-ups/Cart.css";

function Cart({ onClose }) {
  const cartItems = [
    { id: 1, name: "Product", quantity: 2, price: 10.0 },
    { id: 2, name: "Product", quantity: 1, price: 25.5 },
  ];
  const total = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

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
