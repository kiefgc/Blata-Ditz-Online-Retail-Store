import "./Checkout.css";
import { Link } from "react-router-dom";

const mockOrderOverview = [
  {
    id: "001",
    image: "https://picsum.photos/200/300",
    name: "Pulsar XBOARD QS Mechanical Gaming Keyboard with Quick Switching Technology, Win/Mac Switch Key (Black)",
    price: "16,450.00",
    quantity: 1,
    shipping: "FREE",
    subtotal: "16,450.00",
    total: "16,450.00",
  },
];

function CheckoutInformation({ formData, setFormData, handleContinue }) {
  const updateField = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
      {/* INFORMATION CONTENT */}
      <div className="information-container">
        <div className="checkout-customer-details">
          <div className="first-lastname">
            <div className="info-input">
              <span className="info-title">First Name</span>
              <input
                type="text"
                name="fname"
                value={formData.fname}
                onChange={updateField}
              />
            </div>
            <div className="info-input">
              <span className="info-title">Last Name</span>
              <input
                type="text"
                name="lname"
                value={formData.lname}
                onChange={updateField}
              />
            </div>
          </div>
          <div className="email-phone">
            <div className="info-input">
              <span className="info-title">Email</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={updateField}
              />
            </div>
            <div className="info-input">
              <span className="info-title">Phone Number</span>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={updateField}
              />
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
          <div className="info-buttons">
            <button className="proceed-btn" onClick={handleContinue}>
              Continue to Payment
            </button>
          </div>
        </div>
        <div className="order-overview-container">
          {mockOrderOverview.map((s) => (
            <div className="order-overview" key={s.id}>
              <div className="order-products">
                <img className="product-img" src={s.image} />
                <span>x{s.quantity}</span>
                <div className="overview-name-price">
                  <span>{s.name}</span>
                  <span className="overview-price">₱{s.price}</span>
                </div>
              </div>
              <div className="order-amount">
                <div className="overview-subtotal">
                  <span>Subtotal</span>
                  <span>₱{s.subtotal}</span>
                </div>
                <div className="overview-shipping">
                  <span>Shipping</span>
                  <span>{s.shipping}</span>
                </div>
                <div className="overview-total">
                  <span>Total</span>
                  <span style={{ color: "#ffcf33" }}>₱{s.total}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CheckoutInformation;
