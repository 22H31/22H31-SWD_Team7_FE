import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Col, Row, Spin } from "antd";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { APIGetProducts } from "../../../api/api"; // Import API từ api.js
import "./FlashSale.css";

const ITEMS_PER_PAGE = 12;

const FlashSale = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10000);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sliderRef = useRef(null);
  const navigate = useNavigate();

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await APIGetProducts(1, ITEMS_PER_PAGE);
        const flashSaleProducts = response.data.items.map((product) => ({
          ...product,
          oldPrice: Math.round(product.variants[0].price * (1 + Math.random() * 0.05 + 0.25)),
        }));
        setProducts(flashSaleProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again later.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto slide
  useEffect(() => {
    const autoSlide = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % (products.length - 3));
    }, 3000);
    return () => clearInterval(autoSlide);
  }, [products.length]);

  const formatTime = (seconds) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${days} ngày ${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % (products.length - 3));
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + products.length - 3) % (products.length - 3));

  const handleBuyNow = (productId) => {
    navigate(`/product/${productId}`);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
      </div>
    );
  }

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
