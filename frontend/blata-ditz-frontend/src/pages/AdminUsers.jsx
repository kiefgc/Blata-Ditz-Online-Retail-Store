import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api.js";
import axios from "axios";
import "./AdminUsers.css";

function AdminUsers() {
  const navigate = useNavigate();
  const [usersData, setUsersData] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [showSmallSearchbar, setShowSmallSearchbar] = useState(false);

  // Ensure responsive searchbar
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

  // Check admin auth
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "admin") {
      navigate("/", { replace: true });
    }
  }, []);

  // Fetch user by ID
  const fetchUserById = async () => {
    const token = localStorage.getItem("token");

    if (!searchId) {
      alert("Please enter a user ID.");
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:5000/admin/users/${searchId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUsersData([res.data]);
    } catch (err) {
      console.error("Failed to fetch user:", err.response || err);
      alert(
        err.response?.data?.message || "Failed to fetch user. Check the ID."
      );
      setUsersData([]);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/", { replace: true });
  };

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
              <input
                type="text"
                placeholder="Enter User ID"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="user-search"
              onClick={fetchUserById}
            >
              Search
            </button>
          </div>

          <div className="admin-users-table">
            <div className="users-columnHeader">
              <span>Email</span>
              <span>Full Name</span>

              <span>Username</span>
              <span>Created At</span>
              <span>Phone Number</span>
            </div>
            <div className="users-list">
              {usersData.map((s) => (
                <div className="user-entry" key={s.email}>
                  <span>{s.email}</span>
                  <span>
                    {s.first_name} {s.last_name}
                  </span>

                  <span>{s.username || "-"}</span>
                  <span>{s.created_at || "-"}</span>
                  <span>{s.phone}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminUsers;
