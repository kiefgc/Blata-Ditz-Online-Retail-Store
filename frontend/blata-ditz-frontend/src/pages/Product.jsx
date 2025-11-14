import "./Product.css";
import React from "react";

function Product() {
  return (
    <>
      <div class="navbar">
        <div>
          <a href="#" class="logo">
            BLATADITZ
          </a>
        </div>
        <div>
          <a href="#">
            <div class="search-bar">
              <img
                width="20"
                height="20"
                src="https://img.icons8.com/ios-glyphs/30/FFD033/search--v1.png"
                alt="search--v1"
              />
              <input type="text" placeholder="Search" />
            </div>
          </a>
        </div>
        <div class="nav-links">
          <a href="#">
            <img
              width="34"
              height="34"
              src="https://img.icons8.com/sf-regular/48/FFFFFF/shopping-cart.png"
              alt="shopping-cart"
            />
          </a>
          <a href="#">
            <img
              width="32"
              height="32"
              src="https://img.icons8.com/fluency-systems-regular/48/FFFFFF/user-male-circle--v1.png"
              alt="user-male-circle--v1"
            />
          </a>
        </div>
      </div>
      <div class="page-content">
        <div class="main-product-container">
          <div class="main-product-images">a</div>
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
      </div>
    </>
  );
}

export default Product;
