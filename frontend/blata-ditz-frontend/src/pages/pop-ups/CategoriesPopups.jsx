import { useEffect, useState } from "react";

export const CategoryCreateModal = ({ onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [showError, setShowError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // Client-side validation
    if (formData.name.trim() && formData.description.trim()) {
      onCreate(formData);
    } else {
      setShowError(true);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="category-modal-content">
        {showError && (
          <CustomMessageModal
            title="Error"
            message="Category Name and Description are required."
            onClose={() => setShowError(false)}
          />
        )}
        <h3>Add New Category</h3>
        <div className="form-group">
          <label htmlFor="categoryName">Category Name</label>
          <input
            type="text"
            id="categoryName"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Adventure"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Briefly describe this category."
            required
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
  );
};

export const CategoryEditModal = ({
  category,
  onClose,
  onUpdate,
  onDeleteClick,
}) => {
  const [formData, setFormData] = useState(category);
  const [showError, setShowError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "isActive") {
      setFormData((prev) => ({ ...prev, [name]: value === "true" }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdate = () => {
    if (formData.name.trim() && formData.description.trim()) {
      onUpdate(formData);
    } else {
      setShowError(true);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="category-modal-content">
        {showError && (
          <CustomMessageModal
            title="Error"
            message="Category Name and Description are required."
            onClose={() => setShowError(false)}
          />
        )}
        <h3>Edit Category: {category.name}</h3>

        <div className="form-group">
          <label htmlFor="categoryName">Category Name</label>
          <input
            type="text"
            id="categoryName"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="3"
          />
        </div>
        <div className="form-group">
          <label htmlFor="isActive">Status</label>
          <select
            id="isActive"
            name="isActive"
            value={formData.isActive ? "true" : "false"}
            onChange={handleChange}
            className="status-select-input"
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
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
  );
};

export const CategoryDeleteModal = ({ category, onClose, onDeleteConfirm }) => {
  return (
    <div className="modal-backdrop">
      <div className="category-modal-content category-delete-modal">
        <h3>Delete Category</h3>
        <p>Are you sure you want to delete category: {category.name}?</p>
        <div className="modal-actions-delete-confirm">
          <button
            className="update-details-btn"
            onClick={() => onDeleteConfirm(category.id)}
            style={{
              width: "auto",
              padding: "10px 20px",
              color: "white",
              backgroundColor: "#880000",
            }}
          >
            Yes, Delete
          </button>
          <button
            className="cancel-btn"
            onClick={onClose}
            style={{ width: "auto", padding: "10px 20px" }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export const CategoryUpdateConfirmModal = ({
  category,
  onClose,
  onConfirmUpdate,
}) => {
  return (
    <div className="modal-backdrop">
      <div className="category-modal-content category-delete-modal">
        <h3>Confirm Update</h3>
        <p>
          Are you sure you want to save changes for category: {category.name}?
        </p>
        <div className="modal-actions-delete-confirm">
          <button
            className="update-details-btn"
            onClick={onConfirmUpdate}
            style={{ width: "auto", padding: "10px 20px" }}
          >
            Yes, Update
          </button>
          <button
            className="cancel-btn"
            onClick={onClose}
            style={{ width: "auto", padding: "10px 20px" }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
