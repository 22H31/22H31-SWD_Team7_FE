import { Carousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import "./Banner.css";

const Banner = () => {
  return (
    <div className="banner-container">
      <Carousel autoplay arrows prevArrow={<LeftOutlined />} nextArrow={<RightOutlined />}>
        {/* Slide 1 */}
        <div className="banner-slide">
          <div className="banner-content">
            <h2>Khám phá vẻ đẹp bên trong của bạn với <b>Beauty Love Kit</b></h2>
            <p>Món quà tuyệt vời cho bản thân và người thân</p>
            <button className="cta-button">Tham gia ưu đãi</button>
          </div>
          <div className="banner-image">
            <img src="/src/app/assets/bannerHome.png" alt="Beauty Love Kit" />
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
