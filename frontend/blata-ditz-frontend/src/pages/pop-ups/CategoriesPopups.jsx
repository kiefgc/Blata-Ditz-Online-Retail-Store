import React, { useState } from "react";

const getFileUrl = (file) => {
  return file instanceof File ? URL.createObjectURL(file) : file;
};

export const CategoryCreateModal = ({ onClose, onCreate }) => {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (name.trim()) {
      onCreate({
        name: name.trim(),
        icon: icon.trim(),
        description: description.trim(),
      });
      onClose();
    } else {
      alert("Category Name is required.");
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="category-modal-content">
        <div className="category-create-modal-content">
          <h3>Add New Category</h3>
          <div className="form-group">
            <label htmlFor="categoryName">Category Name</label>
            <input
              type="text"
              id="categoryName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter category name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="categoryName">Category Icon</label>
            <input
              type="url"
              id="categoryIcon"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              placeholder="Enter category icon url"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="categoryDescription">Category Description</label>
            <textarea
              id="categoryDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter category description (optional)"
              rows="3"
            />
          </div>
          <div className="modal-actions">
            <button className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button className="update-details-btn" onClick={handleSubmit}>
              Add Category
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CategoryEditModal = ({
  category,
  onClose,
  onUpdate,
  onDeleteClick,
}) => {
  const [name, setName] = useState(category.name || "");
  const [description, setDescription] = useState(category.description || "");
  const [icon, setIcon] = useState(category.icon || "");

  const handleUpdate = () => {
    if (name.trim()) {
      onUpdate({
        ...category,
        name: name.trim(),
        icon: icon.trim(),
        description: description.trim(),
      });
      onClose();
    } else {
      alert("Category Name is required.");
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="category-modal-content">
        <div className="category-edit-modal-content">
          <h3>View/Edit Category</h3>
          <div className="form-group">
            <label htmlFor="categoryName">Category Name</label>
            <div className="input-with-edit-icon">
              <input
                type="text"
                id="categoryName"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="categoryName">Category Icon</label>
            <input
              type="url"
              id="categoryIcon"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              placeholder="Enter category icon url"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="categoryDescription">Category Description</label>
            <textarea
              id="categoryDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="5"
            />
          </div>
          <div className="modal-actions-delete">
            <button
              className="delete-category-btn"
              onClick={() => onDeleteClick(category)}
            >
              Delete
            </button>

            <button className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button className="update-details-btn" onClick={handleUpdate}>
              Update Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CategoryDeleteModal = ({ category, onClose, onDeleteConfirm }) => {
  return (
    <div className="modal-backdrop">
      <div className="category-modal-content category-delete-modal">
        <h3>Delete Category</h3>
        <p>Are you sure you want to delete the category: {category.name}?</p>
        <div className="modal-actions-delete-confirm">
          <button
            className="update-details-btn"
            onClick={() => onDeleteConfirm(category.id)}
          >
            Yes
          </button>
          <button className="cancel-btn" onClick={onClose}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};
