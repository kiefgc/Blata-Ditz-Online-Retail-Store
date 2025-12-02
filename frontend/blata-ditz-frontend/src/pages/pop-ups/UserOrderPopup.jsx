import { useState, useEffect } from "react";

import item from "../../assets/item.png";
import "../UserOrders.css";
import api from "../../api/api.js";

function OrderPopup({ order, onClose }) {
  if (!order) return null;

  const formattedDate = order.order_date
    ? new Date(order.order_date).toISOString().split("T")[0]
    : "N/A";

  const [orderDetails, setOrderDetails] = useState([]);
  const [customerInfo, setCustomerInfo] = useState(null);

  useEffect(() => {
    const fetchCustomerInfo = async () => {
      try {
        const response = await api.get("/authentication/users/me");
        setCustomerInfo(response.data);
      } catch (error) {
        console.error("Error fetching customer info:", error);
      }
    };

    if (order) fetchCustomerInfo();
  }, [order]);

  useEffect(() => {
    const fetchOrderDetailsWithNames = async () => {
      if (!order) return;

      try {
        const res = await api.get(`/orderdetails/${order._id}`);
        const details = res.data;

        const detailsWithNames = await Promise.all(
          details.map(async (d) => {
            try {
              const productRes = await api.get(`/products/${d.product_id}`);
              return {
                ...d,
                product_name: productRes.data.product_name,
              };
            } catch (err) {
              console.error("Error fetching product:", err);
              return { ...d, product_name: "Unknown Product" };
            }
          })
        );

        setOrderDetails(detailsWithNames);
      } catch (error) {
        console.error("Error fetching order details:", error);
        setOrderDetails([]);
      }
    };

    fetchOrderDetailsWithNames();
  }, [order]);

  return (
    <div className="user-orders-popup-overlay">
      <div className="user-orders-popup">
        <div className="user-edit-header">
          <h3>View Order</h3>
          <button className="close-edit-modal-btn" onClick={onClose}>
            x
          </button>
        </div>

        <div className="user-orders-popup-content">
          <div className="orders-id">
            <span className="order-id-title">ID No. </span>
            <span className="order-id-no">{order._id || "N/A"}</span>
          </div>

          <div className="order-columns">
            {/* LEFT COLUMN */}
            <div className="first-column">
              <div className="order-details">
                <span className="order-detail-title">Date</span>
                <span className="order-detail-value">{formattedDate}</span>
              </div>

              <div className="order-details">
                <span className="order-detail-title">Customer Contact</span>
                <span className="order-detail-value">
                  {customerInfo?.phone || "N/A"}
                </span>
              </div>

              <div className="order-details">
                <span className="order-detail-title">Shipping Address</span>
                <span className="order-detail-value">
                  {order.customer?.address}
                </span>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="second-column">
              <div className="order-details">
                <span className="order-detail-title">Payment Method</span>
                <span className="order-detail-value">
                  {order.payment_method || "N/A"}
                </span>
              </div>

              <div className="order-details">
                <div className="order-details-status">
                  <div className="details-status-payment">
                    <span className="order-detail-title">Payment Status</span>
                    <span className="order-detail-value">
                      {order.payment_status}
                    </span>
                  </div>

                  <div className="details-status-order">
                    <span className="order-detail-title">Order Status</span>
                    <span className="order-detail-value">
                      {order.order_status}
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
              <span>Item</span>
              <span></span>
              <span>Quantity</span>
            </div>

            <div className="order-details-list">
              {orderDetails.length > 0 ? (
                orderDetails.map((d) => (
                  <div className="order-entry" key={d._id}>
                    <span>{d._id}</span>
                    <span></span>
                    <span>{d.product_name}</span>
                    <span></span>
                    <span>{d.quantity}</span>
                  </div>
                ))
              ) : (
                <div>No order details available.</div>
              )}
            </div>

            {/* AMOUNT TOTAL */}
            <div className="order-details-amountbreakdown">
              <div className="order-amountbreakdown-details">
                <span>Subtotal</span>
                <span>{order.total_amount || 0}</span>
              </div>
              <div className="order-amountbreakdown-details">
                <span>Shipping</span>
                <span>FREE</span>
              </div>
              <div className="order-amountbreakdown-details">
                <span>Total</span>
                <span className="amountbreakdown-details-total">
                  {order.total_amount || 0}
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
