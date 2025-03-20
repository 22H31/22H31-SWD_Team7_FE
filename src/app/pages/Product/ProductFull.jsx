import React, { useEffect, useState } from "react";
import { APIGetFullProduct, APIGetProductById } from "../../api/api";
import PageLayOut from "../../layouts/PageLayOut/PageLayOut";
import "./ProductList.css";
import { useNavigate } from "react-router";
import LayoutProduct from "../../layouts/LayoutProduct/LayoutProduct";

const ITEMS_PER_PAGE = 20;

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const displayedProducts = products.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 20;
  const navigate = useNavigate();

  useEffect(() => {
    APIGetFullProduct().then((rs) => {
      setProducts(rs.data.items);
      setTotalPages(Math.ceil(rs.data.totalCount / pageSize));
    });
  }, []);

  const handleBuyNow = (productId) => {
    APIGetProductById(productId).then((rs) => {
      console.log(rs.data, "product");
      localStorage.setItem("productId", productId);
      navigate(`/product/${productId}`);
    });
  };

  return (
    <LayoutProduct>
      <div className="product-list">
        {displayedProducts.map((product) => {
          const cheapestVariant = product.variants.reduce(
            (min, variant) => (variant.price < min.price ? variant : min),
            product.variants[0]
          );

          return (
            <div key={product.productId} className="product-card"  onClick={() => handleBuyNow(product.productId)}>
              <img
                src={product?.avartarImageUrl}
                alt={product.productName}
                className="product-image"
              />
              <h3 className="product-name">{product.productName}</h3>
              <p className="product-price">
                <span className="current-price">
                  {cheapestVariant.price.toLocaleString()} VND
                </span>

                <span className="original-price">
                  {Math.round(cheapestVariant.price * 1.1).toLocaleString()} VND
                </span>
              </p>

              <button
                onClick={() => handleBuyNow(product.productId)}
                className="buy"
              >
                Mua ngay
              </button>
              <p className="rating">
                ⭐⭐⭐⭐⭐ {product.totalFeedback} Đánh giá
              </p>
            </div>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
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
    </LayoutProduct>
  );
};

export default ProductList;
