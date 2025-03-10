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
    variants: {
      volume: "",
      skinType: "",
      price: "",
      stockQuantity: "",
      mainIngredients: "",
      fullIngredients: "",
    },
  });

  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then((res) => res.json())
      .then((data) => setProducts(Array.isArray(data) ? data : []))
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

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.sectionTitle}>Products</h2>
        <button className={styles.addButton} onClick={() => { setPopupOpen(true); setStep(1); }}>
          ➕ Add New Product
        </button>
      </div>

      <div className={styles.productsGrid}>
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product.productId}
              name={product.productName}
              price={product.variants?.[0]?.price || "N/A"}
              image={product.productAvatar}
            />
          ))
        ) : (
          <p className={styles.noProducts}>No products available</p>
        )}
      </div>

      {isPopupOpen && (
        <div className={styles.overlay}>
          <div className={styles.popup}>
            <h2>Add New Product</h2>
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

                  {/* Dropdown chọn Category (Hiện Category Name) */}
                  <select name="categoryId" value={formData.categoryId} onChange={handleChange}>
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category.categoryId} value={category.categoryId}>
                        {category.categoryName}
                      </option>
                    ))}
                  </select>

                  <textarea name="describe.summary" onChange={handleChange} placeholder="Summary"></textarea>
                  <input type="text" name="describe.describeImg1" onChange={handleChange} placeholder="Describe Image 1" />
                  <input type="text" name="describe.suitableUsers" onChange={handleChange} placeholder="Suitable Users" />
                  <input type="text" name="describe.solutionsForSkinHairConditions" onChange={handleChange} placeholder="Solutions for Skin/Hair Conditions" />
                  <input type="text" name="describe.describeImg2" onChange={handleChange} placeholder="Describe Image 2" />
                  <input type="text" name="describe.uses" onChange={handleChange} placeholder="Uses" />
                  <input type="text" name="describe.outstandingAdvantages" onChange={handleChange} placeholder="Outstanding Advantages" />
                  <input type="text" name="describe.safetyLevel" onChange={handleChange} placeholder="Safety Level" />
                  <input type="text" name="describe.describeImg3" onChange={handleChange} placeholder="Describe Image 3" />
                  <input type="text" name="describe.preserve" onChange={handleChange} placeholder="Preserve" />
                  </fieldset>


                <fieldset>
                  <legend>Specifications</legend>
                  <input type="text" name="specifications.brandOrigin" onChange={handleChange} placeholder="Brand Origin" />
                  <input type="text" name="specifications.placeOfManufacture" onChange={handleChange} placeholder="Place of Manufacture" />
                  <input type="text" name="specifications.listCapacity" onChange={handleChange} placeholder="List Capacity" />
                  <input type="text" name="specifications.skinHairTypesCanUsed" onChange={handleChange} placeholder="Skin Hair Types Can Used" />
                  <input type="text" name="specifications.texture" onChange={handleChange} placeholder="Texture" />
                  <input type="text" name="specifications.scent" onChange={handleChange} placeholder="Scent" />
                  

                </fieldset>

                <fieldset>
                  <legend>Used Manually</legend>
                  <input type="text" name="useManual.step1" onChange={handleChange} placeholder="Step 1" />
                  <input type="text" name="useManual.step2" onChange={handleChange} placeholder="Step 2" />
                  <input type="text" name="useManual.step3" onChange={handleChange} placeholder="Step 3" />
                  <input type="text" name="useManual.step4" onChange={handleChange} placeholder="Step 4" />
                </fieldset>


                <button className={styles.submitBtn} onClick={() => setStep(2)}>Next</button>
              </>
            )}

            {step === 2 && (
              <>
                <fieldset>
                  <legend>Upload Product Avatar</legend>
                  <input type="file" accept="image/*" onChange={(e) => setImageFiles({ ...imageFiles, product_avatar_images: e.target.files[0] })} />
                </fieldset>
                <button className={styles.submitBtn} onClick={() => setStep(3)}>Next</button>
              </>
            )}

            {step === 3 && (
              <>
                <fieldset>
                  <legend>Upload Product Images</legend>
                  <input type="file" accept="image/*" multiple onChange={(e) => setImageFiles({ ...imageFiles, product_images: e.target.files })} />
                </fieldset>
                <button className={styles.submitBtn} onClick={() => setStep(4)}>Next</button>
              </>
            )}

            {step === 4 && (
              <>
                <fieldset>
                  <legend>Product Variants</legend>
                  <input type="text" name="variants.volume" onChange={handleChange} placeholder="Volume" />
                  <input type="text" name="variants.skinType" onChange={handleChange} placeholder="Skin Type" />
                  <input type="number" name="variants.price" onChange={handleChange} placeholder="Price" />
                  <input type="number" name="variants.stockQuantity" onChange={handleChange} placeholder="Stock Quantity" />
                </fieldset>
                <button className={styles.submitBtn} onClick={() => setPopupOpen(false)}>Finish</button>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default ProductsGrid;