"use client";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./Sidebar.module.css";
import {
  DashboardOutlined,
  AppstoreOutlined,
  FileTextOutlined,
  InboxOutlined,
  UnorderedListOutlined,
  BoxPlotOutlined,
  DollarOutlined,
  TagsOutlined,
  AppstoreAddOutlined,
  BookOutlined,
  TeamOutlined,
  SettingOutlined,
  LogoutOutlined,
  GiftOutlined,
} from "@ant-design/icons";
import { APILogOut } from "../../../api/api";
import { message } from "antd";

// Danh sách icon với key-value
const icons = {
  dashboard: <DashboardOutlined className={styles.icon} />,
  products: <AppstoreOutlined className={styles.icon} />,
  blog: <FileTextOutlined className={styles.icon} />,
  inbox: <InboxOutlined className={styles.icon} />,
  orders: <UnorderedListOutlined className={styles.icon} />,
  stock: <BoxPlotOutlined className={styles.icon} />,
  pricing: <DollarOutlined className={styles.icon} />,
  brand: <TagsOutlined className={styles.icon} />,
  category: <AppstoreAddOutlined className={styles.icon} />,
  categoryTitle: <BookOutlined className={styles.icon} />,
  team: <TeamOutlined className={styles.icon} />,
  settings: <SettingOutlined className={styles.icon} />,
  logout: <LogoutOutlined className={styles.icon} />,
  promotion: <GiftOutlined className={styles.icon} />,
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
  const navigate = useNavigate();

  const handleLogout = () => {
    APILogOut()
      .then((rs) => {
        console.log(rs.status, "check");
        if (rs.status === 200) {
          console.log("Đăng xuất thành công");
          localStorage.removeItem("token");
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
          <NavItem icon="dashboard" text="Dashboard" path="dashboard" />
          <NavItem icon="products" text="Products & Stocks" path="products" />
          <NavItem icon="blog" text="Blog" path="blog" />
          <NavItem icon="inbox" text="Inbox" path="chatAdmin" />
          <NavItem icon="orders" text="Order Lists" path="/admin/orders" />

          <li className={styles.divider}></li>

          <NavItem icon="brand" text="Brand" path="brandPage" />
          <NavItem icon="category" text="Category" path="categoryPage" />
          <NavItem icon="categoryTitle" text="Category Title" path="categoryTitlePage" />
          <NavItem icon="pricing" text="Voucher Management" path="vouchers" />
          <NavItem icon="promotion" text="Promotion Management" path="promotions" /> {/* Sử dụng icon mới */}
          <NavItem icon="team" text="Team" path="teamPage" />
        </ul>
      </nav>

      {/* Settings & Logout luôn nằm dưới cùng */}
      <div className={styles.bottomNav}>
        <NavItem icon="settings" text="Settings" path="/admin/settings" />
        <NavItem icon="logout" text="Logout" onClick={handleLogout} />
      </div>
    </aside>
  );
};

export default Sidebar;
