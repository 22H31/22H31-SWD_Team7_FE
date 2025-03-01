import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "./BannerBlog.css";

const blogPosts = [
  {
    id: 1,
    image: "https://th.bing.com/th/id/R.f88bab41821076740c6136693141c5a0?rik=ugpXHKx6515Pcw&pid=ImgRaw&r=0",
    date: "20 tháng 6, 2024",
    title: "Mỹ phẩm hữu cơ là gì?",
    subtitle: "Top 5 mỹ phẩm hữu cơ được yêu thích nhất",
    description:
      "Sử dụng các loại mỹ phẩm hữu cơ đã trở thành một trào lưu được nhiều người đón nhận bởi các cam kết về sức khỏe và bảo vệ môi trường. Đây cũng là một trong những xu hướng làm đẹp mới được nhiều tín đồ mê skincare..",
  },
  {
    "id": 2,
    "image": "https://th.bing.com/th/id/R.2dc35bf027e1b6c3d331d9a6e9842fca?rik=Kec28%2bsbvV3%2fcA&pid=ImgRaw&r=0",
    "date": "15 tháng 7, 2024",
    "title": "Chọn kem chống nắng nào?",
    "subtitle": "Lựa chọn kem chống nắng phù hợp cho bạn",
    "description": "Chọn kem chống nắng không chỉ đơn giản là tìm một sản phẩm có chỉ số SPF cao. Việc hiểu rõ loại da của bạn, thành phần trong kem và cách sử dụng đúng sẽ giúp bảo vệ làn da tối ưu trước tác hại của tia UV, ..."
  }
  
  // Thêm các bài viết khác nếu cần
];

export default function BannerBlog() {
  return (
    <div className="banner-container">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true, el: ".custom-pagination" }}
      >
        {blogPosts.map((post) => (
          <SwiperSlide key={post.id}>
            <div className="blog-slide">
              <img src={post.image} alt={post.title} className="blog-image" />
              <div className="blog-content">
                <p className="blog-date">{post.date}</p>
                <h2 className="blog-title">{post.title}</h2>
                <h3 className="blog-subtitle">{post.subtitle}</h3>
                <p className="blog-description">{post.description}</p>
                <button className="blog-button">Xem thêm</button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Pagination được đưa ra ngoài */}
      <div className="custom-pagination"></div>
    </div>
  );
}
