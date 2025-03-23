import React, { useState, useEffect } from "react";
import { Table, Button, Input, Modal, Form, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import styles from "./categoryTitlePage.module.css";

const API_URL = "https://swdteam7-hfgrdwa4dfhbe0ga.southeastasia-01.azurewebsites.net/api/categoryTitle";

const CategoryTitlePage = () => {
  const [titles, setTitles] = useState([]);
  const [search, setSearch] = useState("");
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [formData, setFormData] = useState({ categoryTitleName: "", categoryTitleIcon: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // Fetch category titles from API
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setTitles(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add new category title
  const handleAdd = async () => {
    if (!formData.categoryTitleName) {
      message.error("Please fill in all required fields!");
      return;
    }

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Error adding category title");
      const newTitle = await res.json();

      setTitles([...titles, newTitle]);
      setPopupOpen(false);
      message.success("Category title added successfully!");
    } catch (err) {
      console.error("Error adding:", err);
      message.error("Error adding category title!");
    }
  };

  // Edit category title
  const handleEdit = async () => {
    if (!editId || !formData.categoryTitleName) {
      message.error("Invalid data!");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Error updating category title");

      setTitles(
        titles.map((item) =>
          item.categoryTitleId === editId ? { ...item, ...formData } : item
        )
      );
      setPopupOpen(false);
      message.success("Category title updated successfully!");
    } catch (err) {
      console.error("Error updating:", err);
      message.error("Error updating category title!");
    }
  };

  // Delete category title
  const handleDelete = async (id) => {
    if (!id || !window.confirm("Are you sure you want to delete this category title?")) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

      if (!res.ok) throw new Error("Error deleting category title");

      setTitles(titles.filter((item) => item.categoryTitleId !== id));
      message.success("Category title deleted successfully!");
    } catch (err) {
      console.error("Error deleting:", err);
      message.error("Error deleting category title!");
    }
  };

  // Open edit popup
  const handleEditClick = (title) => {
    setFormData({
      categoryTitleName: title.categoryTitleName,
      categoryTitleIcon: title.categoryTitleIcon,
    });
    setIsEditing(true);
    setEditId(title.categoryTitleId);
    setPopupOpen(true);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "categoryTitleId",
      key: "categoryTitleId",
    },
    {
      title: "Title Name",
      dataIndex: "categoryTitleName",
      key: "categoryTitleName",
    },
    {
      title: "Icon",
      dataIndex: "categoryTitleIcon",
      key: "categoryTitleIcon",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEditClick(record)}
            className={styles["category-title-page__table-button--edit"]}
            style={{ marginRight: 8 }}
          />
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.categoryTitleId)}
            className={styles["category-title-page__table-button--delete"]}
          />
        </>
      ),
    },
  ];

  return (
    <div className={styles["category-title-page__container"]}>
      <h1 className={styles["category-title-page__title"]}>Category Title Management</h1>
      <div className={styles["category-title-page__controls"]}>
        <Input
          placeholder="🔍 Search Category Title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles["category-title-page__controls-input"]}
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setPopupOpen(true);
            setIsEditing(false);
            setFormData({ categoryTitleName: "", categoryTitleIcon: "" });
          }}
          className={styles["category-title-page__controls-button"]}
        >
          Add New Title
        </Button>
      </div>

      <Table
        dataSource={titles.filter((title) =>
          (title.categoryTitleName || "").toLowerCase().includes(search.toLowerCase())
        )}
        columns={columns}
        rowKey="categoryTitleId"
        className={styles["category-title-page__table"]}
      />

      <Modal
        title={isEditing ? "Edit Category Title" : "Add Category Title"}
        visible={isPopupOpen}
        onCancel={() => setPopupOpen(false)}
        footer={null}
        className={styles["category-title-page__popup"]}
      >
        <Form layout="vertical" onFinish={isEditing ? handleEdit : handleAdd}>
          <Form.Item
            label="Category Title Name"
            required
            className={styles["category-title-page__form-group"]}
          >
            <Input
              name="categoryTitleName"
              value={formData.categoryTitleName}
              onChange={handleChange}
              className={styles["category-title-page__form-input"]}
            />
          </Form.Item>
          <Form.Item
            label="Category Title Icon"
            className={styles["category-title-page__form-group"]}
          >
            <Input
              name="categoryTitleIcon"
              value={formData.categoryTitleIcon}
              onChange={handleChange}
              className={styles["category-title-page__form-input"]}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={styles["category-title-page__submit-btn"]}
            >
              {isEditing ? "Update" : "Add"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CategoryTitlePage;