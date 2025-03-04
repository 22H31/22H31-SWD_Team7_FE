// import React from "react";
import "./RelatedBlog.css";
import { EyeOutlined } from "@ant-design/icons";


const RelatedBlogs = () => {
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
      <div className="relatedblogs-container">
        <h2 className="relatedblogs-title">Blogs liên quan</h2>
        <div className="relatedblogs-grid">
          {posts.map((post, index) => (
            <div key={index} className="relatedblogs-card">
              <div className="relatedblogs-image-container">
                <img src={post.image} alt={post.title} className="relatedblogs-image" />
              </div>
              <div className="relatedblogs-content">
                <h3 className="relatedblogs-post-title">{post.title}</h3>
                <p className="relatedblogs-description">{post.description}</p>
                <div className="relatedblogs-footer">
                  <span className="relatedblogs-date">{post.date}</span>
                  <span className="relatedblogs-views">
                    <EyeOutlined /> {post.views} Lượt xem
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="relatedblogs-more">
          <button className="relatedblogs-button">Xem thêm</button>
        </div>
      </div>
    );
  };
  
  export default RelatedBlogs;
  


