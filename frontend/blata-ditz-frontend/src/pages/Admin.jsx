import { useEffect, useState } from "react";
import "./Admin.css";

function Landing() {
  const [selectedTab, setSelectedTab] = useState("users");

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
      <div className="navbar">
        <div>
          <a href="#" className="logo">
          <a href="#" className="logo">
            BLATADITZ
          </a>
        </div>
        <div>
          <div className="search-bar search-close">
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
        <div className="nav-links">
          <a href="#">
            <img
              className="search-icon"
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
              src="https://img.icons8.com/fluency-systems-filled/48/FFFFFF/user.png"
              alt="user"
            />
          </a>
        </div>

        <div
          className={`small-screen-searchbar ${
          className={`small-screen-searchbar ${
            showSmallSearchbar ? "open" : ""
          }`}
        >
          <div className="small-searchbar">
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
      <div className="admin-container">
        <div className="header">
          <h1>
            Welcome, <span style={{ color: "#FFCF33" }}>Admin!</span>
          </h1>
        </div>
        <div className="dashboard">
          <div className="sidebar">
        <div className="dashboard">
          <div className="sidebar">
            <ul>
              <li
                onClick={() => setSelectedTab("users")}
                style={{
                  color: selectedTab === "users" ? "#FFCF33" : "white",
                  backgroundImage:
                    selectedTab === "users"
                      ? "linear-gradient(to right, black, #131416)"
                      : "none",
                }}
              >
                <img
                  width="24"
                  height="24"
                  src="https://img.icons8.com/ios-glyphs/30/FFFFFF/group.png"
                  alt="group"
                />
                Users
              </li>
              <li
                onClick={() => setSelectedTab("orders")}
                style={{
                  color: selectedTab === "orders" ? "#FFCF33" : "white",
                  backgroundImage:
                    selectedTab === "orders"
                      ? "linear-gradient(to right, black, #131416)"
                      : "none",
                }}
              >
                <img
                  width="22"
                  height="22"
                  src="https://img.icons8.com/ios-filled/50/FFFFFF/untested.png"
                  alt="untested"
                />
                Orders
              </li>
              <li>
                <img
                  width="24"
                  height="24"
                  src="https://img.icons8.com/material-rounded/24/FFFFFF/move-by-trolley.png"
                  alt="move-by-trolley"
                />
                Inventory
              </li>
              <li>
                <img
                  width="24"
                  height="24"
                  src="https://img.icons8.com/material-outlined/24/FFFFFF/categorize.png"
                  alt="categorize"
                />
                Categories
              </li>
              <li>
                <img
                  width="24"
                  height="24"
                  src="https://img.icons8.com/glyph-neue/64/FFFFFF/supplier.png"
                  alt="supplier"
                />
                Suppliers
              </li>
              <li>
                <img
                  width="24"
                  height="24"
                  src="https://img.icons8.com/forma-regular-filled/24/FFFFFF/combo-chart.png"
                  alt="combo-chart"
                />
                <span>Reports</span>
              </li>
              <li>
                <img
                  width="21"
                  height="21"
                  src="https://img.icons8.com/fluency-systems-filled/48/FFFFFF/open-pane.png"
                  alt="open-pane"
                />
                Log Out
              </li>
            </ul>
          </div>
          <div className="main-content">
          <div className="main-content">
            {/* USERS SECTION */}
            {selectedTab === "users" && <div className="users-section">hi</div>}
            {/* ORDERS SECTION */}
            {selectedTab === "orders" && (
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
                <div className="orders-filter">
                  <label for="orders-filterOptions">Filter by:</label>
                  <select name="orders-filterOptions" id="orders-filterOptions">
                    <option value="" disabled hidden>
                      {" "}
                    </option>
                    <option value="title">Title</option>
                    <option value="date">Last Edited</option>
                    <option value="published_date">Published Date</option>
                  </select>
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
                  <span>Completed</span>
                  <span>Completed</span>
                </div>
                <div className="admin-orders-list">
                  <span>001</span>

                  <span>₱16,450.00</span>
                  <span>06-11-2025</span>
                  <span>Completed</span>
                  <span>Completed</span>
                </div>
                <div className="admin-orders-list">
                  <span>001</span>

                  <span>₱16,450.00</span>
                  <span>06-11-2025</span>
                  <span>Completed</span>
                  <span>Completed</span>
                </div>
              </div>
            )}
            {/* Orders Popup */}
            {showOrdersPopup && (
              <div className="admin-orders-popup-overlay">
                <div className="admin-orders-popup">
                  <div
                    className="admin-orders-popup-close"
                    nClick={() => setShowOrdersPopup(false)}
                  >
                    CLOSE
                  </div>
                  <div className="admin-orders-popup-content">
                    <div className="orders-id">
                      <span className="order-id-title">ID No. </span>
                      <span className="order-id-no">001</span>
                    </div>
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
                    </div>
                    <div className="order-details"></div>
                    <div className="order-details"></div>
                  </div>
                </div>
              </div>
            )}

            {/* INVENTORY SECTION */}
            <div className="inventory-section"></div>
            <div className="inventory-section"></div>
            {/* CATEGORIES SECTION */}
            <div className="categories-section"></div>
            <div className="categories-section"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Landing;
