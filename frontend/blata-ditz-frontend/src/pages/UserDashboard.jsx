import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api.js";

import "./UserDashboard.css";
import "./Landing.css";
import OrderPopup from "./pop-ups/UserOrderPopup.jsx";

const ordersMock = [
  {
    id: "001",
    date: "06-11-2025",
    productName:
      "Transnovo 24-in-1 Game Card Storage Case for Nintendo Switch 2",
    amount: "₱16,450.00",
    paymentStatus: "PENDING",
    orderStatus: "PENDING",
    customer: {
      email: "dana.alania@fmail.com",
      contact: "+63 976 348 5930",
      address: "578 Eymard Sweets, 1354, Quezon City, Metro Manila",
    },
    details: [
      {
        itemId: "001",
        qty: 2,
        name: "Transnovo 24-in-1 Game Card Storage Case for Nintendo Switch 2",
        price: "₱16,450.00",
        image: "/assets/item.png",
      },
    ],
  },
];

function UserDashboard() {
  const { id } = useParams();
  const [username, setUsername] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showSmallSearchbar, setShowSmallSearchbar] = useState(false);
  const [orders, setOrders] = useState([]);

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
        const data = response.data;

        if (Array.isArray(data)) {
          const pendingOrders = data.filter(
            (order) => order.order_status === "pending"
          );

          setOrders(pendingOrders);
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

  return (
    <>
      <div className="user-dashboard-container">
        <div className="header">
          <h1>
            <span style={{ color: "#FFCF33" }}>My Account</span>
          </h1>
          <h2>
            Welcome, <span style={{ color: "#FFCF33" }}> {username}!</span>
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
                  <a href="/dashboard" className="selectedtab">
                    Home
                  </a>
                </span>
              </li>
              <li>
                <img
                  width="24"
                  height="24"
                  src="https://img.icons8.com/ios-filled/50/FFFFFF/purchase-order--v1.png"
                  alt="purchase-order--v1"
                />
                <span>
                  <a href="/dashboard/orders" className="unselectedtab">
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
              <div className="header">
                <h1>
                  <span style={{ color: "#FFCF33" }}>Current Orders</span>
                </h1>
              </div>
              <div className="user-orders-columnHeader">
                <span>Order ID</span>
                <span>Date</span>
                <span>Status</span>
                <span>Total Amount</span>
              </div>

              {/* LIST */}
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="user-orders-list"
                  onClick={() => setSelectedOrder(order)}
                >
                  <span>{order._id}</span>
                  <span>
                    {new Date(order.order_date).toISOString().split("T")[0]}
                  </span>
                  <span>{order.order_status}</span>
                  <span>{order.total_amount}</span>
                </div>
              ))}
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
