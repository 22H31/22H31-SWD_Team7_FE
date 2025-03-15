import { Spin } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import "./HotSale.css";

const ITEMS_PER_PAGE = 12; // Số sản phẩm hiển thị trên mỗi trang

const HotSale = () => {
  const [products, setProducts] = useState([]); // State để lưu danh sách sản phẩm
  const [currentPage, setCurrentPage] = useState(0); // State để theo dõi trang hiện tại
  const [loading, setLoading] = useState(true); // State để hiển thị loading
  const [error, setError] = useState(null); // State để xử lý lỗi
  const [totalCount, setTotalCount] = useState(0); // State để lưu tổng số sản phẩm

  // Gọi API để lấy danh sách sản phẩm
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://beteam720250214143214.azurewebsites.net/api/products",
          {
            params: {
              PageNumber: currentPage + 1, // Trang hiện tại (API bắt đầu từ 1)
              PageSize: ITEMS_PER_PAGE, // Số sản phẩm trên mỗi trang
            },
          }
        );
        const productsWithOldPrice = response.data.items.map((product) => ({
          ...product,
          oldPrice: Math.round(product.variants[0].price * (1 + Math.random() * 0.05 + 0.5)), // Làm tròn đến số nguyên
        }));
        setProducts(productsWithOldPrice); // Cập nhật danh sách sản phẩm
        setTotalCount(response.data.totalCount); // Cập nhật tổng số sản phẩm
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again later."); 
        setLoading(false); 
      }
    };

    fetchProducts();
  }, [currentPage]);

  // Hiển thị loading nếu đang tải dữ liệu
  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
      </div>
    );
  }

  // Hiển thị lỗi nếu có
  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="OnSale">
      <h2>Sản phẩm đang hot</h2>

      {/* Danh sách sản phẩm */}
      <div className="product-list">
        {products.map((product) => (
          <div key={product.productId} className="product">
            <img
              src={product.avartarImageUrl || "https://via.placeholder.com/200"}
              alt={product.productName}
            />
            <h3>{product.productName}</h3>
            <p className="price">
              {product.variants[0].price.toLocaleString("vi-VN")} đ{" "}
              <del>{product.oldPrice.toLocaleString("vi-VN")} đ</del>
            </p>
            <div className="rating">
              {Array.from({ length: Math.floor(product.averageRating) }, (_, i) => (
                <span key={i} className="star">
                  ⭐
                </span>
              ))}
              <span className="reviews">{product.totalFeedback} Đánh giá</span>
            </div>
            <button className="buy">Mua ngay</button>
          </div>
        ))}
      </div>

      {/* Phân trang */}
      {totalCount > ITEMS_PER_PAGE && (
        <div className="pagination">
          {Array.from({ length: Math.ceil(totalCount / ITEMS_PER_PAGE) }, (_, index) => (
            <button
              key={index}
              className={`page-number ${currentPage === index ? "active" : ""}`}
              onClick={() => setCurrentPage(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default HotSale;