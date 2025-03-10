import React from "react";
import styles from "../teamManage/teamMemberCard.module.css";

function TeamMemberCard({ name, role, email, imageUrl }) {
  return (
    <article className={styles.memberCard}>
      <div className={styles.profileImage}>
        <img src={imageUrl} alt={`${name}'s profile`} className={styles.img} />
      </div>
      <div className={styles.memberInfo}>
        <h2 className={styles.memberName}>{name}</h2>
        <p className={styles.memberRole}>{role}</p>
        <p className={styles.memberEmail}>{email}</p>
      </div>

      <div className={styles.actionButtons}>
        <button className={styles.editButton} onClick={() => onEdit(name)}>
          Edit
        </button>
        <button className={styles.deleteButton} onClick={() => onDelete(name)}>
          Delete
        </button>
      </div>

    </article>
  );
}

export default TeamMemberCard;