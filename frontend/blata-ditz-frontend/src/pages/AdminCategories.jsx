import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AdminCategories.css";
import api from "../api/api.js";
import {
  CategoryCreateModal,
  CategoryEditModal,
  CategoryDeleteModal,
  CategoryUpdateConfirmModal,
} from "./pop-ups/CategoriesPopups.jsx";

function AdminCategories() {
  const [categories, setCategories] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showSmallSearchbar, setShowSmallSearchbar] = useState(false);

  const [activeModal, setActiveModal] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryToUpdate, setCategoryToUpdate] = useState(null);

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
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories");
        const data = res.data;

        const mapped = data.map((item) => ({
          id: item._id,
          name: item.category_name,
          description: item.description,
          isActive: item.is_active,
          createdAt: item.created_at,
          updatedAt: item.updated_at,
        }));

        setCategories(mapped);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCardClick = (category) => {
    if (category.isAction) {
      setActiveModal("create");
    } else {
      setSelectedCategory(category);
      setActiveModal("edit");
    }
  };

  const handleCloseModal = () => {
    setActiveModal(null);
    setSelectedCategory(null);
    setCategoryToUpdate(null);
  };

  const handleCreateCategory = async (newCategoryData) => {
    try {
      const payload = {
        category_name: newCategoryData.category_name,
        description: newCategoryData.description,
      };

      const res = await api.post("/categories", payload);

      const saved = res.data;

      const mapped = {
        id: saved._id,
        name: saved.category_name,
        description: saved.description,
        isActive: saved.is_active,
        createdAt: saved.created_at,
        updatedAt: saved.updated_at,
      };

      setCategories((prev) => [...prev, mapped]);
      handleCloseModal();
    } catch (error) {
      console.error("Failed to create category:", error);
    }
  };

  const handleOpenEdit = (category) => {
    setSelectedCategory(category);
    setActiveModal("edit");
  };

  const handleOpenUpdateConfirmation = (updatedCategoryData) => {
    setSelectedCategory(null);
    setCategoryToUpdate(updatedCategoryData);
    setActiveModal("confirmUpdate");
  };

  const handleConfirmUpdate = () => {
    if (!categoryToUpdate) return;
    setCategories((prev) =>
      prev.map((s) => (s.id === categoryToUpdate.id ? categoryToUpdate : s))
    );
    handleCloseModal();
  };

  const handleOpenDeleteConfirmation = (category) => {
    setSelectedCategory(null);
    setSelectedCategory(category);
    setActiveModal("delete");
  };

  const handleUpdateCategory = async (updatedCategoryData) => {
    if (!selectedCategory) return;

    try {
      const payload = {
        category_name: updatedCategoryData.category_name,
        description: updatedCategoryData.description,
        is_active: updatedCategoryData.isActive,
      };

      const res = await api.patch(
        `/categories/${selectedCategory.id}`,
        payload
      );

      const saved = res.data;

      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === selectedCategory.id
            ? {
                ...cat,
                name: saved.category_name,
                description: saved.description,
                isActive: saved.is_active,
                updatedAt: saved.updated_at,
              }
            : cat
        )
      );

      handleCloseModal();
    } catch (error) {
      console.error("Failed to update category:", error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await api.delete(`/categories/${categoryId}`);

      setCategories((prev) => prev.filter((cat) => cat.id !== categoryId));

      handleCloseModal();
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  const filteredCategories = categories.filter((category) =>
    Object.values(category).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

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
            </ul>
          </div>
          <div className="main-content-categories">
            <div className="categories-table-container">
              <table className="categories-table">
                <thead>
                  <tr>
                    <th>Category Name</th>
                    <th>Description</th>
                    <th>Active Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCategories.map((category) => (
                    <tr
                      key={category.id}
                      onClick={() => handleOpenEdit(category)}
                    >
                      <td>{category.name}</td>
                      <td className="description-cell">
                        {category.description}
                      </td>
                      <td
                        className={
                          category.isActive
                            ? "active-status"
                            : "inactive-status"
                        }
                      >
                        {category.isActive ? "Active" : "Inactive"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredCategories.length === 0 && (
                <div className="no-results">
                  No categories found matching "{searchTerm}".
                </div>
              )}
            </div>
            <div className="categories-controls">
              <button
                className="add-category-btn"
                onClick={() => setActiveModal("create")}
              >
                Add Category
              </button>
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

        {activeModal === "confirmUpdate" && categoryToUpdate && (
          <CategoryUpdateConfirmModal
            category={categoryToUpdate}
            onClose={handleCloseModal}
            onConfirmUpdate={handleConfirmUpdate}
          />
        )}
      </div>
    </>
  );
}

export default AdminCategories;
