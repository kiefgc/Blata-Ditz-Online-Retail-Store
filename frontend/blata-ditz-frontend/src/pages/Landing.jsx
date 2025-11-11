import "./Landing.css";

function Landing() {
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
