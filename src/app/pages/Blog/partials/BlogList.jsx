import { Button, Card, Col, Pagination, Row, Spin, Tag } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { APIGetAllBlogs } from "../../../api/api"; // Import API
import "./Bloglist.css";

const removeMarkdown = (text) => {
  if (!text) return "";
  return text
    .replace(/#|\*|`|\[|\]|\(|\)/g, "")
    .replace(/\s+/g, " ")
    .trim();
};

const Bloglist = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;

  useEffect(() => {
    APIGetAllBlogs()
      .then((response) => {
        const sortedBlogs = response.data.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateB - dateA;
        });
        setBlogs(sortedBlogs);
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
                />
              </Col>
              <Col xs={24} md={16} className="Bloglist-content">
                <p className="Bloglist-date">
                  {new Date(post.blogCreatedAt).toLocaleDateString("vi-VN")}
                </p>
                <h2 className="Bloglist-title">{post.title}</h2>
                <h3 className="Bloglist-subtitle">
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
