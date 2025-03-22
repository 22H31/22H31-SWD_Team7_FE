import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FlagOutlined,
  GlobalOutlined,
  LoginOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Badge, Button, Input, Layout, message, Space } from "antd";
import logo from "../../assets/logo.png";
import "./index.css";
import NavigationComponent from "../NavigationBar/NavigationBar";
import { APIGetUserId, APILogOut } from "../../api/api";
import { cartLenght } from "../../globalVariable/cart";

const { Header } = Layout;
const { Search } = Input;

const HeaderComponent = () => {
  const navigate = useNavigate();

  // Quản lý trạng thái đăng nhập
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );
  const cartItemsLength = cartLenght.use();
  // Quản lý trạng thái giỏ hàng

  // Lắng nghe thay đổi trong localStorage để cập nhật trạng thái đăng nhập
  // useEffect(() => {
  //   const handleStorageChange = () => {
  //     setIsAuthenticated(!!localStorage.getItem("token"));
  //     setCartItemsLength(
  //       parseInt(localStorage.getItem("cartItemsLength")) || 0
  //     );
  //   };

  //   window.addEventListener("storage", handleStorageChange);
  //   return () => {
  //     window.removeEventListener("storage", handleStorageChange);
  //   };
  // }, []);

  // Cập nhật giỏ hàng vào localStorage khi có thay đổi

  const onSearch = (value) => {
    console.log("Search:", value);
  };

  const handleUserClick = () => {
    if (isAuthenticated) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };
  
  const handleLogout = () => {
    const isConfirmed = window.confirm("Bạn có chắc chắn muốn đăng xuất?");
    if (isConfirmed) {
      APILogOut()
        .then((rs) => {
          if (rs.status === 200) {
            console.log("Đăng xuất thành công");
            // localStorage.removeItem("token");
            localStorage.clear();
            setIsAuthenticated(false);
            navigate("/");
            message.success("Đăng xuất thành công!");
          }
        })
        .catch((err) => {
          console.error(err);
          message.error("Đăng xuất thất bại!");
        });
    } else {
      console.log("Người dùng đã hủy đăng xuất");
    }
  };

  return (
    <>
      <Header style={{ padding: 0 }} className="custom-header">
        <div className="header-container">
          {/* Logo - Điều hướng về trang chủ */}
          <div className="logo" onClick={() => navigate("/")}>
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

          {/* Kiểm tra trạng thái đăng nhập */}
          {isAuthenticated ? (
            <div className="header-icons">
              <Space size="large">
                <div className="location">
                  <FlagOutlined />
                  <span>Việt Nam</span>
                </div>
                <UserOutlined
                  onClick={handleUserClick}
                  style={{ cursor: "pointer" }}
                />
                <Badge count={cartItemsLength} showZero>
                  <ShoppingCartOutlined
                    onClick={() => {
                      navigate("/Cart");
                      window.location.reload();
                    }}
                  />
                </Badge>
                <Badge>
                  <LoginOutlined
                    onClick={handleLogout}
                    style={{ cursor: "pointer" }}
                  />
                </Badge>
              </Space>
            </div>
          ) : (
            <Space size="middle">
              <button className="login-btn" onClick={() => navigate("/login")}>
                Đăng nhập
              </button>
              <button
                className="signup-btn"
                onClick={() => navigate("/register")}
              >
                Đăng ký
              </button>
            </Space>
          )}
        </div>
      </Header>
      <NavigationComponent />
    </>
  );
};

export default HeaderComponent;
