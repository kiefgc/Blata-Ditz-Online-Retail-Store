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
            <div class="orders-section"></div>
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
