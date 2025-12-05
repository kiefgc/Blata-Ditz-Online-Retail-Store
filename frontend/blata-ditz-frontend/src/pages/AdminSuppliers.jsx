import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import "./AdminSuppliers.css";
import api from "../api/api.js";
import SupplierPopup from "./pop-ups/SupplierPopups";

function AdminSuppliers() {
  const [showSmallSearchbar, setShowSmallSearchbar] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [popupType, setPopupType] = useState(null);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const triggerRefresh = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const openPopup = (type, supplier = null) => {
    setPopupType(type);
    setSelectedSupplier(supplier);
  };

  const fetchSuppliers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get("/suppliers");
      setSuppliers(response.data);
    } catch (err) {
      console.error("Error fetching suppliers:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSuppliers();
  }, [fetchSuppliers, refreshTrigger]);

  useEffect(() => {
    const resizeHandler = () => {
      if (window.innerWidth >= 830) setShowSmallSearchbar(false);
    };
    window.addEventListener("resize", resizeHandler);
    resizeHandler();
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  const filteredSuppliers = suppliers.filter((s) =>
    s.supplier_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="admin-container">
        <div className="header">
          <h1>
            Welcome, <span style={{ color: "#FFCF33" }}>Admin!</span>
          </h1>
        </div>

        <div className="dashboard">
          {/* Sidebar */}
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
            </ul>
          </div>

          {/* Main Content */}
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
                  placeholder="Search supplier"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <button
                type="button"
                className="addsupplier"
                onClick={() => openPopup("add")}
              >
                Add Supplier
              </button>
            </div>

            {/* Supplier List */}
            {loading ? (
              <p>Loading suppliers...</p>
            ) : (
              <div className="supplier-table-container">
                <table className="supplier-table">
                  <thead>
                    <tr className="supplier-table-header">
                      <th>Supplier Name</th>
                      <th>Contact Person</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Active</th>
                      <th>Created At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSuppliers.map((s) => (
                      <tr
                        key={s._id}
                        onClick={() => openPopup("view", s)}
                        className="supplier-row"
                      >
                        <td>{s.supplier_name}</td>
                        <td>{s.contact_person}</td>
                        <td>{s.email}</td>
                        <td>{s.phone}</td>
                        <td>{s.is_active ? "Active" : "Inactive"}</td>
                        <td>{new Date(s.created_at).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Popup */}
      {popupType && (
        <SupplierPopup
          type={popupType}
          supplier={selectedSupplier}
          onClose={() => setPopupType(null)}
          onUpdateSuccess={triggerRefresh}
        />
      )}
    </>
  );
}

export default AdminSuppliers;
