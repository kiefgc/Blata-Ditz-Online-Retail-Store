import { React, useState, useMemo } from "react";
import "../pages/pop-ups/Cart.css";

// for testing
const initialCartItems = [
  { id: "p1", name: "The Legend of Zelda: TOTK", price: 3899.0, quantity: 2 },
  {
    id: "p3",
    name: "PlayStation 5 Console (Disc)",
    price: 29990.0,
    quantity: 1,
  },
  { id: "p4", name: "Razer BlackShark V2 Headset", price: 1500.0, quantity: 3 },
  { id: "p5", name: "Xbox Wireless Controller", price: 2899.5, quantity: 1 },
];

function Cart({ onClose }) {
  const [cartItems, setCartItems] = useState(initialCartItems);

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
