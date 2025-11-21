import { useRef } from "react";

import banner from "../../assets/finalbanner.jpg";
function Banner({ browseRef }) {
  return (
    <div className="banner-container">
      <div className="text-banner">
        <span className="banner-heading">Your one-stop electronic store.</span>
        <p>
          Find and purchase all your electronic needs. Shop the latest consoles,
          games, gadgets, and more. All in one place.
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
  );
}

export default Banner;
