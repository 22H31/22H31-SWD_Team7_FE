// import React from "react";
import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import "./index.css";

const NavigationComponent = () => {
  const navigate = useNavigate();
  window.scrollTo(0, 0);
  const location = useLocation(); // Lấy đường dẫn hiện tại

  return (
    <Menu
      mode="horizontal"
      className="custom-menu"
      selectedKeys={[location.pathname]} // Đặt active dựa trên đường dẫn
    >

      <Menu.Item key="/productFull" onClick={() => navigate("/productFull")}>
        SẢN PHẨM 

      </Menu.Item>
      <Menu.Item key="/products" onClick={() => navigate("/")}>
        THƯƠNG HIỆU
      </Menu.Item>
      <Menu.Item key="/products" onClick={() => navigate("/")}>
        THƯƠNG HIỆU
      </Menu.Item>
      <Menu.Item key="/sale" onClick={() => navigate("/sale")}>
        KHUYẾN MÃI
      </Menu.Item>
      <Menu.Item key="/blog" onClick={() => navigate("/blog")}>
        BLOG
      </Menu.Item>
      <Menu.Item
        key="/customerSupport"
        onClick={() => navigate("/customerSupport")}
      >
        HỖ TRỢ KHÁCH HÀNG
      </Menu.Item>
    </Menu>
  );
};

export default NavigationComponent;
