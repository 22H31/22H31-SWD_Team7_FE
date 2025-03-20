import React from "react";
import styles from "../teamManage/teamHeader.module.css";

function TeamHeader({ onOpenPopup }) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Team</h1>
      <button className={styles.addMemberBtn} onClick={onOpenPopup}>
        Add New Member
      </button>
    </header>
  );
}

export default TeamHeader;
