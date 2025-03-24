import "./HealthCare.css";
import { useEffect, useState } from "react";
import { Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { APIGetAllBlogs } from "../../../api/api"; // Import API

const removeMarkdown = (text) => {
  if (!text) return "";
  return text
    .replace(/#|\*|`|\[|\]|\(|\)/g, "")
    .replace(/\s+/g, " ")
    .trim();
};

const HealthCare = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    APIGetAllBlogs()
      .then((response) => {
        const shuffled = response.data.sort(() => 0.5 - Math.random()).slice(0, 3);
        setPosts(shuffled);
      })
      .catch((error) => console.error("Error fetching blogs:", error))
      .finally(() => setLoading(false));
  }, []);

  const handleViewMore = () => {
    navigate("/blog");
    window.scrollTo(0, 0);
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
                src={post.avartarBlogUrl || "https://via.placeholder.com/300"}
                alt={post.title}
                className="relatedblogs-image"
                onClick={() => {
                  navigate(`/blog/${post.blogId}`);
                  window.scrollTo(0, 0);
                }}
                style={{ cursor: "pointer" }}
              />
            </div>
            <div className="healthcare-content">
              <h3 className="healthcare-post-title">{post.title}</h3>
              <p className="healthcare-description">
                {removeMarkdown(post.content1).split(" ").slice(0, 110).join(" ")}...
              </p>
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
