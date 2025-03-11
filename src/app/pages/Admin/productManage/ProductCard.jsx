import React from "react";
import styles from "./ProductCard.module.css";

const ProductCard = ({ name, price, image, onEdit, onDelete }) => {
  return (
    <div className={styles.card}>
      <img src={image} alt={name} className={styles.image} />
      <div className={styles.details}>
        <h3>{name}</h3>
        <p>{price} VND</p>
        <button onClick={onEdit} className={styles.editButton}>Edit</button>
        <button onClick={onDelete} className={styles.deleteButton}>Delete</button>
      </div>
    </div>
  );
};

export default ProductCard;