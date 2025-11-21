import { useEffect, useState } from "react";
import "./Product.css";
import "./Landing.css";

import React from "react";

import item from "../assets/item.png";

function Product() {
  const [showSmallSearchbar, setShowSmallSearchbar] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const maxStock = 99;
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

  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity - 1));
  };

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => Math.min(maxStock, prevQuantity + 1));
  };

  const handleQuantityChange = (event) => {
    const value = Math.max(
      1,
      Math.min(maxStock, Number(event.target.value) || 1)
    );
    setQuantity(value);
  };

  return (
    <>
      <div className="page-content">
        <div className="categories">
          <ul>
            <li>
              <button>PS5</button>
            </li>
            <li>
              <button>PS4</button>
            </li>
            <li>
              <button>SWITCH</button>
            </li>
            <li>
              <button>XBOX</button>
            </li>
            <li>
              <button>PC/MAC</button>
            </li>
            <li>
              <button>COLLECTIBLES</button>
            </li>
            <li>
              <button>MORE</button>
            </li>
            <li>
              <button>PRE-ORDERS</button>
            </li>
          </ul>
        </div>
        <div className="main-product-container">
          <div className="main-product-images">
            <div className="main-product-images-small">
              <img src="https://picsum.photos/75"></img>
              <img src="https://picsum.photos/75"></img>
              <img src="https://picsum.photos/75"></img>
            </div>
            <div className="main-product-images-main">
              <img src="https://picsum.photos/200"></img>
            </div>
          </div>
          <div className="main-product-descriptions">
            <p className="main-product-name">Some Product Name Here</p>
            <div className="divider"></div>
            <p className="main-product-sections">Description</p>
            <br></br>
            <div className="main-product-textdesc">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
            <div className="main-product-descriptions-inline">
              <p className="main-product-price">₱16,450.00</p>
            </div>
            <div className="main-product-descriptions-inline">
              <p className="main-product-sections">Stock:</p>
              <p className="main-product-text">{maxStock} stocks left</p>
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
                  min={"1"}
                  max={maxStock.toString()}
                ></input>
                <button
                  className="quantity-button"
                  onClick={increaseQuantity}
                  disabled={quantity >= maxStock}
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
        <div className="product-specficcations">
          <p className="product-specfications-header">Product Specifications</p>
          <div className="product-specfications-inner">
            <div className="product-specifications-div">
              <div className="product-specifications-div-left">
                <p>SPECIFICATIONS</p>
              </div>
              <div className="product-specifications-div-right">
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
              </div>
            </div>
            <div className="product-specifications-div">
              <div className="product-specifications-div-left">
                <p>REQUIREMENTS</p>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <p>CONNECTIVITY</p>
              </div>
              <div className="product-specifications-div-right">
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
              </div>
            </div>
          </div>
        </div>
        <p className="recommendations-header">You may also like</p>
        <div className="products">
          <div className="item">
            <div className="item-img">
              <img src={item} />
            </div>
            <div className="item-content">
              <div className="item-details">
                <span className="price">₱175.00</span>
                <span className="title">
                  Transnovo 24-in-1 Game Card Storage Case for Nintendo Switch 2
                </span>
              </div>
              <div className="view-item-btn">View More</div>
            </div>
          </div>
          <div className="item">
            <div className="item-img">
              <img src={item} />
            </div>
            <div className="item-content">
              <div className="item-details">
                <span className="price">₱175.00</span>
                <span className="title">
                  Transnovo 24-in-1 Game Card Storage Case for Nintendo Switch 2
                </span>
              </div>
              <div className="view-item-btn">View More</div>
            </div>
          </div>
          <div className="item">
            <div className="item-img">
              <img src={item} />
            </div>
            <div className="item-content">
              <div className="item-details">
                <span className="price">₱175.00</span>
                <span className="title">
                  Transnovo 24-in-1 Game Card Storage Case for Nintendo Switch 2
                </span>
              </div>
              <div className="view-item-btn">View More</div>
            </div>
          </div>
          <div className="item">
            <div className="item-img">
              <img src={item} />
            </div>
            <div className="item-content">
              <div className="item-details">
                <span className="price">₱175.00</span>
                <span className="title">
                  Transnovo 24-in-1 Game Card Storage Case for Nintendo Switch 2
                </span>
              </div>
              <div className="view-item-btn">View More</div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <a href="#" className="logo">
          BLATADITZ
        </a>
        <p className="copyright">Copyright &copy; 2025</p>
        <p className="disclaimer">FOR ACADEMIC PURPOSES ONLY</p>
      </div>
    </>
  );
}

export default Product;
