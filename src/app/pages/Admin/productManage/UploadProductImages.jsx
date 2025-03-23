import React, { useState } from "react";
import { Upload, Button, Modal, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import styles from "./UploadProductImage.module.css";

const API_URL = "https://swdteam7-hfgrdwa4dfhbe0ga.southeastasia-01.azurewebsites.net/api";

const UploadProductImages = ({ productId, isPopupOpen, setPopupOpen }) => {
  const [avatarFiles, setAvatarFiles] = useState([]);
  const [productImages, setProductImages] = useState([]);

  const handleAvatarChange = ({ fileList }) => {
    setAvatarFiles(fileList);
  };

  const handleProductImagesChange = ({ fileList }) => {
    setProductImages(fileList);
  };

  const handleUploadAvatar = async () => {
    if (!productId || avatarFiles.length === 0) {
      message.error("Chưa chọn ảnh đại diện!");
      return;
    }

    const formData = new FormData();
    avatarFiles.forEach((file) => formData.append("fileDtos", file.originFileObj));

    try {
      const res = await fetch(`${API_URL}/products/${productId}/product_avartar_images`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Lỗi upload ảnh đại diện!");
      message.success("Ảnh đại diện đã được upload!");
    } catch (err) {
      console.error("Lỗi upload ảnh đại diện:", err);
      message.error("Upload ảnh thất bại!");
    }
  };

  const handleUploadProductImages = async () => {
    if (!productId || productImages.length === 0) {
      message.error("Chưa chọn ảnh sản phẩm!");
      return;
    }

    const formData = new FormData();
    productImages.forEach((file) => formData.append("fileDtos", file.originFileObj));

    try {
      const res = await fetch(`${API_URL}/products/${productId}/product_images`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Lỗi upload ảnh sản phẩm!");
      message.success("Ảnh sản phẩm đã được upload!");
      setPopupOpen(false); // Close the popup after uploading images
    } catch (err) {
      console.error("Lỗi upload ảnh sản phẩm:", err);
      message.error("Upload ảnh sản phẩm thất bại!");
    }
  };

  return (
    <Modal
      title="Upload Images"
      visible={isPopupOpen}
      onCancel={() => setPopupOpen(false)}
      footer={null}
    >
      <div className={styles["upload-container"]}>
        {/* Upload Avatar Section */}
        <div className={styles["upload-container__section"]}>
          <h3 className={styles["upload-container__section-title"]}>Upload Avatar Image</h3>
          <Upload
            accept="image/*"
            multiple
            fileList={avatarFiles}
            onChange={handleAvatarChange}
            beforeUpload={() => false} // Prevent automatic upload
            className={styles["upload-container__file-input"]}
          >
            <Button icon={<UploadOutlined />} className={styles["upload-container__button"]}>
              Select Avatar Image
            </Button>
          </Upload>
          <Button
            type="primary"
            onClick={handleUploadAvatar}
            className={styles["upload-container__button"]}
            style={{ marginTop: 16 }}
          >
            Upload Avatar
          </Button>
        </div>

        {/* Upload Product Images Section */}
        <div className={styles["upload-container__section"]}>
          <h3 className={styles["upload-container__section-title"]}>Upload Product Images</h3>
          <Upload
            accept="image/*"
            multiple
            fileList={productImages}
            onChange={handleProductImagesChange}
            beforeUpload={() => false} // Prevent automatic upload
            className={styles["upload-container__file-input"]}
          >
            <Button icon={<UploadOutlined />} className={styles["upload-container__button"]}>
              Select Product Images
            </Button>
          </Upload>
          <Button
            type="primary"
            onClick={handleUploadProductImages}
            className={styles["upload-container__button"]}
            style={{ marginTop: 16 }}
          >
            Upload Product Images
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default UploadProductImages;