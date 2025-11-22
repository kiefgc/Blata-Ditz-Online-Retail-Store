import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AdminReports.css";

const ProductSalesData = [
  {
    id: "001",
    image: "https://i.imgur.com/47cdfb.png",
    name: "Akko MU01 Mountain Seclusion Walnut Wood Case Multi-Mode RGB Hot-Swappable Mechanical Keyboard",
    retailPrice: "₱6,295",
    soldqty: 10,
    totalSales: "₱62,950",
    supplier: "Akko",
    category: "Keyboard",
  },
  {
    id: "002",
    image: "https://i.imgur.com/47cdfb.png",
    name: "Akko V3 Piano Pro Switch Pack",
    retailPrice: "₱999",
    soldqty: 55,
    totalSales: "₱54,945",
    supplier: "Akko",
    category: "Switch",
  },
  {
    id: "101",
    image: "https://via.placeholder.com/80x50/333333/FFFFFF?text=Corsair",
    name: "Corsair K100 RGB Mechanical Gaming Keyboard",
    retailPrice: "₱9,500",
    soldqty: 12,
    totalSales: "₱114,000",
    supplier: "Corsair",
    category: "Keyboard",
  },
  {
    id: "205",
    image: "https://via.placeholder.com/80x50/AA0000/FFFFFF?text=Redragon",
    name: "Redragon M908 Impact MMO Gaming Mouse",
    retailPrice: "₱1,999",
    soldqty: 80,
    totalSales: "₱159,920",
    supplier: "Redragon",
    category: "Mouse",
  },
];

const ProductSalesRow = ({ product, onClickView }) => (
  <div
    className="productsales-row clickable-sales-row"
    onClick={() => onClickView(product)}
  >
    <div className="prodsales-cell">{product.id}</div>
    <div className="productsales-cell product-cell-image">
      <img src={product.image} alt={product.name} />
    </div>
    <div className="prodsales-cell-name">{product.name}</div>
    <div className="prodsales-cell">{product.retailPrice}</div>
    <div className="prodsales-cell">{product.soldqty}</div>
    <div className="prodsales-cell">{product.totalSales}</div>
  </div>
);

const ProductSalesTable = ({ products, onClickView }) => (
  <div className="prodsales-table-wrapper">
    <div className="prodsales-table-header">
      <div className="prodsales-table-header-cell">Product ID</div>
      <div className="prodsales-table-header-cell">Image</div>
      <div className="prodsales-table-header-cell">Product Name</div>
      <div className="prodsales-table-header-cell">Retail Price</div>
      <div className="prodsales-table-header-cell">Qty. Sold</div>
      <div className="prodsales-table-header-cell">Total Sales</div>
    </div>
    <div className="prodsales-table-rows">
      {products.map((product) => (
        <ProductSalesRow
          key={product.id}
          product={product}
          onClickView={onClickView}
        ></ProductSalesRow>
      ))}
    </div>
  </div>
);

const ProductSalesView = ({ productData, onClose }) => {
  if (!productData) return null;

  return (
    <div className="product-view-modal">
      <div className="modal-content">
        <h3>Product Details</h3>
        <p>Name: {productData.name}</p>
        <p>Supplier: {productData.supplier}</p>
        <p>Category: {productData.category}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

function AdminReports() {
  const [showSmallSearchbar, setShowSmallSearchbar] = useState(false);

  const [isViewProdOpen, setIsViewProdOpen] = useState(false);

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

  const handleOpenViewSales = (productData) => {
    setIsViewProdOpen(productData);
  };

  const handleCloseViewSales = () => {
    setIsViewProdOpen(null);
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
          <div className="main-content-reports">
            <div className="product-sales-section">
              <div className="product-sales-section-header">
                <h2>Product Sales</h2>
              </div>
              <div className="product-sales-table-container">
                {ProductSalesData.length > 0 ? (
                  <>
                    <ProductSalesTable
                      products={ProductSalesData}
                      onClickView={handleOpenViewSales}
                    />
                    <div className="view-hint-row-reports">
                      <div className="view-hint-reports">
                        Click on a row to view complete product details
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="no-products-sales-message">
                    No product sales data found.
                  </p>
                )}
              </div>
            </div>
            <div className="stocks-alert-section">
              <div className="stocks-alert-section-header">
                <h3>Stocks Alert</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProductSalesView
        productData={isViewProdOpen}
        onClose={handleCloseViewSales}
      />
    </>
  );
}

export default AdminReports;
