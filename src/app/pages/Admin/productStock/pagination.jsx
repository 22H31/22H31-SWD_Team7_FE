import React from "react";
import { Pagination as AntPagination } from "antd";
import styles from "../productStock/productStock.module.css";

const Pagination = ({ totalItems, currentPage, itemsPerPage, onPageChange }) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className={styles.paginationContainer}>
      <p className={styles.showingText}>
        Showing {startItem}-{endItem < 10 ? `0${endItem}` : endItem} of {totalItems}
      </p>
      <AntPagination
        current={currentPage}
        pageSize={itemsPerPage}
        total={totalItems}
        onChange={onPageChange}
        showSizeChanger={false}
        className={styles.pagination}
      />
    </div>
  );
};

export default Pagination;