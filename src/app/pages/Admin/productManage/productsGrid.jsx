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
  const [variants, setVariants] = useState([]);

  const [formData, setFormData] = useState({
    productName: "",
    brandId: "",
    categoryId: "",
    describe: {
      summary: "",
      describeImg1: "",
      suitableUsers: "",
      solutionsForSkinHairConditions: "",
      describeImg2: "",
      uses: "",
      outstandingAdvantages: "",
      safetyLevel: "",
      describeImg3: "",
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
    variants: [{ productId: "", volume: "", skinType: "", price: "", stockQuantity: "", mainIngredients: "", fullIngredients: "" }] // Ensure variants is initialized properly
  });

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

    fetch(`${API_URL}/productVariant`)
      .then((res) => res.json())
      .then((data) => setVariants(Array.isArray(data) ? data : []))
      .catch(() => setVariants([]));
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

  const handleNextStep = async () => {
    if (step === 1) {
      try {
        const res = await fetch(`${API_URL}/products`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!res.ok) throw new Error("Lỗi khi tạo sản phẩm!");
        const data = await res.json();
        setProductId(data.productId);
        console.log("Product ID:", data.productId); // Thêm thông báo để kiểm tra productId
        alert("Sản phẩm đã được tạo thành công!");
        setStep(2);
      } catch (err) {
        console.error("Lỗi khi tạo sản phẩm:", err);
        alert("Tạo sản phẩm thất bại!");
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
        setStep(3);
      } catch (err) {
        console.error("Lỗi upload ảnh đại diện:", err);
        alert("Upload ảnh thất bại!");
      }
    } else if (step === 3) {
      if (!productId || formData.variants.length === 0) {
        alert("Chưa có biến thể sản phẩm!");
        return;
      }

      try {
        await fetch(`${API_URL}/productVariant`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(
            formData.variants.map((variant) => ({ ...variant, productId }))
          ),
        });
        alert("Biến thể sản phẩm đã được tạo!");
        setStep(4);
      } catch (err) {
        console.error("Lỗi khi thêm variant:", err);
        alert("Thêm biến thể thất bại!");
      }
    } else if (step === 4) {
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
        setPopupOpen(false);
      } catch (err) {
        console.error("Lỗi upload ảnh sản phẩm:", err);
        alert("Upload ảnh sản phẩm thất bại!");
      }
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.sectionTitle}>Products</h2>
        <button className={styles.addButton} onClick={() => {
          setPopupOpen(true);
          setStep(1);
        }}>
          ➕ Add New Product
        </button>
      </div>

      <div className={styles.productsGrid}>
        {products.map((product) => (
          <ProductCard key={product.productId} name={product.productName} price={product.variants?.[0]?.price || "N/A"} image={product.productAvatar} />
        ))}
      </div>

      {isPopupOpen && (
        <div className={styles.overlay}>
          <div className={styles.popup}>
            <h2>Thêm Sản Phẩm Mới</h2>
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
                  <input type="text" name="describe.describeImg1" onChange={handleChange} placeholder="Describe Image 1" value={formData.describe.describeImg1} />
                  <input type="text" name="describe.suitableUsers" onChange={handleChange} placeholder="Suitable Users" value={formData.describe.suitableUsers} />
                  <input type="text" name="describe.solutionsForSkinHairConditions" onChange={handleChange} placeholder="Solutions for Skin/Hair Conditions" value={formData.describe.solutionsForSkinHairConditions} />
                  <input type="text" name="describe.describeImg2" onChange={handleChange} placeholder="Describe Image 2" value={formData.describe.describeImg2} />
                  <input type="text" name="describe.uses" onChange={handleChange} placeholder="Uses" value={formData.describe.uses} />
                  <input type="text" name="describe.outstandingAdvantages" onChange={handleChange} placeholder="Outstanding Advantages" value={formData.describe.outstandingAdvantages} />
                  <input type="text" name="describe.safetyLevel" onChange={handleChange} placeholder="Safety Level" value={formData.describe.safetyLevel} />
                  <input type="text" name="describe.describeImg3" onChange={handleChange} placeholder="Describe Image 3" value={formData.describe.describeImg3} />
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
                <fieldset>
                  <legend>Product Variants</legend>

                  {/* Render variant fields dynamically */}
                  {formData.variants.map((variant, index) => (
                    <div key={index}>
                      <label>Product ID:</label>
                      <input
                        type="text"
                        name={`variants.${index}.productId`}
                        value={productId} // Automatically fill the productId
                        readOnly
                      />
                      <label>Volume (ml):</label>
                      <input
                        type="number"
                        name={`variants.${index}.volume`}
                        value={variant.volume}
                        onChange={handleChange}
                        placeholder="Enter volume"
                        required
                      />
                      <label>Skin Type:</label>
                      <input
                        type="text"
                        name={`variants.${index}.skinType`}
                        value={variant.skinType}
                        onChange={handleChange}
                        placeholder="Enter skin type"
                        required
                      />
                      <label>Price (VND):</label>
                      <input
                        type="number"
                        name={`variants.${index}.price`}
                        value={variant.price}
                        onChange={handleChange}
                        placeholder="Enter price"
                        required
                      />
                      <label>Stock Quantity:</label>
                      <input
                        type="number"
                        name={`variants.${index}.stockQuantity`}
                        value={variant.stockQuantity}
                        onChange={handleChange}
                        placeholder="Enter stock quantity"
                        required
                      />
                      <label>Main Ingredients:</label>
                      <input
                        type="text"
                        name={`variants.${index}.mainIngredients`}
                        value={variant.mainIngredients}
                        onChange={handleChange}
                        placeholder="Enter main ingredients"
                        required
                      />
                      <label>Full Ingredients:</label>
                      <input
                        type="text"
                        name={`variants.${index}.fullIngredients`}
                        value={variant.fullIngredients}
                        onChange={handleChange}
                        placeholder="Enter full ingredients"
                        required
                      />
                    </div>
                  ))}
                </fieldset>

                <button onClick={handleNextStep}>Next</button>
              </>
            )}

            {step === 4 && (
              <>
                <input type="file" accept="image/*" multiple onChange={(e) => setImageFiles({ ...imageFiles, productImages: e.target.files })} />
                <label>Product ID:</label>
                <input type="text" name="productId" value={productId} readOnly /> {/* Display productId */}
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