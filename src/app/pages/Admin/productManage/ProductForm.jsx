import React from "react";

const ProductForm = ({ formData, handleChange, brands, categories }) => {
  return (
    <>
      <fieldset>
        <legend>Basic Information</legend>
        <input type="text" name="productName" value={formData.productName} onChange={handleChange} placeholder="Product Name" />

        <select name="brandId" value={formData.brandId} onChange={handleChange}>
          <option value="">Select Brand</option>
          {brands.map((brand) => (
            <option key={brand.brandId} value={brand.brandId}>{brand.brandName}</option>
          ))}
        </select>

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
    </>
  );
};

export default ProductForm;