import { Spin } from "antd"; // Thêm Spin từ Ant Design
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Thêm useNavigate để điều hướng
import "./RelatedBlog.css";

const RelatedBlogs = () => {
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
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="relatedblogs-container">
      <h2 className="relatedblogs-title">Blogs liên quan</h2>
      <div className="relatedblogs-grid">
        {posts.map((post, index) => (
          <div key={index} className="relatedblogs-card">
            <div className="relatedblogs-image-container">
              <img
                src={post.avartarBlogUrl || "https://via.placeholder.com/300"} // Thêm fallback image
                alt={post.title}
                className="relatedblogs-image"
              />
            </div>
            <div className="relatedblogs-content">
              <h3 className="relatedblogs-post-title">{post.title}</h3>
              <p className="relatedblogs-description">{post.content1}</p>
              <div className="relatedblogs-footer">
                <span className="relatedblogs-date">
                  {new Date(post.blogCreatedAt).toLocaleDateString("vi-VN")}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="relatedblogs-more">
        <button className="relatedblogs-button" onClick={handleViewMore}>
          Xem thêm
        </button>
      </div>
    </div>
  );
};

export default RelatedBlogs;