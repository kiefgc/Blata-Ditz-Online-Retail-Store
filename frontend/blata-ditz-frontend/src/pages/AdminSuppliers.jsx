import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AdminSuppliers.css";
import SupplierPopup from "./pop-ups/SupplierPopups";

/*mockup data*/
const supplierData = [
  {
    id: "0001234",
    name: "CORSAIR",
    email: "corsair@gmail.com",
    phone_number: "+63 918 283 1948",
    address: "409 Bahay ni Akko, Quezon City",
    start_date: "11-08-2025",
    status: "Active",
    image: "https://picsum.photos/200/600",
  },
  {
    id: "0002234",
    name: "AKKO",
    email: "corsair@gmail.com",
    phone_number: "+63 918 283 1948",
    address: "409 Bahay ni Akko, Quezon City",
    start_date: "11-08-2025",
    status: "Active",
    image: "https://picsum.photos/200/600",
  },
  {
    id: "0001434",
    name: "NEXUS",
    email: "corsair@gmail.com",
    phone_number: "+63 918 283 1948",
    address: "409 Bahay ni Akko, Quezon City",
    start_date: "11-08-2025",
    status: "Active",
    image: "https://picsum.photos/200/600",
  },
  {
    id: "0001534",
    name: "Redragon",
    email: "corsair@gmail.com",
    phone_number: "+63 918 283 1948",
    address: "409 Bahay ni Akko, Quezon City",
    start_date: "11-08-2025",
    status: "Active",
    image: "https://picsum.photos/200/600",
  },
];
function AdminSuppliers() {
  const [showSmallSearchbar, setShowSmallSearchbar] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [popupType, setPopupType] = useState(null);
  const openPopup = (type, supplier = null) => {
    setPopupType(type);
    setSelectedSupplier(supplier);
  };
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
              <li className="selectedli">
                <img
                  width="24"
                  height="24"
                  src="https://img.icons8.com/glyph-neue/64/FFCF33/supplier.png"
                  alt="supplier"
                />
                <span>
                  <Link to="/admin/suppliers" className="selectedtab">
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
                <input type="text" placeholder="Search supplier" />
              </div>
              <button
                type="button"
                onClick={() => {
                  setPopupType("add");
                }}
              >
                Add Supplier
              </button>
            </div>

            <div className="supplier-list">
              {supplierData.map((s) => (
                <div
                  key={s.id}
                  className="supplier"
                  onClick={() => {
                    setSelectedSupplier(s);
                    setPopupType("view");
                  }}
                >
                  <div className="supplier-img-container">
                    <img className="supplier-img" src={s.image} alt={s.name} />
                  </div>
                  <div className="supplier-background supplier-hover"></div>
                  <div className="supplier-name supplier-hover">{s.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Popups */}
      {popupType && (
        <SupplierPopup
          type={popupType}
          supplier={selectedSupplier}
          onClose={() => setPopupType(null)}
        />
      )}
    </>
  );
}

export default AdminSuppliers;
