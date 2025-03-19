import React, { useState } from "react";
import styles from "./popupForm.module.css"; // Import CSS (tùy chỉnh nếu cần)
import teamPage from "./teamPage";
const PopupForm = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    email: "",
  });

  // Xử lý thay đổi input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Xử lý khi nhấn Save
  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof onSave === "function") {
      onSave(formData);
    } else {
      console.error("Error: onSave is not a function");
    }
  };
  

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContent}>
        <h2>Add New Member</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input type="text" name="userName" value={formData.userName} onChange={handleChange} required />
          </label>

          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </label>

          <label>
            Password:
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </label>

          <div className={styles.buttonGroup}>
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupForm;
