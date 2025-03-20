import { useState, useEffect } from "react";
import axios from "axios";
import "./OnSale.css";
import { Spin } from "antd";
import { useNavigate } from "react-router-dom"; // Thêm useNavigate để chuyển hướng

const CATEGORIES = [
  "Tất cả",
  "DHC",
  "Hada Labo",
  "Sofina",
  "Bioré",
  "Shiseido",
  "Kose",
];
const ITEMS_PER_PAGE = 8;

const OnSale = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [products, setProducts] = useState([]); // State để lưu danh sách sản phẩm
  const [loading, setLoading] = useState(true); // State để hiển thị loading
  const [error, setError] = useState(null); // State để xử lý lỗi
  const [totalCount, setTotalCount] = useState(0); // State để lưu tổng số sản phẩm
  const navigate = useNavigate(); // Sử dụng useNavigate để chuyển hướng

  // Gọi API để lấy danh sách sản phẩm
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://swdteam7-hfgrdwa4dfhbe0ga.southeastasia-01.azurewebsites.net/api/products",
          {
            params: {
              PageNumber: currentPage + 1, // Trang hiện tại (API bắt đầu từ 1)
              PageSize: ITEMS_PER_PAGE, // Số sản phẩm trên mỗi trang
            },
          }
        );
        const productsWithOldPrice = response.data.items.map((product) => ({
          ...product,
          oldPrice: Math.round(product.variants[0].price * (1 + Math.random() * 0.05 + 0.2)), // Làm tròn đến số nguyên
        }));

        setProducts(productsWithOldPrice);
        setTotalCount(response.data.totalCount);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again later.");
        setLoading(false); // Tắt trạng thái loading
      }
    };

    fetchProducts();
  }, [currentPage]);

  // Lọc sản phẩm theo danh mục
  const filteredProducts =
    selectedCategory === "Tất cả"
      ? products
      : products.filter((product) => product.brandName === selectedCategory);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
  const displayedProducts = filteredProducts.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  // Hàm xử lý khi nhấn nút "Mua ngay"
  const handleBuyNow = (productId) => {
    navigate(`/product/${productId}`); // Chuyển hướng đến trang chi tiết sản phẩm
  };

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
      <h2>Khuyến mãi</h2>

      {/* Bộ lọc danh mục */}
      <div className="filters">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            className={`filter-button ${
              selectedCategory === category ? "active" : ""
            }`}
            onClick={() => {
              setSelectedCategory(category);
              setCurrentPage(0); // Reset trang về 0 khi chọn danh mục mới
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Danh sách sản phẩm */}
      <div className="OnSale-product-list">
        {displayedProducts.map((product) => (
          <div key={product.productId} className="OnSale-product">
            <img
              src={product.avartarImageUrl || "https://via.placeholder.com/200"}
              alt={product.productName}
            />
            <h3>{product.productName}</h3>
            <p className="OnSale-price">
              {product.variants[0].price.toLocaleString("vi-VN")} đ{" "}
              <del>{product.oldPrice.toLocaleString("vi-VN")} đ</del>
            </p>
            <div className="OnSale-rating">
              {Array.from({ length: Math.floor(product.averageRating) }, (_, i) => (
                <span key={i} className="OnSale-star">
                  ⭐
                </span>
              ))}
              <span className="OnSale-reviews">{product.totalFeedback} Đánh giá</span>
            </div>
            <button className="OnSale-buy" onClick={() => handleBuyNow(product.productId)}>
              Mua ngay
            </button>
          </div>
        ))}
      </div>

      {/* Phân trang */}
      {totalPages > 1 && (
        <div className="OnSale-pagination">
          {Array.from({ length: totalPages }, (_, index) => (
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

export default OnSale;