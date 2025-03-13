import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import styles from "../productManage/ProductsGrid.module.css";

const API_URL = "https://beteam720250214143214.azurewebsites.net/api";

function ProductsGrid() {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [productId, setProductId] = useState(null);
  const [imageFiles, setImageFiles] = useState({});
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

  const handleNextStep = async () => {
    if (step === 1) {
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
          console.log("Product ID:", data.productId); // Thêm thông báo để kiểm tra productId
          alert("Sản phẩm đã được tạo thành công!");
        } else {
          alert("Sản phẩm đã được cập nhật thành công!");
        }

        setStep(2);
      } catch (err) {
        console.error(isEditing ? "Lỗi khi cập nhật sản phẩm:" : "Lỗi khi tạo sản phẩm:", err);
        alert(isEditing ? "Cập nhật sản phẩm thất bại!" : "Tạo sản phẩm thất bại!");
      }
    } else if (step === 2) {
      if (!productId || !imageFiles.avatar) {
        alert("Chưa chọn ảnh đại diện!");
        return;
      }

      const formDataUpload = new FormData();
      formDataUpload.append("fileDtos", imageFiles.avatar);

      try {
        await fetch(`${API_URL}/products/${productId}/product_avatar_images`, {
          method: "POST",
          body: formDataUpload,
        });
        alert("Ảnh đại diện đã được upload!");
        setStep(3); // Move to the next step for uploading product images
      } catch (err) {
        console.error("Lỗi upload ảnh đại diện:", err);
        alert("Upload ảnh thất bại!");
      }
    } else if (step === 3) {
      if (!productId || !imageFiles.productImages.length) {
        alert("Chưa chọn ảnh sản phẩm!");
        return;
      }

      const formDataUpload = new FormData();
      Array.from(imageFiles.productImages).forEach((file) =>
        formDataUpload.append("fileDtos", file)
      );

      try {
        await fetch(`${API_URL}/products/${productId}/product_images`, {
          method: "POST",
          body: formDataUpload,
        });
        alert("Ảnh sản phẩm đã được upload!");
        setStep(4); // Move to the next step for adding product variant
      } catch (err) {
        console.error("Lỗi upload ảnh sản phẩm:", err);
        alert("Upload ảnh sản phẩm thất bại!");
      }
    } else if (step === 4) {
      try {
        const res = await fetch(`${API_URL}/productVariant`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...variantData, productId }),
        });

        if (!res.ok) throw new Error("Lỗi khi tạo biến thể sản phẩm!");
        alert("Biến thể sản phẩm đã được tạo thành công!");
        setPopupOpen(false);
      } catch (err) {
        console.error("Lỗi khi tạo biến thể sản phẩm:", err);
        alert("Tạo biến thể sản phẩm thất bại!");
      }
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
    } catch (err) {
      console.error("Lỗi khi lấy thông tin sản phẩm:", err);
      alert("Lỗi khi lấy thông tin sản phẩm!");
    }
  };

  const handleAddClick = () => {
    setFormData(initialFormData);
    setVariantData(initialVariantData);
    setIsEditing(false);
    setPopupOpen(true);
    setStep(1);
  };

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.sectionTitle}>Products</h2>
        <button className={styles.addButton} onClick={handleAddClick}>
          ➕ Add New Product
        </button>
      </div>

      <div className={styles.productsGrid}>
        {products.map((product) => (
          <ProductCard
            key={product.productId}
            name={product.productName}
            price={product.variants?.[0]?.price || "N/A"}
            image={product.productAvatar}
            productId={product.productId}
            variants={product.variants}
            onEditProduct={() => handleEditProduct(product)}
          />
        ))}
      </div>

      {isPopupOpen && (
        <div className={styles.overlay}>
          <div className={styles.popup}>
            <h2>{isEditing ? "Chỉnh sửa sản phẩm" : "Thêm Sản Phẩm Mới"}</h2>
            <button className={styles.closeBtn} onClick={() => setPopupOpen(false)}>✖</button>

            {step === 1 && (
              <>
                <fieldset>
                  <legend>Basic Information</legend>
                  <input type="text" name="productName" value={formData.productName} onChange={handleChange} placeholder="Product Name" />

                  {/* Dropdown chọn Brand */}
                  <select name="brandId" value={formData.brandId} onChange={handleChange}>
                    <option value="">Select Brand</option>
                    {brands.map((brand) => (
                      <option key={brand.brandId} value={brand.brandId}>{brand.brandName}</option>
                    ))}
                  </select>

                  {/* Dropdown chọn Category */}
                  <select name="categoryId" value={formData.categoryId} onChange={handleChange}>
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category.categoryId} value={category.categoryId}>
                        {category.categoryName}
                      </option>
                    ))}
                  </select>

                  <textarea name="describe.summary" onChange={handleChange} placeholder="Summary" value={formData.describe.summary}></textarea>
                  <input type="text" name="describe.suitableUsers" onChange={handleChange} placeholder="Suitable Users" value={formData.describe.suitableUsers} />
                  <input type="text" name="describe.solutionsForSkinHairConditions" onChange={handleChange} placeholder="Solutions for Skin/Hair Conditions" value={formData.describe.solutionsForSkinHairConditions} />
                  <input type="text" name="describe.uses" onChange={handleChange} placeholder="Uses" value={formData.describe.uses} />
                  <input type="text" name="describe.outstandingAdvantages" onChange={handleChange} placeholder="Outstanding Advantages" value={formData.describe.outstandingAdvantages} />
                  <input type="text" name="describe.safetyLevel" onChange={handleChange} placeholder="Safety Level" value={formData.describe.safetyLevel} />
                  <input type="text" name="describe.preserve" onChange={handleChange} placeholder="Preserve" value={formData.describe.preserve} />
                </fieldset>

                <fieldset>
                  <legend>Specifications</legend>
                  <input type="text" name="specifications.brandOrigin" onChange={handleChange} placeholder="Brand Origin" value={formData.specifications.brandOrigin} />
                  <input type="text" name="specifications.placeOfManufacture" onChange={handleChange} placeholder="Place of Manufacture" value={formData.specifications.placeOfManufacture} />
                  <input type="text" name="specifications.skinHairTypesCanUsed" onChange={handleChange} placeholder="Skin/Hair Types Can Be Used" value={formData.specifications.skinHairTypesCanUsed} />
                  <input type="text" name="specifications.listCapacity" onChange={handleChange} placeholder="List Capacity" value={formData.specifications.listCapacity} />
                  <input type="text" name="specifications.texture" onChange={handleChange} placeholder="Texture" value={formData.specifications.texture} />
                  <input type="text" name="specifications.scent" onChange={handleChange} placeholder="Scent" value={formData.specifications.scent} />
                </fieldset>

                <fieldset>
                  <legend>Usage Manual</legend>
                  <input type="text" name="useManual.step1" onChange={handleChange} placeholder="Step 1" value={formData.useManual.step1} />
                  <input type="text" name="useManual.step2" onChange={handleChange} placeholder="Step 2" value={formData.useManual.step2} />
                  <input type="text" name="useManual.step3" onChange={handleChange} placeholder="Step 3" value={formData.useManual.step3} />
                  <input type="text" name="useManual.step4" onChange={handleChange} placeholder="Step 4" value={formData.useManual.step4} />
                </fieldset>

                <button onClick={handleNextStep}>Next</button>
              </>
            )}

            {step === 2 && (
              <>
                <input type="file" accept="image/*" onChange={(e) => setImageFiles({ ...imageFiles, avatar: e.target.files[0] })} />
                <label>Product ID:</label>
                <input type="text" name="productId" value={productId} readOnly /> {/* Display productId */}
                <button onClick={handleNextStep}>Next</button>
              </>
            )}

            {step === 3 && (
              <>
                <input type="file" accept="image/*" multiple onChange={(e) => setImageFiles({ ...imageFiles, productImages: e.target.files })} />
                <label>Product ID:</label>
                <input type="text" name="productId" value={productId} readOnly /> {/* Display productId */}
                <button onClick={handleNextStep}>Next</button>
              </>
            )}

            {step === 4 && (
              <>
                <fieldset>
                  <legend>Product Variant</legend>
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

                <button onClick={handleNextStep}>Finish</button>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default ProductsGrid;