// import React from "react";
import "./BlogCategory.css";

const categories = [
  {
    title: "CHĂM SÓC DA",
    image: "https://th.bing.com/th/id/R.bce3b806b129ea999bc7c5a73b43b77d?rik=a9dSlc0%2faodVqQ&pid=ImgRaw&r=0",
  },
  {
    title: "CHĂM SÓC SỨC KHỎE",
    image: "https://media-cdn-v2.laodong.vn/storage/newsportal/2025/2/27/1469347/Rsz_Cam.jpg?w=800&h=420&crop=auto&scale=both",
  },
  {
    title: "XU HƯỚNG LÀM ĐẸP",
    image: "https://th.bing.com/th/id/OIP.gRzaVAx5fwQNHbvWz-MgzAHaJ_?w=768&h=1036&rs=1&pid=ImgDetMain",
  },
  {
    title: "REVIEW SẢN PHẨM",
    image: "https://th.bing.com/th/id/OIP.goYpD-V5RjNBRAUK8OTenAHaE7?rs=1&pid=ImgDetMain",
  },
];

const CategoryList = () => {
  return (
    <div className="category-container">
      {categories.map((item, index) => (
        <div key={index} className="category-item">
          <img src={item.image} alt={item.title} className="category-image" />
          <div className="category-overlay">
            <span className="category-title">{item.title}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
