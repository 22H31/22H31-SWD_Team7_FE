import React, { useState, useEffect } from "react";
import styles from "./PopupEditForm.module.css";

function PopupEditForm({ member, onClose, onSave }) {
  const [formData, setFormData] = useState({
    id: "",
    userName: "",
    phoneNumber: "",
    address: "",
    birth: "",
  });

  useEffect(() => {
    if (member) {
      setFormData({
        id: member.id || "",
        userName: member.userName || "",
        phoneNumber: member.phoneNumber || "",
        address: member.address || "",
        birth: member.birth || "",
      });
    }
  }, [member]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof onSave === "function") {
      onSave(formData); // ✅ Chỉ gọi nếu onSave là function
    } else {
      console.error("Error: onSave is not a function");
    }
  };
  

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContent}>
        <h2>Edit Member</h2>
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input 
            type="text" 
            name="userName" 
            value={formData.userName} 
            onChange={handleChange} 
            required 
          />

          <label>Phone Number:</label>
          <input 
            type="text" 
            name="phoneNumber" 
            value={formData.phoneNumber} 
            onChange={handleChange} 
          />

          <label>Address:</label>
          <input 
            type="text" 
            name="address" 
            value={formData.address} 
            onChange={handleChange} 
          />

          <label>Birth:</label>
          <input 
            type="date" 
            name="birth" 
            value={formData.birth} 
            onChange={handleChange} 
          />

          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.saveButton}>Save</button>
            <button type="button" className={styles.cancelButton} onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PopupEditForm;
