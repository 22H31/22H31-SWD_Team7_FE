import React, { useState, useEffect } from "react";
import styles from "./blogPage.module.css";

const API_URL = "https://beteam720250214143214.azurewebsites.net/api/blogs";

function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [blogId, setBlogId] = useState(null);
  const [imageFiles, setImageFiles] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ title: "", subTitle: "", content1: "", content2: "" });

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => console.error("Error fetching blogs:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNextStep = async () => {
    if (step === 1) {
      try {
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!res.ok) throw new Error("Lỗi khi tạo blog!");
        const data = await res.json();
        setBlogId(data.blogId); // Sử dụng đúng trường blogId từ phản hồi API
        console.log("Blog ID:", data.blogId); // Thêm thông báo để kiểm tra blogId
        alert("Blog đã được tạo thành công!");
        setStep(2);
      } catch (err) {
        console.error("Lỗi khi tạo blog:", err);
        alert("Tạo blog thất bại!");
      }
    } else if (step === 2) {
      if (!blogId || !imageFiles.avatar) {
        alert("Chưa chọn ảnh đại diện!");
        return;
      }

      const formDataUpload = new FormData();
      formDataUpload.append("fileDtos", imageFiles.avatar);

      try {
        await fetch(`${API_URL}/${blogId}/blog_avatar_images`, {
          method: "POST",
          body: formDataUpload,
        });
        alert("Ảnh đại diện đã được upload!");
        setStep(3);
      } catch (err) {
        console.error("Lỗi upload ảnh đại diện:", err);
        alert("Upload ảnh thất bại!");
      }
    } else if (step === 3) {
      if (!blogId || !imageFiles.blogImages.length) {
        alert("Chưa chọn ảnh blog!");
        return;
      }

      const formDataUpload = new FormData();
      Array.from(imageFiles.blogImages).forEach((file) =>
        formDataUpload.append("fileDtos", file)
      );

      try {
        await fetch(`${API_URL}/${blogId}/blog_images`, {
          method: "POST",
          body: formDataUpload,
        });
        alert("Ảnh blog đã được upload!");
        setPopupOpen(false);
      } catch (err) {
        console.error("Lỗi upload ảnh blog:", err);
        alert("Upload ảnh blog thất bại!");
      }
    }
  };

  const handleEditBlog = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`);
      if (!res.ok) throw new Error("Lỗi khi lấy thông tin blog!");
      const data = await res.json();
      setFormData({
        title: data.title,
        subTitle: data.subTitle,
        content1: data.content1,
        content2: data.content2,
      });
      setBlogId(id);
      setIsEditing(true);
      setStep(1);
      setPopupOpen(true);
    } catch (err) {
      console.error("Lỗi khi lấy thông tin blog:", err);
      alert("Lỗi khi lấy thông tin blog!");
    }
  };

  const handleDeleteBlog = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa blog này?")) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Lỗi khi xóa blog!");
      alert("Blog đã được xóa thành công!");
      setBlogs(blogs.filter((blog) => blog.blogId !== id));
    } catch (err) {
      console.error("Lỗi khi xóa blog:", err);
      alert("Lỗi khi xóa blog!");
    }
  };

  const handleAddClick = () => {
    setFormData({ title: "", subTitle: "", content1: "", content2: "" });
    setIsEditing(false);
    setPopupOpen(true);
    setStep(1);
  };

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h1>Blog Management</h1>
        <input type="text" placeholder="Search blogs..." className={styles.searchInput} />
        <button className={styles.addButton} onClick={handleAddClick}>
          ➕ Add New Blog
        </button>
      </div>

      <div className={styles.blogList}>
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div key={blog.blogId} className={styles.blogItem}>
              <h3>{blog.title}</h3>
              <p>{blog.content1.substring(0, 100)}...</p>
              <button onClick={() => handleEditBlog(blog.blogId)}>Edit</button>
              <button onClick={() => handleDeleteBlog(blog.blogId)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No blogs available</p>
        )}
      </div>

      {isPopupOpen && (
        <div className={styles.overlay}>
          <div className={styles.formContainer}>
            <h2>{isEditing ? "Edit Blog" : "Add Blog"}</h2>
            <button className={styles.closeBtn} onClick={() => setPopupOpen(false)}>✖</button>

            {step === 1 && (
              <>
                <div className={styles.formGrid}>
                  <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Blog Title" className={styles.inputField} />
                  <input type="text" name="subTitle" value={formData.subTitle} onChange={handleChange} placeholder="Blog Subtitle" className={styles.inputField} />
                  <textarea name="content1" value={formData.content1} onChange={handleChange} placeholder="Blog Content 1" className={styles.textArea} />
                  <textarea name="content2" value={formData.content2} onChange={handleChange} placeholder="Blog Content 2" className={styles.textArea} />
                </div>
                <button onClick={isEditing ? handleNextStep : handleNextStep} className={styles.submitButton}>{isEditing ? "Update" : "Next"}</button>
              </>
            )}

            {step === 2 && (
              <>
                <input type="file" accept="image/*" onChange={(e) => setImageFiles({ ...imageFiles, avatar: e.target.files[0] })} />
                <label>Blog ID:</label>
                <input type="text" name="blogId" value={blogId} readOnly /> {/* Display blogId */}
                <button onClick={handleNextStep} className={styles.submitButton}>Next</button>
              </>
            )}

            {step === 3 && (
              <>
                <input type="file" accept="image/*" multiple onChange={(e) => setImageFiles({ ...imageFiles, blogImages: e.target.files })} />
                <label>Blog ID:</label>
                <input type="text" name="blogId" value={blogId} readOnly /> {/* Display blogId */}
                <button onClick={handleNextStep} className={styles.submitButton}>Finish</button>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default BlogPage;