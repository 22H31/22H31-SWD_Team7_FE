import React from "react";
import { useNavigate } from "react-router-dom";
import {
  GlobalOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Badge, Button, Input, Layout, Space } from "antd";
import logo from "../../assets/logo.png";
import "./index.css";

const { Header } = Layout;
const { Search } = Input;

const HeaderComponent = () => {
  const navigate = useNavigate(); // Hook điều hướng
  const isAuthenticated = !!localStorage.getItem("token"); // Kiểm tra xem có token không

  const onSearch = (value) => {
    console.log("Search:", value);
  };

  // Xử lý khi nhấn vào icon người dùng
  const handleUserClick = () => {
    if (isAuthenticated) {
      navigate("/profile"); // Nếu đã đăng nhập → Chuyển đến trang hồ sơ
    } else {
      navigate("/login"); // Nếu chưa đăng nhập → Chuyển đến trang đăng ký
    }
  };

  return (
    <Header style={{ padding: 0 }} className="custom-header">
      <div className="header-container">
        {/* Logo - Thêm sự kiện onClick để điều hướng về trang chủ */}
        <div className="logo" onClick={() => navigate("/")} >
          <img src={logo} alt="Logo" className="logo-image" />
        </div>

        {/* Thanh tìm kiếm */}
        <div className="find">
          <Search
            className="search-input"
            placeholder="Bạn cần tìm gì?"
            enterButton={
              <Button
                className="search-button"
                style={{
                  background: "#c0437f",
                  borderColor: "#c0437f",
                  color: "white",
                }}
              >
                <SearchOutlined />
                Tìm kiếm
              </Button>
            }
            size="large"
            onSearch={onSearch}
          />
        </div>

        {/* Icon bên phải */}
        <div className="header-icons">
          <Space size="large">
            <div className="location">
              <GlobalOutlined />
              <span>TP. HCM</span>
            </div>
            <UserOutlined onClick={handleUserClick} style={{ cursor: "pointer" }} />
            <Badge count={0} showZero>
              <ShoppingCartOutlined />
            </Badge>
          </Space>
        </div>
      </div>
    </Header>
  );
};

export default HeaderComponent;
