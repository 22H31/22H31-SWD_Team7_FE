import React from "react";
import styles from "./productStockTable.module.css";

const ProductStockTable = ({ products }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Brand</th>
          <th>Price</th>
          <th>Stock Quantity</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.name}</td>
            <td>{product.brand}</td>
            <td>{product.price}</td>
            <td>{product.stockQuantity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductStockTable;