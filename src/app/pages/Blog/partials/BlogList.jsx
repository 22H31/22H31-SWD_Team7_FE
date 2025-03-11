import { Button, Card, Col, Pagination, Row, Tag } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Thêm useNavigate
import "./Bloglist.css";

const Bloglist = () => {
  const navigate = useNavigate(); // Sử dụng useNavigate
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;

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
      <h2 className="Bloglist-header">Khám Phá Ngay</h2>

      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        paginatedBlogs.map((post) => (
          <Card key={post.blogId} className="Bloglist-card">
            <Row gutter={[16, 16]} align="middle">
              <Col xs={24} md={8} className="Bloglist-image-container">
                <img
                  alt={post.title}
                  src={post.avartarBlogUrl || "https://via.placeholder.com/600"}
                  className="Bloglist-image"
                  onClick={() => navigate(`/blogDetail/${post.blogId}`)} // Điều hướng khi click vào ảnh
                />
              </Col>
              <Col xs={24} md={16} className="Bloglist-content">
                <p className="Bloglist-date">
                  {new Date(post.createdAt).toLocaleDateString("vi-VN")}
                </p>
                <h2
                  className="Bloglist-title"
                  onClick={() => navigate(`/blogDetail/${post.blogId}`)} // Điều hướng khi click vào tiêu đề
                  style={{ cursor: "pointer" }} // Giữ nguyên style, chỉ thêm hiệu ứng nhấn vào
                >
                  {post.title}
                </h2>
                <h3 className="Bloglist-subtitle">
                  {post.subtitle || "Subtitle mẫu để kiểm tra giao diện"}
                </h3>
                <p className="Bloglist-description">{post.content1}</p>
                <div className="Bloglist-tags">
                  <Tag color="purple">#chăm sóc da</Tag>
                  <Tag color="blue">#dưỡng ẩm</Tag>
                  <Tag color="green">#làm đẹp</Tag>
                </div>
                <Button
                  type="primary"
                  className="Bloglist-button"
                  onClick={() => navigate(`/blog/${post.blogId}`)} 
                >
                  Xem thêm
                </Button>
                <div className="Bloglist-footer">By Beautylove</div>
              </Col>
            </Row>
          </Card>
        ))
      )}

      <Pagination
        className="Bloglist-pagination"
        current={currentPage}
        pageSize={pageSize}
        total={blogs.length}
        showSizeChanger={false}
        onChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default Bloglist;
