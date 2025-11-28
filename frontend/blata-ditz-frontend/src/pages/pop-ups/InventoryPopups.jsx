import React, { useState, useRef, useEffect } from "react";
import api from "../../api/api"; // <-- keep your import

// Helper function to create a URL for file previews
const getFileUrl = (file) => {
  return file instanceof File ? URL.createObjectURL(file) : file;
};

const TagInput = ({ tags, onChange }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      onChange([...tags, e.target.value.trim()]);
      e.target.value = "";
    }
  };

  const removeTag = (index) => {
    onChange(tags.filter((_, i) => i !== index));
  };

  return (
    <div className="tag-input-container">
      <div className="tags">
        {tags.map((tag, index) => (
          <span key={index} className="tag-item">
            {tag}
            <button onClick={() => removeTag(index)}>×</button>
          </span>
        ))}
      </div>

      {/* <input
        type="text"
        placeholder="Add tag and press Enter"
        onKeyDown={handleKeyDown}
      /> */}
    </div>
  );
};

export const ProductCreateModal = ({ brandName, onClose }) => {
  const [categories, setCategories] = React.useState([]);
  const [product, setProduct] = useState({
    product_name: "",
    description: "",
    unit_price: "",
    cost_price: "",
    category_ids: "",
    supplier_id: brandName.id || "",
  });

  const handleOpenCreateModal = (supplier) => {
    setCreateModalSupplier({
      name: supplier.supplier_name,
      id: supplier._id,
    });
    setIsCreateModalOpen(true);
  };

  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);

  // Cleanup object URLs
  useEffect(() => {
    return () => {
      selectedFiles.forEach((file) => URL.revokeObjectURL(getFileUrl(file)));
    };
  }, [selectedFiles]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("Failed to load categories", err);
      }
    };
    fetchCategories();
  }, []);

  // General input handler (IDs MUST match state keys)
  const handleChange = (e) => {
    const { id, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [id]:
        id === "unit_price" || id === "cost_price"
          ? value === ""
            ? undefined
            : Number(value)
          : value,
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
        URL.revokeObjectURL(getFileUrl(fileToRemove));
      }
      return prevFiles.filter((_, index) => index !== indexToRemove);
    });
  };

  const handleSubmit = async () => {
    if (!product.product_name || !product.category_ids) {
      alert("Please fill in Product Name and Category.");
      return;
    }

    if (!selectedFiles[0]) {
      alert("Please select a product image.");
      return;
    }

    const formData = new FormData();
    formData.append("product_name", product.product_name);
    formData.append("description", product.description);
    formData.append("unit_price", Number(product.unit_price));
    formData.append("cost_price", Number(product.cost_price));
    formData.append("category_ids", product.category_ids);
    formData.append("supplier_id", product.supplier_id);
    formData.append("image", selectedFiles[0]);

    try {
      const res = await api.post("/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Product created successfully:", res.data);
      onClose(); // close modal after successful creation
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Failed to create product. Check console for details.");
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content-inventory">
        <div className="product-create-form-container">
          <div className="product-edit-header">
            <h3>Add New Product</h3>
            <button className="close-edit-modal-btn" onClick={onClose}>
              x
            </button>
          </div>

          <div className="product-create-body">
            <div className="form-fields">
              {/* Product Name */}
              <div className="form-group">
                <label htmlFor="product_name">Product Name</label>
                <input
                  type="text"
                  id="product_name"
                  value={product.product_name}
                  onChange={handleChange}
                  placeholder="Enter product name"
                  required
                />
              </div>

              {/* Description */}
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  id="description"
                  value={product.description}
                  onChange={handleChange}
                  placeholder="Enter product description"
                  required
                />
              </div>

              {/* Unit Price */}
              <div className="form-group">
                <label htmlFor="unit_price">Unit Price</label>
                <input
                  type="number"
                  id="unit_price"
                  value={product.unit_price}
                  onChange={handleChange}
                  placeholder="Enter unit price"
                  required
                />
              </div>

              {/* Cost Price */}
              <div className="form-group">
                <label htmlFor="cost_price">Cost Price</label>
                <input
                  type="number"
                  id="cost_price"
                  value={product.cost_price}
                  onChange={handleChange}
                  placeholder="Enter cost price"
                  required
                />
              </div>

              {/* Supplier + Categories */}
              <div className="select-group">
                {/* Supplier */}
                <div className="form-group">
                  <label htmlFor="supplier">Supplier</label>
                  <select
                    id="supplier_id"
                    value={product.supplier_id}
                    onChange={handleChange}
                  >
                    <option value={brandName.id}>{brandName.name}</option>
                  </select>
                </div>

                {/* Category (Dynamic) */}
                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <select
                    id="category_ids"
                    value={product.category_ids}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled hidden>
                      Select Category
                    </option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.category_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Image Upload Area */}
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
  const [categories, setCategories] = useState([]);

  const [product, setProduct] = useState({
    ...initialProduct,
    stock_quantity: initialProduct?.inventory?.stock_quantity ?? "",
    reorder_level: initialProduct?.inventory?.reorder_level ?? "",
    max_stock_level: initialProduct?.inventory?.max_stock_level ?? "",
    last_restocked: initialProduct?.inventory?.last_restocked ?? "",
  });

  const [images, setImages] = useState(initialProduct?.images || []);
  const fileInputRef = useRef(null);

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const [showUpdateConfirmation, setShowUpdateConfirmation] = useState(false);

  const [inventoryRecord, setInventoryRecord] = useState(null);

  const handleDelete = () => {
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/products/${product._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("Product deleted successfully");
      setShowDeleteConfirmation(false);
      onClose();
    } catch (err) {
      if (err.response?.status === 409) {
        alert(err.response.data.message);
      } else if (err.response?.status === 404) {
        alert("Product not found");
      } else {
        console.error("Failed to delete product:", err);
        alert("Failed to delete product. Check console for details.");
      }
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  useEffect(() => {
    return () => {
      images.forEach((image) => {
        if (image instanceof File) {
          URL.revokeObjectURL(getFileUrl(image));
        }
      });
    };
  }, [images]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("Failed to load categories", err);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (initialProduct && inventoryRecord) {
      setProduct({
        ...initialProduct,
        stock_quantity: inventoryRecord.stock_quantity,
        reorder_level: inventoryRecord.reorder_level,
        max_stock_level: inventoryRecord.max_stock_level,
        last_restocked: inventoryRecord.last_restocked,
      });
    }
  }, [initialProduct, inventoryRecord]);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const res = await api.get(`/inventory/${initialProduct._id}`);
        setInventoryRecord(res.data);
      } catch (err) {
        console.error("Failed to fetch inventory:", err);
      }
    };

    if (initialProduct?._id) fetchInventory();
  }, [initialProduct]);

  const handleChange = (e) => {
    const { id, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [id]: value,
    }));
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

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("product_name", product.product_name);
      formData.append("description", product.description);
      formData.append("unit_price", Number(product.unit_price));
      formData.append("cost_price", Number(product.cost_price));
      formData.append("category_ids", product.category_ids);
      formData.append("supplier_id", product.supplier_id);
      if (images[0] instanceof File) {
        formData.append("image", images[0]);
      }

      await api.patch(`/products/${product._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      await api.patch(`/inventory/${product._id}`, {
        stock_quantity: Number(product.stock_quantity),
        reorder_level: Number(product.reorder_level),
        max_stock_level: Number(product.max_stock_level),
        last_restocked: product.last_restocked,
      });

      console.log("Product and inventory updated successfully");
      onClose();
    } catch (err) {
      console.error("Failed to update:", err);
      alert(
        "Failed to update product or inventory. Check console for details."
      );
    }
  };

  const confirmUpdate = () => {
    console.log("Updating product:", product.id);
    setShowUpdateConfirmation(false);
    onClose();
  };

  const cancelUpdate = () => {
    setShowUpdateConfirmation(false);
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

              {/* Product Name */}
              <div className="form-group">
                <label htmlFor="product_name">Product Name</label>
                <div className="input-with-edit-icon">
                  <input
                    type="text"
                    id="product_name"
                    value={product.product_name || ""}
                    onChange={handleChange}
                  />
                  <img
                    src="https://img.icons8.com/material-outlined/24/FFFFFF/pencil--v1.png"
                    alt="edit"
                    className="edit-icon"
                  />
                </div>
              </div>

              {/* Product Description */}
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  id="description"
                  value={product.description || ""}
                  onChange={handleChange}
                />
              </div>

              {/* Unit Price */}
              <div className="form-group">
                <label htmlFor="unit_price">Unit Price</label>
                <input
                  type="number"
                  id="unit_price"
                  value={product.unit_price || ""}
                  onChange={handleChange}
                />
              </div>

              {/* Cost Price */}
              <div className="form-group">
                <label htmlFor="cost_price">Cost Price</label>
                <input
                  type="number"
                  id="cost_price"
                  value={product.cost_price || ""}
                  onChange={handleChange}
                />
              </div>

              {/* Stock Fields */}
              <div className="select-group">
                <div className="form-group">
                  <label htmlFor="stock_quantity">Stock</label>
                  <input
                    type="number"
                    id="stock_quantity"
                    value={product.stock_quantity}
                    onChange={handleChange}
                    max="999"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="reorder_level">Reorder Level</label>
                  <input
                    type="number"
                    id="reorder_level"
                    value={product.reorder_level}
                    onChange={handleChange}
                    max="999"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="max_stock_level">Max Stock</label>
                  <input
                    type="number"
                    id="max_stock_level"
                    value={product.max_stock_level}
                    onChange={handleChange}
                    max="999"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="last_restocked">Last Restock</label>
                  <input
                    type="date"
                    id="last_restocked"
                    value={
                      product.last_restocked
                        ? product.last_restocked.split("T")[0]
                        : ""
                    }
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Product Specifications Tag Input */}
              <TagInput
                label="Product Specifications"
                tags={product.specifications || []}
                onChange={(newTags) =>
                  setProduct((prev) => ({ ...prev, specifications: newTags }))
                }
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
                    required
                    value={product.category}
                    onChange={handleChange}
                  >
                    <option value="" disabled hidden>
                      Select Category
                    </option>

                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.category_name}
                      </option>
                    ))}
                  </select>
                </div>
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
                <button
                  className="update-details-btn-inventory"
                  onClick={handleUpdate}
                >
                  Update Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* --- Confirmation Modal JSX --- */}
      {showUpdateConfirmation && (
        <div className="confirmation-backdrop">
          <div className="confirmation-modal">
            <h3>Update Product?</h3>
            <p>
              Are you sure you want to update {product.name} with the new
              details?
            </p>
            <div className="confirmation-actions">
              <button className="cancel-btn-final" onClick={cancelUpdate}>
                Cancel
              </button>
              <button
                className="delete-product-final-btn"
                onClick={confirmUpdate}
              >
                Confirm Update
              </button>
            </div>
          </div>
        </div>
      )}
      {showDeleteConfirmation && (
        <div className="confirmation-backdrop">
          <div className="confirmation-modal">
            <h3>Delete Product?</h3>
            <p>
              Are you sure you want to permanently delete the product -
              {product.product_name}?<br></br>This action cannot be undone.
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
