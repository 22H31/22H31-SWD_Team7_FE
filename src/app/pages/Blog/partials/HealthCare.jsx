import React from "react";
import "./HealthCare.css";
import { EyeOutlined } from "@ant-design/icons";


const HealthCare = () => {
    const posts = [
      {
        image: "https://m.media-amazon.com/images/I/918tHTvBvqL.jpg",
        title: "THƯƠNG HIỆU NATURE'S BOUNTY...",
        description: "Nature's Bounty là một thương hiệu dinh dưỡng nổi tiếng...",
        date: "20 tháng 6 , 2024",
        views: 220,
      },
      {
        image: "https://i.pinimg.com/originals/e7/2b/bc/e72bbce5941f1ca0c211596fbd3a39d4.jpg",
        title: "THỰC PHẨM GIÀU COLLAGEN...",
        description: "Top 10 loại thực phẩm giàu collagen giúp trẻ đẹp...",
        date: "20 tháng 6 , 2024",
        views: 220,
      },
      {
        image: "https://th.bing.com/th/id/OIP.GoIcbkAQ1sGhaIhjauyjuQHaHa?rs=1&pid=ImgDetMain",
        title: "COLLAGEN DHC CỦA NHẬT...",
        description: "Collagen DHC của Nhật có tốt không? Nên chọn viên hay nước?",
        date: "20 tháng 6 , 2024",
        views: 220,
      },
    ];
  
    return (
      <div className="healthcare-container">
        <h2 className="healthcare-title">Chăm sóc sức khỏe</h2>
        <div className="healthcare-grid">
          {posts.map((post, index) => (
            <div key={index} className="healthcare-card">
              <div className="healthcare-image-container">
                <img src={post.image} alt={post.title} className="healthcare-image" />
              </div>
              <div className="healthcare-content">
                <h3 className="healthcare-post-title">{post.title}</h3>
                <p className="healthcare-description">{post.description}</p>
                <div className="healthcare-footer">
                  <span className="healthcare-date">{post.date}</span>
                  <span className="healthcare-views">
                    <EyeOutlined /> {post.views} Lượt xem
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="healthcare-more">
          <button className="healthcare-button">Xem thêm</button>
        </div>
      </div>
    );
  };
  
  export default HealthCare;
  


