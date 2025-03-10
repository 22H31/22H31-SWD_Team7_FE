import React, { useState, useEffect } from "react";
import styles from "../categoryManage/categoryPage.module.css";

const CATEGORY_API = "https://beteam720250214143214.azurewebsites.net/api/categories";
const CATEGORY_TITLE_API = "https://beteam720250214143214.azurewebsites.net/api/categoryTitle";

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

  // **Lấy danh sách Category và Category Title**
  useEffect(() => {
    fetch(CATEGORY_API)
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) {
          console.error("Dữ liệu API không hợp lệ", data);
          return;
        }

        // Trích xuất thông tin cần thiết
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

  // **Xử lý thay đổi trong form**
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // **Thêm mới Category (POST)**
  const handleAdd = async () => {
    if (!formData.categoryTitleId || !formData.categoryName) {
      alert("Vui lòng chọn Category Title và nhập Category Name!");
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
    } catch (err) {
      console.error("Lỗi khi thêm:", err);
    }
  };

  // **Cập nhật Category (PUT)**
  const handleEdit = async () => {
    if (!editId || !formData.categoryName) {
      alert("Dữ liệu không hợp lệ!");
      return;
    }

    console.log("Đang cập nhật category:", editId, formData);

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
    } catch (err) {
      console.error("Lỗi khi cập nhật:", err);
      alert(`Lỗi khi cập nhật: ${err.message}`);
    }
  };

  // **Xóa Category (DELETE)**
  const handleDelete = async (id) => {
    if (!id || !window.confirm("Bạn có chắc muốn xóa danh mục này?")) return;

    try {
      const res = await fetch(`${CATEGORY_API}/${id}`, { method: "DELETE" });

      if (!res.ok) throw new Error("Lỗi khi xóa danh mục");

      setCategories(categories.filter((item) => item.categoryId !== id));
    } catch (err) {
      console.error("Lỗi khi xóa:", err);
    }
  };

  // **Mở popup chỉnh sửa**
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

  return (
    <div className={styles.container}>
      <h1>Category Management</h1>
      <div className={styles.controls}>
        <input
          type="text"
          placeholder="🔍 Search Category"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => {
            setPopupOpen(true);
            setIsEditing(false);
            setFormData({ categoryTitleId: "", categoryName: "", description: "" });
          }}
        >
          ➕ Add New Category
        </button>
      </div>

      {/* Hiển thị danh sách danh mục */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Category Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories
            .filter((cat) =>
              (cat.categoryName || "").toLowerCase().includes(search.toLowerCase())
            )
            .map((category) => (
              <tr key={category.categoryId}>
                <td>{category.categoryName}</td>
                <td>{category.description}</td>
                <td>
                  <button onClick={() => handleEditClick(category)}>✏️</button>
                  <button onClick={() => handleDelete(category.categoryId)}>❌</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Popup Form */}
      {isPopupOpen && (
        <div className={styles.overlay}>
          <div className={styles.popup}>
            <h2>{isEditing ? "Edit Category" : "Add Category"}</h2>
            <button className={styles.closeBtn} onClick={() => setPopupOpen(false)}>✖</button>

            <div className={styles.formGroup}>
              <label>Category Title</label>
              <select name="categoryTitleId" value={formData.categoryTitleId} onChange={handleChange}>
                <option value="">Select Category Title</option>
                {categoryTitles.map((title) => (
                  <option key={title.categoryTitleId} value={title.categoryTitleId}>
                    {title.categoryTitleName}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>Category Name</label>
              <input type="text" name="categoryName" value={formData.categoryName} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label>Description</label>
              <input type="text" name="description" value={formData.description} onChange={handleChange} />
            </div>
            <button onClick={isEditing ? handleEdit : handleAdd} className={styles.submitBtn}>
              {isEditing ? "Update" : "Add"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;