import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import api from "../api/api.js";
import "./UserOrders.css";
import "./Landing.css";
import OrderPopup from "./pop-ups/UserOrderPopup.jsx";

function UserDashboard() {
  const { id } = useParams();
  const [username, setUsername] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showSmallSearchbar, setShowSmallSearchbar] = useState(false);
  const [orders, setOrders] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");

  const orderHeaders = [
    "All",
    "pending",
    "processing",
    "completed",
    "cancelled",
  ];

  const filteredOrders =
    activeFilter === "All"
      ? orders
      : orders.filter((order) => order.order_status === activeFilter);

  const loadOrderDetails = async (order) => {
    try {
      const response = await api.get(`/orderdetails/${order._id}`);
      const orderWithDetails = { ...order, details: response.data };
      setSelectedOrder(orderWithDetails);
    } catch (err) {
      console.error("Error loading order details:", err);
    }
  };

  useEffect(() => {
    const searchbarScreenResize = () => {
      if (window.innerWidth >= 830) {
        setShowSmallSearchbar(false);
      }
    };
    window.addEventListener("resize", searchbarScreenResize);
    searchbarScreenResize();
    return () => window.removeEventListener("resize", searchbarScreenResize);
  }, []);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get("/orders");
        setOrders(response.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
      <div className="user-dashboard-container">
        <div className="header">
          <h1>
            <span style={{ color: "#FFCF33" }}>My Account</span>
          </h1>
          <h2>
            Welcome, <span style={{ color: "#FFCF33" }}>{username}!</span>
          </h2>
        </div>

        <div className="dashboard">
          <div className="sidebar">
            <ul>
              <li>
                <img
                  width="24"
                  height="24"
                  src="https://img.icons8.com/?size=100&id=U5JRqX4RSgfj&format=png&color=FFFFFF"
                  alt="home--v1"
                />
                <span>
                  <a href="/dashboard" className="unselectedtab">
                    Home
                  </a>
                </span>
              </li>
              <li className="selectedli">
                <img
                  width="24"
                  height="24"
                  src="https://img.icons8.com/ios-filled/50/ffcf33/purchase-order--v1.png"
                  alt="purchase-order--v1"
                />
                <span>
                  <a href="/dashboard/orders" className="selectedtab">
                    Orders
                  </a>
                </span>
              </li>
              <li>
                <img
                  width="24"
                  height="24"
                  src="https://img.icons8.com/ios-filled/50/FFFFFF/user--v1.png"
                  alt="user--v1"
                />
                <span>
                  <a href="/dashboard/profile" className="unselectedtab">
                    Profile
                  </a>
                </span>
              </li>
            </ul>
          </div>

          {/*MAIN CONTENT*/}
          <div className="main-content">
            <div className="user-orders-section">
              <div className="search-bar">
                <img
                  width="20"
                  height="20"
                  src="https://img.icons8.com/ios-glyphs/30/FFD033/search--v1.png"
                  alt="search--v1"
                />
                <input
                  type="text"
                  placeholder="Search order by ID or product name"
                />
              </div>

              <div className="user-orders-tab">
                <ul>
                  {orderHeaders.map((header) => (
                    <li
                      key={header}
                      className={activeFilter === header ? "active-filter" : ""}
                      onClick={() => setActiveFilter(header)}
                    >
                      {header.charAt(0).toUpperCase() + header.slice(1)}{" "}
                      {/* Capitalize */}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="user-orders-container">
                <div className="user-orders-columnHeader">
                  <span>Order ID</span>
                  <span>Date</span>
                  <span>Status</span>
                  <span>Total Amount</span>
                </div>

                {/* LIST */}
                {filteredOrders.map((order) => (
                  <div
                    key={order._id}
                    className="user-orders-list"
                    onClick={() => loadOrderDetails(order)}
                  >
                    <span>{order._id}</span>
                    <span>
                      {new Date(order.order_date).toLocaleDateString()}
                    </span>
                    <span>{order.order_status}</span>
                    <span>₱{order.total_amount.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            {selectedOrder && (
              <OrderPopup
                order={selectedOrder}
                onClose={() => setSelectedOrder(null)}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserDashboard;
