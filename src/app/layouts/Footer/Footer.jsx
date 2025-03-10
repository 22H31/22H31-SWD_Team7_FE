import {
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Input } from "antd";
import "./index.css";

const Footer = () => {
  return (
    <footer className="custom-footer">
      <div className="footer-container">
        {/* Cột 1: Chi nhánh */}
        <div className="footer-column">
          <h3>CÁC CHI NHÁNH</h3>
          <p>
            <EnvironmentOutlined /> 182 Pasteur, Bến Nghé, Quận 1, Hồ Chí Minh
          </p>
          <p>
            <EnvironmentOutlined /> 110 Lê Văn Sỹ, Phường 10, Phú Nhuận, Hồ Chí Minh
          </p>
          <p>
            <EnvironmentOutlined /> 277 Phan Xích Long, Phường 2, Phú Nhuận, Hồ Chí Minh
          </p>
        </div>

        {/* Cột 2: Social */}
        <div className="footer-column">
          <h3>Social</h3>
          <p>Facebook</p>
          <p>Instagram</p>
          <p>Youtube</p>
        </div>

        {/* Cột 3: Liên hệ */}
        <div className="footer-column">
          <h3>
            <PhoneOutlined /> Điện thoại
          </h3>
          <p>0292.324.0266</p>
          <h3>
            <MailOutlined /> Email
          </h3>
          <p>beautylove@shopvn.com</p>
        </div>

        {/* Cột 4: Hỗ trợ */}
        <div className="footer-column">
          <h3>Help</h3>
          <p>Contact us</p>
          <p>FAQ</p>
          <p>Shipping & Returns</p>
        </div>

        {/* Cột 5: Đăng ký email */}
        <div className="footer-column subscribe-section">
          <h3>CẬP NHẬT THÔNG TIN KHUYẾN MÃI</h3>
          <div className="subscribe">
            <Input
              className="email-input"
              placeholder="Nhập email của bạn"
              size="middle"
            />
            <Button
              className="subscribe-button"
              style={{
                background: "#c0437f",
                borderColor: "#c0437f",
                color: "white",
              }}
            >
              <SearchOutlined />
              Đăng ký
            </Button>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <hr />
        <p>© 2024 Beauty Love</p>
      </div>
    </footer>
  );
};

export default Footer;
