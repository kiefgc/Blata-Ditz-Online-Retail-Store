import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AdminInventory.css";

// test data
const productsData = [
  {
    brand: "Akko",
    logo: "D", // Placeholder for Akko logo
    products: [
      {
        id: "001",
        image: "https://i.imgur.com/47cdfb.png", // Using a placeholder image
        name: "Akko MU01 Mountain Seclusion Walnut Wood Case Multi-Mode RGB Hot-Swappable Mechanical Keyboard (Akko Rosewood, Akko V3 Piano Pro)",
        inStock: 9,
        retailPrice: "₱6,295",
        active: true,
      },
      {
        id: "002",
        image: "https://i.imgur.com/47cdfb.png",
        name: "Akko MU01 Mountain Seclusion Walnut Wood Case Multi-Mode RGB Hot-Swappable Mechanical Keyboard (Akko Rosewood, Akko V3 Piano Pro)",
        inStock: 2,
        retailPrice: "₱6,295",
        active: true,
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

const ProductCreateModal = ({ brandName, onClose }) => {
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        {/* The design you provided */}
        <div className="product-create-form-container">
          <div className="product-create-header">Add new product</div>
          <div className="product-create-body">
            <div className="form-fields">
              <div className="form-group">
                <label htmlFor="productName">Product Name</label>
                <input
                  type="text"
                  id="productName"
                  placeholder="Enter product name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="productSpecs">Product Specs</label>
                <div className="input-with-button">
                  <button className="add-detail-btn">ADD DETAIL</button>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="requirements">Requirements</label>
                <div className="input-with-button">
                  <input
                    type="text"
                    id="requirements"
                    placeholder="Add requirements"
                  />
                  <button className="add-detail-btn">ADD DETAIL</button>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="connectivity">Connectivity</label>
                <div className="input-with-button">
                  <input
                    type="text"
                    id="connectivity"
                    placeholder="Add connectivity"
                  />
                  <button className="add-detail-btn">ADD DETAIL</button>
                </div>
              </div>

              <div className="select-group">
                <div className="form-group">
                  <label htmlFor="supplier">Supplier</label>
                  <select id="supplier">
                    <option value="">{brandName}</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <select id="category">
                    <option value="">Select Category</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="image-upload-area">
              <div className="image-placeholder">
                <div className="image-icon-placeholder"></div>
                <p>Add product images by selecting or dropping image files</p>
              </div>
              <div className="action-buttons">
                <button className="cancel-btn" onClick={onClose}>
                  Cancel
                </button>
                <button className="add-product-final-btn">Add Product</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductRow = ({ product }) => (
  <>
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
  </>
);

const ProductTable = ({ products }) => (
  <div className="product-table-wrapper">
    <div className="product-table-header">
      <div className="table-header-cell">Product ID</div>
      <div className="table-header-cell">Image</div>
      <div className="table-header-cell">Product Name</div>
      <div className="table-header-cell">In Stock</div>
      <div className="table-header-cell">Retail Price</div>
      <div className="table-header-cell product-cell-active">Active</div>
    </div>

    {/* Product Rows */}
    <div className="product-table-rows">
      {products.map((product) => (
        <ProductRow key={product.id} product={product} />
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalBrand, setModalBrand] = useState("");

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

  const handleOpenModal = (brandName) => {
    setModalBrand(brandName);
    setIsModalOpen(true);
  };

  // New handler to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalBrand("");
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
                    <div className="brand-logo-container">
                      <span className="brand-logo-text">{brandData.logo}</span>
                    </div>
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
                      <ProductTable products={brandData.products} />
                    )}
                  {openBrands[brandData.brand] &&
                    brandData.products.length === 0 && (
                      <p className="no-products-message">
                        No inventory items found for {brandData.brand}.
                      </p>
                    )}
                  {openBrands[brandData.brand] && (
                    <div className="add-product-row">
                      <button
                        className="add-product-btn"
                        onClick={() => handleOpenModal(brandData.brand)}
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
      {isModalOpen && (
        <ProductCreateModal brandName={modalBrand} onClose={handleCloseModal} />
      )}
    </>
  );
}

export default AdminInventory;
