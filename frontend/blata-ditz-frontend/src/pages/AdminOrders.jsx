import "../index.css";
import "./AdminOrders.css";
import "./Landing.css";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import OrderPopup from "./pop-ups/OrdersPopup.jsx";

const ordersMock = [
  {
    id: "001",
    date: "06-11-2025",
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
    date: "06-12-2025",
    amount: "₱5,999.00",
    paymentStatus: "PAID",
    orderStatus: "TO SHIP",
    customer: {
      email: "sample@user.com",
      contact: "+63 912 123 4567",
      address: "Pasig City, Metro Manila",
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

function AdminOrders() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showSmallSearchbar, setShowSmallSearchbar] = useState(false);

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
                {" "}
                <li>All</li> <li>To Pay</li> <li>To Ship</li>{" "}
                <li>To Receive</li> <li>Completed</li> <li>Cancelled</li>{" "}
              </ul>{" "}
            </div>
            <div className="admin-orders-columnHeader">
              <span>Order ID</span>
              <span>Total Amount</span>
              <span>Date</span>
              <span>Payment</span>
              <span>Status</span>
            </div>

            {/* LIST */}
            {ordersMock.map((order) => (
              <div
                key={order.id}
                className="admin-orders-list"
                onClick={() => setSelectedOrder(order)}
              >
                <span>{order.id}</span>
                <span>{order.amount}</span>
                <span>{order.date}</span>

                <span>
                  <div className=" details-status-payment details-status-payment-table">
                    <select onClick={(e) => e.stopPropagation()}>
                      <option value=""></option>
                      <option value="PENDING">PENDING</option>
                      <option value="PAID">PAID</option>
                      <option value="FAILED">FAILED</option>
                    </select>
                  </div>
                </span>

                <span>
                  <div className=" details-status-payment details-status-payment-table">
                    <select onClick={(e) => e.stopPropagation()}>
                      <option value=""></option>
                      <option value="PENDING">PENDING</option>
                      <option value="PROCESSING">PROCESSING</option>
                      <option value="COMPLETED">COMPLETED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                  </div>
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
