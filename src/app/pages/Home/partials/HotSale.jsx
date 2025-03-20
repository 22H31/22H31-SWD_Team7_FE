import { useEffect, useState } from "react";
import "./HotSale.css";
import { APIGetProductById, APIGetProducts } from "../../../api/api";
import { useNavigate } from "react-router";


const ITEMS_PER_PAGE = 12;

const HotSale = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const displayedProducts = products.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  useEffect(() => {
    APIGetProducts().then((rs) => {
      console.log(rs.data.items, "1");
      const fetchedProducts = Array.isArray(rs.data.items) ? rs.data.items : [];
      setProducts(fetchedProducts);
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
    <div className="OnSale">
      <h2>Sản phẩm đang hot</h2>

      {/* Danh sách sản phẩm */}
      <div className="product-list" >
        {displayedProducts.map((product) => (
          <div key={product.productId} className="product" onClick={() => handleBuyNow(product.productId)}>
            <img src={product.avartarImageUrl} alt={product.name} />
            <h3>{product.productName}</h3>
            <p className="price">
              {Number(product.variants[0]?.price || 0).toLocaleString("vi-VN")}{" "}
              VND
              <del>
                {Number(
                  (product.variants[0]?.price || 0) * 1.05
                ).toLocaleString("vi-VN")}{" "}
                VND
              </del>
            </p>

            <span className="reviews">
              {product.soldQuantity} Số lượng đã bán
            </span>
            <button
              onClick={() => handleBuyNow(product.productId)}
              className="buy"
            >
              Mua ngay
            </button>
            <div className="rating">
              {Array.from({ length: product.averageRating }, (_, i) => (
                <span key={i} className="star">
                  ⭐
                </span>
              ))}{" "}
              <span className="reviews">{product.totalFeedback} Đánh giá</span>
            </div>
          </div>
        ))}
      </div>

      {/* Phân trang */}
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
    </div>
  );
};

export default HotSale;
