import React, { useState, useRef, useEffect } from "react";

// Helper function to create a URL for file previews
const getFileUrl = (file) => {
  return file instanceof File ? URL.createObjectURL(file) : file;
};

const TagInput = ({ label, tags, onAddTag, onRemoveTag }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      onAddTag(inputValue.trim());
      setInputValue("");
    }
  };

  const handleAddButtonClick = () => {
    if (inputValue.trim() !== "") {
      onAddTag(inputValue.trim());
      setInputValue("");
    }
  };

  return (
    <div className="form-group tag-input-group">
      <label>{label}</label>
      <div className="tags-container">
        {tags.map((tag, index) => (
          <span key={index} className="tag-item">
            {tag}
            <button className="remove-tag-btn" onClick={() => onRemoveTag(tag)}>
              &times;
            </button>
          </span>
        ))}
        <input
          type="text"
          placeholder={`Add ${label.toLowerCase().slice(0, -1)}`}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
        />
        <button className="add-tag-btn" onClick={handleAddButtonClick}>
          <img
            width="24"
            height="24"
            src="https://img.icons8.com/ios-filled/50/FFD033/plus-math.png"
            alt="plus-math"
          />
        </button>
      </div>
    </div>
  );
};

export const ProductCreateModal = ({ brandName, onClose }) => {
  const [product, setProduct] = useState({
    name: "",
    specifications: [],
    requirements: [],
    connectivity: [],
    supplier: brandName || "",
    category: "",
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    return () => {
      selectedFiles.forEach((file) => URL.revokeObjectURL(getFileUrl(file)));
    };
  }, [selectedFiles]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setProduct((prev) => ({ ...prev, [id]: value }));
  };

  const handleAddTag = (category, newTag) => {
    setProduct((prev) => ({
      ...prev,
      [category]: [...(prev[category] || []), newTag],
    }));
  };

  const handleRemoveTag = (category, tagToRemove) => {
    setProduct((prev) => ({
      ...prev,
      [category]: prev[category].filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleFileChange = (files) => {
    const newFiles = Array.from(files).filter((file) => file instanceof File);
    setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleImageAreaClick = () => {
    fileInputRef.current.click();
  };

  const handleRemoveImage = (indexToRemove) => {
    setSelectedFiles((prevFiles) => {
      const fileToRemove = prevFiles[indexToRemove];
      if (fileToRemove instanceof File) {
        URL.revokeObjectURL(getFileUrl(fileToRemove)); // Clean up URL
      }
      return prevFiles.filter((_, index) => index !== indexToRemove);
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add("drag-over");
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove("drag-over");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove("drag-over");
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      handleFileChange(droppedFiles);
    }
  };

  const handleSubmit = () => {
    if (!product.name || !product.category) {
      alert("Please fill in Product Name and Category.");
      return;
    }

    console.log("Submitting new product:", product);
    console.log("Files to upload:", selectedFiles);
    onClose();
  };
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <div className="product-create-form-container">
          <div className="product-edit-header">
            <h3>Add New Product</h3>
            <button className="close-edit-modal-btn" onClick={onClose}>
              x
            </button>
          </div>
          <div className="product-create-body">
            <div className="form-fields">
              <div className="form-group">
                <label htmlFor="productName">Product Name</label>
                <input
                  type="text"
                  id="productName"
                  placeholder="Enter product name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="requirements">Specifications</label>
                <div className="input-with-button">
                  <input
                    type="text"
                    id="requirements"
                    placeholder="Add requirements"
                  />
                  <button className="add-detail-btn">ADD DETAIL</button>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="requirements">Requirements</label>
                <div className="input-with-button">
                  <input
                    type="text"
                    id="requirements"
                    placeholder="Add requirements"
                  />
                  <button className="add-detail-btn">ADD DETAIL</button>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="connectivity">Connectivity</label>
                <div className="input-with-button">
                  <input
                    type="text"
                    id="connectivity"
                    placeholder="Add connectivity"
                  />
                  <button className="add-detail-btn">ADD DETAIL</button>
                </div>
              </div>

              <div className="select-group">
                <div className="form-group">
                  <label htmlFor="supplier">Supplier</label>
                  <select id="supplier">
                    <option value="">{brandName}</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <select id="category" required>
                    <option value="" selected disabled hidden>
                      Select Category
                    </option>
                    <option value="PS5">PS5</option>
                    <option value="PS4">PS4</option>
                    <option value="switch">Switch</option>
                    <option value="xbox">Xbox</option>
                    <option value="pc-max">PC/MAC</option>
                    <option value="collectibles">Collectibles</option>
                    <option value="pre-orders">Pre-Orders</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="image-upload-area">
              <div className="image-preview-wrapper">
                {selectedFiles.length > 0 && (
                  <div className="image-previews-container">
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="image-preview-item">
                        <img
                          src={getFileUrl(file)}
                          alt={`Product Image ${index + 1}`}
                        />
                        <button
                          className="remove-image-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveImage(index);
                          }}
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => handleFileChange(e.target.files)}
                ref={fileInputRef}
                style={{ display: "none" }}
              />
              <div
                className="image-input-drop-zone"
                onClick={handleImageAreaClick}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {selectedFiles.length === 0 ? (
                  <>
                    <div className="image-icon-placeholder"></div>
                    <p>
                      Add product images by selecting or dropping image files
                    </p>
                  </>
                ) : (
                  <>
                    <img
                      width="24"
                      height="24"
                      src="https://img.icons8.com/ios-filled/50/CCCCCC/plus-math.png"
                      alt="plus-math"
                      className="plus-icon-small"
                    />
                    <p>Click or drag to add more images</p>
                  </>
                )}
              </div>
              <div className="action-buttons">
                <button className="cancel-btn-inventory" onClick={onClose}>
                  Cancel
                </button>
                <button
                  className="add-product-final-btn"
                  onClick={handleSubmit}
                >
                  Add Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProductEditModal = ({ initialProduct, onClose }) => {
  const [product, setProduct] = useState(initialProduct || {});
  const [images, setImages] = useState(initialProduct?.images || []);
  const fileInputRef = useRef(null);

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  useEffect(() => {
    return () => {
      images.forEach((image) => {
        if (image instanceof File) {
          URL.revokeObjectURL(getFileUrl(image));
        }
      });
    };
  }, [images]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setProduct((prev) => ({ ...prev, [id]: value }));
  };

  const handleAddTag = (category, newTag) => {
    setProduct((prev) => ({
      ...prev,
      [category]: [...(prev[category] || []), newTag],
    }));
  };

  const handleRemoveTag = (category, tagToRemove) => {
    setProduct((prev) => ({
      ...prev,
      [category]: prev[category].filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleImageFileChange = (files) => {
    const newFiles = Array.from(files).filter((file) => file instanceof File);
    setImages((prevImages) => [...prevImages, ...newFiles]);
  };

  const handleRemoveImage = (indexToRemove) => {
    setImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
  };

  //reorder images
  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("imageIndex", index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add("drag-over");
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove("drag-over-target");
  };

  const handleDrop = (e, targetIndex) => {
    e.currentTarget.classList.remove("drag-over");

    const draggedIndex = parseInt(e.dataTransfer.getData("imageIndex"), 10);

    if (targetIndex !== undefined) {
      const draggedImage = images[draggedIndex];
      const newImages = images.filter((_, index) => index !== draggedIndex);
      newImages.splice(targetIndex, 0, draggedImage);
      setImages(newImages);
    }
  };

  const handleUpdate = () => {
    console.log("Updating product:", product.id);
    console.log("Product data:", product);
    console.log("Images:", images);
    onClose();
  };

  const handleDelete = () => {
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = () => {
    console.log("Deleting product:", product.id);
    setShowDeleteConfirmation(false);
    onClose();
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content-edit">
        <div className="product-edit-form-container">
          <div className="product-edit-header">
            <h3>Edit Product</h3>
            <button className="close-edit-modal-btn" onClick={onClose}>
              &times;
            </button>
          </div>

          <div className="product-edit-body">
            <div className="edit-left-panel">
              <p className="product-id">
                ID No. <span>{product.id}</span>
              </p>

              <div className="form-group">
                <label htmlFor="name">Product Name</label>
                <div className="input-with-edit-icon">
                  <input
                    type="text"
                    id="name"
                    value={product.name || ""}
                    onChange={handleChange}
                  />
                  <img
                    src="https://img.icons8.com/material-outlined/24/FFFFFF/pencil--v1.png"
                    alt="edit"
                    className="edit-icon"
                  />
                </div>
              </div>

              {/* Product Specifications Tag Input */}
              <TagInput
                label="Product Specifications"
                tags={product.specifications || []}
                onAddTag={(tag) => handleAddTag("specifications", tag)}
                onRemoveTag={(tag) => handleRemoveTag("specifications", tag)}
              />

              {/* Requirements Tag Input */}
              <TagInput
                label="Requirements"
                tags={product.requirements || []}
                onAddTag={(tag) => handleAddTag("requirements", tag)}
                onRemoveTag={(tag) => handleRemoveTag("requirements", tag)}
              />

              {/* Connectivity Tag Input */}
              <TagInput
                label="Connectivity"
                tags={product.connectivity || []}
                onAddTag={(tag) => handleAddTag("connectivity", tag)}
                onRemoveTag={(tag) => handleRemoveTag("connectivity", tag)}
              />
            </div>

            <div className="edit-right-panel">
              {/* Supplier & Category */}
              <div className="edit-select-group">
                <div className="form-group">
                  <label htmlFor="supplier">Supplier</label>
                  <select
                    id="supplier"
                    value={product.supplier || ""}
                    onChange={handleChange}
                  >
                    <option value="">Select Supplier</option>
                    <option value="Akko">Akko</option>
                    <option value="Corsair">Corsair</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <select
                    id="category"
                    value={product.category || ""}
                    onChange={handleChange}
                  >
                    <option value="">Select Category</option>
                    <option value="Keyboard">Keyboard</option>
                    <option value="Mouse">Mouse</option>
                  </select>
                </div>
              </div>

              {/* Status */}
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  value={product.active ? "Active" : "Inactive"}
                  onChange={(e) =>
                    setProduct((prev) => ({
                      ...prev,
                      active: e.target.value === "Active",
                    }))
                  }
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              {/* Images Section */}
              <div className="images-section">
                <label>Images </label>
                <span className="image-reorder-hint">
                  (Re-order images by dragging)
                </span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleImageFileChange(e.target.files)}
                  ref={fileInputRef}
                  style={{ display: "none" }}
                />

                <div className="edit-image-preview-wrapper">
                  <div className="edit-image-grid">
                    {images.map((image, index) => (
                      <div
                        key={index}
                        className="edit-image-item"
                        draggable
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={(e) => handleDrop(e, index)}
                      >
                        <img
                          src={getFileUrl(image)}
                          alt={`Product Image ${index + 1}`}
                        />
                        <button
                          className="remove-image-btn"
                          onClick={() => handleRemoveImage(index)}
                        >
                          &times;
                        </button>
                        <span className="drag-handle"></span>{" "}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div
                className="edit-image-drop-zone"
                onClick={() => fileInputRef.current.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={(e) => {
                  e.stopPropagation();
                  e.currentTarget.classList.remove("drag-over");
                  const droppedFiles = e.dataTransfer.files;
                  if (droppedFiles.length > 0) {
                    handleImageFileChange(droppedFiles);
                  }
                }}
              >
                <div className="image-icon-placeholder"></div>
                <p>Click or drag new images to upload</p>
              </div>

              {/* Action Buttons */}
              <div className="edit-action-buttons">
                <button className="delete-product-btn" onClick={handleDelete}>
                  Delete
                </button>
                <button className="update-details-btn" onClick={handleUpdate}>
                  Update Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* --- Confirmation Modal JSX --- */}
      {showDeleteConfirmation && (
        <div className="confirmation-backdrop">
          <div className="confirmation-modal">
            <h3>Delete Product?</h3>
            <p>
              Are you sure you want to permanently delete the product -
              {product.name}?<br></br>This action cannot be undone.
            </p>
            <div className="confirmation-actions">
              <button className="cancel-btn-final" onClick={cancelDelete}>
                Cancel
              </button>
              <button
                className="delete-product-final-btn"
                onClick={confirmDelete}
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
