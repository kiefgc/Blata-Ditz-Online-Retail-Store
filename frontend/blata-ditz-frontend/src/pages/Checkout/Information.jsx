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
function CheckoutInformation() {
  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <h1>Order Placement</h1>
        <span>Cart </span>
        <span>&gt; </span>
        <Link to="/admin/suppliers" className="selectedCheckout">
          <span>Information </span>
        </Link>
        <span>&gt; </span>
        <span>Payment </span>
      </div>
      {/*INFORMATION CONTENT*/}
      <div className="information-container">
        <div className="checkout-customer-details">
          <div className="first-lastname">
            <div className="info-input">
              <span className="info-title">First Name</span>
              <input type="text" name="fname"></input>
            </div>
            <div className="info-input">
              <span className="info-title">Last Name</span>
              <input type="text" name="lname"></input>
            </div>
          </div>
          <div className="email-phone">
            <div className="info-input">
              <span className="info-title">Email</span>
              <input type="email" name="email"></input>
            </div>
            <div className="info-input">
              <span className="info-title">Phone Number</span>
              <input type="tel" name="phone"></input>
            </div>
          </div>
          <div className="info-input">
            <span className="info-title">Street No.</span>
            <input type="text" name="street"></input>
          </div>
          <div className="postal-city-region">
            <div className="info-input">
              <span className="info-title">Postal Code</span>
              <input type="number" name="postal"></input>
            </div>
            <div className="info-input">
              <span className="info-title">City</span>
              <input type="text" name="city"></input>
            </div>
            <div className="info-input">
              <span className="info-title">Region</span>
              <input type="text" name="region"></input>
            </div>
          </div>
          <div className="info-buttons">
            <div className="return-cart-btn">&gt; &nbsp; Return to Cart</div>
            <button type="button" className="proceed-btn">
              Continue to Payment
            </button>
          </div>
        </div>
        <div className="order-overview-container">
          {/* LIST OF ORDERS */}
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
