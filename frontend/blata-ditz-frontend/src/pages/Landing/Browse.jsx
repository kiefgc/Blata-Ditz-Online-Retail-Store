import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Browse({ browseRef }) {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); // null = All

  // Fetch categories
  useEffect(() => {
    fetch("http://localhost:3000/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories([{ _id: null, category_name: "All" }, ...data]);
      })
      .catch(console.error);
  }, []);

  // Fetch products
  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(console.error);
  }, []);

  // Filter products by selected category
  const filteredProducts =
    selectedCategory === null
      ? products
      : products.filter((p) => p.category_ids.includes(selectedCategory));

  return (
    <div className="product-container" ref={browseRef}>
      {/* Categories */}
      <div className="categories">
        <ul>
          {categories.map((cat) => (
            <li key={cat._id || "all"}>
              <button onClick={() => setSelectedCategory(cat._id)}>
                {cat.category_name.toUpperCase()}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Products */}
      <div className="products">
        {filteredProducts.length === 0 ? (
          <p>No products found.</p>
        ) : (
          filteredProducts.map((product) => (
            <div className="item" key={product._id}>
              <div className="item-img">
                <img
                  src={`http://localhost:3000${product.image}`}
                  alt={product.product_name}
                />
              </div>
              <div className="item-content">
                <div className="item-details">
                  <span className="price">₱{product.unit_price}</span>
                  <span className="title">{product.product_name}</span>
                </div>
                <div
                  className="view-item-btn"
                  onClick={() => navigate(`/product/${product._id}`)}
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

export default Browse;
