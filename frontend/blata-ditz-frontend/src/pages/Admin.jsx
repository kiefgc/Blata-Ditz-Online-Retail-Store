import "./Admin.css";

function Landing() {
  return (
    <>
      <div class="navbar">
        <div>
          <a href="#" class="logo">
            BLATADITZ
          </a>
        </div>
        <div>
          <a href="#">
            <div class="search-bar">
              <img
                width="20"
                height="20"
                src="https://img.icons8.com/ios-glyphs/30/FFD033/search--v1.png"
                alt="search--v1"
              />
              <input type="text" placeholder="Search" />
            </div>
          </a>
        </div>
        <div class="nav-links">
          <a href="#">
            <img
              width="32"
              height="32"
              src="https://img.icons8.com/fluency-systems-regular/48/FFFFFF/user-male-circle--v1.png"
              alt="user-male-circle--v1"
            />
          </a>
        </div>
      </div>
      <div class="admin-container">
        <div class="header">
          <h1>
            Welcome, <span style={{ color: "#FFCF33" }}>Admin!</span>
          </h1>
        </div>
        <div class="dashboard">
          <div class="sidebar">
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
          <div class="main-content">
            {/* USERS SECTION */}
            <div class="users-section"></div>
            {/* ORDERS SECTION */}
            <div class="admin-orders-section">
              <div class="search-bar">
                <img
                  width="20"
                  height="20"
                  src="https://img.icons8.com/ios-glyphs/30/FFD033/search--v1.png"
                  alt="search--v1"
                />
                <input type="text" placeholder="Search orders" />
              </div>
              <div class="admin-orders-tab">
                <ul>
                  <li>All</li>
                  <li>To Pay</li>
                  <li>To Ship</li>
                  <li>To Receive</li>
                  <li>Completed</li>
                  <li>Cancelled</li>
                </ul>
              </div>
              <div class="orders-filter">
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
              <div class="admin-orders-columnHeader">
                <span>Order ID</span>
                <span></span>
                <span>Product</span>
                <span>Date</span>
                <span>Status</span>
                <span>Total Amount</span>
                <span>Customer's Email</span>
              </div>
              <div class="admin-orders-list">
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
            <div class="inventory-section"></div>
            {/* CATEGORIES SECTION */}
            <div class="categories-section"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Landing;
