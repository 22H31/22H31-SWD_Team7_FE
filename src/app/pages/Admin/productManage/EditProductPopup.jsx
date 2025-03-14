import React from "react";
import ProductForm from "./ProductForm";
import styles from "../productManage/ProductsGrid.module.css";

const EditProductPopup = ({
  isEditing,
  step,
  formData,
  handleChange,
  brands,
  categories,
  handleAddProduct,
  handleVariantChange,
  variantData,
  handleAddVariant,
  setPopupOpen,
  productId,
}) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <h2>{isEditing ? "Chỉnh sửa sản phẩm" : "Thêm Sản Phẩm Mới"}</h2>
        <button className={styles.closeBtn} onClick={() => setPopupOpen(false)}>✖</button>

        {step === 1 && (
          <>
            <ProductForm formData={formData} handleChange={handleChange} brands={brands} categories={categories} />
            <button onClick={handleAddProduct}>{isEditing ? "Update Product" : "Add Product"}</button>
          </>
        )}

        {!isEditing && step === 4 && (
          <>
            <fieldset>
              <legend>Product Variant</legend>
              <label>Product ID:</label>
              <input type="text" name="productId" value={productId} readOnly />
              <label>Volume (ml):</label>
              <input
                type="number"
                name="volume"
                value={variantData.volume}
                onChange={handleVariantChange}
                placeholder="Enter volume"
                required
              />
              <label>Skin Type:</label>
              <input
                type="text"
                name="skinType"
                value={variantData.skinType}
                onChange={handleVariantChange}
                placeholder="Enter skin type"
                required
              />
              <label>Price (VND):</label>
              <input
                type="number"
                name="price"
                value={variantData.price}
                onChange={handleVariantChange}
                placeholder="Enter price"
                required
              />
              <label>Stock Quantity:</label>
              <input
                type="number"
                name="stockQuantity"
                value={variantData.stockQuantity}
                onChange={handleVariantChange}
                placeholder="Enter stock quantity"
                required
              />
              <label>Main Ingredients:</label>
              <input
                type="text"
                name="mainIngredients"
                value={variantData.mainIngredients}
                onChange={handleVariantChange}
                placeholder="Enter main ingredients"
                required
              />
              <label>Full Ingredients:</label>
              <input
                type="text"
                name="fullIngredients"
                value={variantData.fullIngredients}
                onChange={handleVariantChange}
                placeholder="Enter full ingredients"
                required
              />
            </fieldset>

            <button onClick={handleAddVariant}>Add Variant</button>
          </>
        )}
      </div>
    </div>
  );
};

export default EditProductPopup;