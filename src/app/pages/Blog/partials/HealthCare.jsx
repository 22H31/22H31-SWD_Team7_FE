// import React from "react";
import "./HealthCare.css";
import { useEffect, useState } from "react";
import { Spin } from "antd"; // Thêm Spin từ Ant Design
import { useNavigate } from "react-router-dom"; // Thêm useNavigate để điều hướng

const removeMarkdown = (text) => {
  if (!text) return ""; // Trả về chuỗi rỗng nếu text là null hoặc undefined
  return text
    .replace(/#|\*|`|\[|\]|\(|\)/g, "") // Loại bỏ các ký tự Markdown
    .replace(/\s+/g, " ") // Loại bỏ khoảng trắng thừa
    .trim(); // Loại bỏ khoảng trắng ở đầu và cuối
};

const HealthCare = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Thêm trạng thái loading
  const navigate = useNavigate(); // Sử dụng hook useNavigate

  useEffect(() => {
    fetch("https://beteam720250214143214.azurewebsites.net/api/blogs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Lấy ngẫu nhiên 3 bài viết
        const shuffled = data.sort(() => 0.5 - Math.random()).slice(0, 3);
        setPosts(shuffled);
      })
      .catch((error) => console.error("Error fetching blogs:", error))
      .finally(() => setLoading(false)); // Kết thúc loading
  }, []);

  // Hàm xử lý khi nhấn nút "Xem thêm"
  const handleViewMore = () => {
    navigate("/blog"); // Điều hướng đến trang /blog
    window.scrollTo(0, 0); // Cuộn lên đầu trang
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="healthcare-container">
      <h2 className="healthcare-title">Chăm sóc sức khỏe</h2>
      <div className="healthcare-grid">
        {posts.map((post, index) => (
          <div key={index} className="healthcare-card">
            <div className="healthcare-image-container">
              <img
                src={post.avartarBlogUrl || "https://via.placeholder.com/300"} // Thêm fallback image
                alt={post.title}
                className="relatedblogs-image"
                onClick={() => {
                  navigate(`/blog/${post.blogId}`);
                  window.scrollTo(0, 0); // Cuộn lên đầu trang
                }}
                style={{ cursor: "pointer" }}
              />
            </div>
            <div className="healthcare-content">
              <h3 className="healthcare-post-title">{post.title}</h3>
              <p className="healthcare-description"> {removeMarkdown(post.content1).split(" ").slice(0, 110).join(" ")}...</p>

              <div className="healthcare-footer">
                {new Date(post.blogCreatedAt).toLocaleDateString("vi-VN")}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="healthcare-more">
        <button className="healthcare-button" onClick={handleViewMore}>
          Xem thêm
        </button>
      </div>
    </div>
  );
};

export default HealthCare;
