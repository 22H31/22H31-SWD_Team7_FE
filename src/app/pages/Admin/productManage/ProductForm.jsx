import React from "react";
import { Form, Input, Select } from "antd";

const { TextArea } = Input;
const { Option } = Select;

const ProductForm = ({ formData, handleChange, brands, categories }) => {
  return (
    <Form layout="vertical">
      <Form.Item label="Product Name">
        <Input
          type="text"
          name="productName"
          value={formData.productName}
          onChange={handleChange}
          placeholder="Product Name"
        />
      </Form.Item>

      <Form.Item label="Brand">
        <Select
          name="brandId"
          value={formData.brandId}
          onChange={(value) => handleChange({ target: { name: "brandId", value } })}
          placeholder="Select Brand"
        >
          <Option value="">Select Brand</Option>
          {brands.map((brand) => (
            <Option key={brand.brandId} value={brand.brandId}>
              {brand.brandName}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Category">
        <Select
          name="categoryId"
          value={formData.categoryId}
          onChange={(value) => handleChange({ target: { name: "categoryId", value } })}
          placeholder="Select Category"
        >
          <Option value="">Select Category</Option>
          {categories.map((category) => (
            <Option key={category.categoryId} value={category.categoryId}>
              {category.categoryName}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Summary">
        <TextArea
          name="describe.summary"
          onChange={handleChange}
          placeholder="Summary"
          value={formData.describe.summary}
        />
      </Form.Item>

      <Form.Item label="Suitable Users">
        <Input
          type="text"
          name="describe.suitableUsers"
          onChange={handleChange}
          placeholder="Suitable Users"
          value={formData.describe.suitableUsers}
        />
      </Form.Item>

      <Form.Item label="Solutions for Skin/Hair Conditions">
        <Input
          type="text"
          name="describe.solutionsForSkinHairConditions"
          onChange={handleChange}
          placeholder="Solutions for Skin/Hair Conditions"
          value={formData.describe.solutionsForSkinHairConditions}
        />
      </Form.Item>

      <Form.Item label="Uses">
        <Input
          type="text"
          name="describe.uses"
          onChange={handleChange}
          placeholder="Uses"
          value={formData.describe.uses}
        />
      </Form.Item>

      <Form.Item label="Outstanding Advantages">
        <Input
          type="text"
          name="describe.outstandingAdvantages"
          onChange={handleChange}
          placeholder="Outstanding Advantages"
          value={formData.describe.outstandingAdvantages}
        />
      </Form.Item>

      <Form.Item label="Safety Level">
        <Input
          type="text"
          name="describe.safetyLevel"
          onChange={handleChange}
          placeholder="Safety Level"
          value={formData.describe.safetyLevel}
        />
      </Form.Item>

      <Form.Item label="Preserve">
        <Input
          type="text"
          name="describe.preserve"
          onChange={handleChange}
          placeholder="Preserve"
          value={formData.describe.preserve}
        />
      </Form.Item>

      <Form.Item label="Brand Origin">
        <Input
          type="text"
          name="specifications.brandOrigin"
          onChange={handleChange}
          placeholder="Brand Origin"
          value={formData.specifications.brandOrigin}
        />
      </Form.Item>

      <Form.Item label="Place of Manufacture">
        <Input
          type="text"
          name="specifications.placeOfManufacture"
          onChange={handleChange}
          placeholder="Place of Manufacture"
          value={formData.specifications.placeOfManufacture}
        />
      </Form.Item>

      <Form.Item label="Skin/Hair Types Can Be Used">
        <Input
          type="text"
          name="specifications.skinHairTypesCanUsed"
          onChange={handleChange}
          placeholder="Skin/Hair Types Can Be Used"
          value={formData.specifications.skinHairTypesCanUsed}
        />
      </Form.Item>

      <Form.Item label="List Capacity">
        <Input
          type="text"
          name="specifications.listCapacity"
          onChange={handleChange}
          placeholder="List Capacity"
          value={formData.specifications.listCapacity}
        />
      </Form.Item>

      <Form.Item label="Texture">
        <Input
          type="text"
          name="specifications.texture"
          onChange={handleChange}
          placeholder="Texture"
          value={formData.specifications.texture}
        />
      </Form.Item>

      <Form.Item label="Scent">
        <Input
          type="text"
          name="specifications.scent"
          onChange={handleChange}
          placeholder="Scent"
          value={formData.specifications.scent}
        />
      </Form.Item>

      <Form.Item label="Step 1">
        <Input
          type="text"
          name="useManual.step1"
          onChange={handleChange}
          placeholder="Step 1"
          value={formData.useManual.step1}
        />
      </Form.Item>

      <Form.Item label="Step 2">
        <Input
          type="text"
          name="useManual.step2"
          onChange={handleChange}
          placeholder="Step 2"
          value={formData.useManual.step2}
        />
      </Form.Item>

      <Form.Item label="Step 3">
        <Input
          type="text"
          name="useManual.step3"
          onChange={handleChange}
          placeholder="Step 3"
          value={formData.useManual.step3}
        />
      </Form.Item>

      <Form.Item label="Step 4">
        <Input
          type="text"
          name="useManual.step4"
          onChange={handleChange}
          placeholder="Step 4"
          value={formData.useManual.step4}
        />
      </Form.Item>
    </Form>
  );
};

export default ProductForm;