import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AdminUsers.css";

/* Users mockup data */
const usersData = [
  {
    id: "0001",
    first_name: "Kieffy",
    last_name: "Chuchu",
    email: "kichu@mmaikl.com",
    username: "ilovegachagirls",
    created_at: "01-15-25",
    phone_number: "+63 976 364 2832",
    address: "Quezon Quezon Bahay ni Kief Quezon City",
  },
  {
    id: "0001",
    first_name: "Kieffy",
    last_name: "Chuchu",
    email: "kichu@mmaikl.com",
    username: "ilovegachagirls",
    created_at: "01-15-25",
    phone_number: "+63 976 364 2832",
    address: "Quezon Quezon Bahay ni Kief Quezon City",
  },
  {
    id: "0001",
    first_name: "Kieffy",
    last_name: "Chuchu",
    email: "kichu@mmaikl.com",
    username: "ilovegachagirls",
    created_at: "01-15-25",
    phone_number: "+63 976 364 2832",
    address: "Quezon Quezon Bahay ni Kief Quezon City",
  },
  {
    id: "0001",
    first_name: "Kieffy",
    last_name: "Chuchu",
    email: "kichu@mmaikl.com",
    username: "ilovegachagirls",
    created_at: "01-15-25",
    phone_number: "+63 976 364 2832",
    address: "Quezon Quezon Bahay ni Kief Quezon City",
  },
  {
    id: "0001",
    first_name: "Kieffy",
    last_name: "Chuchu",
    email: "kichu@mmaikl.com",
    username: "ilovegachagirls",
    created_at: "01-15-25",
    phone_number: "+63 976 364 2832",
    address: "Quezon Quezon Bahay ni Kief Quezon City",
  },
  {
    id: "0001",
    first_name: "Kieffy",
    last_name: "Chuchu",
    email: "kichu@mmaikl.com",
    username: "ilovegachagirls",
    created_at: "01-15-25",
    phone_number: "+63 976 364 2832",
    address: "Quezon Quezon Bahay ni Kief Quezon City",
  },
];

function AdminUsers() {
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
      <div className="admin-container">
        <div className="header">
          <h1>
            Welcome, <span style={{ color: "#FFCF33" }}>Admin!</span>
          </h1>
        </div>
        <div className="dashboard">
          <div className="sidebar">
            <ul>
              <li className="selectedli">
                <img
                  width="24"
                  height="24"
                  src="https://img.icons8.com/ios-filled/50/ffcf33/conference-call.png"
                  alt="conference-call"
                />
                <span>
                  <Link to="/admin/users" className="selectedtab">
                    Users
                  </Link>
                </span>
              </li>
              <li>
                <img
                  width="22"
                  height="22"
                  src="https://img.icons8.com/ios-filled/50/FFFFFF/untested.png"
                  alt="untested"
                />
                <span>
                  <Link to="/admin/orders" className="unselectedtab">
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
            <div className="supplier-header">
              <div className="search-bar">
                <img
                  width="20"
                  height="20"
                  src="https://img.icons8.com/ios-glyphs/30/FFD033/search--v1.png"
                  alt="search--v1"
                />
                <input type="text" placeholder="Search by Customer ID" />
              </div>
              <button type="button">Enter</button>
            </div>
            <div className="admin-users-table">
              <div className="users-columnHeader">
                <span>ID</span>
                <span>Full Name</span>
                <span>Email</span>
                <span>Username</span>
                <span>Created At</span>
                <span>Phone Number</span>
              </div>
              <div className="users-list">
                {usersData.map((s) => (
                  <div className="user-entry">
                    <span>{s.id}</span>
                    <span>
                      {s.first_name} {s.last_name}
                    </span>
                    <span>{s.email}</span>
                    <span>{s.username}</span>
                    <span>{s.created_at}</span>
                    <span>{s.phone_number}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminUsers;
