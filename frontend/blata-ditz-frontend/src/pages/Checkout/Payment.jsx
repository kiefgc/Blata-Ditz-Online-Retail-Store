import "./Checkout.css";
import { Link, useNavigate } from "react-router-dom";

import gcash from "../../assets/gcash.png";
import visa from "../../assets/visa.png";
import jcb from "../../assets/jcb.png";
import mastercard from "../../assets/mastercard.png";

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

function CheckoutPayment({ formData }) {
  const navigate = useNavigate();

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <h1>Order Placement</h1>

        <Link to="/checkout/information">
          <span>Information </span>
        </Link>

        <span>&gt; </span>
        <span className="selectedCheckout">Payment </span>
      </div>

      <div className="payment-container">
        <div className="checkout-payment-details">
          <div className="payment-contact">
            <span>Contact</span>
            <span className="contact-details">
              <span>{formData.email}</span>
              <span>{formData.phone}</span>
            </span>
          </div>
          <div className="payment-contact">
            <span>Address</span>
            <span>
              {formData.street}, {formData.postal}, {formData.city},{" "}
              {formData.region}
            </span>
          </div>

          <div className="payment-method">
            <h1>Payment Method</h1>
            <div className="method-selection">
              <div className="method">
                <div className="method-label">
                  <input
                    type="radio"
                    name="payment"
                    value="gcash"
                    className="payment"
                  />{" "}
                  GCash
                </div>
                <div className="logo-container">
                  <img src={gcash} />
                </div>
              </div>
              <div className="method">
                <div className="method-label">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    className="payment"
                  />{" "}
                  Credit or Debit Card
                </div>
                <div className="logo-container card-logos">
                  <img src={visa} />
                  <img src={mastercard} />
                  <img src={jcb} />
                </div>
              </div>
              <div className="method">
                <div className="method-label">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    className="payment"
                  />{" "}
                  Cash on Delivery
                </div>
                <div className="logo-container"></div>
              </div>
            </div>
          </div>

          <div className="info-buttons">
            <Link to="/checkout/information" className="return-cart-btn">
              &gt; &nbsp; Return to Information
            </Link>
            <button
              type="button"
              className="proceed-btn"
              onClick={() => navigate("/checkout/processing")}
            >
              Place Order
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

export default CheckoutPayment;
