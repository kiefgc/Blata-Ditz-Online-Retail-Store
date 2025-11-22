import { useState, useRef, useEffect } from "react";
import "./SupplierPopups.css";

export const ViewEditPopup = ({ type, supplier, onClose }) => {
  const [name, setName] = useState(supplier?.name || "");
  const [email, setEmail] = useState(supplier?.email || "");
  const [phone, setPhone] = useState(supplier?.phone_number || "");
  const [address, setAddress] = useState(supplier?.address || "");
  const [date, setDate] = useState(supplier?.start_date || "");
  const [status, setStatus] = useState(supplier?.status || "active");

  const [fieldBeingEdit, setFieldBeingEdit] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const editField = (field, value, setValue) => {
    const isEditing = fieldBeingEdit === field;

    return (
      <div className="s-detail">
        {isEditing ? (
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={() => setFieldBeingEdit(null)}
            autoFocus
            onKeyDown={(e) => e.key === "Enter" && setFieldBeingEdit(null)}
            className="s-edit-input"
          />
        ) : (
          <span>{value}</span>
        )}

        <img
          width="15"
          height="15"
          src="https://img.icons8.com/material-rounded/24/FFFFFF/edit--v1.png"
          alt="edit"
          onClick={() => setFieldBeingEdit(field)}
          style={{ cursor: "pointer" }}
        />
      </div>
    );
  };

  const handleUpdate = () => {
    const updatedSupplier = {
      id: supplier.id,
      name,
      email,
      phone,
      address,
      start_date,
      status,
    };

    console.log("Updated Supplier:", updatedSupplier);
    onClose();
  };

  const handleDelete = () => setShowDeleteConfirmation(true);

  const confirmDelete = () => {
    console.log("Deleted Supplier:", supplier?.name);
    setShowDeleteConfirmation(false);
    onClose();
  };

  const cancelDelete = () => setShowDeleteConfirmation(false);

  const [newSupplier, setNewSupplier] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    start_date: "",
    status: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setNewSupplier((prev) => ({ ...prev, [id]: value }));
  };

  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);

  const getFileUrl = (file) => URL.createObjectURL(file);

  useEffect(() => {
    return () => {
      selectedFiles.forEach((file) => URL.revokeObjectURL(getFileUrl(file)));
    };
  }, [selectedFiles]);

  const handleFileChange = (files) => {
    const newFiles = Array.from(files).filter((file) => file instanceof File);
    setSelectedFiles((prev) => [...prev, ...newFiles]);
  };

  const handleRemoveImage = (index) => {
    setSelectedFiles((prev) => {
      URL.revokeObjectURL(getFileUrl(prev[index]));
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleImageAreaClick = () => fileInputRef.current.click();

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
    e.currentTarget.classList.remove("drag-over");

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) handleFileChange(droppedFiles);
  };

  const handleSubmitProduct = () => {
    if (
      !newSupplier.name ||
      !newSupplier.email ||
      !newSupplier.phone ||
      !newSupplier.address
    ) {
      alert("Please fill in the required fields");
      return;
    }

    console.log("New Supplier:", newSupplier);
    console.log("Uploaded Images:", selectedFiles);

    onClose();
  };

  return (
    <div className="admin-supplier-popup-overlay" onClick={onClose}>
      {/*VIEW / EDIT MODE */}
      {type === "view" && (
        <div
          className="admin-supplier-popup"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="supplier-edit-header">
            <h3>View or Edit Supplier</h3>
            <button className="close-edit-modal-btn" onClick={onClose}>
              &times;
            </button>
          </div>

          <div className="supplier-popup-content">
            <div className="supplier-id">
              <span className="supplier-id-title">ID No. </span>
              <span className="supplier-id-no">{supplier?.id}</span>
            </div>

            <div className="supplier-details">
              <div className="supplier-details-column1">
                <div className="supplier-details-value">
                  <span className="s-detail-heading">Name</span>
                  {editField("name", name, setName)}
                  <hr />
                </div>

                <div className="supplier-details-value">
                  <span className="s-detail-heading">Email</span>
                  {editField("email", email, setEmail)}
                  <hr />
                </div>

                <div className="supplier-details-value">
                  <span className="s-detail-heading">Phone Number</span>
                  {editField("phone", phone, setPhone)}
                  <hr />
                </div>
              </div>

              <div>
                <div className="supplier-details-value address">
                  <span className="s-detail-heading">Address</span>
                  {editField("address", address, setAddress)}
                  <hr />
                </div>

                <div className="details-date-status">
                  <div className="supplier-details-value">
                    <span className="s-detail-heading">Start Date</span>
                    {editField("date", date, setDate)}
                    <hr />
                  </div>

                  <div className="supplier-details-value">
                    <span className="s-detail-heading">Status</span>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="status-dropdown"
                    >
                      <option value="active">ACTIVE</option>
                      <option value="inactive">INACTIVE</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="supplier-editpopup-buttons">
              <button className="supplier-delete-btn" onClick={handleDelete}>
                Delete
              </button>
              <button className="supplier-update-btn" onClick={handleUpdate}>
                Update Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/*DELETE CONFIRMATION */}
      {showDeleteConfirmation && (
        <div className="confirmation-backdrop">
          <div className="confirmation-modal">
            <h3>Delete Supplier?</h3>
            <p>
              Are you sure you want to permanently delete{" "}
              <strong>{supplier?.name}</strong>?
              <br />
              This action cannot be undone.
            </p>

            <div className="confirmation-actions">
              <button className="supplier-cancel-btn" onClick={cancelDelete}>
                Cancel
              </button>
              <button
                className="delete-supplier-final-btn"
                onClick={confirmDelete}
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD SUPPLIER  */}
      {type === "add" && (
        <div className="modal-backdrop">
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="supplier-create-form-container">
              <div className="supplier-edit-header">
                <h3>Add New Supplier</h3>
                <button className="close-edit-modal-btn" onClick={onClose}>
                  x
                </button>
              </div>

              <div className="supplier-create-body">
                <div className="form-fields">
                  {/* Supplier Name */}
                  <div className="supplier-form-group">
                    <label htmlFor="name">Supplier Name</label>
                    <input
                      id="name"
                      value={newSupplier.name}
                      onChange={handleChange}
                      placeholder="Enter supplier name"
                      required
                    />
                  </div>
                  {/* Supplier Email and Phone */}
                  <div className="input-email-phone">
                    <div className="supplier-form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        id="email"
                        value={newSupplier.email}
                        onChange={handleChange}
                        placeholder="Enter email"
                        required
                      />
                    </div>
                    <div className="supplier-form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        id="phone"
                        value={newSupplier.phone}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                        required
                      />
                    </div>
                  </div>
                  {/* Supplier address */}
                  <div className="supplier-form-group">
                    <label htmlFor="address"> Address</label>
                    <input
                      id="address"
                      value={newSupplier.address}
                      onChange={handleChange}
                      placeholder="Enter address"
                      required
                    />
                  </div>
                  {/* Supplier date and status */}
                  <div className="input-email-phone">
                    <div className="supplier-form-group">
                      <label htmlFor="date">Start Date</label>
                      <input
                        id="date"
                        value={newSupplier.date}
                        onChange={handleChange}
                        placeholder="Enter start date"
                        required
                      />
                    </div>
                    <div className="supplier-form-group">
                      <label htmlFor="status">Status</label>
                      <input
                        id="status"
                        value={newSupplier.status}
                        onChange={handleChange}
                        placeholder="Enter status"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* IMAGE UPLOAD */}
                <div className="image-upload-area">
                  <div className="image-preview-wrapper">
                    {selectedFiles.length > 0 && (
                      <div className="image-previews-container">
                        {selectedFiles.map((file, index) => (
                          <div key={index} className="image-preview-item">
                            <img src={getFileUrl(file)} alt="" />

                            <button
                              className="remove-image-btn"
                              onClick={() => handleRemoveImage(index)}
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
                    ref={fileInputRef}
                    onChange={(e) => handleFileChange(e.target.files)}
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
                        <p>Select or drop images to upload</p>
                      </>
                    ) : (
                      <>
                        <img
                          width="24"
                          height="24"
                          src="https://img.icons8.com/ios-filled/50/CCCCCC/plus-math.png"
                          alt="plus"
                          className="plus-icon-small"
                        />
                        <p>Click or drag to add more images</p>
                      </>
                    )}
                  </div>

                  <div className="action-buttons">
                    <button className="supplier-cancel-btn" onClick={onClose}>
                      Cancel
                    </button>
                    <button
                      className="add-supplier-final-btn"
                      onClick={handleSubmitProduct}
                    >
                      Add supplier
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewEditPopup;
