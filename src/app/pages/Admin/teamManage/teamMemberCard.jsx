import React from "react";
import styles from "../teamManage/teamMemberCard.module.css";

function TeamMemberCard({ name, role, email, imageUrl, onEdit, onBlock }) {
  return (
    <article className={styles.memberCard}>
      <div className={styles.profileImage}>
        <img src={imageUrl || "https://placehold.co/100x100"} alt={`${name}'s profile`} className={styles.img} />
      </div>
      <div className={styles.memberInfo}>
        <h2>{name}</h2>
        <p>{role}</p>
        <p>{email}</p>
      </div>
      <div className={styles.actionButtons}>
        <button className={styles.editButton} onClick={onEdit}>Edit</button>
        <button className={styles.blockButton} onClick={onBlock}>Block</button>
      </div>
    </article>
  );
}

export default TeamMemberCard;
