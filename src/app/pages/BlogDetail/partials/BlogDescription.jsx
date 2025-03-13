import { Card, Col, Image, List, Row, Typography } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaRegCalendar,
  FaXTwitter,
} from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import "./BlogDescription.css";

const { Title, Text } = Typography;

const BlogDescription = () => {
  const { blogId } = useParams();
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [blogList, setBlogList] = useState([]);

  const formatDate = (date) => {
    if (!date) return "14/03/2025";
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime()) || parsedDate.getFullYear() < 1900) {
      return "14/03/2025";
    }
    return parsedDate.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getImageUrl = (url) => {
    return url && url.startsWith("http")
      ? url
      : "https://via.placeholder.com/600";
  };

  useEffect(() => {
    if (!blogId) return;
    setLoading(true);
    axios
      .get(
        `https://beteam720250214143214.azurewebsites.net/api/blogs/${blogId}`
      )
      .then((response) => setBlogData(response.data))
      .catch((error) => console.error("Lỗi tải bài viết:", error))
      .finally(() => setLoading(false));
  }, [blogId]);

  useEffect(() => {
    axios
      .get("https://beteam720250214143214.azurewebsites.net/api/blogs")
      .then((response) => setBlogList(response.data))
      .catch((error) => console.error("Lỗi tải danh sách blog:", error));
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        {/* <Spin size="large" /> */}
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
            <Title level={2}>
              {blogData.title}{" "}
              <span className="blogdescription-subtitle">
                {blogData.subTitle || "Subtitle mẫu để kiểm tra giao diện"}
              </span>
            </Title>

            <div className="blog-header">
              <Text type="secondary" className="blog-path">
                Blog {">"} Chăm sóc da | {formatDate(blogData.createdAt)}
              </Text>
              <div className="author-info">
                <Text strong>By {blogData.author || "Beauty Love"}</Text>
              </div>
            </div>

            <Image
              src={getImageUrl(blogData.blogAvartarImageUrl)}
              alt={blogData.title}
              width="100%"
              className="main-image"
            />
            <Text className="blog-text">{blogData.content1}</Text>

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

                    <Title level={2}>{blogData.title}</Title>
                    <Text className="blog-text content2">
                      {blogData.content2}
                    </Text>

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
              dataSource={blogList.slice(0, 5)}
              renderItem={(post) => (
                <List.Item>
                  <Link to={`/blogs/${post.blogId}`} className="blog-link">
                    {post.subTitle}
                  </Link>
                  <Text
                    type="secondary"
                    style={{ display: "block", fontSize: "14px" }}
                  ></Text>
                  <FaRegCalendar style={{ marginRight: "5px" }} />
                  {formatDate(post.createdAt)}
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