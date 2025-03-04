import { Row, Col, Typography, Card, Image, List } from "antd";
import { EyeOutlined} from "@ant-design/icons";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaLinkedinIn,
} from "react-icons/fa6";
import "./BlogDescription.css";

const { Title, Text } = Typography;

const blogData = {
  title:
    "Mỹ phẩm hữu cơ là gì? Top 5 thương hiệu mỹ phẩm hữu cơ được yêu thích hiện nay",
  category: "Chăm sóc da",
  date: "2024-02-15",
  author: "Beauty Love",
  views: 2317,
  mainImage:
    "https://th.bing.com/th/id/R.f88bab41821076740c6136693141c5a0?rik=ugpXHKx6515Pcw&pid=ImgRaw&r=0",
  content: [
    {
      type: "text",
      value:
        "Sử dụng các loại mỹ phẩm hữu cơ đã trở thành một trào lưu được nhiều người đón nhận bởi các cam kết về sức khỏe và bảo vệ môi trường. Đây cũng là một trong những xu hướng làm đẹp mới được nhiều tín đồ mê skincare đón nhận nhờ những lợi ích mà nó mang đến. Vậy  Mỹ phẩm hữu cơ là gì?Hãy cùng Beauty Love khám phá qua bài viết sau.",
    },
    {
      type: "image",
      src: "https://bizweb.dktcdn.net/thumb/1024x1024/100/413/259/files/my-pham-organic-viet-nam-1.jpg?v=1674448768705",
      caption: "Các thành phần tự nhiên trong mỹ phẩm hữu cơ",
    },
    {
      type: "text",
      title: "Mỹ phẩm hữu cơ là gì?",
      value:
        "Mỹ phẩm hữu cơ là dòng mỹ phẩm chứa ít nhất 95% thành phần hữu cơ, không có hóa chất độc hại...",
    },

    {
      type: "image",
      src: "https://i.pinimg.com/736x/28/96/c2/2896c24dbce7952206b66392eab986e4.jpg",
      caption: "Dưỡng da tự nhiên với mỹ phẩm hữu cơ",
    },
    {
      type: "text",
      value:
        "Mỹ phẩm hữu cơ (organic) là những sản phẩm làm đẹp có nguồn gốc từ các thành phần tự nhiên, được trồng trọt và sản xuất mà không sử dụng các chất phụ gia hóa học, thuốc trừ sâu hoặc phân bón tổng hợp. Điều này không chỉ giúp giảm thiểu tác động xấu đến môi trường mà còn đảm bảo an toàn cho người sử dụng. Mỹ phẩm hữu cơ có rất ít hàm lượng chất hóa học nên được cho là lành tính hơn cho sức khỏe. Để một sản phẩm được gọi là mỹ phẩm hữu cơ, nó cần phải đáp ứng các tiêu chuẩn nghiêm ngặt và có được chứng nhận từ các tổ chức uy tín. Các chứng nhận này đảm bảo rằng sản phẩm được sản xuất theo quy trình hữu cơ và không chứa các thành phần độc hại.",
    },
  ],
  relatedPosts: [
    {
      title: "Học cách chăm sóc da mặt để có làn da khoẻ mạnh",
      link: "/blog/skincare-tips",
      date: "2024-02-15",
    },
    {
      title: "Cách sử dụng kem chống nắng đúng cách",
      link: "/blog/sunscreen-guide",
      date: "2024-02-15",
    },
    {
      title: "Mùi tây rất giàu A & Biome của cơ thể",
      link: "/blog/mui-tay-skincare",
      date: "2024-02-15",
    },
    {
      title: "Tại sao tẩy tế bào chết lại quan trọng?",
      link: "/blog/exfoliation-benefits",
      date: "2024-02-15",
    },
  ],
};

const BlogDescription = () => {
  return (
    <div className="blog-description" style={{backgroundColor:"#fff"}}>
      <Row gutter={[32, 32]} justify="center">
        <Col xs={24} md={16}>
          <Card bordered={false}>
            <Title level={2}>{blogData.title}</Title>
            <div className="blog-header">
              <Text type="secondary" className="blog-path">
                Blog {" > "} {blogData.category} | {blogData.date}
              </Text>
              <div className="author-info">
                <Text strong>By {blogData.author}</Text> • <EyeOutlined />{" "}
                {blogData.views} lượt xem
              </div>
            </div>

            <Image
              src={blogData.mainImage}
              alt="Mỹ phẩm hữu cơ"
              width="100%"
              className="main-image"
            />

            {blogData.content.map((item, index) => (
              <div key={index} className="content-item">
                {item.type === "image" && (
                  <div className="image-container">
                    <Image
                      src={item.src}
                      alt="Blog Image"
                      width="100%"
                      className="blog-image"
                    />

                  </div>
                )}
                <Text type="secondary">{item.caption}</Text>

                {item.type === "text" && (
                  <div>
                    {item.title && <Title level={4}>{item.title}</Title>}
                    <Text className="blog-text">{item.value}</Text>
                  </div>
                )}
              </div>
            ))}

            <div className="share">
              <Text strong>Chia sẻ:</Text>
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
              dataSource={blogData.relatedPosts}
              renderItem={(post) => (
                <List.Item>
                  <div>
                    <a href={post.link}>{post.title}</a>
                    <Text
                      type="secondary"
                      style={{ display: "block", fontSize: "12px" }}
                    >
                      {post.date}
                    </Text>
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
