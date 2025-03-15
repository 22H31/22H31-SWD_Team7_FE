import { Button, Card, Col, Row, Spin, Tag } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Thêm useNavigate
import "./BlogHomePage.css";

const removeMarkdown = (text) => {
  if (!text) return ""; // Trả về chuỗi rỗng nếu text là null hoặc undefined
  return text
    .replace(/#|\*|`|\[|\]|\(|\)/g, "") // Loại bỏ các ký tự Markdown
    .replace(/\s+/g, " ") // Loại bỏ khoảng trắng thừa
    .trim(); // Loại bỏ khoảng trắng ở đầu và cuối
};
const BlogHomePage = () => {
  const navigate = useNavigate(); // Sử dụng useNavigate
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage] = useState(1);
  const pageSize = 1;

  useEffect(() => {
    axios
      .get("https://beteam720250214143214.azurewebsites.net/api/blogs")
      .then((response) => {
        setBlogs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu blog:", error);
        setLoading(false);
      });
  }, []);

  const paginatedBlogs = blogs.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="Bloglist-container">
      <h2 className="Bloglist-header">Blog của Beauty Love</h2>

      {loading ? (
        <div className="loading-container">
          <Spin size="large" />
        </div>
      ) : (
        paginatedBlogs.map((post) => (
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
                <h2
                  className="Bloglist-title"
                  // onClick={() => navigate(`/blogDetail/${post.blogId}`)} // Điều hướng khi click vào tiêu đề
                  // style={{ cursor: "pointer" }} // Giữ nguyên style, chỉ thêm hiệu ứng nhấn vào
                >
                  {post.title}
                </h2>
                <h3 className="Bloglist-subtitle">
                  {post.subtitle || "Subtitle mẫu để kiểm tra giao diện"}
                </h3>
                <p className="Bloglist-description">{removeMarkdown(post.content1).split(" ").slice(0, 110).join(" ")}...</p>
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
                    window.scrollTo(0, 0); // Cuộn lên đầu trang
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
      )}
    </div>
  );
};

export default BlogHomePage;
