import React, { useState, useEffect } from "react";
import { Table, Button, Input, Modal, Form, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import styles from "./brandPage.module.css";

const API_URL = "https://swdteam7-hfgrdwa4dfhbe0ga.southeastasia-01.azurewebsites.net/api/brand";

const BrandPage = () => {
  const [brands, setBrands] = useState([]);
  const [search, setSearch] = useState("");
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [formData, setFormData] = useState({ brandName: "", brandDescription: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [isImageUploadOpen, setImageUploadOpen] = useState(false);
  const [imageUploadBrandId, setImageUploadBrandId] = useState("");

  // Fetch brand list from API
  const fetchBrands = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setBrands(data))
      .catch((err) => console.error("Error fetching data:", err));
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  // Fetch brand details by ID
  const fetchBrandDetails = (brandId) => {
    fetch(`${API_URL}/${brandId}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          brandName: data.brandName,
          brandDescription: data.brandDescription,
          avatarBrandUrl: data.avatarBrandUrl,
        });
      })
      .catch((err) => console.error("Error fetching brand details:", err));
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add new brand (POST)
  const handleAdd = () => {
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(() => {
        fetchBrands(); // Cập nhật danh sách brand
        setPopupOpen(false);
        message.success("Brand added successfully!");
      })
      .catch((err) => {
        console.error("Error adding brand:", err);
        message.error("Error adding brand!");
      });
  };

  // Update brand (PUT)
  const handleEdit = () => {
    fetch(`${API_URL}/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then(() => {
        fetchBrands(); // Cập nhật danh sách brand
        setPopupOpen(false);
        message.success("Brand updated successfully!");
      })
      .catch((err) => {
        console.error("Error updating brand:", err);
        message.error("Error updating brand!");
      });
  };

  // Delete brand (DELETE)
  const handleDelete = (id) => {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then(() => {
        fetchBrands(); // Cập nhật danh sách brand
        message.success("Brand deleted successfully!");
      })
      .catch((err) => {
        console.error("Error deleting brand:", err);
        message.error("Error deleting brand!");
      });
  };

  // Open edit popup
  const handleEditClick = (brand) => {
    fetchBrandDetails(brand.brandId);
    setIsEditing(true);
    setEditId(brand.brandId);
    setPopupOpen(true);
  };

  // Handle image upload
  const handleImageUpload = ({ file, onSuccess, onError }) => {
    if (!imageUploadBrandId) {
      message.error("Please enter a BrandID to upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("fileDtos", file);

    fetch(`${API_URL}/${imageUploadBrandId}/brand_avartar_images`, {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.text();
      })
      .then(() => {
        fetchBrands(); // Cập nhật danh sách brand
        setImageUploadOpen(false);
        message.success("Image uploaded successfully!");
        onSuccess("ok");
      })
      .catch((err) => {
        console.error("Error uploading image:", err);
        message.error("Error uploading image!");
        onError(err);
      });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "brandId",
      key: "brandId",
    },
    {
      title: "Brand Name",
      dataIndex: "brandName",
      key: "brandName",
    },
    {
      title: "Logo",
      dataIndex: "avartarBrandUrl",
      key: "avartarBrandUrl",
      render: (text) => (
        text ? <img src={text} alt="Brand Logo" style={{ width: 50, height: 50, objectFit: "cover" }} /> : "No Image"
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <>
          <Button type="primary" onClick={() => handleEditClick(record)} style={{ marginRight: 8 }}>
            Edit
          </Button>
          <Button type="primary" danger onClick={() => handleDelete(record.brandId)} style={{ marginRight: 8 }}>
            Delete
          </Button>
          <Button
            type="default"
            onClick={() => {
              setImageUploadBrandId(record.brandId);
              setImageUploadOpen(true);
            }}
            style={{ backgroundColor: "#1890ff", color: "#fff" }}
          >
            Add Image
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <h1>Brand Management</h1>
      <div className={styles.controls}>
        <Input
          placeholder="🔍 Search Brand"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: 200, marginRight: 8 }}
        />
        <Button
          type="primary"
          onClick={() => {
            setPopupOpen(true);
            setIsEditing(false);
            setFormData({ brandName: "", brandDescription: "" });
          }}
        >
          ➕ Add New Brand
        </Button>
      </div>

      <Table
        dataSource={brands.filter((brand) =>
          brand.brandName.toLowerCase().includes(search.toLowerCase())
        )}
        columns={columns}
        rowKey="brandId"
        className={styles.table}
      />

      <Modal
        title={isEditing ? "Edit Brand" : "Add Brand"}
        visible={isPopupOpen}
        onCancel={() => setPopupOpen(false)}
        footer={null}
      >
        <Form layout="vertical" onFinish={isEditing ? handleEdit : handleAdd}>
          <Form.Item label="Brand Name">
            <Input
              type="text"
              name="brandName"
              value={formData.brandName}
              onChange={handleChange}
              placeholder="Enter brand name"
              required
            />
          </Form.Item>
          <Form.Item label="Brand Description">
            <Input
              type="text"
              name="brandDescription"
              value={formData.brandDescription}
              onChange={handleChange}
              placeholder="Enter brand description"
              required
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {isEditing ? "Update" : "Add"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Upload Brand Image"
        visible={isImageUploadOpen}
        onCancel={() => setImageUploadOpen(false)}
        footer={null}
      >
        <Form layout="vertical">
          <Form.Item label="Brand ID">
            <Input
              type="text"
              value={imageUploadBrandId}
              onChange={(e) => setImageUploadBrandId(e.target.value)}
              placeholder="Enter Brand ID"
              required
            />
          </Form.Item>
          <Upload customRequest={handleImageUpload}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form>
      </Modal>
    </div>
  );
};

export default BrandPage;