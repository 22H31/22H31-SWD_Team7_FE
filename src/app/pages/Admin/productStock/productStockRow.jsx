import React from "react";
import styles from "../productStock/productStock.module.css";

function ProductStockRow({ product }) {
  const { id, image, name, category, price, piece } = product;

  return (
    <article className={styles.tableRow}>
      <div className={styles.cellimage}>
        <img
          src={image || "https://placehold.co/60x60/d8d8d8/d8d8d8"}
          alt={name}
          className={styles.productImage}
        />
      </div>
      <div className={styles.cellproduct}>{name}</div>
      <div className={styles.cellcategory}>{category}</div>
      <div className={styles.cellprice}>{price}</div>
      <div className={styles.cellpiece}>{piece}</div>
      <div className={styles.cellaction}>
        <div className={styles.actionButtons}>
          {/* Nút chỉnh sửa */}
          <button className={styles.editBtn} aria-label="Edit product">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.i}
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          </button>

          {/* Nút xóa */}
          <button className={styles.deleteBtn} aria-label="Delete product">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.i2}
            >
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductStockRow;