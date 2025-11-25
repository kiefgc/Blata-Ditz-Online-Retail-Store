import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AdminSuppliers.css";
import api from "../api/api";
import SupplierPopup from "./pop-ups/SupplierPopups";

function AdminSuppliers() {
  const [showSmallSearchbar, setShowSmallSearchbar] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [popupType, setPopupType] = useState(null);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const openPopup = (type, supplier = null) => {
    setPopupType(type);
    setSelectedSupplier(supplier);
  };

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await api.get("/suppliers");
        setSuppliers(response.data);
      } catch (err) {
        console.error("Error fetching suppliers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, []);

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
                <Link to="/admin/users">Users</Link>
              </li>
              <li>
                <Link to="/admin/orders">Orders</Link>
              </li>
              <li>
                <Link to="/admin/inventory">Inventory</Link>
              </li>
              <li>
                <Link to="/admin/categories">Categories</Link>
              </li>
              <li className="selectedli">
                <Link to="/admin/suppliers" className="selectedtab">
                  Suppliers
                </Link>
              </li>
              <li>
                <Link to="/admin/reports">Reports</Link>
              </li>
              <li>Log Out</li>
            </ul>
          </div>

          {/* Main Content */}
          <div className="main-content">
            <div className="supplier-header">
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="Search supplier..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <button type="button" onClick={() => openPopup("add")}>
                Add Supplier
              </button>
            </div>

            {/* Supplier List */}
            {loading ? (
              <p>Loading suppliers...</p>
            ) : (
              <table className="supplier-table">
                <thead>
                  <tr>
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
        />
      )}
    </>
  );
}

export default AdminSuppliers;
