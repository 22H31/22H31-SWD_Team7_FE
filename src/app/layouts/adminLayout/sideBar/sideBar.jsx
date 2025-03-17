"use client";
import React from "react";
import { NavLink } from "react-router-dom";
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
} from "@ant-design/icons";

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
};

const NavItem = ({ icon, text, path }) => {
  return (
    <li className={styles.navItem}>
      <NavLink
        to={path}
        className={({ isActive }) =>
          isActive ? `${styles.navItemActive} ${styles.navLink}` : styles.navLink
        }
      >
        {icons[icon]}
        <span className={styles.navText}>{text}</span>
      </NavLink>
    </li>
  );
};

NavItem.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

const Sidebar = () => {
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
          <NavItem icon="inbox" text="Inbox" path="/admin/inbox" />
          <NavItem icon="orders" text="Order Lists" path="/admin/orders" />

          <li className={styles.divider}></li>

          <NavItem icon="brand" text="Brand" path="brandPage" />
          <NavItem icon="category" text="Category" path="categoryPage" />
          <NavItem icon="categoryTitle" text="Category Title" path="categoryTitlePage" />
          <NavItem icon="team" text="Team" path="teamPage" />
        </ul>
      </nav>

      {/* Settings & Logout luôn nằm dưới cùng */}
      <div className={styles.bottomNav}>
        <NavItem icon="settings" text="Settings" path="/admin/settings" />
        <NavItem icon="logout" text="Logout" path="/logout" />
      </div>
    </aside>
  );
};

export default Sidebar;