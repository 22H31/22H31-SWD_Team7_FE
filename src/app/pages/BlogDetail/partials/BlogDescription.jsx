import { Card, Col, Image, List, Row, Spin, Typography } from "antd";
import { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaRegCalendar,
  FaXTwitter,
} from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import {
  APIGetAllBlogs,
  APIGetBlogById,
} from "../../../api/api"; // Import API
import "./BlogDescription.css";

const { Title, Text } = Typography;

const BlogDescription = () => {
  const { blogId } = useParams();
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [blogList, setBlogList] = useState([]);

  const formatDate = (date) => {
    if (!date) return "";
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime()) || parsedDate.getFullYear() < 1900) {
      return "";
    }
    return parsedDate.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getImageUrl = (url) =>
    url && url.startsWith("http") ? url : "https://via.placeholder.com/600";

  // Get blog by ID
  useEffect(() => {
    if (!blogId) return;
    setLoading(true);
    APIGetBlogById(blogId)
      .then((response) => setBlogData(response.data))
      .catch((error) => console.error("Lỗi tải bài viết:", error))
      .finally(() => setLoading(false));
  }, [blogId]);

  // Get blog list
  useEffect(() => {
    APIGetAllBlogs()
      .then((response) => setBlogList(response.data))
      .catch((error) => console.error("Lỗi tải danh sách blog:", error));
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
      </div>
    );
  }

  if (!blogData) {
    return <p>Không tìm thấy bài viết.</p>;
  }

  return (
    <div className="blog-description" style={{ backgroundColor: "#fff" }}>
      <Row gutter={[32, 32]} justify="center">
        <Col xs={24} md={16}>
          <Card bordered={false}>
            <Title className="blogdescription-title">
              {blogData.title}{" "}
              <span className="blogdescription-subtitle">
                {blogData.subTitle || "Subtitle mẫu để kiểm tra giao diện"}
              </span>
            </Title>

            <div className="blog-header">
              {formatDate(blogData.blogCreatedAt) && (
                <Text className="blog-path">
                  Blog {">"} Chăm sóc da | {formatDate(blogData.blogCreatedAt)}
                </Text>
              )}
              <div className="author-info">
                <Text className="blog-path">
                  By {blogData.author || "Beauty Love"}
                </Text>
              </div>
            </div>

            <Image
              src={getImageUrl(blogData.blogAvartarImageUrl)}
              alt={blogData.title}
              width="100%"
              className="main-image"
            />

            <div className="blog-text">
              <ReactMarkdown>{blogData.content1}</ReactMarkdown>
            </div>

            {blogData.blogImageUrl &&
              (() => {
                const images = Object.values(blogData.blogImageUrl);
                const halfIndex = Math.ceil(images.length / 2);
                return (
                  <>
                    {images.slice(0, halfIndex).map((imageUrl, index) => (
                      <Image
                        key={`before-content2-${index}`}
                        src={getImageUrl(imageUrl)}
                        alt={`Image ${index + 1}`}
                        width="100%"
                        height="500px"
                        className="additional-image"
                      />
                    ))}

                    <div className="blog-text content2">
                      <ReactMarkdown>{blogData.content2}</ReactMarkdown>
                    </div>

                    {images.slice(halfIndex).map((imageUrl, index) => (
                      <Image
                        key={`after-content2-${index}`}
                        src={getImageUrl(imageUrl)}
                        alt={`Image ${index + 1}`}
                        width="100%"
                        height="500px"
                        className="additional-image"
                      />
                    ))}
                  </>
                );
              })()}

            <div className="share">
              <Text className="share-text">Chia sẻ:</Text>
              <FaFacebookF className="share-icon" />
              <FaInstagram className="share-icon" />
              <FaXTwitter className="share-icon" />
              <FaLinkedinIn className="share-icon" />
            </div>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card title="BLOG" bordered={false} className="sidebar">
            <List
              dataSource={blogList.slice(0, 4)}
              renderItem={(post) => (
                <List.Item className="blog-item">
                  <Link
                    to={`/blog/${post.blogId}`}
                    className="blog-link"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    {post.subTitle}
                  </Link>
                  <div className="blog-date">
                    <FaRegCalendar className="calendar-icon" />
                    {formatDate(post.blogCreatedAt)}
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default BlogDescription;
