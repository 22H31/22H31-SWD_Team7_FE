"use client";
import React, { useState, useEffect } from "react";
import styles from "../productStock/productStock.module.css";
import ProductStockTable from "../productStock/productStockTable";
import Pagination from "../productStock/pagination";

const PRODUCT_API_URL = "https://beteam720250214143214.azurewebsites.net/api/products";
const VARIANT_API_URL = "https://beteam720250214143214.azurewebsites.net/api/productVariant";

function ProductStock() {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Fetch danh sách sản phẩm và biến thể từ API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productRes = await fetch(PRODUCT_API_URL);
        const productData = await productRes.json();
        const variantRes = await fetch(VARIANT_API_URL);
        const variantData = await variantRes.json();

        // Kiểm tra dữ liệu trước khi sử dụng
        if (!Array.isArray(productData.products) || !Array.isArray(variantData)) {
          throw new Error("Dữ liệu từ API không đúng định dạng");
        }

        // Kết hợp dữ liệu từ hai API
        const formattedData = variantData.map((variant) => {
          const product = productData.products.find((p) => p.productId === variant.productId);
          return {
            id: variant.productId,
            name: product?.productName || "Unknown Product",
            brand: product?.brandName || "Unknown Brand",
            stockQuantity: variant.stockQuantity || "N/A",
            price: `$${variant.price?.toFixed(2) || "0.00"}`,
          };
        });

        setProducts(formattedData);
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu sản phẩm:", err);
      }
    };

    fetchProducts();
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