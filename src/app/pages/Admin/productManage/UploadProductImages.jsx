import React, { useState } from "react";
import styles from "./UploadProductImage.module.css";

const API_URL = "https://beteam720250214143214.azurewebsites.net/api";

const UploadProductImages = ({ productId, setPopupOpen }) => {
  const [avatarFiles, setAvatarFiles] = useState([]);
  const [productImages, setProductImages] = useState([]);

  const handleAvatarChange = (e) => {
    setAvatarFiles(e.target.files);
  };

  const handleProductImagesChange = (e) => {
    setProductImages(e.target.files);
  };

  const handleUploadAvatar = async () => {
    if (!productId || avatarFiles.length === 0) {
      alert("Chưa chọn ảnh đại diện!");
      return;
    }

    const formData = new FormData();
    Array.from(avatarFiles).forEach((file) => formData.append("fileDtos", file));

    try {
      const res = await fetch(`${API_URL}/products/${productId}/product_avartar_images`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Lỗi upload ảnh đại diện!");
      alert("Ảnh đại diện đã được upload!");
    } catch (err) {
      console.error("Lỗi upload ảnh đại diện:", err);
      alert("Upload ảnh thất bại!");
    }
  };

  const handleUploadProductImages = async () => {
    if (!productId || productImages.length === 0) {
      alert("Chưa chọn ảnh sản phẩm!");
      return;
    }

    const formData = new FormData();
    Array.from(productImages).forEach((file) => formData.append("fileDtos", file));

    try {
      const res = await fetch(`${API_URL}/products/${productId}/product_images`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Lỗi upload ảnh sản phẩm!");
      alert("Ảnh sản phẩm đã được upload!");
      setPopupOpen(false); // Close the popup after uploading images
    } catch (err) {
      console.error("Lỗi upload ảnh sản phẩm:", err);
      alert("Upload ảnh sản phẩm thất bại!");
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <h2>Upload Images</h2>
        <button className={styles.closeBtn} onClick={() => setPopupOpen(false)}>✖</button>
        <div className={styles.uploadContainer}>
          <div className={styles.uploadSection}>
            <h3>Upload Avatar Image</h3>
            <input type="file" accept="image/*" multiple onChange={handleAvatarChange} />
            <button onClick={handleUploadAvatar}>Upload Avatar</button>
          </div>

          <div className={styles.uploadSection}>
            <h3>Upload Product Images</h3>
            <input type="file" accept="image/*" multiple onChange={handleProductImagesChange} />
            <button onClick={handleUploadProductImages}>Upload Product Images</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadProductImages;