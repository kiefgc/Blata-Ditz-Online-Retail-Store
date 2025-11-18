import { useEffect, useState } from "react";
import "./Product.css";
import React from "react";

function Product() {
  const [showSmallSearchbar, setShowSmallSearchbar] = useState(false);
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

  return (
    <>
      <div class="navbar">
        <div>
          <a href="#" class="logo">
            BLATADITZ
          </a>
        </div>
        <div>
          <div class="search-bar search-close">
            <img
              width="20"
              height="20"
              src="https://img.icons8.com/ios-glyphs/30/FFD033/search--v1.png"
              alt="search--v1"
            />
            <input type="text" placeholder="Search" />
          </div>
        </div>
        <div class="nav-links">
          <a href="#">
            <img
              class="search-icon"
              width="34"
              height="34"
              src="https://img.icons8.com/ios-glyphs/30/FFFFFF/google-web-search.png"
              alt="google-web-search"
              onClick={() => setShowSmallSearchbar(!showSmallSearchbar)}
            />
          </a>
          <a href="#">
            <img
              width="30"
              height="30"
              src="https://img.icons8.com/fluency-systems-filled/48/FFFFFF/shopping-cart.png"
              alt="shopping-cart"
            />
          </a>
          <a href="#">
            <img
              width="30"
              height="30"
              src="https://img.icons8.com/fluency-systems-filled/48/FFFFFF/user.png"
              alt="user"
            />
          </a>
        </div>

        <div
          class={`small-screen-searchbar ${showSmallSearchbar ? "open" : ""}`}
        >
          <div class="small-searchbar">
            <img
              width="20"
              height="20"
              src="https://img.icons8.com/ios-glyphs/30/FFD033/search--v1.png"
              alt="search--v1"
            />
            <input type="text" placeholder="Search" />

            <img
              width="15"
              height="15"
              src="https://img.icons8.com/fluency-systems-regular/48/FFFFFF/multiply.png"
              alt="multiply"
              onClick={() => setShowSmallSearchbar(false)}
            />
          </div>
        </div>
      </div>
      <div class="page-content">
        <div class="main-product-container">
          <div class="main-product-images">
            <div class="main-product-images-small">
              <img src="https://picsum.photos/75"></img>
              <img src="https://picsum.photos/75"></img>
              <img src="https://picsum.photos/75"></img>
            </div>
            <div class="main-product-images-main">
              <img src="https://picsum.photos/200"></img>
            </div>
          </div>
          <div class="main-product-descriptions">
            <p class="main-product-name">Some Product Name Here</p>
            <div class="divider"></div>
            <p class="main-product-sections">Description</p>
            <br></br>
            <div class="main-product-textdesc">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </div>
            <div class="main-product-descriptions-inline">
              <p class="main-product-sections">Price:</p>
              <p class="main-product-price">₱16,450.00</p>
            </div>
            <div class="main-product-descriptions-inline">
              <p class="main-product-sections">Stock:</p>
              <p class="main-product-text">4 stocks left</p>
            </div>
            <div class="main-product-descriptions-inline">
              <p class="main-product-sections">Quantity:</p>
            </div>
          </div>
        </div>
        <div class="product-specficcations">
          <p class="product-specfications-header">Product Specifications</p>
          <div class="product-specfications-inner">
            <div class="product-specifications-div">
              <div class="product-specifications-div-left">
                <p>SPECIFICATIONS</p>
              </div>
              <div class="product-specifications-div-right">
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
            <div class="product-specifications-div">
              <div class="product-specifications-div-left">
                <p>REQUIREMENTS</p>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <p>CONNECTIVITY</p>
              </div>
              <div class="product-specifications-div-right">
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
        <p class="recommendations-header">You may also like</p>
      </div>
      <div class="footer">
        <a href="#" class="logo">
          BLATADITZ
        </a>
        <p class="copyright">Copyright &copy; 2025</p>
        <p class="disclaimer">FOR ACADEMIC PURPOSES ONLY</p>
      </div>
    </>
  );
}

export default Product;
