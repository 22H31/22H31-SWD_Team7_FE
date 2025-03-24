import { MenuOutlined } from "@ant-design/icons";
import { Dropdown, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { APIGetCategories } from "../../api/api";
import "./index.css";

const NavigationComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Call API when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await APIGetCategories();
        console.log("Categories:", res.data);
        setCategories(res.data); 
      } catch (err) {
        console.error("Error fetching categories", err);
      }
    };

    fetchCategories();
  }, []);

  const categoryMenu = (
    <Menu>
      {categories.length > 0 ? (
        categories.map((title) => (
          <Menu.ItemGroup
            key={title.categoryTitleId}
            title={title.categoryTitleName}
          >
            {title.categorys.map((cat) => (
              <Menu.Item
                key={cat.categoryId}
                onClick={() => navigate(`/category/${cat.categoryId}`)}
                className="custom-menu-item"
              >
                {cat.categoryName}
              </Menu.Item>
            ))}
          </Menu.ItemGroup>
        ))
      ) : (
        <Menu.Item disabled>Đang tải...</Menu.Item>
      )}
    </Menu>
  );

  return (
    <div className="menu-wrapper">
      {/* DROPDOWN with categories */}
      <Dropdown
        overlay={categoryMenu}
        trigger={["hover"]}
        placement="bottomLeft"
        style={{with:"400"}}
      >
        <div className="menu-icon-item">
          <MenuOutlined />
        </div>
      </Dropdown>
      {/* Main Menu */}
      <Menu
        mode="horizontal"
        className="custom-menu"
        selectedKeys={[location.pathname]}
      >
        <Menu.Item key="/" onClick={() => navigate("/")}>
          TRANG CHỦ
        </Menu.Item>

        <Menu.Item key="fullBrands" onClick={() => navigate("/fullBrands")}>
          THƯƠNG HIỆU
        </Menu.Item>

        <Menu.Item key="/productFull" onClick={() => navigate("/productFull")}>
          SẢN PHẨM
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
    </div>
  );
};

export default NavigationComponent;
