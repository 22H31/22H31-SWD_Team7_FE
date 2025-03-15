import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
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

const { Header } = Layout;
const { Search } = Input;

const HeaderComponent = () => {
  const navigate = useNavigate();

  // Sử dụng useState để quản lý trạng thái đăng nhập
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  // Lắng nghe thay đổi của localStorage để cập nhật trạng thái đăng nhập
  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const onSearch = (value) => {
    console.log("Search:", value);
  };

  const handleUserClick = () => {
    const userID = localStorage.getItem("userID");
    if (!userID) {
      console.error("Không tìm thấy userID!");
      return;
    }
    console.log(userID);
    if (userID) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  const handleLogout = () => {
    APILogOut()
      .then((rs) => {
        if (rs.status === 200) {
          console.log("Đăng xuất thành công");
          localStorage.removeItem("token"); // Xóa token khỏi localStorage
          setIsAuthenticated(false); // Cập nhật trạng thái đăng nhập
          navigate("/"); // Điều hướng về trang chủ
          message.success("Đăng xuất thành công!");
        }
      })
      .catch((err) => {
        console.error(err);
        message.error("Đăng xuất thất bại!");
      });
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

          {/* Kiểm tra trạng thái đăng nhập để hiển thị icon hoặc nút đăng nhập */}
          {isAuthenticated ? (
            <div className="header-icons">
              <Space size="large">
                <div className="location">
                  <GlobalOutlined />
                  <span>TP. HCM</span>
                </div>
                <UserOutlined
                  onClick={handleUserClick}
                  style={{ cursor: "pointer" }}
                />
                <Badge count={0} showZero>
                  <ShoppingCartOutlined onClick={() => navigate("/Cart")} />
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
