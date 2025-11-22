import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AdminReports.css";

function AdminReports() {
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
              <li className="selectedli">
                <img
                  width="24"
                  height="24"
                  src="https://img.icons8.com/forma-regular-filled/24/FFCF33/combo-chart.png"
                  alt="combo-chart"
                />
                <span>
                  <Link to="/admin/reports" className="selectedtab">
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
                <span className="unselectedtab">Log Out</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminReports;
