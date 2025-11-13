import "./Landing.css";
import React, { useEffect, useRef } from "react";

import ps4 from "../assets/ps4.png";
import xbox from "../assets/xbox.png";
import nswitch from "../assets/switch.png";

function Landing() {
  const gototopRef = useRef(null);

  const onScroll = () => {
    const gototop = gototopRef.current;

    if (!gototop) return;

    const scroll = document.documentElement.scrollTop;
    const threshold = window.innerHeight * 0.3;

    if (scroll > threshold) {
      gototop.classList.add("active");
    } else {
      gototop.classList.remove("active");
    }
  };

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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
        <div class="featured-container bg-red">
          <div class="featuredleft">
            <div class="sectiontitle">
              Featured Nintendo<br></br>Switch Games
            </div>
            <img class="featuredimage2" src={nswitch}></img>
          </div>
          <div class="featuredright">test</div>
        </div>
        <div class="featured-container bg-blue">
          <div class="featuredleft">
            <div class="sectiontitle">
              FEATURED PLAYSTATION<br></br>GAMES
            </div>
            <img class="featuredimage" src={ps4}></img>
          </div>
          <div class="featuredright">test</div>
        </div>
        <div class="featured-container bg-green">
          <div class="featuredleft">
            <div class="sectiontitle">
              FEATURED XBOX<br></br>GAMES
            </div>
            <img class="featuredimage" src={xbox}></img>
          </div>
          <div class="featuredright">test</div>
        </div>

        <a
          ref={gototopRef}
          id="gotop"
          class="backtotop"
          href="javascript:void(0)"
        >
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAADWUlEQVR4nO1aSU8UQRQuURE3iFfFm6dR0HlvnBgvKKJeBDQuv8Zg4tHglogLEhL14nIyKgaNkqgxHMapmnFE4oUDYGKQs5BAPlM9iQ4z04M909XdSH1JXXqr/r5+9eotLYSFhYWFhYWFhYVFIMBEWwMy3IJ0ogNp7s6PRAdUYo8+J/434NuuDZB0CopuQ9I4JC9CMcoOfc65hm5B8knkYvVipQKfEzuh+CokzboSXm4499IVZJLNYqUAKW6C5OuQPF818VLLmHeEGE02iigDio5D8XffiJeOaaT5qIgaALEGki9WXN/+WcMiFF3Qc4ooAI/ProXiQePES/3DgJ47Al+eBgIn/1eE+6FaArTZh0X+z6CecMgraoeihdAFcGIHPhYs+dFko2Fv73VM4evBrcEJIPlaBEgXWQJdDoZ8Jtnsa5Dj31KYg9y7Y3V+fRWQFSAXq4eknxEWYFYnX+YEkDqr8+2Fh6HinVB0ApJf+vbcTKLLnACK7/j0ooOAqCsKpW/69Ow+cwJIGvfBTO8Vki8Qoc6nkHrMDPmPBzbWnOxIeoKRtnWuc+RFeFCbALRgpLIEXcYySL4ouXpU21z7dxsQIH6kBvJDXryzI4Lkh9XPx4f8FyDN3VWa5Au32h5ysS1uIWx+y+VnkdkJkEl0VUH+g9t6RIo3QdEIJL+Dat3sXlDl99EQQOnsz+OLZIldS+OKXhWY7BvtZMtemyWuYgkcjoYTTHGTS5l8qMz1w+WsBdmWbdFwghNtDd63wcTpJc9I8XpIelrhnufF/gKSznlcdgvGwmF4DYQk/3Ccp44h0vtiUPT6H+57i2y8VTtHZPgMFM94tIAvRshrON0dr+YY/LghTAG6XRU+wWVGvHN1p8M5w/1E6H5fZAXgXqPkC0pic6u2JKbhNCrDJlw6LomAy+LT0fn6NKnzisAE0NDhZmQaI2F1jKG7tOELcD4U8gW1vLshCtAvwgac4kUoHeL+0NvjSyxBUU8gP0hovxOm2VdC/nc3njK33mlS1yVElAGdxUnu9TVYkvRL7/OBb3W1QEdluldXY+4w44j5Kb5drFRAJ1D5emKfblpUjh2cc2P5a+OdK/pHSTc4JbF8caTdEcYRh9qdYyYbmxYWFhYWFhYWFhaiEL8BJFFtv10BkiUAAAAASUVORK5CYII="
            alt="circled-chevron-up"
          />
        </a>
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

export default Landing;
