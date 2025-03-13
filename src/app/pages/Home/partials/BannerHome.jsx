import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";
import { useEffect, useState } from "react";
import "./BannerHome.css";

const { Title, Paragraph } = Typography;

const banners = [
  {
    id: 1,
    title: "Khám phá vẻ đẹp bên trong của bạn với Beauty Love Kit",
    description: "Món quà tuyệt vời cho bản thân và người thân",
    image: "/src/app/assets/bannerHome2.png",
  },
  {
    id: 2,
    title: "Dưỡng da toàn diện với sản phẩm tự nhiên",
    description: "Chăm sóc làn da khỏe mạnh từ sâu bên trong",
    image: "/src/app/assets/bannerHome3.png",
  },
  {
    id: 3,
    title: "Giảm giá 45% - Dịp hè rực rỡ",
    description: "Ưu đãi hấp dẫn chỉ có trong mùa hè này",
    image: "/src/app/assets/bannerHome4.png",
  },
  {
    id: 4,
    title: "Hãy yêu làn da của bạn mỗi ngày",
    description: "Sử dụng mỹ phẩm an toàn và lành tính",
    image: "/src/app/assets/bannerHome.png",
  },
];

const BannerHome = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === banners.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Chuyển slide tự động mỗi 4 giây
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <>
      <div className="banner-home">
        <img
          src={banners[currentIndex].image}
          alt="Banner"
          className="banner-image"
        />
        <div className="banner-content">
          <Title level={1} className="banner-title">
            {banners[currentIndex].title}
          </Title>
          <Paragraph className="banner-text">
            {banners[currentIndex].description}
          </Paragraph>
          <Button type="primary" className="banner-btn">
            Tham gia ưu đãi
          </Button>
        </div>

        {/* Mũi tên chuyển slide */}
        <button className="banner-arrow left" onClick={handlePrev}>
          <LeftOutlined />
        </button>
        <button className="banner-arrow right" onClick={handleNext}>
          <RightOutlined />
        </button>
      </div>

      {/* Pagination nằm ngoài banner */}
      <div className="banner-pagination">
        {banners.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </>
  );
};

export default BannerHome;
