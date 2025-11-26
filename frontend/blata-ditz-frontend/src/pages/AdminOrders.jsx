import "../index.css";
import "./AdminOrders.css";
import "./Landing.css";
import api from "../api/api";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import OrderPopup from "./pop-ups/OrdersPopup.jsx";

function AdminOrders() {
  const [selectedTab, setSelectedTab] = useState("All");
  const [orders, setOrders] = useState([]);
  const filteredOrders = orders.filter((order) => {
    switch (selectedTab) {
      case "To Pay":
        return order.payment_status === "pending";
      case "To Ship":
        return order.order_status === "processing";
      case "To Receive":
        return order.order_status === "completed";
      case "Completed":
        return order.order_status === "completed";
      case "Cancelled":
        return order.order_status === "cancelled";
      default:
        return true;
    }
  });

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showSmallSearchbar, setShowSmallSearchbar] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get("/orders/");
        const data = response.data;

        if (Array.isArray(data)) {
          setOrders(data);
        } else {
          console.error("Expected array, got:", data);
          setOrders([]);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    const resizeHandler = () => {
      if (window.innerWidth >= 830) setShowSmallSearchbar(false);
    };
    window.addEventListener("resize", resizeHandler);
    resizeHandler();
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  return (
    <div className="admin-container">
      <div className="header">
        <h1>
          Welcome, <span style={{ color: "#FFCF33" }}>Admin!</span>
        </h1>
      </div>

      <div className="dashboard">
        <div className="sidebar">
          <ul>
            <li>
              <img
                width="24"
                height="24"
                src="https://img.icons8.com/ios-filled/50/FFFFFF/conference-call.png"
                alt="conference-call"
              />
              <span>
                <Link to="/admin/users" className="unselectedtab">
                  Users
                </Link>
              </span>
            </li>
            <li className="selectedli">
              <img
                width="22"
                height="22"
                src="https://img.icons8.com/ios-filled/50/FFCF33/untested.png"
                alt="untested"
              />
              <span>
                <Link to="/admin/orders" className="selectedtab">
                  Orders
                </Link>
              </span>
            </li>
            <li>
              <img
                width="24"
                height="24"
                src="https://img.icons8.com/material-rounded/24/FFFFFF/move-by-trolley.png"
                alt="move-by-trolley"
              />
              <span>
                <Link to="/admin/inventory" className="unselectedtab">
                  Inventory
                </Link>
              </span>
            </li>
            <li>
              <img
                width="24"
                height="24"
                src="https://img.icons8.com/material-outlined/24/FFFFFF/categorize.png"
                alt="categorize"
              />
              <span>
                <Link to="/admin/categories" className="unselectedtab">
                  Categories
                </Link>
              </span>
            </li>
            <li>
              <img
                width="24"
                height="24"
                src="https://img.icons8.com/glyph-neue/64/FFFFFF/supplier.png"
                alt="supplier"
              />
              <span>
                <Link to="/admin/suppliers" className="unselectedtab">
                  Suppliers
                </Link>
              </span>
            </li>
            <li>
              <img
                width="24"
                height="24"
                src="https://img.icons8.com/forma-regular-filled/24/FFFFFF/combo-chart.png"
                alt="combo-chart"
              />
              <span>
                <Link to="/admin/reports" className="unselectedtab">
                  Reports
                </Link>
              </span>
            </li>
          </ul>
        </div>

        {/* MAIN CONTENT */}
        <div className="main-content">
          <div className="admin-orders-section">
            <div className="search-bar">
              <img
                width="20"
                height="20"
                src="https://img.icons8.com/ios-glyphs/30/FFD033/search--v1.png"
                alt="search--v1"
              />
              <input type="text" placeholder="Search orders" />
            </div>

            {/* hEADER */}
            <div className="admin-orders-tab">
              {" "}
              <ul>
                {[
                  "All",
                  "To Pay",
                  "To Ship",
                  "To Receive",
                  "Completed",
                  "Cancelled",
                ].map((tab) => (
                  <li
                    key={tab}
                    className={selectedTab === tab ? "selected-order-tab" : ""}
                    onClick={() => setSelectedTab(tab)}
                  >
                    {tab}
                  </li>
                ))}
              </ul>
            </div>
            <div className="admin-orders-columnHeader">
              <span>Order ID</span>
              <span>Total Amount</span>
              <span>Date</span>
              <span>Payment</span>
              <span>Status</span>
            </div>

            {/* LIST */}
            {filteredOrders.map((order) => (
              <div
                key={order._id}
                className="admin-orders-list"
                onClick={() => setSelectedOrder(order)} // <-- THIS opens the popup
              >
                <span>{order._id}</span>

                <span>
                  ₱
                  {order.total_amount.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </span>

                <span>{new Date(order.order_date).toLocaleDateString()}</span>

                <span className="payment-status">
                  {order.payment_status.toUpperCase()}
                </span>

                <span className="order-status">
                  {order.order_status.toUpperCase()}
                </span>
              </div>
            ))}
          </div>

          {/* POPUP */}
          {selectedOrder && (
            <OrderPopup
              order={selectedOrder}
              onClose={() => setSelectedOrder(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminOrders;
