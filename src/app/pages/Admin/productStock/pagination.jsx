import React from "react";
import styles from "../productStock/productStock.module.css";

function Pagination({ totalItems, currentPage, itemsPerPage }) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <nav className={styles.pagination}>
      <p className={styles.showingText}>
        Showing {startItem}-{endItem < 10 ? `0${endItem}` : endItem} of{" "}
        {totalItems}
      </p>
      <div className={styles.pageControls}>
        <button
          className={styles.prevBtn}
          aria-label="Previous page"
          disabled={currentPage === 1}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={styles.i3}
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <div className={styles.divider} aria-hidden="true" />
        <button
          className={styles.nextBtn}
          aria-label="Next page"
          disabled={endItem >= totalItems}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={styles.i3}
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </nav>
  );
}

export default Pagination;