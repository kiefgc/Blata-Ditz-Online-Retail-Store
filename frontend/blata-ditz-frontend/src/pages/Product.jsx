import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api.js";
import "./Product.css";
import "./Landing.css";
import React from "react";

function Product() {
  const { id } = useParams();
  const [showSmallSearchbar, setShowSmallSearchbar] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const navigate = useNavigate();
  const maxStock = 99;
  const MAX_ORDER = 10;

  // Handle screen resize for searchbar
  useEffect(() => {
    const handleResize = () => setShowSmallSearchbar(window.innerWidth < 830);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
      } catch (err) {
        console.error("Failed to load product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await api.get("/categories");
        setCategories(data);
      } catch (err) {
        console.error("Failed to load categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch recommended products
  useEffect(() => {
    const fetchRecommended = async () => {
      if (!product?.category_ids) return;
      try {
        const { data: allProducts } = await api.get("/products");
        const related = allProducts.filter(
          (p) =>
            p._id !== product._id && p.category_ids === product.category_ids
        );
        setRecommended(related.slice(0, 4));
      } catch (err) {
        console.error("Failed to load recommended products:", err);
      }
    };
    fetchRecommended();
  }, [product]);

  const increaseQuantity = () => {
    setQuantity((prev) => Math.min(MAX_ORDER, prev + 1));
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  // Add to cart
  const handleAddToCart = async () => {
    const customer_id = localStorage.getItem("customer_id");
    const token = localStorage.getItem("token");

    if (!customer_id || !token) {
      alert("Please login first to add items to cart.");
      navigate("/login");
      return;
    }

    try {
      const { data } = await api.post(
        `/cart/${customer_id}/add`,
        { product_id: product._id, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Add to cart response:", data);
      alert("Item added to cart!");
    } catch (err) {
      console.error("Add to cart error:", err);
      alert("Failed to add to cart.");
    }
  };

  if (!product) return <p>Loading product...</p>;

  const briefDescription = product.description
    ? product.description.slice(0, 30) +
      (product.description.length > 30 ? "..." : "")
    : "";

  return (
    <div className="page-content">
      {/* Categories */}
      <div className="categories">
        <ul>
          {categories.map((cat) => (
            <li key={cat._id || "all"}>
              <button
                onClick={() =>
                  navigate("/", { state: { selectedCategory: cat._id } })
                }
              >
                {cat.category_name.toUpperCase()}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Main product */}
      <div className="main-product-container">
        <div className="main-product-images">
          <div className="main-product-images-main">
            <img
              src={`http://localhost:5000${product.image}`}
              alt={product.product_name}
            />
          </div>
        </div>

        <div className="main-product-descriptions">
          <p className="main-product-name">{product.product_name}</p>
          <div className="divider"></div>

          <p className="main-product-sections">Description</p>
          <br />
          <div className="main-product-textdesc">
            <p>{briefDescription}</p>
          </div>

          <div className="main-product-descriptions-inline">
            <p className="main-product-price">₱{product.unit_price}</p>
          </div>
          <div className="main-product-descriptions-inline">
            <p className="main-product-sections">Stock:</p>
            <p className="main-product-text">
              {product.in_stock ? "In stock" : "Out of stock"}
            </p>
          </div>

          {/* Quantity Selector */}
          <div className="main-product-descriptions-inline">
            <p className="main-product-sections">Quantity:</p>
            <div className="quantity-selector">
              <button
                className="quantity-button"
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
              >
                -
              </button>
              <input
                type="number"
                className="quantity-input"
                value={quantity}
                onChange={(e) => {
                  const val = Math.max(
                    1,
                    Math.min(MAX_ORDER, Number(e.target.value) || 1)
                  );
                  setQuantity(val);
                }}
                min={1}
                max={MAX_ORDER}
              />
              <button
                className="quantity-button"
                onClick={increaseQuantity}
                disabled={quantity >= MAX_ORDER}
              >
                +
              </button>
            </div>
          </div>

          <div className="main-product-button-section">
            <button className="main-product-add2cart" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Full Description */}
      <div className="product-specficcations">
        <p className="product-specfications-header">Product Details</p>
        <div className="product-specfications-inner">
          <div className="product-specifications-div">
            <div className="product-specifications-div-left">
              <p>Full Description</p>
            </div>
            <div className="product-specifications-div-right">
              <p>{product.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <p className="recommendations-header">You may also like</p>
      <div className="products">
        {recommended.length === 0 ? (
          <p>No related products available.</p>
        ) : (
          recommended.map((item) => (
            <div className="item" key={item._id}>
              <div className="item-img">
                <img
                  src={`http://localhost:5000${item.image}`}
                  alt={item.product_name}
                />
              </div>
              <div className="item-content">
                <div className="item-details">
                  <span className="price">₱{item.unit_price}</span>
                  <span className="title">{item.product_name}</span>
                </div>
                <div
                  className="view-item-btn"
                  onClick={() => navigate(`/product/${item._id}`)}
                >
                  View More
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Product;
