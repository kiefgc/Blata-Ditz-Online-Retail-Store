import item from "../../assets/item.png";
import "../UserOrders.css";

function OrderPopup({ order, onClose }) {
  if (!order) return null;

  return (
    <div className="admin-orders-popup-overlay">
      <div className="admin-orders-popup">
        <div className="admin-edit-header">
          <h3>View Order</h3>
          <button className="close-edit-modal-btn" onClick={onClose}>
            x
          </button>
        </div>

        <div className="admin-orders-popup-content">
          <div className="orders-id">
            <span className="order-id-title">ID No. </span>
            <span className="order-id-no">{order.id}</span>
          </div>

          <div className="order-columns">
            {/* LEFT COLUMN */}
            <div className="first-column">
              <div className="order-details">
                <span className="order-detail-title">Date</span>
                <span className="order-detail-value">{order.date}</span>
              </div>

              <div className="order-details">
                <span className="order-detail-title">Customer Contact</span>
                <span className="order-detail-value">
                  {order.customer.email}
                  <br />
                  {order.customer.contact}
                </span>
              </div>

              <div className="order-details">
                <span className="order-detail-title">Shipping Address</span>
                <span className="order-detail-value">
                  {order.customer.address}
                </span>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="second-column">
              <div className="order-details">
                <span className="order-detail-title">Payment Method</span>
                <span className="order-detail-value">GCash</span>
              </div>

              <div className="order-details">
                <div className="order-details-status">
                  <div className="details-status-payment">
                    <span className="order-detail-title">Payment Status</span>
                    <span className="order-detail-value">
                      {order.paymentStatus}
                    </span>
                  </div>

                  <div className="details-status-order">
                    <span className="order-detail-title">Order Status</span>
                    <span className="order-detail-value">
                      {order.orderStatus}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ORDER DETAILS LIST */}
          <div className="order-details">
            <span className="order-detail-title">Order Details</span>

            <div className="order-details-columnHeader">
              <span>ID</span>
              <span></span>
              <span>Name</span>
              <span></span>
              <span>Amount</span>
            </div>

            <div className="order-details-list">
              {order.details.map((d, index) => (
                <div className="order-entry" key={index}>
                  <span>{d.itemId}</span>
                  <span>x{d.qty}</span>
                  <span>
                    <div className="order-details-img">
                      <img className="order-details-item-img" src={item} />
                    </div>
                  </span>
                  <span className="order-details-name">{d.name}</span>
                  <span>{d.price}</span>
                </div>
              ))}
            </div>

            {/* AMOUNT TOTAL */}
            <div className="order-details-amountbreakdown">
              <div className="order-amountbreakdown-details">
                <span>Subtotal</span>
                <span>{order.amount}</span>
              </div>
              <div className="order-amountbreakdown-details">
                <span>Shipping</span>
                <span>FREE</span>
              </div>
              <div className="order-amountbreakdown-details">
                <span>Total</span>
                <span className="amountbreakdown-details-total">
                  {order.amount}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderPopup;
