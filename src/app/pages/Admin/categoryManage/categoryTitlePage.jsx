import React, { useState, useEffect } from "react";
import styles from "../categoryManage/categoryTitlePage.module.css";

const API_URL = "https://beteam720250214143214.azurewebsites.net/api/categoryTitle";

const CategoryTitlePage = () => {
  const [titles, setTitles] = useState([]);
  const [search, setSearch] = useState("");
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [formData, setFormData] = useState({ categoryTitleName: "", categoryTitleIcon: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // **Lấy danh sách category title từ API**
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setTitles(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Lỗi khi lấy dữ liệu:", err));
  }, []);

  // **Xử lý thay đổi trong form**
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // **Thêm mới Category Title (POST)**
  const handleAdd = async () => {
    if (!formData.categoryTitleName) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Lỗi khi thêm danh mục tiêu đề");
      const newTitle = await res.json();

      setTitles([...titles, newTitle]);
      setPopupOpen(false);
    } catch (err) {
      console.error("Lỗi khi thêm:", err);
    }
  };

  // **Cập nhật Category Title (PUT)**
  const handleEdit = async () => {
    if (!editId || !formData.categoryTitleName) {
      alert("Dữ liệu không hợp lệ!");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Lỗi khi cập nhật danh mục tiêu đề");

      setTitles(
        titles.map((item) =>
          item.categoryTitleId === editId ? { ...item, ...formData } : item
        )
      );
      setPopupOpen(false);
    } catch (err) {
      console.error("Lỗi khi cập nhật:", err);
    }
  };

  // **Xóa Category Title (DELETE)**
  const handleDelete = async (id) => {
    if (!id) {
      alert("ID không hợp lệ!");
      return;
    }

    if (!window.confirm("Bạn có chắc muốn xóa danh mục tiêu đề này?")) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

      if (!res.ok) throw new Error("Lỗi khi xóa danh mục tiêu đề");

      setTitles(titles.filter((item) => item.categoryTitleId !== id));
    } catch (err) {
      console.error("Lỗi khi xóa:", err);
    }
  };

  // **Mở popup chỉnh sửa**
  const handleEditClick = (title) => {
    setFormData({
      categoryTitleName: title.categoryTitleName,
      categoryTitleIcon: title.categoryTitleIcon,
    });
    setIsEditing(true);
    setEditId(title.categoryTitleId);
    setPopupOpen(true);
  };

  return (
    <div className={styles.container}>
      <h1>Category Title Management</h1>
      <div className={styles.controls}>
        <input
          type="text"
          placeholder="🔍 Search Category Title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => {
            setPopupOpen(true);
            setIsEditing(false);
            setFormData({ categoryTitleName: "", categoryTitleIcon: "" });
          }}
        >
          ➕ Add New Title
        </button>
      </div>

      {/* Hiển thị danh sách danh mục tiêu đề */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title Name</th>
            <th>Icon</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {titles
            .filter((title) =>
              (title.categoryTitleName || "").toLowerCase().includes(search.toLowerCase())
            )
            .map((title) => (
              <tr key={title.categoryTitleId}>
                <td>{title.categoryTitleId}</td>
                <td>{title.categoryTitleName}</td>
                <td>{title.categoryTitleIcon}</td>
                <td>
                  <button onClick={() => handleEditClick(title)}>✏️</button>
                  <button onClick={() => handleDelete(title.categoryTitleId)}>❌</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Popup Form */}
      {isPopupOpen && (
        <div className={styles.overlay}>
          <div className={styles.popup}>
            <h2>{isEditing ? "Edit Category Title" : "Add Category Title"}</h2>
            <button className={styles.closeBtn} onClick={() => setPopupOpen(false)}>✖</button>

            <div className={styles.formGroup}>
              <label>Category Title Name</label>
              <input type="text" name="categoryTitleName" value={formData.categoryTitleName} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label>Category Title Icon</label>
              <input type="text" name="categoryTitleIcon" value={formData.categoryTitleIcon} onChange={handleChange} />
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

export default CategoryTitlePage;