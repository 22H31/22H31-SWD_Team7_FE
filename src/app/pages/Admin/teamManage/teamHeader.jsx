import React from "react";
import styles from "../teamManage/teamHeader.module.css";

function TeamHeader() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Team</h1>
      <button className={styles.addMemberBtn}>Add New Member</button>
    </header>
  );
}

export default TeamHeader;