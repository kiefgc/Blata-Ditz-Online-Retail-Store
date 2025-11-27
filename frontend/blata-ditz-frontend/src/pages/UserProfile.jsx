import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "./UserProfile.css";

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
      firstName: "Dana",
      lastName: "Alania",
      email: "dana.alania@fmail.com",
      contact: "+63 976 348 5930",
      address: "578 Eymard Sweets, 1354, Quezon City, Metro Manila",
      isDefault: true,
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
];

function UserDashboard() {
  const { id } = useParams();
  const [showSmallSearchbar, setShowSmallSearchbar] = useState(false);

  const user = ordersMock[0].customer;
  const [firstName, setfirstName] = useState(ordersMock[0].customer.firstName);
  const [lastName, setlastName] = useState(ordersMock[0].customer.lastName);
  const [email, setEmail] = useState(ordersMock[0].customer.email);

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
                  <a href="/dashboard/orders" className="unselectedtab">
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
                  <a href="/dashboard/profile" className="selectedtab">
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
            {/*profile content*/}
            <h1>
              <span style={{ color: "#FFCF33" }}>Personal Information</span>
            </h1>
            <div className="user-profile-section">
              {/*personal information section*/}
              <div className="user-profile-info">
                <div className="form-group">
                  <label>First Name:</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setfirstName(e.target.value)}
                    className="inputField"
                  />
                </div>
                <div className="form-group">
                  <label>Last Name:</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setlastName(e.target.value)}
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
                <button type="button" onClick={() => openPopup("add")}>
                  Save Details
                </button>
              </div>

              {/*change password section*/}
              <h1>
                <span style={{ color: "#FFCF33" }}>Change Password</span>
              </h1>
              <div className="user-profile-pw">
                <div className="form-group">
                  <label>New Password</label>
                  <input type="text" placeholder="New Password" />
                </div>
                <div className="form-group">
                  <label>Re-enter Password</label>
                  <input type="text" placeholder="Re-enter Password" />
                </div>
              </div>
              <div className="button-container">
                <button type="button" onClick={() => openPopup("add")}>
                  Confirm
                </button>
              </div>

              {/*saved addresses section*/}
              <h1>
                <span style={{ color: "#FFCF33" }}>Saved Addresses</span>
              </h1>
              <div className="user-profile-addresses">
                <div className="user-address-list">
                  <div className="address-card clickable">
                    {user.isDefault && (
                      <span className="default-tag">DEFAULT</span>
                    )}

                    <div className="user-address-info">
                      <p className="name">
                        {user.firstName} {user.lastName}
                      </p>
                      <p>{user.address}</p>
                      <p>{user.contact}</p>
                    </div>
                  </div>

                  {/* add new address card */}
                  <div className="address-card add-new clickable">
                    <p>Add new address</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserDashboard;
