import React, { useState, useEffect } from "react";
import { Card, Button, Modal, Input, Form, InputNumber, message, Row, Col } from "antd";
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

  const handleEditProductClick = async () => {
    try {
      const res = await fetch(`${API_URL}/products/${productId}`);
      if (!res.ok) throw new Error("Lỗi khi lấy thông tin sản phẩm!");
      const data = await res.json();
      onEditProduct(data);
    } catch (err) {
      console.error("Lỗi khi lấy thông tin sản phẩm:", err);
      message.error("Lỗi khi lấy thông tin sản phẩm!");
    }
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
      setProductVariants(productVariants.filter(variant => variant.variantId !== variantId));
    } catch (err) {
      console.error("Lỗi khi xóa biến thể:", err);
      message.error("Lỗi khi xóa biến thể!");
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

  const handleDeleteClick = async () => {
    if (!window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;

    try {
      const res = await fetch(`${API_URL}/products/${productId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Lỗi khi xóa sản phẩm!");
      message.success("Sản phẩm đã được xóa thành công!");
      // Handle delete logic here
      console.log("Deleted product:", productId);
    } catch (err) {
      console.error("Lỗi khi xóa sản phẩm:", err);
      message.error("Lỗi khi xóa sản phẩm!");
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <Card
        hoverable
        cover={<img alt={name} src={avatarImageURL} className={styles.image} />}
        actions={[
          <Row gutter={[8, 8]} justify="center">
            <Col>
              <Button type="primary" onClick={handleEditProductClick}>
                Edit Product
              </Button>
            </Col>
            <Col>
              <Button onClick={() => onUploadImages(productId)}>Upload Images</Button>
            </Col>
            <Col>
              <Button onClick={handleAddVariantClick}>Add Variant</Button>
            </Col>
            <Col>
              <Button danger onClick={handleDeleteClick}>
                Delete
              </Button>
            </Col>
          </Row>,
        ]}
      >
        <Card.Meta title={name} description={`${price} VND`} />
        {productVariants.map((variant) => (
          <Card key={variant.variantId} className={styles.variant}>
            <p>Variant ID: {variant.variantId}</p>
            <p>Stock: {variant.stockQuantity}</p>
            <Button type="primary" onClick={() => handleEditVariantClick(variant.variantId)}>Edit Variant</Button>
            <Button danger onClick={() => handleDeleteVariantClick(variant.variantId)}>Delete Variant</Button>
          </Card>
        ))}
      </Card>

      <Modal
        title={variantIdInput ? "Edit Variant" : "Add Variant"}
        visible={isPopupOpen}
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