import { useState, useEffect } from "react";
import { APIGetProducts } from "../../../api/api"; // Import the API function
import "./OnSale.css";
import { Spin } from "antd";
import { useNavigate } from "react-router-dom";

const CATEGORIES = [
  "Tất cả",
  "DHC",
  "Hada Labo",
  "Cocoon",
  "Bioré",
  "Vaseline",
  "Anessa",
];
const ITEMS_PER_PAGE = 8;

const OnSale = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await APIGetProducts();
        const productsWithOldPrice = response.data.items.map((product) => ({
          ...product,
          oldPrice: Math.round(product.variants[0].price * 1.25),
        }));

        setProducts(productsWithOldPrice);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again later.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products by category
  const filteredProducts =
    selectedCategory === "Tất cả"
      ? products
      : products.filter((product) => product.brandName === selectedCategory);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const displayedProducts = filteredProducts.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  // Handle Buy Now click
  const handleBuyNow = (productId) => {
    navigate(`/product/${productId}`);
  };

  // Loading
  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
      </div>
    );
  }

  // Error
  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="OnSale">
      <h2>Khuyến mãi</h2>

      {/* Category Filters */}
      <div className="filters">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            className={`filter-button ${
              selectedCategory === category ? "active" : ""
            }`}
            onClick={() => {
              setSelectedCategory(category);
              setCurrentPage(0);
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Product List */}
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
              {Array.from(
                { length: Math.floor(product.averageRating) },
                (_, i) => (
                  <span key={i} className="OnSale-star">
                    ⭐
                  </span>
                )
              )}
              <span className="OnSale-reviews">
                {product.totalFeedback} Đánh giá
              </span>
            </div>
            <button
              className="OnSale-buy"
              onClick={() => handleBuyNow(product.productId)}
            >
              Mua ngay
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
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
