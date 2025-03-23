import React, { useState, useEffect } from "react";
import { Card, Button, Modal, Input, Form, InputNumber, message } from "antd";
import styles from "../productManage/ProductCard.module.css";

const API_URL = "https://swdteam7-hfgrdwa4dfhbe0ga.southeastasia-01.azurewebsites.net/api";

const ProductCard = ({ name, price, avatarImageURL, productId, variants, onEditProduct, onUploadImages }) => {
  const [productVariants, setProductVariants] = useState([]);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [variantIdInput, setVariantIdInput] = useState("");
  const [formData, setFormData] = useState({
    volume: "",
    skinType: "",
    price: "",
    stockQuantity: "",
    mainIngredients: "",
    fullIngredients: "",
  });

  useEffect(() => {
    const fetchVariants = async () => {
      try {
        const res = await fetch(`${API_URL}/productVariant`);
        if (!res.ok) throw new Error("Lỗi khi lấy thông tin biến thể sản phẩm!");
        const data = await res.json();
        const filteredVariants = data.filter((variant) => variant.productId === productId);
        setProductVariants(filteredVariants);
      } catch (err) {
        console.error("Lỗi khi lấy thông tin biến thể sản phẩm:", err);
        message.error("Lỗi khi lấy thông tin biến thể sản phẩm!");
      }
    };

    fetchVariants();
  }, [productId]);

  const handleAddVariantClick = () => {
    setFormData({
      volume: "",
      skinType: "",
      price: "",
      stockQuantity: "",
      mainIngredients: "",
      fullIngredients: "",
    });
    setVariantIdInput(""); // Reset variant ID
    setStep(2); // Chuyển sang bước thêm variant
    setPopupOpen(true); // Mở modal
  };

  const handleEditVariantClick = async (variantId) => {
    try {
      const res = await fetch(`${API_URL}/productVariant/${variantId}`);
      if (!res.ok) throw new Error("Lỗi khi lấy thông tin biến thể sản phẩm!");
      const variantData = await res.json();
      setFormData(variantData);
      setVariantIdInput(variantId);
      setStep(2);
      setPopupOpen(true);
    } catch (err) {
      console.error("Lỗi khi lấy thông tin biến thể sản phẩm:", err);
      message.error("Lỗi khi lấy thông tin biến thể sản phẩm!");
    }
  };

  const handleDeleteVariantClick = async (variantId) => {
    if (!window.confirm("Bạn có chắc muốn xóa biến thể này?")) return;

    try {
      const res = await fetch(`${API_URL}/productVariant/${variantId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Lỗi khi xóa biến thể!");
      message.success("Biến thể đã được xóa thành công!");
      setProductVariants(productVariants.filter((variant) => variant.variantId !== variantId));
    } catch (err) {
      console.error("Lỗi khi xóa biến thể:", err);
      message.error("Lỗi khi xóa biến thể!");
    }
  };

  const handleDeleteProductClick = async () => {
    if (!window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;

    try {
      const res = await fetch(`${API_URL}/products/${productId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Lỗi khi xóa sản phẩm!");
      message.success("Sản phẩm đã được xóa thành công!");
      // Bạn có thể thêm logic để cập nhật danh sách sản phẩm tại đây nếu cần
    } catch (err) {
      console.error("Lỗi khi xóa sản phẩm:", err);
      message.error("Lỗi khi xóa sản phẩm!");
    }
  };

  const handleFinish = async () => {
    try {
      const url = variantIdInput
        ? `${API_URL}/productVariant/${variantIdInput}`
        : `${API_URL}/productVariant`;

      const method = variantIdInput ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, productId }),
      });

      if (!res.ok) throw new Error("Lỗi khi thêm hoặc cập nhật biến thể sản phẩm!");
      message.success(
        variantIdInput
          ? "Biến thể sản phẩm đã được cập nhật thành công!"
          : "Biến thể sản phẩm đã được thêm thành công!"
      );
      setPopupOpen(false);

      const updatedVariants = await fetch(`${API_URL}/productVariant`).then((res) =>
        res.json()
      );
      setProductVariants(
        updatedVariants.filter((variant) => variant.productId === productId)
      );
    } catch (err) {
      console.error("Lỗi khi thêm hoặc cập nhật biến thể sản phẩm:", err);
      message.error("Thêm hoặc cập nhật biến thể sản phẩm thất bại!");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles["product-card"]}>
      {/* Hình ảnh sản phẩm */}
      <img src={avatarImageURL} alt={name} className={styles["product-card__image"]} />

      {/* Chi tiết sản phẩm */}
      <div className={styles["product-card__details"]}>
        <h3 className={styles["product-card__name"]}>{name}</h3>
        <p className={styles["product-card__price"]}>{price} VND</p>
      </div>

      {/* Biến thể sản phẩm */}
      {productVariants.map((variant) => (
        <div key={variant.variantId} className={styles["product-card__variant"]}>
          <p>Variant ID: {variant.variantId}</p>
          <p>Stock: {variant.stockQuantity}</p>
          <button
            className={styles["product-card__action-button"]}
            onClick={() => handleEditVariantClick(variant.variantId)}
          >
            Edit Variant
          </button>
          <button
            className={styles["product-card__delete-button"]}
            onClick={() => handleDeleteVariantClick(variant.variantId)}
          >
            Delete Variant
          </button>
        </div>
      ))}

      {/* Hành động */}
      <div className={styles["product-card__actions"]}>
        <button className={styles["product-card__action-button"]} onClick={onEditProduct}>
          Edit Product
        </button>
        <button className={styles["product-card__delete-button"]} onClick={handleDeleteProductClick}>
          Delete Product
        </button>
        <button className={styles["product-card__edit-button"]} onClick={() => onUploadImages(productId)}>
          Upload Images
        </button>
        <button className={styles["product-card__action-button"]} onClick={handleAddVariantClick}>
          Add Variant
        </button>
      </div>

      {/* Modal thêm hoặc chỉnh sửa biến thể */}
      <Modal
        title={variantIdInput ? "Edit Variant" : "Add Variant"}
        open={isPopupOpen}
        onCancel={() => setPopupOpen(false)}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleFinish}>
          <Form.Item label="Volume (ml)">
            <InputNumber
              name="volume"
              value={formData.volume}
              onChange={(value) => handleChange({ target: { name: "volume", value } })}
              placeholder="Enter volume"
              required
            />
          </Form.Item>
          <Form.Item label="Skin Type">
            <Input
              name="skinType"
              value={formData.skinType}
              onChange={handleChange}
              placeholder="Enter skin type"
              required
            />
          </Form.Item>
          <Form.Item label="Price (VND)">
            <InputNumber
              name="price"
              value={formData.price}
              onChange={(value) => handleChange({ target: { name: "price", value } })}
              placeholder="Enter price"
              required
            />
          </Form.Item>
          <Form.Item label="Stock Quantity">
            <InputNumber
              name="stockQuantity"
              value={formData.stockQuantity}
              onChange={(value) => handleChange({ target: { name: "stockQuantity", value } })}
              placeholder="Enter stock quantity"
              required
            />
          </Form.Item>
          <Form.Item label="Main Ingredients">
            <Input
              name="mainIngredients"
              value={formData.mainIngredients}
              onChange={handleChange}
              placeholder="Enter main ingredients"
              required
            />
          </Form.Item>
          <Form.Item label="Full Ingredients">
            <Input
              name="fullIngredients"
              value={formData.fullIngredients}
              onChange={handleChange}
              placeholder="Enter full ingredients"
              required
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {variantIdInput ? "Update Variant" : "Add Variant"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductCard;