"use client";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./Sidebar.module.css";
import {
  AppstoreOutlined,
  FileTextOutlined,
  InboxOutlined,
  BoxPlotOutlined,
  DollarOutlined,
  TagsOutlined,
  AppstoreAddOutlined,
  BookOutlined,
  TeamOutlined,
  LogoutOutlined,
  GiftOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { APILogOut } from "../../../api/api";
import { message } from "antd";

// Danh sách icon với key-value
const icons = {
  products: <AppstoreOutlined className={styles.icon} />,
  blog: <FileTextOutlined className={styles.icon} />,
  inbox: <InboxOutlined className={styles.icon} />,
  stock: <BoxPlotOutlined className={styles.icon} />,
  pricing: <DollarOutlined className={styles.icon} />,
  brand: <TagsOutlined className={styles.icon} />,
  category: <AppstoreAddOutlined className={styles.icon} />,
  categoryTitle: <BookOutlined className={styles.icon} />,
  team: <TeamOutlined className={styles.icon} />,
  logout: <LogoutOutlined className={styles.icon} />,
  promotion: <GiftOutlined className={styles.icon} />,
  orders: <ShoppingCartOutlined className={styles.icon} />, // Thêm icon mới
};

const NavItem = ({ icon, text, path, onClick }) => {
  return (
    <li className={styles.navItem} onClick={onClick}>
      {path ? (
        <NavLink
          to={path}
          className={({ isActive }) =>
            isActive ? `${styles.navItemActive} ${styles.navLink}` : styles.navLink
          }
        >
          {icons[icon]}
          <span className={styles.navText}>{text}</span>
        </NavLink>
      ) : (
        <div className={styles.navLink}>
          {icons[icon]}
          <span className={styles.navText}>{text}</span>
        </div>
      )}
    </li>
  );
};

NavItem.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  path: PropTypes.string,
  onClick: PropTypes.func,
};

const Sidebar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );
  const role = localStorage.getItem("Role"); // Lấy role từ localStorage
  const navigate = useNavigate();

  const handleLogout = () => {
    APILogOut()
      .then((rs) => {
        if (rs.status === 200) {
          localStorage.removeItem("token");
          localStorage.removeItem("Role");
          setIsAuthenticated(false);
          message.success("Đăng xuất thành công!");
          navigate("/");
        }
      })
      .catch((err) => {
        console.error(err);
        message.error("Đăng xuất thất bại!");
      });
  };

  // Danh sách menu dựa trên role
  const menuItems = {
    Staff: [
      { icon: "products", text: "Products & Stocks", path: "products" },
      { icon: "blog", text: "Blog", path: "blog" },
    ],
    StaffSale: [
      { icon: "category", text: "Category", path: "categoryPage" },
      { icon: "brand", text: "Brand", path: "brandPage" },
      { icon: "orders", text: "Order List", path: "orders" },
      { icon: "promotion", text: "Promotion Management", path: "promotions" },
      { icon: "products", text: "Products & Stocks", path: "products" },
    ],
    Admin: [
      { icon: "products", text: "Products & Stocks", path: "products" },
      { icon: "blog", text: "Blog", path: "blog" },
      { icon: "inbox", text: "Inbox", path: "chatAdmin" },
      { icon: "brand", text: "Brand", path: "brandPage" },
      { icon: "category", text: "Category", path: "categoryPage" },
      { icon: "categoryTitle", text: "Category Title", path: "categoryTitlePage" },
      { icon: "pricing", text: "Voucher Management", path: "vouchers" },
      { icon: "promotion", text: "Promotion Management", path: "promotions" },
      { icon: "orders", text: "Order List", path: "orders" },
      { icon: "team", text: "Team", path: "teamPage" },
    ],
  };

  // Lấy danh sách menu dựa trên role
  const navItems = menuItems[role] || [];

  return (
    <aside className={styles.sidebar}>
      {/* Logo */}
      <header className={styles.logo}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/0261389d8b910b9acbd5cafa0357496f685a9eb0"
          alt="Beauty Love Logo"
          className={styles.logoImage}
        />
      </header>

      {/* Navigation Menu */}
      <nav>
        <ul className={styles.navItems}>
          {navItems.map((item) => (
            <NavItem
              key={item.text}
              icon={item.icon}
              text={item.text}
              path={item.path}
            />
          ))}
        </ul>
      </nav>

      {/* Settings & Logout luôn nằm dưới cùng */}
      <div className={styles.bottomNav}>
        <NavItem icon="logout" text="Logout" onClick={handleLogout} />
      </div>
    </aside>
  );
};

export default Sidebar;
