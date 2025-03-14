import React from "react";
import { Form, Input, InputNumber, Button, Modal } from "antd";
import ProductForm from "./ProductForm";

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
  isPopupOpen,
}) => {
  return (
    <Modal
      title={isEditing ? "Chỉnh sửa sản phẩm" : "Thêm Sản Phẩm Mới"}
      visible={isPopupOpen}
      onCancel={() => setPopupOpen(false)}
      footer={null}
      width="80%"
    >
      {step === 1 && (
        <>
          <ProductForm formData={formData} handleChange={handleChange} brands={brands} categories={categories} />
          <Button type="primary" onClick={handleAddProduct} style={{ marginTop: 16 }}>
            {isEditing ? "Update Product" : "Add Product"}
          </Button>
        </>
      )}

      {!isEditing && step === 4 && (
        <Form layout="vertical" onFinish={handleAddVariant}>
          <fieldset>
            <legend>Product Variant</legend>
            <Form.Item label="Product ID">
              <Input type="text" name="productId" value={productId} readOnly />
            </Form.Item>
            <Form.Item label="Volume (ml)">
              <InputNumber
                name="volume"
                value={variantData.volume}
                onChange={(value) => handleVariantChange({ target: { name: "volume", value } })}
                placeholder="Enter volume"
                required
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item label="Skin Type">
              <Input
                type="text"
                name="skinType"
                value={variantData.skinType}
                onChange={handleVariantChange}
                placeholder="Enter skin type"
                required
              />
            </Form.Item>
            <Form.Item label="Price (VND)">
              <InputNumber
                name="price"
                value={variantData.price}
                onChange={(value) => handleVariantChange({ target: { name: "price", value } })}
                placeholder="Enter price"
                required
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item label="Stock Quantity">
              <InputNumber
                name="stockQuantity"
                value={variantData.stockQuantity}
                onChange={(value) => handleVariantChange({ target: { name: "stockQuantity", value } })}
                placeholder="Enter stock quantity"
                required
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item label="Main Ingredients">
              <Input
                type="text"
                name="mainIngredients"
                value={variantData.mainIngredients}
                onChange={handleVariantChange}
                placeholder="Enter main ingredients"
                required
              />
            </Form.Item>
            <Form.Item label="Full Ingredients">
              <Input
                type="text"
                name="fullIngredients"
                value={variantData.fullIngredients}
                onChange={handleVariantChange}
                placeholder="Enter full ingredients"
                required
              />
            </Form.Item>
          </fieldset>

          <Button type="primary" htmlType="submit" style={{ marginTop: 16 }}>
            Add Variant
          </Button>
        </Form>
      )}
    </Modal>
  );
};

export default EditProductPopup;