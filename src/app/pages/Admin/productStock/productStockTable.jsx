import React from "react";
import styles from "../productStock/productStock.module.css";
import ProductStockRow from "../productStock/productStockRow";

function ProductStockTable({ products }) {
  return (
    <section className={styles.table}>
      <header className={styles.tableHeader}>
        <div className={styles.headerCellimage}>Image</div>
        <div className={styles.headerCellproduct}>Product Name</div>
        <div className={styles.headerCellcategory}>Category</div>
        <div className={styles.headerCellprice}>Price</div>
        <div className={styles.headerCellpiece}>Piece</div>
        <div className={styles.headerCellaction}>Action</div>
      </header>

      {products.map((product) => (
        <ProductStockRow key={product.id} product={product} />
      ))}
    </section>
  );
}

export default ProductStockTable;