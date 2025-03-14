import { Row, Col, Button } from "antd";
import "./CustomerExperience.css";

const data = [
  { src: "/CSEhome1.png", alt: "Sản phẩm 1" },
  { src: "/CSEhome2.png", alt: "Sản phẩm 2", showButton: true },
  { src: "/CSEhome3.png", alt: "Sản phẩm 3" },
  { src: "/CSEhome4.png", alt: "Sản phẩm 4" },
  { src: "/CSEhome5.png", alt: "Sản phẩm 5" },
  { src: "/CSEhome6.png", alt: "Sản phẩm 6" },
  { src: "/CSEhome7.png", alt: "Sản phẩm 7" },
  { src: "/CSEhome8.png", alt: "Sản phẩm 8" },
];

const CustomerExperience = () => {
  return (
    <div className="customer-experience">
      <h1 style={{fontSize:"36px"}}>
        Trải nghiệm mua sắm tuyệt vời tại <span className="highlight">Beauty Love</span>
      </h1>
      <p className="view-more">Xem thêm</p>
      <Row gutter={[16, 16]} justify="center">
        {data.map((item, index) => (
          <Col key={index} xs={12} sm={8} md={6} className="image-container">
            <img src={item.src} alt={item.alt} className="experience-image" />
            {item.showButton && (
              <Button type="primary" className="buy-now-button">
                Mua ngay
              </Button>
            )}
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CustomerExperience;
