
import React from "react";
import styles from "./NavigationBar.module.scss";

function NavigationBar() {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.menu}>
        <li><a href="#products">SẢN PHẨM</a></li>
        <li><a href="#promotions">KHUYẾN MÃI</a></li>
        <li><a href="#support">HỖ TRỢ KHÁCH HÀNG</a></li>
      </ul>
    </nav>
  );
}

export default NavigationBar;



