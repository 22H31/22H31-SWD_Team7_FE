import React from "react";
import { EyeOutlined } from "@ant-design/icons";
import { Button, Card, Col, Pagination, Row, Tag } from "antd";
import { useState } from "react";
import "./Bloglist.css";

const blogPosts = [

  {
    title: "Chống nắng Sunplay Skin Aqua",
    subtitle: "Lựa chọn kem chống nắng phù hợp cho bạn",
    date: "20 tháng 6, 2024",
    image:
      "https://storage.beautyfulls.com/uploads-1/tranglinh/2022/05/09-5-2022/2.skinaqua/kem-chong-nang-skin-aqua-clear-white.png",
    description:
      "Sunplay Skin Aqua là dòng kem chống nắng được yêu thích bởi khả năng bảo vệ da khỏi tia UVB và UVA, đồng thời cung cấp độ ẩm cần thiết cho da. Sản phẩm thích hợp cho nhiều loại da, đặc biệt là da nhạy cảm.",
    tags: ["mẹo", "chống nắng", "review"],
    views: 220,
  },
  {
    title: "Bí quyết dưỡng trắng da an toàn",
    subtitle: "Cách làm sáng da tự nhiên không bắt nắng",
    date: "10 tháng 7, 2024",
    image: "https://camngot.vn/wp-content/uploads/2022/09/sua-duong-the-trang-da-vaselin-chinh-hang.jpg",
    description:
      "Dưỡng trắng da là một quá trình dài hạn, đòi hỏi sự kiên trì và lựa chọn sản phẩm phù hợp. Bài viết này sẽ giúp bạn tìm hiểu về các phương pháp làm sáng da tự nhiên, không gây kích ứng, đồng thời bảo vệ da khỏi tác hại của môi trường.",
    tags: ["làm đẹp", "dưỡng trắng", "bí quyết"],
    views: 180,
  },
  {
    title: "Top 5 loại serum cấp ẩm cho da khô",
    subtitle: "Lựa chọn serum tốt nhất cho làn da của bạn",
    date: "5 tháng 8, 2024",
    image: "https://th.bing.com/th/id/OIP.i7lA-nwgvkFj4R5nJ_9PPAHaHa?w=640&h=640&rs=1&pid=ImgDetMain",
    description:
      "Da khô thường xuyên gặp tình trạng bong tróc và thiếu sức sống. Việc bổ sung độ ẩm cho da bằng các loại serum phù hợp sẽ giúp cải thiện tình trạng da và giữ cho làn da luôn mịn màng. Hãy cùng khám phá top 5 loại serum dưỡng ẩm tốt nhất hiện nay!",
    tags: ["dưỡng da", "serum", "cấp ẩm"],
    views: 250,
  },
  {
    title: "Cách chăm sóc da mụn hiệu quả",
    subtitle: "Giảm mụn, ngăn ngừa vết thâm với liệu trình phù hợp",
    date: "15 tháng 9, 2024",
    image: "https://www.naturerepublicusa.com/cdn/shop/files/Hyathenol_Hydra_Duo_copy_720x.jpg?v=1675905631",
    description:
      "Mụn là vấn đề mà nhiều người gặp phải, đặc biệt là trong độ tuổi dậy thì. Việc chăm sóc da mụn đúng cách giúp giảm thiểu tổn thương da và ngăn ngừa vết thâm. Cùng tìm hiểu các bước chăm sóc da hiệu quả và những sản phẩm phù hợp cho da mụn nhé!",
    tags: ["trị mụn", "skincare", "chăm sóc da"],
    views: 300,
  },
  {
    title: "Những sai lầm khi rửa mặt khiến da nhanh lão hóa",
    subtitle: "Bạn đã rửa mặt đúng cách chưa?",
    date: "25 tháng 10, 2024",
    image: "https://th.bing.com/th/id/OIP.8pBj0oNMK2uM5PBz2KTAUwHaHa?w=1024&h=1024&rs=1&pid=ImgDetMain",
    description:
      "Rửa mặt là bước quan trọng trong chu trình chăm sóc da. Tuy nhiên, nhiều người vẫn mắc phải những sai lầm khiến da bị tổn thương và lão hóa nhanh hơn. Hãy cùng điểm qua những lỗi thường gặp và cách khắc phục để có làn da khỏe mạnh nhé!",
    tags: ["rửa mặt", "lão hóa", "chăm sóc da"],
    views: 210,
  },
  {
    title: "Tẩy tế bào chết: Bí quyết giúp da luôn tươi trẻ",
    subtitle: "Cách tẩy da chết đúng chuẩn mà không gây hại",
    date: "10 tháng 11, 2024",
    image: "https://th.bing.com/th/id/OIP.PmXMtwkq0S47lKlPZjU3OwHaGL?w=905&h=755&rs=1&pid=ImgDetMain",
    description:
      "Tẩy tế bào chết giúp loại bỏ lớp da chết, kích thích sản sinh tế bào mới và cải thiện kết cấu da. Tuy nhiên, nếu thực hiện sai cách, bạn có thể làm tổn thương hàng rào bảo vệ da. Hãy cùng tìm hiểu cách tẩy da chết đúng chuẩn để giúp da luôn rạng rỡ nhé!",
    tags: ["tẩy da chết", "dưỡng da", "bí quyết làm đẹp"],
    views: 270,
  },
];

const Bloglist = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;

  const paginatedBlogs = blogPosts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="Bloglist-container">
      <h2 className="Bloglist-header">Khám Phá Ngay</h2>

      {paginatedBlogs.map((post, index) => (
        <Card key={index} className="Bloglist-card">
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} md={8} className="Bloglist-image-container">
              <img
                alt={post.title}
                src={post.image}
                className="Bloglist-image"
              />
            </Col>
            <Col xs={24} md={16} className="Bloglist-content">
              <p className="Bloglist-date">{post.date}</p>
              <h2 className="Bloglist-title">{post.title}</h2>
              <h3 className="Bloglist-subtitle">{post.subtitle}</h3>
              <p className="Bloglist-description">{post.description}</p>
              <div className="Bloglist-tags">
                {post.tags.map((tag, i) => (
                  <Tag color="purple" key={i}>
                    #{tag}
                  </Tag>
                ))}
              </div>
              <Button type="primary" className="Bloglist-button">
                Xem thêm
              </Button>
              <div className="Bloglist-footer">
                <span className="Bloglist-author">By Beautylove</span>
                <span className="Bloglist-views">
                  <EyeOutlined /> {post.views} Lượt xem
                </span>
              </div>
            </Col>
          </Row>
        </Card>
      ))}

      <Pagination
        className="Bloglist-pagination"
        current={currentPage}
        pageSize={pageSize}
        total={blogPosts.length}
        showSizeChanger={false} // Ẩn dropdown chọn số lượng
        onChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default Bloglist;
