import { Card, Col, Image, List, Row, Spin, Typography } from "antd";
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
    if (!date || date === "0001-01-01T00:00:00") return "Không xác định";
    const parsedDate = new Date(date);
    return isNaN(parsedDate.getTime())
      ? "Không xác định"
      : parsedDate.toLocaleDateString("vi-VN");
  };

  const getImageUrl = (url) => {
    return url && url.startsWith("http")
      ? url
      : "https://via.placeholder.com/600";
  };

  useEffect(() => {
    if (!blogId) return;
    const controller = new AbortController();
    setLoading(true);

    axios
      .get(
        `https://beteam720250214143214.azurewebsites.net/api/blogs/${blogId}`,
        {
          signal: controller.signal,
        }
      )
      .then((response) => {
        console.log("Blog Data:", response.data);
        setBlogData(response.data);
      })
      .catch((error) => {
        if (!axios.isCancel(error))
          console.error("Error fetching blog data:", error);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [blogId]);

  useEffect(() => {
    const controller = new AbortController();
    axios
      .get("https://beteam720250214143214.azurewebsites.net/api/blogs", {
        signal: controller.signal,
      })
      .then((response) => setBlogList(response.data))
      .catch((error) => {
        if (!axios.isCancel(error))
          console.error("Error fetching blog list:", error);
      });

    return () => controller.abort();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">{/* <Spin size="large" /> */}</div>
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
                {blogData.subtitle || "Subtitle mẫu để kiểm tra giao diện"}
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

            {/* {blogData.blogImageUrl?.img4 && (
              <Image
                src={getImageUrl(blogData.blogImageUrl.img4)}
                alt="Image 4"
                width="100%"
                className="additional-image"
              />
            )} */}
            {/* <Text className="blog-text">
              {blogData.content2 || "Mô tả nội dung thêm..."}
            </Text>

            {blogData.blogImageUrl?.img5 && (
              <Image
                src={getImageUrl(blogData.blogImageUrl.img5)}
                alt="Image 5"
                width="100%"
                className="additional-image"
              />
            )} */}

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
              dataSource={blogList.slice(0, 5)} // Giới hạn danh sách còn 5 bài
              renderItem={(post) => (
                <List.Item>
                  <Link to={`/blogs/${post.blogId}`} className="blog-link">
                    {post.title}
                  </Link>
                  <Text
                    type="secondary"
                    style={{ display: "block", fontSize: "14px" }}
                  >
                  </Text>
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
