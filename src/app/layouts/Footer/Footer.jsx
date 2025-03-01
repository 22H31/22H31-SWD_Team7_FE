import React from "react";
import { Layout, Input, Button } from "antd";
import {
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import "./index.css";

const { Footer } = Layout;
const { Search } = Input;

const FooterComponent = () => {
  const onSearch = (value) => {
    console.log("Email đăng ký:", value);
  };

  return (
    <Footer className="custom-footer">
      <div className="footer-container">
        {/* CÁC CHI NHÁNH */}
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

        {/* Social */}
        <div className="footer-column">
          <h3>Social</h3>
          <p>Facebook</p>
          <p>Instagram</p>
          <p>Youtube</p>
        </div>

        {/* Điện thoại & Email */}
        <div className="footer-column">
          <h3>
            <PhoneOutlined /> Điện thoại
          </h3>
          <p>0292.324.0266</p>
          <h3>
            <MailOutlined /> Email
          </h3>
          <p>Beautylove@shopvn.com</p>
        </div>

        {/* Help */}
        <div className="footer-column">
          <h3>Help</h3>
          <p>Contact us</p>
          <p>FAQ</p>
          <p>Shipping & Returns</p>
        </div>

        {/* CẬP NHẬT THÔNG TIN KHUYẾN MÃI */}
        <div className="footer-column">
          <h3>CẬP NHẬT THÔNG TIN KHUYẾN MÃI</h3>
          <Search
            className="subscribe-input"
            placeholder="Email của bạn"
            enterButton={
              <Button className="subscribe-button" style={{
                  background: "#c0437f",
                  borderColor: "#c0437f",
                  height:"39px",
                  border: " 1px solid #ccc",
                  color: "white",
                }}
>
                <SearchOutlined />
                Đăng ký
              </Button>
            }
            size="large"
            onSearch={onSearch}
          />
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <hr />
        <p>© Copyright 2024 Beauty Love</p>
      </div>
    </Footer>
  );
};

export default FooterComponent;
