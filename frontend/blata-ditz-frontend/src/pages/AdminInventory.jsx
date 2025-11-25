import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AdminInventory.css";
import {
  ProductCreateModal,
  ProductEditModal,
} from "./pop-ups/InventoryPopups.jsx";

// test data
const productsData = [
  {
    brand: "Akko",
    logo: "D",
    products: [
      {
        id: "0013948",
        image: "https://i.imgur.com/47cdfb.png",
        name: "Akko MU01 Mountain Seclusion Walnut Wood Case Multi-Mode RGB Hot-Swappable Mechanical Keyboard",
        inStock: 9,
        retailPrice: "₱6,295",
        active: true,
        supplier: "Akko",
        category: "Keyboard",
        specifications: ["Walnut Wood Case", "Multi-Mode", "RGB Hot-Swappable"], // Tags
        requirements: ["USB-C Port", "Windows 10+"],
        connectivity: ["Wired", "Bluetooth 5.0"],
        images: [
          "https://i.imgur.com/example1.png",
          "https://i.imgur.com/example2.png",
          "https://i.imgur.com/example3.png",
          "https://i.imgur.com/example4.png",
        ],
      },
      {
        id: "002",
        image: "https://i.imgur.com/47cdfb.png",
        name: "Akko MU01 Mountain Seclusion Walnut Wood Case Multi-Mode RGB Hot-Swappable Mechanical Keyboard (Akko Rosewood, Akko V3 Piano Pro)",
        inStock: 2,
        retailPrice: "₱6,295",
        active: true,
        supplier: "Akko",
        category: "Keyboard",
        specifications: ["Akko Rosewood", "V3 Piano Pro"],
        requirements: ["USB-C Port"],
        connectivity: ["Wired"],
        images: [],
      },
    ],
  },
  {
    brand: "Corsair",
    logo: "C", // placeholder for Corsair logo
    products: [
      {
        id: "101",
        image: "https://via.placeholder.com/80x50/333333/FFFFFF?text=Corsair",
        name: "Corsair K100 RGB Mechanical Gaming Keyboard",
        inStock: 50,
        retailPrice: "₱9,500",
        active: true,
      },
    ],
  },
  {
    brand: "Redragon",
    logo: "R", // placeholder for Redragon logo
    products: [],
  },
];

const ProductRow = ({ product, onEditClick }) => (
  <div className="product-row-clickable" onClick={() => onEditClick(product)}>
    <div className="product-cell">{product.id}</div>
    <div className="product-cell product-cell-image">
      <img src={product.image} alt={product.name} />
    </div>
    <div className="product-cell product-cell-name">{product.name}</div>
    <div className="product-cell product-cell-stock">{product.inStock}</div>
    <div className="product-cell product-cell-price">{product.retailPrice}</div>
    <div className="product-cell product-cell-active">
      <input type="checkbox" checked={product.active} readOnly />
    </div>
  </div>
);

const ProductTable = ({ products, onEditClick }) => (
  <div className="product-table-wrapper">
    <div className="product-table-header">
      <div className="table-header-cell">Product ID</div>
      <div className="table-header-cell">Image</div>
      <div className="table-header-cell">Product Name</div>
      <div className="table-header-cell">In Stock</div>
      <div className="table-header-cell">Retail Price</div>
      <div className="table-header-cell product-cell-active">Active</div>
    </div>

    <div className="product-table-rows">
      {products.map((product) => (
        <ProductRow
          key={product.id}
          product={product}
          onEditClick={onEditClick}
        />
      ))}
    </div>
  </div>
);

function AdminInventory() {
  const [showSmallSearchbar, setShowSmallSearchbar] = useState(false);
  const [openBrands, setOpenBrands] = useState({
    Akko: false,
    Corsair: false,
    Redragon: false,
  });

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createModalBrand, setCreateModalBrand] = useState("");

  const [editingProduct, setEditingProduct] = useState(null);

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

  const toggleBrand = (brandName) => {
    setOpenBrands((prev) => ({
      ...prev,
      [brandName]: !prev[brandName],
    }));
  };

  // Handler to open the CREATE modal
  const handleOpenCreateModal = (brandName) => {
    setCreateModalBrand(brandName);
    setIsCreateModalOpen(true);
  };

  // Handler to close the CREATE modal
  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
    setCreateModalBrand("");
  };

  // Handler to open the EDIT modal
  const handleOpenEditModal = (productData) => {
    setEditingProduct(productData);
  };

  // Handler to close the EDIT modal
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
              {productsData.map((brandData) => (
                <div key={brandData.brand} className="brand-section">
                  <div
                    className={`brand-header ${
                      openBrands[brandData.brand] ? "active" : ""
                    }`}
                    onClick={() => toggleBrand(brandData.brand)}
                  >
                    <span className="brand-name">{brandData.brand}</span>
                    <img
                      width="20"
                      height="20"
                      src="https://img.icons8.com/ios-filled/50/FFFFFF/sort-down.png"
                      alt="sort-down"
                      className="brand-dropdown-icon"
                    />
                  </div>
                  {openBrands[brandData.brand] &&
                    brandData.products.length > 0 && (
                      <ProductTable
                        products={brandData.products}
                        onEditClick={handleOpenEditModal}
                      />
                    )}
                  {openBrands[brandData.brand] &&
                    brandData.products.length === 0 && (
                      <p className="no-products-message">
                        No inventory items found for {brandData.brand}.
                      </p>
                    )}
                  {openBrands[brandData.brand] && (
                    <div className="add-product-row">
                      <div className="edit-hint">
                        Click on product row to edit details
                      </div>
                      <button
                        className="add-product-btn"
                        onClick={() => handleOpenCreateModal(brandData.brand)}
                      >
                        + Add New Product to {brandData.brand}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {isCreateModalOpen && (
        <ProductCreateModal
          brandName={createModalBrand}
          onClose={handleCloseCreateModal}
        />
      )}

      {editingProduct && (
        <ProductEditModal
          initialProduct={editingProduct}
          onClose={handleCloseEditModal}
        />
      )}
    </>
  );
}

export default AdminInventory;
