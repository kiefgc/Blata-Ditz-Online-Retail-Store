import "../Landing.css";
import AuthForm from "../../components/AuthForm.jsx";

import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import banner from "../../assets/finalbanner.jpg";

import item from "../../assets/item.png";

import ps4 from "../../assets/ps4.png";
import xbox from "../../assets/xbox.png";
import nswitch from "../../assets/switch.png";

import pokemonns from "../../assets/nswitch-pokemon.png";
import kirbyns from "../../assets/nswitch-kirby.png";
import littlenightmaresns from "../../assets/nslittlenightmares.png";

import eriksholmps from "../../assets/ps5eriksholm.png";
import pawpatrolps from "../../assets/ps5pawpatrol.jpg";
import ddreviveps from "../../assets/ps5ddrevive.png";

import nba2k26xb from "../../assets/xboxnba2k26.jpg";
import wuchangxb from "../../assets/xboxwuchang.jpg";
import suicidesquadxb from "../../assets/xboxssktjl.png";

const FORM_POSITION_NONE = 0;
const FORM_POSITION_LOGIN = 1;
const FORM_POSITION_SIGNUP = 2;

function test() {
  const navigate = useNavigate();

  const [isSignedIn, setIsSignedIn] =
    useState(false); /* For changing navbar icons when user logged in */

  const [selectedCategory, setSelectedCategory] = useState("all");

  const [showSmallSearchbar, setShowSmallSearchbar] = useState(false);

  const gototopRef = useRef(null);
  const [showForm, setShowForm] = useState(false);
  const [activeFormPosition, setActiveFormPosition] =
    useState(FORM_POSITION_NONE);
  const [isLogin, setIsLogin] = useState(true);

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

  const clickLogin = (e) => {
    e.stopPropagation();
    if (activeFormPosition === FORM_POSITION_LOGIN) {
      closeForm();
    } else {
      setIsLogin(true);
      setActiveFormPosition(FORM_POSITION_LOGIN);
    }
  };

  const clickSignup = (e) => {
    e.stopPropagation();
    if (activeFormPosition === FORM_POSITION_SIGNUP) {
      closeForm();
    } else {
      setIsLogin(false);
      setActiveFormPosition(FORM_POSITION_SIGNUP);
    }
  };

  const closeForm = () => {
    setActiveFormPosition(FORM_POSITION_NONE);
  };

  const switchForm = () => {
    setIsLogin(!isLogin);
    setActiveFormPosition(isLogin ? FORM_POSITION_SIGNUP : FORM_POSITION_LOGIN);
  };

  const onScroll = () => {
    const gototop = gototopRef.current;

    if (!gototop) return;

    const scroll = document.documentElement.scrollTop;
    const threshold = window.innerHeight * 0.3;

    if (scroll > threshold) {
      gototop.classNameList.add("active");
    } else {
      gototop.classNameList.remove("active");
    }
  };

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const browseRef = useRef(null);

  useEffect(() => {
    const gototop = gototopRef.current;
    window.addEventListener("scroll", onScroll);

    if (gototop) {
      gototop.addEventListener("click", handleClick);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (gototop) {
        gototop.removeEventListener("click", handleClick);
      }
    };
  }, []);

  useEffect(() => {
    const handleOutsideClick = () => {
      if (activeFormPosition !== FORM_POSITION_NONE) {
        closeForm();
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [activeFormPosition]);

  return (
    <>
      <div className="navbar">
        <div>
          <a href="#" className="logo">
            BLATADITZ
          </a>
        </div>
        <div>
          <a href="#">
            <div className="search-bar search-close">
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
        <div className="nav-links">
          {isSignedIn ? (
            <>
              {" "}
              <a href="#">
                <img
                  className="search-icon"
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
            </>
          ) : (
            <>
              <a href="#">
                <img
                  className="search-icon"
                  width="34"
                  height="34"
                  src="https://img.icons8.com/ios-glyphs/30/FFFFFF/google-web-search.png"
                  alt="google-web-search"
                  onClick={() => setShowSmallSearchbar(!showSmallSearchbar)}
                />
              </a>
              <div className="pop-up-parent-container">
                <button className="signin-button" onClick={clickLogin}>
                  Sign In
                </button>
                {activeFormPosition === FORM_POSITION_LOGIN && (
                  <AuthForm
                    isLogin={isLogin}
                    onClose={closeForm}
                    onSwitch={switchForm}
                  />
                )}
              </div>
              <div className="pop-up-parent-container">
                <button className="signup-button" onClick={clickSignup}>
                  Create Account
                </button>
                {activeFormPosition === FORM_POSITION_SIGNUP && (
                  <AuthForm
                    isLogin={isLogin}
                    onClose={closeForm}
                    onSwitch={switchForm}
                  />
                )}
              </div>
            </>
          )}
        </div>

        <div
          className={`small-screen-searchbar ${
            showSmallSearchbar ? "open" : ""
          }`}
        >
          <div className="small-searchbar">
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
      <div className="page-content">
        {/* BANNER SECTION */}
        <div className="banner-container">
          <div className="text-banner">
            <span className="banner-heading">
              Your one-stop electronic store.
            </span>
            <p>
              Find and purchase all your electronic needs. Shop the latest
              consoles, games, gadgets, and more. All in one place.
            </p>
            <div
              className="button-banner"
              onClick={() =>
                browseRef.current.scrollIntoView({ behavior: "smooth" })
              }
            >
              Browse Now
            </div>
          </div>
          <div className="img-banner">
            <img src={banner} />
          </div>
        </div>
        {/* PRODUCTS SECTION */}
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
                <button onClick={() => setSelectedCategory("xbox")}>
                  XBOX
                </button>
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
                <button onClick={() => setSelectedCategory("more")}>
                  MORE
                </button>
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
                      Switch 2 Transnovo 24-in-1 Game Card Storage Case for
                      Nintendo Switch 2 Transnovo 24-in-1 Game Card Storage Case
                      for Nintendo Switch 2
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
        {/* FEATURED SECTION */}
        <div className="featured-container bg-red">
          <div className="featuredleft">
            <div className="sectiontitle">
              FEATURED NINTENDO<br></br>SWITCH GAMES
            </div>
            <img className="featuredimage2" src={nswitch}></img>
          </div>
          <div className="featuredright">
            <div className="featuredgames">
              <div className="ftgame">
                <img src={pokemonns}></img>
                <div className="ftgame-title">
                  <p>Pokémon™ Legends: Z-A – Nintendo Switch™ 2 Edition</p>
                  <p>₱3,095.00</p>
                </div>
              </div>
              <div className="ftgame">
                <img src={kirbyns}></img>
                <div className="ftgame-title">
                  <p>
                    Kirby™ and the Forgotten Land – Nintendo Switch™ 2 Edition +
                    Star-Crossed World
                  </p>
                  <p>₱3,395.00</p>
                </div>
              </div>
              <div className="ftgame">
                <img src={littlenightmaresns}></img>
                <div className="ftgame-title">
                  <p>Little Nightmares III</p>
                  <p>₱2,095.00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="featured-container bg-blue">
          <div className="featuredleft">
            <div className="sectiontitle">
              FEATURED PLAYSTATION<br></br>GAMES
            </div>
            <img className="featuredimage" src={ps4}></img>
          </div>
          <div className="featuredright">
            <div className="featuredgames">
              <div className="ftgame">
                <img src={eriksholmps}></img>
                <div className="ftgame-title">
                  <p>Eriksholm: The Stolen Dream</p>
                  <p>₱1,795.00</p>
                </div>
              </div>
              <div className="ftgame">
                <img src={pawpatrolps}></img>
                <div className="ftgame-title">
                  <p>PAW Patrol Rescue Wheels Championship</p>
                  <p>₱1,850.00</p>
                </div>
              </div>
              <div className="ftgame">
                <img src={ddreviveps}></img>
                <div className="ftgame-title">
                  <p>Double Dragon Revive</p>
                  <p>₱2,095.00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="featured-container bg-green">
          <div className="featuredleft">
            <div className="sectiontitle">
              FEATURED XBOX<br></br>GAMES
            </div>
            <img className="featuredimage" src={xbox}></img>
          </div>
          <div className="featuredright">
            <div className="featuredgames">
              <div className="ftgame">
                <img src={nba2k26xb}></img>
                <div className="ftgame-title">
                  <p>NBA 2K26 Superstar Edition</p>
                  <p>₱4,190.00</p>
                </div>
              </div>
              <div className="ftgame">
                <img src={wuchangxb}></img>
                <div className="ftgame-title">
                  <p>Wuchang: Fallen Feathers Day One</p>
                  <p>₱3,250.00</p>
                </div>
              </div>
              <div className="ftgame">
                <img src={suicidesquadxb}></img>
                <div className="ftgame-title">
                  <p>Suicide Squad: Kill the Justice League</p>
                  <p>₱1.715.00</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <a
          ref={gototopRef}
          id="gotop"
          className="backtotop"
          href="javascript:void(0)"
        >
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC4klEQVR4nO1ZO2/UQBC2AgmCkkeTBCqqNMEzl9MlDfyJKAgkyvyFoPyAJD2JjkdHGQQUEBqKdJGQ7nZyYBq6QEiRBy13UAzaPXASxz7vetf2Id1KI1nyevf7dr+dmR173qAN2qBZN16fPcdNf5oFLLLAl0z4mQX+YMJfyuSzgEC9k30aUGP2hsoH/qlynQWssMBdJmQjE/CNCZe5VR0vHri4dY0FPmGBHWPgZ4hghwnq3MCrBYHHeyzgyBr4GYNDblbu5ge8gcNM+Mw9cIxK67GcyzX4S0zwLnfwFO7GhpzTFfjhYsHjPxLvOZgYsSdQhGwokUTdEjzcLw88dm3bn8sG/sPUFSY8KJ2AgKNMLlb5+bLBU2hrZuBb1XEnQcrZLmCHG3jDYPVhxX5i+M2E611Tz7ZElvXAszf0N0+xmWyfCe+EYzYBmXDHchd2ZdKYTkBmlXbgt7jpj8aMO6re2Y1d1ZHPosUqPeUvNy8kjh1MjFg5B4EPNQjgq4x6X0gd/HiOB0zwM8M8L3R2IDAceI9FZUYXfESq3w134KMOAZNUuZHk3o7lAs95q3Yx+V4BmwbzHWgQ0PT/UmoJeo85sLEH+wRRPdkKbHtpTT+ATY71kMZerNSa/nRi4CRnBPQkFPstwXzvBUg+7OxOQnqH2Mo9yr6RXJ/dHWI9PToIUKccgEs3qhXIun0rMwl6N045WK9/eqxRRSe91UjRu1FZZV6vb2VKN5n7ag3Mve1oV/NUxax8wByxJS3wfXqhaSfFnR67APX+IQCPjMArAkHtcl9c6gkOM9dNZa2yfAI4mwl8SELWKsvT/qoV+PDnhcDXJYB/y5u3z1sTOFHc3SgQ/Btnxd1IkTd/zyRw1dnKxxLZ9udy8k771gfWsG661g0w1iveln5euu1CwJ8iQpNjKu3Ikjt1v1kyjrC5EJEJIGFV1m1kzi4vHupmJ9MRZeqW11LvCBdkVtkXv1kHbdC8/7/9AcOKHGirOS2vAAAAAElFTkSuQmCC"
            alt="circled-chevron-up"
          />
        </a>
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

export default test;
