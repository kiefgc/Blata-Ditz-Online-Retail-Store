import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import item from "../../assets/item.png";

function Browse({ browseRef }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  return (
    <div className="product-container" ref={browseRef}>
      <div className="categories">
        <ul>
          <li>
            <button onClick={() => setSelectedCategory("all")}>ALL</button>
          </li>
          <li>
            <button onClick={() => setSelectedCategory("ps5")}>PS5</button>
          </li>
          <li>
            <button onClick={() => setSelectedCategory("ps4")}>PS4</button>
          </li>
          <li>
            <button onClick={() => setSelectedCategory("switch")}>
              SWITCH
            </button>
          </li>
          <li>
            <button onClick={() => setSelectedCategory("xbox")}>XBOX</button>
          </li>
          <li>
            <button onClick={() => setSelectedCategory("pc/mac")}>
              PC/MAC
            </button>
          </li>
          <li>
            <button onClick={() => setSelectedCategory("collectibles")}>
              COLLECTIBLES
            </button>
          </li>
          <li>
            <button onClick={() => setSelectedCategory("more")}>MORE</button>
          </li>
          <li>
            <button onClick={() => setSelectedCategory("pre-orders")}>
              PRE-ORDERS
            </button>
          </li>
        </ul>
      </div>

      {selectedCategory === "all" && (
        <div className="products">
          <div className="item">
            <div className="item-img">
              <img src={item} />
            </div>
            <div className="item-content">
              <div className="item-details">
                <span className="price">₱175.00</span>
                <span className="title">all all all</span>
              </div>
              <div
                className="view-item-btn"
                onClick={() => navigate("/product")}
              >
                View More
              </div>
            </div>
          </div>
          <div className="item">
            <div className="item-img">
              <img src={item} />
            </div>
            <div className="item-content">
              <div className="item-details">
                <span className="price">₱175.00</span>
                <span className="title">all all all</span>
              </div>
              <div
                className="view-item-btn"
                onClick={() => navigate("/product")}
              >
                View More
              </div>
            </div>
          </div>

          <div className="item">
            <div className="item-img">
              <img src={item} />
            </div>
            <div className="item-content">
              <div className="item-details">
                <span className="price">₱175.00</span>
                <span className="title">all all all</span>
              </div>
              <div
                className="view-item-btn"
                onClick={() => navigate("/product")}
              >
                View More
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedCategory === "ps5" && (
        <div className="products">
          <div className="item">
            <div className="item-img">
              <img src={item} />
            </div>
            <div className="item-content">
              <div className="item-details">
                <span className="price">₱175.00</span>
                <span className="title">
                  Transnovo 24-in-1 Game Card Storage Case for Nintendo
                </span>
              </div>
              <div
                className="view-item-btn"
                onClick={() => navigate("/product")}
              >
                View More
              </div>
            </div>
          </div>
        </div>
      )}
      {selectedCategory === "ps4" && (
        <div className="products">
          <div className="item">
            <div className="item-img">
              <img src={item} />
            </div>
            <div className="item-content">
              <div className="item-details">
                <span className="price">₱175.00</span>
                <span className="title">ps4ps4ps4</span>
              </div>
              <div
                className="view-item-btn"
                onClick={() => navigate("/product")}
              >
                View More
              </div>
            </div>
          </div>
        </div>
      )}
      {selectedCategory === "switch" && (
        <div className="products">
          <div className="item">
            <div className="item-img">
              <img src={item} />
            </div>
            <div className="item-content">
              <div className="item-details">
                <span className="price">₱175.00</span>
                <span className="title">switch switch switch</span>
              </div>
              <div
                className="view-item-btn"
                onClick={() => navigate("/product")}
              >
                View More
              </div>
            </div>
          </div>
        </div>
      )}
      {selectedCategory === "xbox" && (
        <div className="products">
          <div className="item">
            <div className="item-img">
              <img src={item} />
            </div>
            <div className="item-content">
              <div className="item-details">
                <span className="price">₱175.00</span>
                <span className="title">xboxxx</span>
              </div>
              <div
                className="view-item-btn"
                onClick={() => navigate("/product")}
              >
                View More
              </div>
            </div>
          </div>
        </div>
      )}
      {selectedCategory === "pc/mac" && (
        <div className="products">
          <div className="item">
            <div className="item-img">
              <img src={item} />
            </div>
            <div className="item-content">
              <div className="item-details">
                <span className="price">₱175.00</span>
                <span className="title">pc/macccc</span>
              </div>
              <div
                className="view-item-btn"
                onClick={() => navigate("/product")}
              >
                View More
              </div>
            </div>
          </div>
        </div>
      )}
      {selectedCategory === "collectibles" && (
        <div className="products">
          <div className="item">
            <div className="item-img">
              <img src={item} />
            </div>
            <div className="item-content">
              <div className="item-details">
                <span className="price">₱175.00</span>
                <span className="title">collectiblessss</span>
              </div>
              <div
                className="view-item-btn"
                onClick={() => navigate("/product")}
              >
                View More
              </div>
            </div>
          </div>
        </div>
      )}
      {selectedCategory === "more" && (
        <div className="products">
          <div className="item">
            <div className="item-img">
              <img src={item} />
            </div>
            <div className="item-content">
              <div className="item-details">
                <span className="price">₱175.00</span>
                <span className="title">more</span>
              </div>
              <div
                className="view-item-btn"
                onClick={() => navigate("/product")}
              >
                View More
              </div>
            </div>
          </div>
        </div>
      )}
      {selectedCategory === "pre-orders" && (
        <div className="products">
          <div className="item">
            <div className="item-img">
              <img src={item} />
            </div>
            <div className="item-content">
              <div className="item-details">
                <span className="price">₱175.00</span>
                <span className="title">pre-orders</span>
              </div>
              <div
                className="view-item-btn"
                onClick={() => navigate("/product")}
              >
                View More
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Browse;
