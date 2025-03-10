import React from "react";
import styles from "./ProductCard.module.css";

function ProductCard({ name, price, image, onEdit, onDelete }) {
  return (
    <article className={styles.productCard}>
      <div className={styles.imageNav}>
        <img src={image} alt={name} className={styles.productImage} />
      </div>
      <div className={styles.productInfo}>
        <h3 className={styles.productName}>{name}</h3>
        <p className={styles.productPrice}>{price}</p>
        <div className={styles.buttonGroup}>
          <button className={styles.editButton} onClick={onEdit}>✏️ Edit</button>
          <button className={styles.deleteButton} onClick={onDelete}>❌ Delete</button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;