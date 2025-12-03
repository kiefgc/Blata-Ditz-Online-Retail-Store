import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import api from "../api/api.js";
import "./UserProfile.css";
import ConfirmPopup from "./pop-ups/ConfirmPopup.jsx";

function UserDashboard() {
  const { id } = useParams();
  const [username, setUsername] = useState("");
  const [showSmallSearchbar, setShowSmallSearchbar] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const [user, setUser] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [contactNum, setContactNum] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");

  const handleSaveChanges = async () => {
    try {
      const updatedData = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: contactNum,
        address: address,
      };

      const response = await api.patch("authentication/users/me", updatedData);

      // Optionally update state with returned data
      setUser(response.data);

      // Show confirmation popup
      setShowPopup(true);
    } catch (error) {
      console.error("Error updating user info:", error);
      alert("Failed to save changes. Please try again.");
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== reEnterPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      // Assuming the backend accepts a PATCH to /users/me with { password: "..." }
      await api.patch("authentication/users/me", { password: newPassword });

      // Clear fields after successful change
      setNewPassword("");
      setReEnterPassword("");

      // Show confirmation popup
      setShowPopup(true);
    } catch (error) {
      console.error("Error changing password:", error);
      alert("Failed to change password. Please try again.");
    }
  };

  const handleSaveAddress = async () => {
    try {
      const updatedData = {
        address: address,
        phone: contactNum,
      };

      const response = await api.patch("authentication/users/me", updatedData);

      // Optionally update local user state
      setUser((prev) => ({
        ...prev,
        address: response.data.address,
        phone: response.data.phone,
      }));

      // Show confirmation popup
      setShowPopup(true);
    } catch (error) {
      console.error("Error updating address:", error);
      alert("Failed to save changes. Please try again.");
    }
  };

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
    const fetchUser = async () => {
      try {
        const response = await api.get("/authentication/users/me");
        setUser(response.data);
        // Optionally also set input fields
        setFirstName(response.data.first_name);
        setLastName(response.data.last_name);
        setEmail(response.data.email);
        setAddress(response.data.address);
        setContactNum(response.data.phone);
      } catch (err) {
        console.error("Error fetching user info:", err);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      <div className="user-dashboard-container">
        <div className="header">
          <h1>
            <span style={{ color: "#FFCF33" }}>My Account</span>
          </h1>
          <h2>
            Welcome, <span style={{ color: "#FFCF33" }}>{username}!</span>
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
                  <a href="/dashboard/orders" className="unselectedtab">
                    Orders
                  </a>
                </span>
              </li>
              <li className="selectedli">
                <img
                  width="24"
                  height="24"
                  src="https://img.icons8.com/ios-filled/50/ffcf33/user--v1.png"
                  alt="user--v1"
                />
                <span>
                  <a href="/dashboard/profile" className="selectedtab">
                    Profile
                  </a>
                </span>
              </li>
            </ul>
          </div>

          {/*MAIN PROFILE CONTENT*/}
          <div className="main-content">
            <h1>
              <span style={{ color: "#FFCF33" }}>Personal Information</span>
            </h1>
            <div className="user-profile-section">
              {/*personal information section*/}
              <div className="user-profile-base user-profile-info">
                <div className="form-group">
                  <label>First Name:</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="inputField"
                  />
                </div>
                <div className="form-group">
                  <label>Last Name:</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="inputField"
                  />
                </div>
                <div className="form-group">
                  <label>Email Address:</label>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="inputField"
                  />
                </div>
              </div>
              <div className="button-container">
                <button type="button" onClick={handleSaveChanges}>
                  Save Changes
                </button>

                {showPopup && (
                  <ConfirmPopup onClose={() => setShowPopup(false)} />
                )}
              </div>

              {/*change password section*/}
              <h1>
                <span style={{ color: "#FFCF33" }}>Change Password</span>
              </h1>
              <div className="user-profile-base user-profile-pw">
                <div className="form-group">
                  <label>New Password</label>
                  <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="inputField"
                  />
                </div>
                <div className="form-group">
                  <label>Re-enter Password</label>
                  <input
                    type="password"
                    placeholder="Re-enter Password"
                    value={reEnterPassword}
                    onChange={(e) => setReEnterPassword(e.target.value)}
                    className="inputField"
                  />
                </div>
              </div>
              <div className="button-container">
                {" "}
                <button type="button" onClick={handleChangePassword}>
                  Save Changes
                </button>
                {showPopup && (
                  <ConfirmPopup onClose={() => setShowPopup(false)} />
                )}
              </div>

              {/*saved address section*/}
              <h1>
                <span style={{ color: "#FFCF33" }}>Saved Address</span>
              </h1>
              <div className="user-profile-base user-profile-address">
                <div className="form-group">
                  <label>Address:</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="inputField"
                  />
                </div>
                <div className="form-group">
                  <label>Contact Number:</label>
                  <input
                    type="text"
                    value={contactNum}
                    onChange={(e) => setContactNum(e.target.value)}
                    className="inputField"
                  />
                </div>
              </div>
              <div className="button-container">
                {" "}
                <button type="button" onClick={handleSaveAddress}>
                  Save Changes
                </button>
                {showPopup && (
                  <ConfirmPopup onClose={() => setShowPopup(false)} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserDashboard;
