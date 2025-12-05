import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import "./AdminInventory.css";
import api from "../api/api.js";
import {
  ProductCreateModal,
  ProductEditModal,
} from "./pop-ups/InventoryPopups.jsx";

const ProductRow = ({ product, onEditClick }) => (
  <div className="product-row-clickable" onClick={() => onEditClick(product)}>
    <div className="product-cell product-id-inventory">{product._id}</div>
    <div className="product-cell product-cell-name">{product.product_name}</div>
    <div className="product-cell product-cell-stock">
      {product.stock_quantity ?? 0}
    </div>
    <div className="product-cell product-cell-reorder">
      {product.reorder_level ?? "-"}
    </div>
    <div className="product-cell product-cell-max-stock">
      {product.max_stock_level ?? "-"}
    </div>
    <div className="product-cell product-cell-last-restock">
      {product.last_restocked
        ? new Date(product.last_restocked).toLocaleDateString()
        : "-"}
    </div>
  </div>
);

const ProductTable = ({
  products,
  onEditClick,
  onAddProductClick,
  supplierName,
}) => (
  <div className="product-table-wrapper">
    <div className="product-table-header">
      <div className="table-header-cell">Product ID</div>
      <div className="table-header-cell">Product Name</div>
      <div className="table-header-cell">Stock</div>
      <div className="table-header-cell">Reorder Level</div>
      <div className="table-header-cell">Max Stock</div>
      <div className="table-header-cell">Last Restock</div>
    </div>
    <div className="product-table-rows">
      {products.length > 0 ? (
        products.map((product) => (
          <ProductRow
            key={product._id}
            product={product}
            onEditClick={onEditClick}
          />
        ))
      ) : (
        <div className="no-products-table-message">
          No inventory items found for {supplierName}.
        </div>
      )}
      <div className="add-product-row-table">
        <div className="edit-hint-table">
          Click on product row to edit details
        </div>
        <button className="add-product-btn-table" onClick={onAddProductClick}>
          + Add New Product
        </button>
      </div>
    </div>
  </div>
);

function AdminInventory() {
  const [suppliers, setSuppliers] = useState([]);
  const [openSuppliers, setOpenSuppliers] = useState({});
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createModalSupplier, setCreateModalSupplier] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const fetchSuppliers = useCallback(async () => {
    try {
      // Fetch suppliers
      const res = await api.get("/suppliers");
      const suppliersData = res.data;

      // Fetch all inventory
      const invRes = await api.get("/inventory");
      const inventoryData = invRes.data;

      // Initialize open state

      setOpenSuppliers((prevOpenState) => {
        const newOpenState = {};
        suppliersData.forEach((supplier) => {
          newOpenState[supplier.supplier_name] = prevOpenState.hasOwnProperty(
            supplier.supplier_name
          )
            ? prevOpenState[supplier.supplier_name]
            : false;
        });
        return newOpenState;
      });

      // Fetch products per supplier and merge with inventory
      const suppliersWithProducts = await Promise.all(
        suppliersData.map(async (supplier) => {
          const prodRes = await api.get(`/products/supplier/${supplier._id}`);
          const products = prodRes.data;

          const productsWithInventory = products.map((prod) => {
            const inv = inventoryData.find((i) => i.product_id === prod._id);
            return {
              ...prod,
              stock_quantity: inv?.stock_quantity ?? 0,
              reorder_level: inv?.reorder_level ?? "-",
              max_stock_level: inv?.max_stock_level ?? "-",
              last_restocked: inv?.last_restocked ?? null,
            };
          });

          return { ...supplier, products: productsWithInventory };
        })
      );

      setSuppliers(suppliersWithProducts);
    } catch (error) {
      console.error("Error fetching suppliers/products/inventory:", error);
    }
  }, [setSuppliers, setOpenSuppliers]);

  useEffect(() => {
    fetchSuppliers();
  }, [fetchSuppliers, refreshTrigger]);

  const triggerRefresh = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const toggleSupplier = (supplierName) => {
    setOpenSuppliers((prev) => ({
      ...prev,
      [supplierName]: !prev[supplierName],
    }));
  };

  const handleOpenCreateModal = (supplier) => {
    setCreateModalSupplier({
      name: supplier.supplier_name,
      id: supplier._id,
    });
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
    setCreateModalSupplier("");
  };

  const handleOpenEditModal = (productData) => {
    setEditingProduct(productData);
  };

  const handleCloseEditModal = () => {
    setEditingProduct(null);
  };

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
              <li className="selectedli">
                <img
                  width="24"
                  height="24"
                  src="https://img.icons8.com/material-rounded/50/ffcf33/move-by-trolley.png"
                  alt="move-by-trolley"
                />
                <span>
                  <Link to="/admin/inventory" className="selectedtab">
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
          <div className="main-content-inventory">
            <div className="search-bar sb-inventory">
              <img
                width="20"
                height="20"
                src="https://img.icons8.com/ios-glyphs/30/FFD033/search--v1.png"
                alt="search--v1"
              />
              <input
                type="text"
                placeholder="Search by Item ID, name, or supplier"
              />
            </div>
            <div className="inventory-list">
              {suppliers.map((supplier) => (
                <div key={supplier._id} className="brand-section">
                  <div
                    className={`brand-header ${
                      openSuppliers[supplier.supplier_name] ? "active" : ""
                    }`}
                    onClick={() => toggleSupplier(supplier.supplier_name)}
                  >
                    <span className="brand-name">{supplier.supplier_name}</span>
                    <img
                      width="20"
                      height="20"
                      src="https://img.icons8.com/ios-filled/50/FFFFFF/sort-down.png"
                      alt="sort-down"
                      className="brand-dropdown-icon"
                    />
                  </div>
                  {openSuppliers[supplier.supplier_name] &&
                    supplier.products.length > 0 && (
                      <ProductTable
                        products={supplier.products}
                        onEditClick={handleOpenEditModal}
                        onAddProductClick={() =>
                          handleOpenCreateModal(supplier)
                        }
                      />
                    )}
                  {openSuppliers[supplier.supplier_name] &&
                    supplier.products.length === 0 && (
                      <>
                        <p className="no-products-message">
                          No inventory items found for {supplier.supplier_name}.
                        </p>
                        <div className="add-product-row">
                          <button
                            className="add-product-btn"
                            onClick={() => handleOpenCreateModal(supplier)}
                          >
                            + Add New Product to {supplier.supplier_name}
                          </button>
                        </div>
                      </>
                    )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {isCreateModalOpen && (
        <ProductCreateModal
          brandName={createModalSupplier}
          onClose={handleCloseCreateModal}
          onSuccess={triggerRefresh}
        />
      )}

      {editingProduct && (
        <ProductEditModal
          initialProduct={editingProduct}
          onClose={handleCloseEditModal}
          onSuccess={triggerRefresh}
        />
      )}
    </>
  );
}

export default AdminInventory;
