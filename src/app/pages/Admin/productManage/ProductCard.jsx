import React from "react";
import styles from "./ProductCard.module.css";

function ProductCard({ name, price, image, onEdit, onDelete }) {
  return (
    <article className={styles.productCard}>
      <img src={image} alt={name} className={styles.productImage} />
      <div className={styles.productInfo}>
        <h3>{name}</h3>
        <p>{price}</p>
        <button onClick={onEdit}>✏️ Edit</button>
        <button onClick={onDelete}>❌ Delete</button>
      </div>
    </article>
  );
}

export default ProductCard;