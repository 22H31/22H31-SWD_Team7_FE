import React, { useState, useEffect } from "react";
import { Row, Col, Button, message } from "antd";
import ProductCard from "./ProductCard";
import EditProductPopup from "./EditProductPopup";
import UploadProductImages from "./UploadProductImages";
import styles from "../productManage/ProductsGrid.module.css";

const API_URL = "https://swdteam7-hfgrdwa4dfhbe0ga.southeastasia-01.azurewebsites.net/api";

function ProductsGrid() {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isUploadingImages, setIsUploadingImages] = useState(false);
  const [step, setStep] = useState(1);
  const [productId, setProductId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const initialFormData = {
    productName: "",
    brandId: "",
    categoryId: "",
    describe: {
      summary: "",
      suitableUsers: "",
      solutionsForSkinHairConditions: "",
      uses: "",
      outstandingAdvantages: "",
      safetyLevel: "",
      preserve: "",
    },
    specifications: {
      brandOrigin: "",
      placeOfManufacture: "",
      skinHairTypesCanUsed: "",
      listCapacity: "",
      texture: "",
      scent: "",
    },
    useManual: { step1: "", step2: "", step3: "", step4: "" },
  };

  const initialVariantData = {
    volume: "",
    skinType: "",
    price: "",
    stockQuantity: "",
    mainIngredients: "",
    fullIngredients: ""
  };

  const [formData, setFormData] = useState(initialFormData);
  const [variantData, setVariantData] = useState(initialVariantData);

  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then((res) => res.json())
      .then((data) => setProducts(Array.isArray(data.items) ? data.items : []))
      .catch(() => setProducts([]));

    fetch(`${API_URL}/brand`)
      .then((res) => res.json())
      .then(setBrands)
      .catch(() => setBrands([]));

    fetch(`${API_URL}/categories`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCategories(data.flatMap((cat) => cat.categorys));
        }
      })
      .catch(() => setCategories([]));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const keys = name.split(".");
      let updatedData = { ...prev };
      let ref = updatedData;
      for (let i = 0; i < keys.length - 1; i++) {
        ref = ref[keys[i]];
      }
      ref[keys[keys.length - 1]] = value;
      return updatedData;
    });
  };

  const handleVariantChange = (e) => {
    const { name, value } = e.target;
    setVariantData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = async () => {
    try {
      const method = isEditing ? "PUT" : "POST";
      const url = isEditing ? `${API_URL}/products/${productId}` : `${API_URL}/products`;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error(isEditing ? "Lỗi khi cập nhật sản phẩm!" : "Lỗi khi tạo sản phẩm!");
      const data = await res.json();

      if (!isEditing) {
        setProductId(data.productId);
        message.success("Sản phẩm đã được tạo thành công!");
        setStep(4); // Move to step 4 for adding product variant
      } else {
        message.success("Sản phẩm đã được cập nhật thành công!");
        setPopupOpen(false); // Close the popup after updating the product
      }
    } catch (err) {
      console.error(isEditing ? "Lỗi khi cập nhật sản phẩm:" : "Lỗi khi tạo sản phẩm:", err);
      message.error(isEditing ? "Cập nhật sản phẩm thất bại!" : "Tạo sản phẩm thất bại!");
    }
  };

  const handleAddVariant = async () => {
    try {
      const res = await fetch(`${API_URL}/productVariant`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...variantData, productId }),
      });

      if (!res.ok) throw new Error("Lỗi khi tạo biến thể sản phẩm!");
      message.success("Biến thể sản phẩm đã được tạo thành công!");
      setPopupOpen(false);
      // Refresh the product list to show the new product
      fetch(`${API_URL}/products`)
        .then((res) => res.json())
        .then((data) => setProducts(Array.isArray(data.items) ? data.items : []))
        .catch(() => setProducts([]));
    } catch (err) {
      console.error("Lỗi khi tạo biến thể sản phẩm:", err);
      message.error("Tạo biến thể sản phẩm thất bại!");
    }
  };

  const handleEditProduct = async (product) => {
    try {
      const res = await fetch(`${API_URL}/products/${product.productId}`);
      if (!res.ok) throw new Error("Lỗi khi lấy thông tin sản phẩm!");
      const data = await res.json();

      setFormData({
        productName: data.productName,
        brandId: data.brandId,
        categoryId: data.categoryId,
        describe: data.describe,
        specifications: data.specifications,
        useManual: data.useManual,
      });
      setProductId(product.productId);
      setIsEditing(true);
      setStep(1); // Ensure the step is set to 1 when editing a product
      setPopupOpen(true);
      setIsUploadingImages(false); // Ensure the popup is for editing, not uploading images
    } catch (err) {
      console.error("Lỗi khi lấy thông tin sản phẩm:", err);
      message.error("Lỗi khi lấy thông tin sản phẩm!");
    }
  };

  const handleAddClick = () => {
    setFormData(initialFormData);
    setVariantData(initialVariantData);
    setIsEditing(false);
    setPopupOpen(true);
    setStep(1);
    setIsUploadingImages(false); // Ensure the popup is for adding, not uploading images
  };

  const handleUploadImagesClick = (productId) => {
    setProductId(productId);
    setIsUploadingImages(true);
    setPopupOpen(true);
  };

  return (
    <>
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <h2>Products & Stocks</h2>
        </Col>
        <Col>
          <Button type="primary" onClick={handleAddClick}>
            ➕ Add New Product
          </Button>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        {products.map((product) => (
          <Col key={product.productId} xs={24} sm={12} md={8} lg={6}>
            <ProductCard
              name={product.productName}
              price={product.variants?.[0]?.price || "N/A"}
              avatarImageURL={product.avartarImageUrl}
              productId={product.productId}
              variants={product.variants}
              onEditProduct={() => handleEditProduct(product)}
              onUploadImages={() => handleUploadImagesClick(product.productId)}
            />
          </Col>
        ))}
      </Row>

      <EditProductPopup
        isEditing={isEditing}
        step={step}
        formData={formData}
        handleChange={handleChange}
        brands={brands}
        categories={categories}
        handleAddProduct={handleAddProduct}
        handleVariantChange={handleVariantChange}
        variantData={variantData}
        handleAddVariant={handleAddVariant}
        setPopupOpen={setPopupOpen}
        productId={productId}
        isPopupOpen={isPopupOpen && !isUploadingImages}
      />

      <UploadProductImages
        productId={productId}
        isPopupOpen={isPopupOpen && isUploadingImages}
        setPopupOpen={setPopupOpen}
      />
    </>
  );
}

export default ProductsGrid;