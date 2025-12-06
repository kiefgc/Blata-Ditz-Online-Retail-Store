import "./Checkout.css";
import { useEffect, useState } from "react";
import api from "../../api/api.js";
import { Link } from "react-router-dom";

function CheckoutInformation({ formData, setFormData, handleContinue }) {
  const updateField = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([]);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

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

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <h1>Order Placement</h1>

        <span className="selectedCheckout">Information </span>
        <span>&gt; </span>
        <Link to="/checkout/payment">
          <span>Payment </span>
        </Link>
      </div>

      <div className="information-container">
        <div className="checkout-customer-details">
          {/* Only show the required address fields */}
          <div className="display-user-info">
            <div className="info-input">
              <span className="info-title">Username</span>
              <span className="fixedInfo">{user.username}</span>
              <span className="info-title">Email</span>
              <span className="fixedInfo">{user.email}</span>
            </div>

            <div className="info-input">
              <span className="info-title">Phone Number</span>
              <span className="fixedInfo">{user.phone}</span>
            </div>
          </div>
          <div className="info-input">
            <span className="info-title">Street No.</span>
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={updateField}
            />
          </div>
          <div className="postal-city-region">
            <div className="info-input">
              <span className="info-title">Postal Code</span>
              <input
                type="number"
                name="postal"
                value={formData.postal}
                onChange={updateField}
              />
            </div>
            <div className="info-input">
              <span className="info-title">City</span>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={updateField}
              />
            </div>
            <div className="info-input">
              <span className="info-title">Region</span>
              <input
                type="text"
                name="region"
                value={formData.region}
                onChange={updateField}
              />
            </div>
          </div>

          <div className="info-buttons to-payment">
            <button className="proceed-btn " onClick={handleContinue}>
              Continue to Payment
            </button>
          </div>
        </div>

        {/* ORDER OVERVIEW */}
        <div className="order-overview-container">
          {loading ? (
            <p>Loading order overview...</p>
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

export default CheckoutInformation;
