import React, { useState, useEffect } from "react";
import styles from "./brandPage.module.css";

const API_URL = "https://beteam720250214143214.azurewebsites.net/api/brand";

const BrandPage = () => {
  const [brands, setBrands] = useState([]);
  const [search, setSearch] = useState("");
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [formData, setFormData] = useState({ brandName: "", brandImg: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // **Lấy danh sách Brand từ API**
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setBrands(data))
      .catch((err) => console.error("Lỗi khi lấy dữ liệu:", err));
  }, []);

  // **Xử lý thay đổi input**
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // **Thêm Brand mới (POST)**
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
      })
      .catch((err) => console.error("Lỗi khi thêm Brand:", err));
  };

  // **Cập nhật Brand (PUT)**
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
      })
      .catch((err) => console.error("Lỗi khi cập nhật Brand:", err));
  };

  // **Xóa Brand (DELETE)**
  const handleDelete = (id) => {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then(() => {
        setBrands(brands.filter((item) => item.brandId !== id));
      })
      .catch((err) => console.error("Lỗi khi xóa Brand:", err));
  };

  // **Mở popup chỉnh sửa**
  const handleEditClick = (brand) => {
    setFormData({ brandName: brand.brandName, brandImg: brand.brandImg });
    setIsEditing(true);
    setEditId(brand.brandId);
    setPopupOpen(true);
  };

  return (
    <div className={styles.container}>
      <h1>Brand Management</h1>
      <div className={styles.controls}>
        <input
          type="text"
          placeholder="🔍 Search Brand"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => {
            setPopupOpen(true);
            setIsEditing(false);
            setFormData({ brandName: "", brandImg: "" });
          }}
        >
          ➕ Add New Brand
        </button>
      </div>

      {/* Hiển thị danh sách Brand */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Brand Name</th>
            <th>Logo</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {brands
            .filter((brand) =>
              brand.brandName.toLowerCase().includes(search.toLowerCase())
            )
            .map((brand) => (
              <tr key={brand.brandId}>
                <td>{brand.brandId}</td>
                <td>{brand.brandName}</td>
                <td>
                  <img src={brand.brandImg} alt={brand.brandName} />
                </td>
                <td>
                  <button onClick={() => handleEditClick(brand)}>✏️</button>
                  <button onClick={() => handleDelete(brand.brandId)}>❌</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Popup Form */}
      {isPopupOpen && (
        <div className={styles.overlay}>
          <div className={styles.popup}>
            <h2>{isEditing ? "Edit Brand" : "Add Brand"}</h2>
            <button className={styles.closeBtn} onClick={() => setPopupOpen(false)}>✖</button>

            <div className={styles.formGroup}>
              <label>Brand Name</label>
              <input type="text" name="brandName" value={formData.brandName} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label>Brand Logo URL</label>
              <input type="text" name="brandImg" value={formData.brandImg} onChange={handleChange} />
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

export default BrandPage;
