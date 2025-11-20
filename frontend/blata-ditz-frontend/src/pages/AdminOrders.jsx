import "../index.css";
import "./Landing.css";
import "./AdminOrders.css";

import AuthForm from "./AuthForm.jsx";

import { Link } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const FORM_POSITION_NONE = 0;
const FORM_POSITION_LOGIN = 1;
const FORM_POSITION_SIGNUP = 2;

function AdminOrders() {
  const [showOrdersPopup, setShowOrdersPopup] = useState(false);

  const [showSmallSearchbar, setShowSmallSearchbar] = useState(false);
  useEffect(() => {
    const searchbarScreenResize = () => {
      if (window.innerWidth >= 830) {
        setShowSmallSearchbar(false);
      }
    };
    window.addEventListener("resize", searchbarScreenResize);

    searchbarScreenResize();
    return () => {
      window.removeEventListener("resize", searchbarScreenResize);
    };
  }, []);
  return (
    <>
      <div className="navbar">
        <div>
          <a href="#" className="logo">
            BLATADITZ
          </a>
        </div>
        <div>
          <div className="search-bar search-close">
            <img
              width="20"
              height="20"
              src="https://img.icons8.com/ios-glyphs/30/FFD033/search--v1.png"
              alt="search--v1"
            />
            <input type="text" placeholder="Search" />
          </div>
        </div>
        <div className="nav-links">
          <a href="#">
            <img
              className="search-icon"
              width="34"
              height="34"
              src="https://img.icons8.com/ios-glyphs/30/FFFFFF/google-web-search.png"
              alt="google-web-search"
              onClick={() => setShowSmallSearchbar(!showSmallSearchbar)}
            />
          </a>
          <a href="#">
            <img
              width="30"
              height="30"
              src="https://img.icons8.com/fluency-systems-filled/48/FFFFFF/shopping-cart.png"
              alt="shopping-cart"
            />
          </a>
          <a href="#">
            <img
              width="30"
              height="30"
              src="https://img.icons8.com/ios-glyphs/30/FFFFFF/search--v1.png"
              alt="search--v1"
            />
          </a>
        </div>

        <div
          className={`small-screen-searchbar ${
            showSmallSearchbar ? "open" : ""
          }`}
        >
          <div className="small-searchbar">
            <img
              width="20"
              height="20"
              src="https://img.icons8.com/ios-glyphs/30/FFD033/search--v1.png"
              alt="search--v1"
            />
            <input type="text" placeholder="Search" />

            <img
              width="15"
              height="15"
              src="https://img.icons8.com/fluency-systems-regular/48/FFFFFF/multiply.png"
              alt="multiply"
              onClick={() => setShowSmallSearchbar(false)}
            />
          </div>
        </div>
      </div>
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
          <div className="main-content">
            {/* ORDERS SECTION */}

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
              <div className="admin-orders-tab">
                <ul>
                  <li>All</li>
                  <li>To Pay</li>
                  <li>To Ship</li>
                  <li>To Receive</li>
                  <li>Completed</li>
                  <li>Cancelled</li>
                </ul>
              </div>

              <div className="admin-orders-columnHeader">
                <span>Order ID</span>
                <span>Date</span>
                <span>Total Amount</span>
                <span>Payment Status</span>
                <span>Order Status</span>
              </div>
              <div
                className="admin-orders-list"
                onClick={() => setShowOrdersPopup(true)}
              >
                <span>001</span>

                <span>₱16,450.00</span>
                <span>06-11-2025</span>
                <span>
                  <div className=" details-status-payment details-status-payment-table">
                    <select
                      name="details-status-payment"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <option value="" disabled hidden></option>
                      <option value="payment-pending">PENDING</option>
                      <option value="paid">PAID</option>
                      <option value="failed">FAILED</option>
                    </select>
                  </div>
                </span>
                <span>
                  <div className=" details-status-payment details-status-payment-table">
                    <select
                      name="details-status-payment"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <option value="" disabled hidden></option>
                      <option value="payment-pending">PENDING</option>
                      <option value="paid">PAID</option>
                      <option value="failed">FAILED</option>
                    </select>
                  </div>
                </span>
              </div>
              <div className="admin-orders-list">
                <span>001</span>

                <span>₱16,450.00</span>
                <span>06-11-2025</span>
                <span>
                  <div className=" details-status-payment details-status-payment-table">
                    <select
                      name="details-status-payment"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <option value="" disabled hidden></option>
                      <option value="payment-pending">PENDING</option>
                      <option value="paid">PAID</option>
                      <option value="failed">FAILED</option>
                    </select>
                  </div>
                </span>
                <span>
                  <div className=" details-status-payment details-status-payment-table">
                    <select
                      name="details-status-payment"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <option value="" disabled hidden></option>
                      <option value="payment-pending">PENDING</option>
                      <option value="paid">PAID</option>
                      <option value="failed">FAILED</option>
                    </select>
                  </div>
                </span>
              </div>
              <div className="admin-orders-list">
                <span>001</span>

                <span>₱16,450.00</span>
                <span>06-11-2025</span>
                <span>
                  <div className=" details-status-payment details-status-payment-table">
                    <select
                      name="details-status-payment"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <option value="" disabled hidden></option>
                      <option value="payment-pending">PENDING</option>
                      <option value="paid">PAID</option>
                      <option value="failed">FAILED</option>
                    </select>
                  </div>
                </span>
                <span>
                  <div className=" details-status-payment details-status-payment-table">
                    <select
                      name="details-status-payment"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <option value="" disabled hidden></option>
                      <option value="payment-pending">PENDING</option>
                      <option value="paid">PAID</option>
                      <option value="failed">FAILED</option>
                    </select>
                  </div>
                </span>
              </div>
            </div>

            {/* Orders Popup */}
            {showOrdersPopup && (
              <div className="admin-orders-popup-overlay">
                <div className="admin-orders-popup">
                  <div
                    className="admin-orders-popup-close"
                    onClick={() => setShowOrdersPopup(false)}
                  >
                    CLOSE
                  </div>
                  <div className="admin-orders-popup-content">
                    <div className="orders-id">
                      <span className="order-id-title">ID No. </span>
                      <span className="order-id-no">001</span>
                    </div>
                    <div className="order-columns">
                      <div className="first-column">
                        <div className="order-details">
                          <span className="order-detail-title">Date</span>
                          <span className="order-detail-value">09-23-25</span>
                        </div>
                        <div className="order-details">
                          <span className="order-detail-title">
                            Customer Contact
                          </span>
                          <span className="order-detail-value">
                            <span>dana.alania@fmail.com</span>
                            <br />
                            <span>+63 976 348 5930</span>
                          </span>
                        </div>
                        <div className="order-details">
                          <span className="order-detail-title">
                            Shipping Address
                          </span>
                          <span className="order-detail-value">
                            578 Eymard Sweets, 1354, Quezon City, Metro Manila
                          </span>
                        </div>
                      </div>
                      <div className="second-column">
                        <div className="order-details">
                          <span className="order-detail-title">
                            Payment Method
                          </span>
                          <span className="order-detail-value">GCash</span>
                        </div>
                        <div className="order-details">
                          <div className="order-details-status">
                            <div className=" details-status-payment">
                              <span className="order-detail-title">
                                Payment Status
                              </span>
                              <select name="details-status-payment">
                                <option value="" disabled hidden></option>
                                <option value="payment-pending">PENDING</option>
                                <option value="paid">PAID</option>
                                <option value="failed">FAILED</option>
                              </select>
                            </div>

                            <div className=" details-status-order">
                              <span className="order-detail-title">
                                Order Status
                              </span>
                              <select name="details-status-order">
                                <option value="" disabled hidden></option>
                                <option value="order-pending">PENDING</option>
                                <option value="processing">PROCESSING</option>
                                <option value="completed">COMPLETED</option>
                                <option value="cancelled">CANCELLED</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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
                        <span>001</span>
                        <span>x2</span>
                        <span>
                          <div className="order-details-img">
                            <img />
                          </div>
                        </span>
                        <span>Name</span>
                        <span>₱16,450.00</span>
                      </div>
                    </div>
                    <div className="order-details"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminOrders;
