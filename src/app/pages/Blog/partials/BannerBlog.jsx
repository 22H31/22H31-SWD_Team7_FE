import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Spin } from "antd"; // Thêm Spin từ Ant Design
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "./BannerBlog.css";

export default function BannerBlog() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://beteam720250214143214.azurewebsites.net/api/blogs")
      .then((response) => {
        // Xáo trộn mảng và lấy 4 bài blog ngẫu nhiên
        const shuffledBlogs = response.data.sort(() => Math.random() - 0.5).slice(0, 4);
        setBlogs(shuffledBlogs);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="banner-container">
      {loading ? (
        <div className="loading-container">
          <Spin size="large" />
        </div>
      ) : (
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true, el: ".custom-pagination" }}
        >
          {blogs.map((post) => (
            <SwiperSlide key={post.blogId}>
              <div className="blog-slide">
                <img
                  src={post.avartarBlogUrl || "https://via.placeholder.com/600"}
                  alt={post.title}
                  className="blog-image"
                />
                <div className="blog-content">
                  <p className="blog-date">
                    {new Date(post.blogCreatedAt).toLocaleDateString("vi-VN")}
                  </p>
                  <h2 className="blog-title">{post.title}</h2>
                  <h3 className="blog-subtitle">
                    {post.subTitle || "Bài viết về chăm sóc da"}
                  </h3>
                  <p className="blog-description">
                    {post.content1.split(" ").slice(0, 110).join(" ")}...
                  </p>
                  <button
                    className="blog-button"
                    onClick={() => navigate(`/blog/${post.blogId}`)}
                  >
                    Xem thêm
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* Pagination */}
      <div className="custom-pagination"></div>
    </div>
  );
}