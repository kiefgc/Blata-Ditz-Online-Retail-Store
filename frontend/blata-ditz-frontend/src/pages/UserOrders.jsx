import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "./UserOrders.css";
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

  {
    id: "002",
    productName: "Gaming Mouse RGB Pro",
    date: "06-12-2025",
    amount: "₱5,999.00",
    paymentStatus: "PAID",
    orderStatus: "COMPLETED",
    customer: {
      email: "dana.alania@fmail.com",
      contact: "+63 976 348 5930",
      address: "578 Eymard Sweets, 1354, Quezon City, Metro Manila",
    },
    details: [
      {
        itemId: "002",
        qty: 1,
        name: "Gaming Mouse RGB Pro",
        price: "₱5,999.00",
        image: "/assets/item.png",
      },
    ],
  },
];

function UserDashboard() {
  const { id } = useParams();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showSmallSearchbar, setShowSmallSearchbar] = useState(false);

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

  return (
    <>
      <div className="user-dashboard-container">
        <div className="header">
          <h1>
            <span style={{ color: "#FFCF33" }}>My Account</span>
          </h1>
          <h2>
            Welcome, <span style={{ color: "#FFCF33" }}>Username!</span>
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
              <li>
                <img
                  width="24"
                  height="24"
                  src="https://img.icons8.com/ios-filled/50/FFFFFF/purchase-order--v1.png"
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
                  <a href="/dashboard/orders" className="unselectedtab">
                    Profile
                  </a>
                </span>
              </li>
              <li>
                <img
                  width="21"
                  height="21"
                  src="https://img.icons8.com/fluency-systems-filled/48/FFFFFF/open-pane.png"
                  alt="open-pane"
                />
                <span>Log Out</span>
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
                {" "}
                <ul>
                  {" "}
                  <li>All</li> <li>To Pay</li> <li>To Ship</li>{" "}
                  <li>To Receive</li> <li>Completed</li> <li>Cancelled</li>{" "}
                </ul>{" "}
              </div>

              <div className="user-orders-columnHeader">
                <span>Order ID</span>
                <span>Product Name</span>
                <span>Date</span>
                <span>Status</span>
                <span>Total Amount</span>
              </div>

              {/* LIST */}
              {ordersMock.map((order) => (
                <div
                  key={order.id}
                  className="admin-orders-list"
                  onClick={() => setSelectedOrder(order)}
                >
                  <span>{order.id}</span>
                  <span>{order.productName}</span>
                  <span>{order.date}</span>
                  <span>{order.orderStatus}</span>
                  <span>{order.amount}</span>
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
