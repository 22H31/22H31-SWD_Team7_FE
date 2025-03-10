"use client";
import React, { useState, useEffect } from "react";
import styles from "../productStock/productStock.module.css";
import ProductStockTable from "../productStock/productStockTable";
import Pagination from "../productStock/pagination";

const API_URL = "https://beteam720250214143214.azurewebsites.net/api/products";

function ProductStock() {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Fetch danh sách sản phẩm từ API
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        // Lọc dữ liệu cần thiết
        const formattedData = data.map((item) => ({
          id: item.productId,
          image: item.productAvatar || "https://placehold.co/60x60/d8d8d8/d8d8d8",
          name: item.productName,
          category: item.categoryId || "Unknown Category",
          price: `$${item.variants?.[0]?.price?.toFixed(2) || "0.00"}`,
          piece: item.variants?.[0]?.stockQuantity || "N/A",
        }));
        setProducts(formattedData);
      })
      .catch((err) => console.error("Lỗi khi lấy dữ liệu sản phẩm:", err));
  }, []);

  // Xử lý tìm kiếm
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Xử lý phân trang
  const totalItems = filteredProducts.length;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  // Xử lý chuyển trang
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700&display=swap"
        rel="stylesheet"
      />
      <section className={styles.container}>
        <header className={styles.searchBar}>
          <h1 className={styles.title}>Product Stock</h1>
          <div>
            <input
              type="text"
              placeholder="Search product name"
              className={styles.input}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </header>

        {/* Table hiển thị danh sách sản phẩm */}
        <ProductStockTable products={currentProducts} />

        {/* Phân trang */}
        <Pagination
          totalItems={totalItems}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </section>
    </>
  );
}

export default ProductStock;