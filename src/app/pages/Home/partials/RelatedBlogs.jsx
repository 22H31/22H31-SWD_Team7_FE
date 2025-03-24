import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import { APIGetAllBlogs } from "../../../api/api"; 
import "./RelatedBlog.css";

const removeMarkdown = (text) => {
  if (!text) return "";
  return text
    // Remove headings, emphasis, links, blockquotes
    .replace(/[#>*`_~\-]/g, "") // Remove markdown syntax chars
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Remove links but keep text
    .replace(/\s+/g, " ") // Remove extra spaces
    .trim();
};


const RelatedBlogs = () => {
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

  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="relatedblogs-container">
      <div className="relatedblogs-grid">
        {posts.map((post, index) => (
          <div key={index} className="relatedblogs-card">
            <div className="relatedblogs-image-container">
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
            <div className="relatedblogs-content">
              <h3 className="relatedblogs-post-title">{post.title}</h3>
              <p className="relatedblogs-description">
                {removeMarkdown(post.content1).split(" ").slice(0, 110).join(" ")}...
              </p>
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
        <button className="relatedblogs-button" onClick={() => {
          navigate("/blog");
          window.scrollTo(0, 0);
        }}>
          Xem thêm
        </button>
      </div>
    </div>
  );
};

export default RelatedBlogs;
