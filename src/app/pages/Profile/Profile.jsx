import { Layout, Menu } from "antd";
import { useEffect, useCallback, useState } from "react";
import PageLayOut from "../../layouts/PageLayOut/PageLayOut";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import "./index.css";
import ProfileInfo from "../ProfileInfo/ProfileInfo";
import ChangePassword from "../ChangePassword/ChangePassword";
import Address from "../Address/Address";
import Orders from "../Orders/Orders";
import Favorites from "../Favorites/Favorites";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [selectedKey, setSelectedKey] = useState("1");

  // Dữ liệu hiển thị theo từng mục menu
  const contentData = {
    "1": <ProfileInfo />,
    "2": <ChangePassword />,
    "3": <Address />,
    "4": <Orders />,
    "5": <Favorites />,
  };


  const getProfile = useCallback(async () => {
    try {
      const response = await fetch("/api/profile");
      if (!response.ok) throw new Error("Lỗi khi lấy dữ liệu");

      const data = await response.json();
      setProfile(data);
    } catch (error) {
      console.error("Lỗi khi tải hồ sơ:", error);
    }
  }, []);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  const items = [
    { key: "1", label: "Thông tin" },
    { key: "2", label: "Thay đổi mật khẩu" },
    { key: "3", label: "Địa chỉ" },
    { key: "4", label: "Đơn hàng của tôi" },
    { key: "5", label: "Mục yêu thích" },
  ];

  const handleMenuClick = (e) => {
    setSelectedKey(e.key);
  };

  return (
    <PageLayOut>
      <Layout className="layoutStyle">
        <Layout>
          <Sider width="250" className="siderStyle">
            <h2 style={{ color: "#333", fontSize: "18px",maxHeight:"80px",justifyContent:"center",display:"flex",alignItems:"center" }}>Tài khoản</h2>
            <Menu
              onClick={handleMenuClick}
              mode="vertical"
              selectedKeys={[selectedKey]}
              style={{ borderRight: "none" }}
              items={items}
            />
          </Sider>
          <Content  width="750" className="contentStyle">
            <h3>{items.find((item) => item.key === selectedKey)?.label}</h3>
            <p>{contentData[selectedKey]}</p>
          </Content>
        </Layout>
      </Layout>
    </PageLayOut>
  );
};

export default Profile;