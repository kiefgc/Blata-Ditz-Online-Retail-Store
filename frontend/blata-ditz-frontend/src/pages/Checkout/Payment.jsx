import "./Checkout.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../api/api.js";

import gcash from "../../assets/gcash.png";
import visa from "../../assets/visa.png";
import jcb from "../../assets/jcb.png";
import mastercard from "../../assets/mastercard.png";

function CheckoutPayment({ formData }) {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [user, setUser] = useState([]);

  // Fetch cart items from backend
  useEffect(() => {
    const fetchCartAndProducts = async () => {
      const customerId = localStorage.getItem("customer_id");
      const token = localStorage.getItem("token");
      if (!customerId || !token) return;

      try {
        /* fetch user */
        const response = await api.get("authentication/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);

        const cartRes = await api.get(`/cart/${customerId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const cart = cartRes.data.cart;
        if (!cart || !cart.items.length) {
          setCartItems([]);
          setLoading(false);
          return;
        }

        const products = await Promise.all(
          cart.items.map(async (item) => {
            const prodRes = await api.get(`/products/${item.product_id}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            const product = prodRes.data;

            return {
              id: product._id,
              name: product.product_name,
              price: product.unit_price,
              quantity: item.quantity,
              image: `http://localhost:5000${product.image}`,
            };
          })
        );

        setCartItems(products);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching checkout cart:", err);
        setCartItems([]);
        setLoading(false);
      }
    };

    fetchCartAndProducts();
  }, []);

  // Concatenate shipping address
  const shippingAddress = `${formData.street}, ${formData.city}, ${formData.region}, ${formData.postal}`;

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/cart/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          payment_method: paymentMethod,
          shipping_address: shippingAddress,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        alert("Order failed: " + error.message);
        return;
      }

      // Clear localStorage cart
      localStorage.removeItem("cart");

      navigate("/checkout/processing");
    } catch (error) {
      console.error("Checkout error:", error);
      alert("An error occurred while placing your order.");
    }
  };

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <h1>Order Placement</h1>

        <Link to="/checkout">
          <span>Information </span>
        </Link>

        <span>&gt; </span>
        <span className="selectedCheckout">Payment </span>
      </div>

      <div className="payment-container">
        <div className="checkout-payment-details">
          {/* ADDRESS */}
          <div className="payment-contact">
            <span>Contact Number</span>
            <span>{user.phone}</span>
          </div>
          <div className="payment-contact">
            <span>Shipping Address</span>
            <span>{shippingAddress}</span>
          </div>

          {/* PAYMENT METHOD */}
          <div className="payment-method">
            <h1>Payment Method</h1>
            <div className="method-selection">
              <label className="method">
                <div className="method-label">
                  <input
                    type="radio"
                    name="payment"
                    value="gcash"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  GCash
                </div>
                <div className="logo-container">
                  <img src={gcash} />
                </div>
              </label>

              <label className="method">
                <div className="method-label">
                  <input
                    type="radio"
                    name="payment"
                    value="credit_card"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  Credit or Debit Card
                </div>
                <div className="logo-container card-logos">
                  <img src={visa} />
                  <img src={mastercard} />
                  <img src={jcb} />
                </div>
              </label>

              <label className="method">
                <div className="method-label">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  Cash on Delivery
                </div>
                <div className="logo-container"></div>
              </label>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="info-buttons">
            <Link to="/checkout" className="return-cart-btn">
              &gt; &nbsp; Return to Information
            </Link>

            <button
              type="button"
              className="proceed-btn"
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>
          </div>
        </div>

        {/* ORDER OVERVIEW */}
        <div className="order-overview-container">
          {loading ? (
            <p>Loading your cart...</p>
          ) : cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              <div className="order-products-list">
                {cartItems.map((item) => (
                  <div className="order-product-row" key={item.id}>
                    <div className="order-products">
                      <img
                        className="product-img"
                        src={item.image}
                        alt={item.name}
                      />
                      <span>x{item.quantity}</span>
                      <div className="overview-name-price">
                        <span>{item.name}</span>
                        <span className="overview-price">
                          ₱{(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-overview-total">
                <div className="overview-subtotal">
                  <span>Subtotal</span>
                  <span>₱{total.toFixed(2)}</span>
                </div>
                <div className="overview-shipping">
                  <span>Shipping</span>
                  <span>FREE</span>
                </div>
                <div className="overview-total">
                  <span>Total</span>
                  <span style={{ color: "#ffcf33" }}>₱{total.toFixed(2)}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CheckoutPayment;
