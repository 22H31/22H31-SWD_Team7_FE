import { useEffect, useRef, useState } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Row, Col, Spin } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Thêm useNavigate để chuyển hướng
import "./FlashSale.css";

const ITEMS_PER_PAGE = 12; // Số sản phẩm hiển thị trên mỗi trang

const FlashSale = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10000); // Thời gian còn lại
  const [products, setProducts] = useState([]); // State để lưu danh sách sản phẩm
  const [loading, setLoading] = useState(true); // State để hiển thị loading
  const [error, setError] = useState(null); // State để xử lý lỗi
  const sliderRef = useRef(null);
  const navigate = useNavigate(); // Sử dụng useNavigate để chuyển hướng

  // Gọi API để lấy danh sách sản phẩm
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://swdteam7-hfgrdwa4dfhbe0ga.southeastasia-01.azurewebsites.net/api/products",
          {
            params: {
              PageNumber: 1, // Trang hiện tại (API bắt đầu từ 1)
              PageSize: ITEMS_PER_PAGE, // Số sản phẩm trên mỗi trang
            },
          }
        );
        const flashSaleProducts = response.data.items.map((product) => ({
          ...product,
          oldPrice: Math.round(product.variants[0].price * (1 + Math.random() * 0.05 + 0.25)), // Làm tròn đến số nguyên
        }));

        setProducts(flashSaleProducts); // Cập nhật danh sách sản phẩm
        setLoading(false); // Tắt trạng thái loading
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again later."); // Hiển thị thông báo lỗi
        setLoading(false); // Tắt trạng thái loading
      }
    };

    fetchProducts();
  }, []);

  // Đếm ngược thời gian
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Tự động chuyển slide
  useEffect(() => {
    const autoSlide = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % (products.length - 3));
    }, 3000);
    return () => clearInterval(autoSlide);
  }, [products.length]);

  // Định dạng thời gian
  const formatTime = (seconds) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${days} ngày ${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Chuyển slide tiếp theo
  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % (products.length - 3));

  // Chuyển slide trước đó
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + products.length - 3) % (products.length - 3));

  // Hàm xử lý khi nhấn nút "Mua ngay"
  const handleBuyNow = (productId) => {
    navigate(`/product/${productId}`); // Chuyển hướng đến trang chi tiết sản phẩm
  };

  // Hiển thị loading nếu đang tải dữ liệu
  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
      </div>
    );
  }

  // Hiển thị lỗi nếu có
  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="flashsale">
      <h2>Flash Sale ⚡</h2>
      <div className="countdown">Kết Thúc Sau {formatTime(timeLeft)}</div>
      <div className="slider">
        <button className="arrow left" style={{ background: "#ffc3c3" }} onClick={prevSlide}>
          <LeftOutlined />
        </button>
        <Row gutter={[16, 16]} className="product-list-flashsale" ref={sliderRef}>
          {products.slice(currentIndex, currentIndex + 4).map((product) => (
            <Col key={product.productId} xs={24} sm={12} md={6} className="product-flashsale">
              <img
                src={product.avartarImageUrl || "https://via.placeholder.com/200"}
                alt={product.productName}
              />
              <h3>{product.productName}</h3>
              <p>
                <span className="price-flashsale">{product.variants[0].price.toLocaleString()} đ</span>
                <del>{product.oldPrice.toLocaleString()} đ</del>
              </p>
              <div className="rating-flashsale">
                {Array.from({ length: Math.floor(product.averageRating) }, (_, i) => (
                  <span key={i} className="star-flashsale">
                    ⭐
                  </span>
                ))}
                <span className="reviews-flashsale">{product.totalFeedback} đánh giá</span>
              </div>
              <button className="buy-flashsale" onClick={() => handleBuyNow(product.productId)}>
                Mua ngay
              </button>
            </Col>
          ))}
        </Row>
        <button className="arrow right" style={{ background: "#ffc3c3" }} onClick={nextSlide}>
          <RightOutlined />
        </button>
      </div>
    </div>
  );
};

export default FlashSale;