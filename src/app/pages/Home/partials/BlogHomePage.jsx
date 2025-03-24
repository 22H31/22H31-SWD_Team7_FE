import { Button, Card, Col, Row, Spin, Tag } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { APIGetAllBlogs } from "../../../api/api"; // Import API đã tách
import "./BlogHomePage.css";

const removeMarkdown = (text) => {
  if (!text) return "";
  return text.replace(/#|\*|`|\[|\]|\(|\)/g, "").replace(/\s+/g, " ").trim();
};

const BlogHomePage = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    APIGetAllBlogs()
      .then((response) => {
        const sortedBlogs = response.data.sort(
          (a, b) => new Date(b.blogCreatedAt) - new Date(a.blogCreatedAt) // Ngày mới nhất trước
        );
        setBlogs(sortedBlogs);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu blog:", error);
      })
      .finally(() => setLoading(false));
  }, []);
  
  return (
    <div className="Bloglist-container">
      <h2 className="Bloglist-header">Blog của Beauty Love</h2>

      {loading ? (
        <div className="loading-container">
          <Spin size="large" />
        </div>
      ) : blogs.length > 0 ? (
        blogs.slice(0, 1).map((post) => ( // Hiển thị bài cũ nhất
          <Card key={post.blogId} className="Bloglist-card">
            <Row gutter={[16, 16]} align="middle">
              <Col xs={24} md={8} className="Bloglist-image-container">
                <img
                  alt={post.title}
                  src={post.avartarBlogUrl || "https://via.placeholder.com/600"}
                  className="Bloglist-image"
                  onClick={() => navigate(`/blogDetail/${post.blogId}`)}
                />
              </Col>
              <Col xs={24} md={16} className="Bloglist-content">
                <p className="Bloglist-date">
                  {new Date(post.blogCreatedAt).toLocaleDateString("vi-VN")}
                </p>
                <h2 className="Bloglist-title">{post.title}</h2>
                <h3 style={{ marginBottom: "10px" }} className="Bloglist-subtitle">
                  {post.subTitle || "Subtitle mẫu để kiểm tra giao diện"}
                </h3>
                <p className="Bloglist-description">
                  {removeMarkdown(post.content1).split(" ").slice(0, 110).join(" ")}...
                </p>
                <div className="Bloglist-tags">
                  <Tag color="pink">#mẹo</Tag>
                  <Tag color="purple">#chăm sóc da</Tag>
                  <Tag color="blue">#dưỡng ẩm</Tag>
                  <Tag color="green">#làm đẹp</Tag>
                  <Tag color="red">#thân thiện môi trường</Tag>
                </div>
                <Button
                  type="primary"
                  className="Bloglist-button"
                  onClick={() => {
                    navigate(`/blog/${post.blogId}`);
                    window.scrollTo(0, 0);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  Xem thêm
                </Button>
                <div className="Bloglist-footer">By Beautylove</div>
              </Col>
            </Row>
          </Card>
        ))
      ) : (
        <p>Không có blog nào để hiển thị.</p>
      )}
    </div>
  );
};

export default BlogHomePage;
