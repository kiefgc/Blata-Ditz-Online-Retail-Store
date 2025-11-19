import { useEffect, useState } from "react";
import "./Admin.css";

function Landing() {
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
              src="https://img.icons8.com/fluency-systems-filled/48/FFFFFF/user.png"
              alt="user"
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
                  src="https://img.icons8.com/ios-glyphs/30/FFFFFF/group.png"
                  alt="group"
                />
                Users
              </li>
              <li>
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
              <li>Reports</li>
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
            {/* USERS SECTION */}
            <div className="users-section"></div>
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
                <span></span>
                <span>Product</span>
                <span>Date</span>
                <span>Status</span>
                <span>Total Amount</span>
                <span>Customer's Email</span>
              </div>
              <div className="admin-orders-list">
                <span>001</span>
                <span>x1</span>
                <span>
                  Pulsar XBOARD QS Mechanical Gaming Keyboard with Quick
                  Switching Technology, Win/Mac Switch Key (Black)
                </span>
                <span>06-11-2025</span>
                <span>Completed</span>
                <span>₱16,450.00</span>
                <span>dana.alania@fmail.com</span>
              </div>
            </div>
            {/* INVENTORY SECTION */}
            <div className="inventory-section"></div>
            {/* CATEGORIES SECTION */}
            <div className="categories-section"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Landing;
