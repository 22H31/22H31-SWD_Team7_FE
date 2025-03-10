"use client";
import React, { useState, useEffect } from "react";
import styles from "./blogPage.module.css";

const API_URL = "https://beteam720250214143214.azurewebsites.net/api/blogs";

function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [formData, setFormData] = useState({ title: "", content: "" });

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

  const handleAdd = () => {
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((newBlog) => {
        setBlogs([...blogs, newBlog]);
        setPopupOpen(false);
      })
      .catch((err) => console.error("Error adding blog:", err));
  };

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h1>Blog Management</h1>
        <input type="text" placeholder="Search blogs..." className={styles.searchInput} />
        <button className={styles.addButton} onClick={() => setPopupOpen(true)}>
          ➕ Add New Blog
        </button>
      </div>

      <div className={styles.blogList}>
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div key={blog.id} className={styles.blogItem}>
              <h3>{blog.title}</h3>
              <p>{blog.content.substring(0, 100)}...</p>
            </div>
          ))
        ) : (
          <p>No blogs available</p>
        )}
      </div>

      {isPopupOpen && (
        <div className={styles.overlay}>
          <div className={styles.formContainer}>
            <h2>Add Blog</h2>
            <button className={styles.closeBtn} onClick={() => setPopupOpen(false)}>✖</button>

            <div className={styles.formGrid}>
              <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Blog Title" className={styles.inputField} />
              <textarea name="content" value={formData.content} onChange={handleChange} placeholder="Blog Content" className={styles.textArea} />
            </div>

            <button onClick={handleAdd} className={styles.submitButton}>Add</button>
          </div>
        </div>
      )}
    </section>
  );
}

export default BlogPage;