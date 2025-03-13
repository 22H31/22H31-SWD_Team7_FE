import React, { useState, useEffect } from "react";
import styles from "../productManage/ProductCard.module.css";

const API_URL = "https://beteam720250214143214.azurewebsites.net/api";

const ProductCard = ({ name, price, image, productId, variants, onEditProduct }) => {
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
    fullIngredients: ""
  });

  useEffect(() => {
    const fetchVariants = async () => {
      try {
        const res = await fetch(`${API_URL}/productVariant`);
        if (!res.ok) throw new Error("Lỗi khi lấy thông tin biến thể sản phẩm!");
        const data = await res.json();
        const filteredVariants = data.filter(variant => variant.productId === productId);
        setProductVariants(filteredVariants);
      } catch (err) {
        console.error("Lỗi khi lấy thông tin biến thể sản phẩm:", err);
        alert("Lỗi khi lấy thông tin biến thể sản phẩm!");
      }
    };

    fetchVariants();
  }, [productId]);

  const handleEditProductClick = async () => {
    try {
      const res = await fetch(`${API_URL}/products/${productId}`);
      if (!res.ok) throw new Error("Lỗi khi lấy thông tin sản phẩm!");
      const data = await res.json();
      onEditProduct(data);
    } catch (err) {
      console.error("Lỗi khi lấy thông tin sản phẩm:", err);
      alert("Lỗi khi lấy thông tin sản phẩm!");
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
      alert("Lỗi khi lấy thông tin biến thể sản phẩm!");
    }
  };

  const handleDeleteVariantClick = async (variantId) => {
    if (!window.confirm("Bạn có chắc muốn xóa biến thể này?")) return;

    try {
      const res = await fetch(`${API_URL}/productVariant/${variantId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Lỗi khi xóa biến thể!");
      alert("Biến thể đã được xóa thành công!");
      setProductVariants(productVariants.filter(variant => variant.variantId !== variantId));
    } catch (err) {
      console.error("Lỗi khi xóa biến thể:", err);
      alert("Lỗi khi xóa biến thể!");
    }
  };

  const handleFinish = async () => {
    try {
      const res = await fetch(`${API_URL}/productVariant/${variantIdInput}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Lỗi khi cập nhật biến thể sản phẩm!");
      alert("Biến thể sản phẩm đã được cập nhật thành công!");
      setPopupOpen(false);
    } catch (err) {
      console.error("Lỗi khi cập nhật biến thể sản phẩm:", err);
      alert("Cập nhật biến thể sản phẩm thất bại!");
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
      alert("Sản phẩm đã được xóa thành công!");
      // Handle delete logic here
      console.log("Deleted product:", productId);
    } catch (err) {
      console.error("Lỗi khi xóa sản phẩm:", err);
      alert("Lỗi khi xóa sản phẩm!");
    }
  };

  return (
    <div className={styles.card}>
      <img src={image} alt={name} className={styles.image} />
      <div className={styles.details}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.price}>{price} VND</p>
        <button className={styles.editButton} onClick={handleEditProductClick}>Edit Product</button>
        {productVariants.map((variant) => (
          <div key={variant.variantId} className={styles.variant}>
            <p>Variant ID: {variant.variantId}</p>
            <button
              className={styles.editButton}
              onClick={() => handleEditVariantClick(variant.variantId)}
            >
              Edit Variant
            </button>
            <button
              className={styles.deleteButton}
              onClick={() => handleDeleteVariantClick(variant.variantId)}
            >
              Delete Variant
            </button>
          </div>
        ))}
        <button className={styles.deleteButton} onClick={handleDeleteClick}>Delete</button>
      </div>

      {isPopupOpen && (
        <div className={styles.overlay}>
          <div className={styles.popup}>
            <h2>Edit Variant</h2>
            <button className={styles.closeBtn} onClick={() => setPopupOpen(false)}>✖</button>

            {step === 1 && (
              <>
                <label>Variant ID:</label>
                <input
                  type="text"
                  value={variantIdInput}
                  onChange={(e) => setVariantIdInput(e.target.value)}
                  placeholder="Enter Variant ID"
                />
                <button onClick={handleEditVariantClick}>Fetch Variant</button>
              </>
            )}

            {step === 2 && (
              <>
                <fieldset>
                  <legend>Product Variants</legend>
                  <label>Volume (ml):</label>
                  <input
                    type="number"
                    name="volume"
                    value={formData.volume}
                    onChange={handleChange}
                    placeholder="Enter volume"
                    required
                  />
                  <label>Skin Type:</label>
                  <input
                    type="text"
                    name="skinType"
                    value={formData.skinType}
                    onChange={handleChange}
                    placeholder="Enter skin type"
                    required
                  />
                  <label>Price (VND):</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Enter price"
                    required
                  />
                  <label>Stock Quantity:</label>
                  <input
                    type="number"
                    name="stockQuantity"
                    value={formData.stockQuantity}
                    onChange={handleChange}
                    placeholder="Enter stock quantity"
                    required
                  />
                  <label>Main Ingredients:</label>
                  <input
                    type="text"
                    name="mainIngredients"
                    value={formData.mainIngredients}
                    onChange={handleChange}
                    placeholder="Enter main ingredients"
                    required
                  />
                  <label>Full Ingredients:</label>
                  <input
                    type="text"
                    name="fullIngredients"
                    value={formData.fullIngredients}
                    onChange={handleChange}
                    placeholder="Enter full ingredients"
                    required
                  />
                </fieldset>

                <label>Variant ID:</label>
                <input type="text" name="variantId" value={variantIdInput} readOnly /> {/* Display variantId */}
                <button onClick={handleFinish}>Finish</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;