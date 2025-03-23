import React, { useState, useEffect } from "react";
import { Table, Button, Input, Modal, Form, Select, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import styles from "../categoryManage/categoryPage.module.css";

const CATEGORY_API = "https://swdteam7-hfgrdwa4dfhbe0ga.southeastasia-01.azurewebsites.net/api/categories";
const CATEGORY_TITLE_API = "https://swdteam7-hfgrdwa4dfhbe0ga.southeastasia-01.azurewebsites.net/api/categoryTitle";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [categoryTitles, setCategoryTitles] = useState([]);
  const [search, setSearch] = useState("");
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    categoryTitleId: "",
    categoryName: "",
    description: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetch(CATEGORY_API)
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) {
          console.error("Dữ liệu API không hợp lệ", data);
          return;
        }

        const extractedCategories = data.flatMap((item) =>
          item.categorys.map((subCategory) => ({
            categoryId: subCategory.categoryId,
            categoryTitleId: item.categoryTitleId,
            categoryName: subCategory.categoryName,
            description: subCategory.description,
          }))
        );

        setCategories(extractedCategories);
      })
      .catch((err) => console.error("Lỗi khi lấy categories:", err));

    fetch(CATEGORY_TITLE_API)
      .then((res) => res.json())
      .then((data) => setCategoryTitles(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Lỗi khi lấy category title:", err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    if (!formData.categoryTitleId || !formData.categoryName) {
      message.error("Vui lòng chọn Category Title và nhập Category Name!");
      return;
    }

    try {
      const res = await fetch(CATEGORY_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Lỗi khi thêm danh mục");
      const newCategory = await res.json();

      setCategories([...categories, newCategory]);
      setPopupOpen(false);
      message.success("Danh mục đã được thêm thành công!");
    } catch (err) {
      console.error("Lỗi khi thêm:", err);
      message.error("Lỗi khi thêm danh mục!");
    }
  };

  const handleEdit = async () => {
    if (!editId || !formData.categoryName) {
      message.error("Dữ liệu không hợp lệ!");
      return;
    }

    try {
      const res = await fetch(`${CATEGORY_API}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Lỗi khi cập nhật danh mục: ${errorText}`);
      }

      setCategories(
        categories.map((item) =>
          item.categoryId === editId ? { ...item, ...formData } : item
        )
      );
      setPopupOpen(false);
      message.success("Danh mục đã được cập nhật thành công!");
    } catch (err) {
      console.error("Lỗi khi cập nhật:", err);
      message.error(`Lỗi khi cập nhật: ${err.message}`);
    }
  };

  const handleDelete = async (id) => {
    if (!id || !window.confirm("Bạn có chắc muốn xóa danh mục này?")) return;

    try {
      const res = await fetch(`${CATEGORY_API}/${id}`, { method: "DELETE" });

      if (!res.ok) throw new Error("Lỗi khi xóa danh mục");

      setCategories(categories.filter((item) => item.categoryId !== id));
      message.success("Danh mục đã được xóa thành công!");
    } catch (err) {
      console.error("Lỗi khi xóa:", err);
      message.error("Lỗi khi xóa danh mục!");
    }
  };

  const handleEditClick = (category) => {
    setFormData({
      categoryTitleId: category.categoryTitleId,
      categoryName: category.categoryName,
      description: category.description,
    });
    setIsEditing(true);
    setEditId(category.categoryId);
    setPopupOpen(true);
  };

  const columns = [
    {
      title: "Category Name",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
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
            className={styles["category-page__table-button--edit"]}
            style={{ marginRight: 8 }}
          />
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.categoryId)}
            className={styles["category-page__table-button--delete"]}
          />
        </>
      ),
    },
  ];

  return (
    <div className={styles["category-page__container"]}>
      <h1 className={styles["category-page__title"]}>Category Management</h1>
      <div className={styles["category-page__controls"]}>
        <Input
          placeholder="🔍 Search Category"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles["category-page__controls-input"]}
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setPopupOpen(true);
            setIsEditing(false);
            setFormData({ categoryTitleId: "", categoryName: "", description: "" });
          }}
          className={styles["category-page__controls-button"]}
        >
          Add New Category
        </Button>
      </div>

      <Table
        dataSource={categories.filter((cat) =>
          (cat.categoryName || "").toLowerCase().includes(search.toLowerCase())
        )}
        columns={columns}
        rowKey="categoryId"
        className={styles["category-page__table"]}
      />

      <Modal
        title={isEditing ? "Edit Category" : "Add Category"}
        visible={isPopupOpen}
        onCancel={() => setPopupOpen(false)}
        footer={null}
        className={styles["category-page__popup"]}
      >
        <Form layout="vertical" onFinish={isEditing ? handleEdit : handleAdd}>
          <Form.Item label="Category Title">
            <Select
              name="categoryTitleId"
              value={formData.categoryTitleId}
              onChange={(value) => setFormData({ ...formData, categoryTitleId: value })}
              className={styles["category-page__form-select"]}
            >
              <Select.Option value="">Select Category Title</Select.Option>
              {categoryTitles.map((title) => (
                <Select.Option key={title.categoryTitleId} value={title.categoryTitleId}>
                  {title.categoryTitleName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Category Name">
            <Input
              name="categoryName"
              value={formData.categoryName}
              onChange={handleChange}
              required
              className={styles["category-page__form-input"]}
            />
          </Form.Item>
          <Form.Item label="Description">
            <Input
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className={styles["category-page__form-input"]}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={styles["category-page__submit-btn"]}
            >
              {isEditing ? "Update" : "Add"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CategoryPage;