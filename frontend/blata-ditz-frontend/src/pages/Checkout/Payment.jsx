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

function CheckoutPayment() {
  return (
    <div className="checkout-container">
      {" "}
      <div className="checkout-header">
        <h1>Order Placement</h1>
        <span>Cart </span>
        <span>&gt; </span>

        <span>Information </span>

        <span>&gt; </span>
        <Link to="/admin/suppliers" className="selectedCheckout">
          <span>Payment </span>
        </Link>
      </div>
      {/*INFORMATION CONTENT*/}
      <div className="payment-container">
        <div className="checkout-payment-details">
          <div className="payment-contact">
            <span>Contact</span>
            <span className="contact-details">
              <span>dana.alania@gmail.com</span>
              <span>+63 976 486 2948</span>
            </span>
          </div>
          <div className="payment-contact">
            <span>Address</span>
            <span>345 Eymard Suites, 1552, Mandaluyong City, Metro Manila</span>
          </div>
          <div className="payment-method">
            <h1>Payment Method</h1>
            <div className="method-selection">asd</div>
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

export default CheckoutPayment;
