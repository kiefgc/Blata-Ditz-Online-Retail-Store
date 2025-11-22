import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AdminCategories.css";
import {
  CategoryCreateModal,
  CategoryEditModal,
  CategoryDeleteModal,
} from "./pop-ups/CategoriesPopups.jsx";

const categories = [
  {
    id: "ps5",
    name: "PS5",
    icon: "https://img.icons8.com/ios-filled/50/FFFFFF/playstation-5.png",
    description: "Games and accessories for PlayStation 5.",
  },
  {
    id: "ps4",
    name: "PS4",
    icon: "https://img.icons8.com/ios-filled/50/FFFFFF/ps-controller.png",
    description: "Games and accessories for PlayStation 4.",
  },
  {
    id: "switch",
    name: "SWITCH",
    icon: "https://img.icons8.com/ios-filled/50/FFFFFF/nintendo-switch--v1.png",
    description: "Games and accessories for Nintendo Switch.",
  },
  {
    id: "xbox",
    name: "XBOX",
    icon: "https://img.icons8.com/ios-filled/50/FFFFFF/xbox.png",
    description: "Games and accessories for Microsoft Xbox.",
  },
  {
    id: "pcmac",
    name: "PC/MAC",
    icon: "https://img.icons8.com/ios-filled/50/FFFFFF/monitor.png",
    description: "Software and hardware for PC and Mac.",
  },
  {
    id: "collectibles",
    name: "COLLECTIBLES",
    icon: "https://img.icons8.com/ios-filled/50/FFFFFF/funko.png",
    description: "Figurines and other collectible items.",
  },
  {
    id: "more",
    name: "MORE",
    icon: "https://img.icons8.com/ios-filled/50/FFFFFF/more.png",
    description: "Miscellaneous products.",
  },
  {
    id: "preorders",
    name: "PRE-ORDERS",
    icon: "https://img.icons8.com/pastel-glyph/64/FFFFFF/box--v1.png",
    description: "Products available for pre-purchase.",
  },
  {
    id: "add",
    name: "ADD",
    icon: "https://img.icons8.com/ios-filled/50/FFFFFF/plus.png",
    isAction: true,
    link: "/admin/categories/add",
    description: "",
  },
];

const CategoryCard = ({ name, icon, onClick, isAction, link }) => {
  const CardContent = (
    <>
      <img src={icon} alt={`${name} icon`} className="category-card-icon" />
      <span className="category-card-name">{name}</span>
    </>
  );

  if (isAction && link) {
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
  const [data, setData] = useState(categories);
  const [showSmallSearchbar, setShowSmallSearchbar] = useState(false);

  const [activeModal, setActiveModal] = useState(null); // 'create', 'edit', 'delete'
  const [selectedCategory, setSelectedCategory] = useState(null);

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

  const handleCardClick = (category) => {
    if (category.isAction) {
      setActiveModal("create");
    } else {
      setSelectedCategory(category);
      setActiveModal("edit");
    }
  };

  const handleCreateCategory = (newCategoryData) => {
    const newId = newCategoryData.name
      .toLowerCase()
      .replace(/\s/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    const uniqueId = data.some((cat) => cat.id === newId)
      ? `${newId}-${Date.now()}`
      : newId;

    const newCategory = {
      ...newCategoryData,
      id: uniqueId,
      icon: "https://img.icons8.com/ios-filled/50/FFFFFF/more.png",
      isAction: false,
    };

    setData((prevData) => {
      const addIndex = prevData.findIndex((cat) => cat.isAction);
      const newData = [...prevData];
      newData.splice(addIndex, 0, newCategory);
      return newData;
    });
    handleCloseModal();
  };

  const handleUpdateCategory = (updatedCategory) => {
    setData((prevData) =>
      prevData.map((cat) =>
        cat.id === updatedCategory.id ? updatedCategory : cat
      )
    );
    handleCloseModal();
  };

  const handleDeleteCategory = (categoryId) => {
    setData((prevData) => prevData.filter((cat) => cat.id !== categoryId));
    handleCloseModal();
  };

  const handleOpenDeleteConfirmation = (category) => {
    setSelectedCategory(category);
    setActiveModal("delete");
  };

  const handleCloseModal = () => {
    setActiveModal(null);
    setSelectedCategory(null);
  };

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
              {data.map((category) => (
                <CategoryCard
                  key={category.id}
                  name={category.name}
                  icon={category.icon}
                  isAction={category.isAction}
                  onClick={() => handleCardClick(category)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {activeModal === "create" && (
        <CategoryCreateModal
          onClose={handleCloseModal}
          onCreate={handleCreateCategory}
        />
      )}

      {activeModal === "edit" && selectedCategory && (
        <CategoryEditModal
          category={selectedCategory}
          onClose={handleCloseModal}
          onUpdate={handleUpdateCategory}
          onDeleteClick={handleOpenDeleteConfirmation}
        />
      )}

      {activeModal === "delete" && selectedCategory && (
        <CategoryDeleteModal
          category={selectedCategory}
          onClose={handleCloseModal}
          onDeleteConfirm={handleDeleteCategory}
        />
      )}
    </>
  );
}

export default AdminCategories;
