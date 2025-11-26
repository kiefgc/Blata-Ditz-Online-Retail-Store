import { useState, useEffect } from "react";
import api from "../../api/api";
import "../AdminOrders.css";

function OrderPopup({ order, onClose }) {
  const [orderDetails, setOrderDetails] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState(
    order.payment_status?.toUpperCase() || "PENDING"
  );
  const [orderStatus, setOrderStatus] = useState(
    order.order_status?.toUpperCase() || "PENDING"
  );

  useEffect(() => {
    if (!order?._id) return;

    const fetchOrderDetails = async () => {
      try {
        const response = await api.get(`/orderdetails/${order._id}`);
        setOrderDetails(response.data || []);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrderDetails();
  }, [order._id]);

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data || []);
      } catch (error) {
        console.error("Error fetching all orders:", error);
      }
    };

    fetchAllOrders();
  }, []);

  const handleUpdateOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No auth token found");

      await api.patch(
        `/orders/admin/${order._id}`,
        { order_status: orderStatus.toLowerCase() },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Order updated successfully!");
    } catch (error) {
      console.error("Order update error:", error.response || error);
      alert(error.response?.data?.message || "Failed to update order.");
    }
  };

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
            <span className="order-id-no">{order._id}</span>
          </div>

          <div className="order-columns">
            {/* LEFT COLUMN */}
            <div className="first-column">
              <div className="order-details">
                <span className="order-detail-title">Date</span>
                <span className="order-detail-value">
                  {new Date(order.order_date).toLocaleString()}
                </span>
              </div>

              <div className="order-details">
                <span className="order-detail-title">Customer ID</span>
                <span className="order-detail-value">
                  {order.customer_id || "N/A"}
                </span>
              </div>

              <div className="order-details">
                <span className="order-detail-title">Shipping Address</span>
                <span className="order-detail-value">
                  {order.shipping_address || "N/A"}
                </span>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="second-column">
              <div className="order-details">
                <span className="order-detail-title">Payment Method</span>
                <span className="order-detail-value">
                  {order.payment_method
                    ? order.payment_method.replace("_", " ").toUpperCase()
                    : "N/A"}
                </span>
              </div>

              <div className="order-details-status">
                <div className="details-status-payment">
                  <span className="order-detail-title">Payment Status</span>
                  <select
                    value={paymentStatus}
                    onChange={(e) => setPaymentStatus(e.target.value)}
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="PAID">PAID</option>
                    <option value="FAILED">FAILED</option>
                  </select>
                </div>

                <div className="details-status-order">
                  <span className="order-detail-title">Order Status</span>
                  <select
                    value={orderStatus}
                    onChange={(e) => setOrderStatus(e.target.value)}
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="PROCESSING">PROCESSING</option>
                    <option value="COMPLETED">COMPLETED</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                </div>

                {/* Single update button for admin */}
                <button onClick={handleUpdateOrder}>Update</button>
              </div>
            </div>
          </div>

          {/* ORDER DETAILS LIST */}
          <div className="order-details">
            <span className="order-detail-title">Order Details</span>
            <table className="order-details-table">
              <thead>
                <tr>
                  <th>Product ID</th>
                  <th>Quantity</th>
                  <th>Name</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.map((d, index) => (
                  <tr key={index}>
                    <td>{d.product_id}</td>
                    <td>{d.quantity}</td>
                    <td>{d.product_name || "Product Name N/A"}</td>
                    <td>
                      ₱
                      {d.subtotal.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* AMOUNT TOTAL */}
            <div className="order-details-amountbreakdown">
              <div className="order-amountbreakdown-details">
                <span>Subtotal</span>
                <span>
                  ₱
                  {(
                    orderDetails.reduce(
                      (sum, d) => sum + (d.subtotal || 0),
                      0
                    ) || 0
                  ).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </span>
              </div>

              <div className="order-amountbreakdown-details">
                <span>Shipping</span>
                <span>FREE</span>
              </div>

              <div className="order-amountbreakdown-details">
                <span>Total</span>
                <span className="amountbreakdown-details-total">
                  ₱
                  {(order.total_amount || 0).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
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
