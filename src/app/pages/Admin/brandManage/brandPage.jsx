import React, { useState, useEffect } from "react";
import { Table, Button, Input, Modal, Form, message } from "antd";
import styles from "./brandPage.module.css";

const API_URL = "https://beteam720250214143214.azurewebsites.net/api/brand";

const BrandPage = () => {
  const [brands, setBrands] = useState([]);
  const [search, setSearch] = useState("");
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [formData, setFormData] = useState({ brandName: "", brandImg: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // Fetch brand list from API
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setBrands(data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

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
      .then((newBrand) => {
        setBrands([...brands, newBrand]);
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
        setBrands(
          brands.map((item) =>
            item.brandId === editId ? { ...item, ...formData } : item
          )
        );
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
        setBrands(brands.filter((item) => item.brandId !== id));
        message.success("Brand deleted successfully!");
      })
      .catch((err) => {
        console.error("Error deleting brand:", err);
        message.error("Error deleting brand!");
      });
  };

  // Open edit popup
  const handleEditClick = (brand) => {
    setFormData({ brandName: brand.brandName, brandImg: brand.brandImg });
    setIsEditing(true);
    setEditId(brand.brandId);
    setPopupOpen(true);
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
      dataIndex: "brandImg",
      key: "brandImg",
      render: (text) => <img src={text} alt="Brand Logo" style={{ width: 50 }} />,
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <>
          <Button type="primary" onClick={() => handleEditClick(record)} style={{ marginRight: 8 }}>
            Edit
          </Button>
          <Button type="primary" danger onClick={() => handleDelete(record.brandId)}>
            Delete
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
            setFormData({ brandName: "", brandImg: "" });
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
          <Form.Item label="Brand Logo URL">
            <Input
              type="text"
              name="brandImg"
              value={formData.brandImg}
              onChange={handleChange}
              placeholder="Enter brand logo URL"
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
    </div>
  );
};

export default BrandPage;