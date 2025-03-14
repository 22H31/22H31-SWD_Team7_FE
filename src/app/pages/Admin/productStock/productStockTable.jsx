import React from "react";
import { Table } from "antd";
import styles from "./productStockTable.module.css";

const ProductStockTable = ({ products }) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Stock Quantity",
      dataIndex: "stockQuantity",
      key: "stockQuantity",
    },
  ];

  return (
    <Table
      className={styles.table}
      dataSource={products}
      columns={columns}
      rowKey="id"
      pagination={false}
    />
  );
};

export default ProductStockTable;