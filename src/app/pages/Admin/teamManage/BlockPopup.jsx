import React from "react";
import styles from "./BlockPopup.module.css";

function BlockPopup({ member, onClose, onBlock }) {
  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContent}>
        <h2>Confirm Block</h2>
        <p>Are you sure you want to block <strong>{member?.userName}</strong>?</p>
        <div className={styles.buttonGroup}>
          <button className={styles.cancelButton} onClick={onClose}>Cancel</button>
          <button className={styles.blockButton} onClick={onBlock}>Block</button>
        </div>
      </div>
    </div>
  );
}

export default BlockPopup;
