// import React from "react";
import { LeftOutlined, RightOutlined, StarFilled } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { Row, Col } from "antd";
import "swiper/css";
import "./FlashSale.css";

const FlashSale = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10000); 
  const sliderRef = useRef(null);

  const products = [
    { id: 1, name: "DHC - Viên Uống", price: 230000, oldPrice: 339000, image: "https://www.ivisitkorea.com/wp-content/uploads/2022/12/6.-Isntree.png", rating: 4.5, reviews: 29 },
    { id: 2, name: "DHC - Dưỡng Ẩm", price: 500000, oldPrice: 599000, image: "https://img.freepik.com/premium-photo/cosmetic-beauty-products-pink-background_644874-5908.jpg", rating: 4.7, reviews: 35 },
    { id: 3, name: "Aqua Label - UV", price: 500000, oldPrice: 699000, image: "https://th.bing.com/th/id/OIP.abFJwD45bMWp5CTh3iBAPAAAAA?rs=1&pid=ImgDetMain", rating: 4.8, reviews: 42 },
    { id: 4, name: "Hatomugi - Kem", price: 218000, oldPrice: 347000, image: "https://www.ivisitkorea.com/wp-content/uploads/2022/12/6.-Isntree.png", rating: 4.6, reviews: 31 },
    { id: 5, name: "Kem Chống Nắng", price: 320000, oldPrice: 450000, image: "https://th.bing.com/th/id/R.66229d46b6cc586186193a0a04033e93?rik=d3pqw357ruTNrQ&pid=ImgRaw&r=0", rating: 4.4, reviews: 27 },
    { id: 6, name: "Serum Dưỡng Da", price: 420000, oldPrice: 550000, image: "https://www.ivisitkorea.com/wp-content/uploads/2022/12/6.-Isntree.png", rating: 4.9, reviews: 50 }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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

  return (
    <div className="flashsale">
      <h2>Flash Sale ⚡</h2>
      <div className="countdown">Kết Thúc Sau {formatTime(timeLeft)}</div>
      <div className="slider">
        <button className="arrow left" onClick={prevSlide}><LeftOutlined /></button>
        <Row gutter={[16, 16]} className="product-list" ref={sliderRef}>
          {products.slice(currentIndex, currentIndex + 4).map((product) => (
            <Col key={product.id} xs={24} sm={12} md={6} className="product">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>
                <span className="price">{product.price.toLocaleString()} đ</span>
                <del>{product.oldPrice.toLocaleString()} đ</del>
              </p>
              <div className="rating">
                {[...Array(5)].map((_, index) => (
                  <StarFilled key={index} className={index < Math.round(product.rating) ? "star filled" : "star"} />
                ))}
                <span className="reviews">{product.reviews} đánh giá</span>
              </div>
              <button className="buy">Mua ngay</button>
            </Col>
          ))}
        </Row>
        <button className="arrow right" onClick={nextSlide}><RightOutlined /></button>
      </div>
    </div>
  );
};

export default FlashSale;
