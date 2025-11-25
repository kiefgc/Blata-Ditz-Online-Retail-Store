import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Product.css";
import "./Landing.css";
import React from "react";
import item from "../assets/item.png";

function Product() {
  const { id } = useParams();
  const [showSmallSearchbar, setShowSmallSearchbar] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const maxStock = 99;
  const [categories, setCategories] = useState([]);
  const [recommended, setRecommended] = useState([]);

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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/products/${id}`);
        if (!res.ok) throw new Error("Product not found");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Failed to load product", err);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    fetch("http://localhost:5000/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!product || !product.category_ids) return;

    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((allProducts) => {
        const related = allProducts.filter(
          (p) =>
            p._id !== product._id && p.category_ids === product.category_ids
        );
        setRecommended(related.slice(0, 4));
      })
      .catch(console.error);
  }, [product]);

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const increaseQuantity = () => {
    const max = product?.in_stock ? maxStock : 1;
    setQuantity((prev) => Math.min(max, prev + 1));
  };

  const handleQuantityChange = (event) => {
    const max = product?.in_stock ? maxStock : 1;
    const value = Math.max(1, Math.min(max, Number(event.target.value) || 1));
    setQuantity(value);
  };

  if (!product) return <p>Loading product...</p>;

  const briefDescription = product.description
    ? product.description.slice(0, 30) +
      (product.description.length > 30 ? "..." : "")
    : "";

  return (
    <>
      <div className="page-content">
        <div className="categories">
          <ul>
            {categories.map((cat) => (
              <li key={cat._id || "all"}>
                <button
                  onClick={() => {
                    navigate("/", {
                      state: { selectedCategory: cat._id },
                    });
                  }}
                >
                  {cat.category_name.toUpperCase()}
                </button>
              </li>
            ))}
          </ul>
        </div>

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

            {/* Brief description */}
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
                  onChange={handleQuantityChange}
                  min={1}
                  max={product.in_stock ? maxStock : 1}
                />
                <button
                  className="quantity-button"
                  onClick={increaseQuantity}
                  disabled={quantity >= (product.in_stock ? maxStock : 1)}
                >
                  +
                </button>
              </div>
            </div>
            <div className="main-product-button-section">
              <button className="main-product-add2cart">Add to Cart</button>
              <button className="main-product-buynow">Buy Now</button>
            </div>
          </div>
        </div>

        {/* Full description in place of previous hardcoded specs */}
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
    </>
  );
}

export default Product;
