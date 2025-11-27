import "./Information.css";

import { Link } from "react-router-dom";
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
        <div className="order-overview">asd</div>
      </div>
    </div>
  );
}

export default CheckoutInformation;
