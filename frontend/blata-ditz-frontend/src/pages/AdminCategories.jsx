import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AdminCategories.css";

const categories = [
  {
    id: "ps5",
    name: "PS5",
    icon: "https://img.icons8.com/ios-filled/50/FFFFFF/playstation-5.png",
  },
  {
    id: "ps4",
    name: "PS4",
    icon: "https://img.icons8.com/ios-filled/50/FFFFFF/ps-controller.png",
  },
  {
    id: "switch",
    name: "SWITCH",
    icon: "https://img.icons8.com/ios-filled/50/FFFFFF/nintendo-switch--v1.png",
  },
  {
    id: "xbox",
    name: "XBOX",
    icon: "https://img.icons8.com/ios-filled/50/FFFFFF/xbox.png",
  },
  {
    id: "pcmac",
    name: "PC/MAC",
    icon: "https://img.icons8.com/ios-filled/50/FFFFFF/monitor.png",
  },
  {
    id: "collectibles",
    name: "COLLECTIBLES",
    icon: "https://img.icons8.com/ios-filled/50/FFFFFF/funko.png",
  },
  {
    id: "more",
    name: "MORE",
    icon: "https://img.icons8.com/ios-filled/50/FFFFFF/more.png",
  },
  {
    id: "preorders",
    name: "PRE-ORDERS",
    icon: "https://img.icons8.com/pastel-glyph/64/FFFFFF/box--v1.png",
  },
  {
    id: "add",
    name: "ADD",
    icon: "https://img.icons8.com/ios-filled/50/FFFFFF/plus.png",
    isAction: true,
    link: "/admin/categories/add",
  },
];

const CategoryCard = ({ name, icon, onClick, isAction, link }) => {
  const CardContent = (
    <>
      <img src={icon} alt={`${name} icon`} className="category-card-icon" />
      <span className="category-card-name">{name}</span>
    </>
  );

  if (link) {
    return (
      <Link
        to={link}
        className={`category-card ${isAction ? "category-card-action" : ""}`}
      >
        {CardContent}
      </Link>
    );
  }

  return (
    <button
      className={`category-card ${isAction ? "category-card-action" : ""}`}
      onClick={onClick}
    >
      {CardContent}
    </button>
  );
};

function AdminCategories() {
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
      <div className="admin-container">
        <div className="header">
          <h1>
            Welcome, <span style={{ color: "#FFCF33" }}>Admin!</span>
          </h1>
        </div>
        <div className="dashboard">
          <div className="sidebar">
            <ul>
              <li>
                <img
                  width="24"
                  height="24"
                  src="https://img.icons8.com/ios-filled/50/FFFFFF/conference-call.png"
                  alt="conference-call"
                />
                <span>
                  <Link to="/admin/users" className="unselectedtab">
                    Users
                  </Link>
                </span>
              </li>
              <li>
                <img
                  width="22"
                  height="22"
                  src="https://img.icons8.com/ios-filled/50/FFFFFF/untested.png"
                  alt="untested"
                />
                <span>
                  <Link to="/admin/orders" className="unselectedtab">
                    Orders
                  </Link>
                </span>
              </li>
              <li>
                <img
                  width="24"
                  height="24"
                  src="https://img.icons8.com/material-rounded/24/FFFFFF/move-by-trolley.png"
                  alt="move-by-trolley"
                />
                <span>
                  <Link to="/admin/inventory" className="unselectedtab">
                    Inventory
                  </Link>
                </span>
              </li>
              <li className="selectedli">
                <img
                  width="24"
                  height="24"
                  src="https://img.icons8.com/material-outlined/24/FFCF33/categorize.png"
                  alt="categorize"
                />
                <span>
                  <Link to="/admin/categories" className="selectedtab">
                    Categories
                  </Link>
                </span>
              </li>
              <li>
                <img
                  width="24"
                  height="24"
                  src="https://img.icons8.com/glyph-neue/64/FFFFFF/supplier.png"
                  alt="supplier"
                />
                <span>
                  <Link to="/admin/suppliers" className="unselectedtab">
                    Suppliers
                  </Link>
                </span>
              </li>
              <li>
                <img
                  width="24"
                  height="24"
                  src="https://img.icons8.com/forma-regular-filled/24/FFFFFF/combo-chart.png"
                  alt="combo-chart"
                />
                <span>
                  <Link to="/admin/reports" className="unselectedtab">
                    Reports
                  </Link>
                </span>
              </li>
              <li>
                <img
                  width="21"
                  height="21"
                  src="https://img.icons8.com/fluency-systems-filled/48/FFFFFF/open-pane.png"
                  alt="open-pane"
                />
                <span>Log Out</span>
              </li>
            </ul>
          </div>
          <div className="main-content-categories">
            <div className="category-grid-container">
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  name={category.name}
                  icon={category.icon}
                  isAction={category.isAction}
                  link={category.link}
                  // onClick is optional if using Link
                  onClick={() => console.log(`Clicked ${category.name}`)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminCategories;
