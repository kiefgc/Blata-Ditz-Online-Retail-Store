import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthForm from "../components/AuthForm.jsx";

const FORM_POSITION_NONE = 0;
const FORM_POSITION_LOGIN = 1;
const FORM_POSITION_SIGNUP = 2;

function Navbar() {
  const [isSignedIn, setIsSignedIn] =
    useState(false); /* For changing navbar icons when user logged in */
  const [showSmallSearchbar, setShowSmallSearchbar] = useState(false);
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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsSignedIn(true);
    }
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
                    isLogin={true}
                    onClose={closeForm}
                    onSwitch={switchForm}
                    onLoginSuccess={() => setIsSignedIn(true)}
                  />
                )}
              </div>
              <div className="pop-up-parent-container">
                <button className="signup-button" onClick={clickSignup}>
                  Create Account
                </button>
                {activeFormPosition === FORM_POSITION_SIGNUP && (
                  <AuthForm
                    isLogin={false}
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
    </>
  );
}
export default Navbar;
