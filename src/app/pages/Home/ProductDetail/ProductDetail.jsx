import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { APIGetProductById } from "../../../api/api";
import "./ProductDetail.css";
import PageLayOut from "../../../layouts/PageLayOut/PageLayOut";
import { Col, Image } from "antd";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const id = localStorage.getItem("productId");
  useEffect(() => {
    APIGetProductById(id).then((rs) => {
      setProduct(rs.data);
      console.log("Product Data:", rs.data);
    });
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <PageLayOut>
      <div className="product-detail-container">
        {/* Ảnh sản phẩm */}
        <div className="product-header">
        <Col span={10}>
              <Image src={product.avatarImageUrl} alt={product.productName} />
            </Col>

          {/* Thông tin chung */}
          <div className="product-info">
            <h1 style={{ textAlign: "left", color: "#C0437F" }}>
              {product.productName}
            </h1>
            <div className="product-meta">
              <span className="rating">{product.averageRating} ⭐</span> |
              <span
                style={{ textAlign: "left", color: "#C0437F" }}
                className="reviews"
              >
                ({product.feedbacks.length} đánh giá)
              </span>{" "}
              |<span  style={{textAlign:"left",color:"#C0437F"}} className="product-code">Mã sản phẩm: {id}</span>
            </div>

            <p className="price">
              {product.variants && product.variants.length > 0 ? (
                <>
                  <span className="discounted-price">
                    {Number(product.variants[0].price).toLocaleString("vi-VN")}{" "}
                    VND
                  </span>
                  <del className="original-price">
                    {Number(product.variants[0].price * 1.05).toLocaleString(
                      "vi-VN"
                    )}{" "}
                    VND
                  </del>
                </>
              ) : (
                <span>Liên hệ để biết giá</span>
              )}
            </p>
            <p>Số lượng còn: {product.variants[0].stockQuantity}</p>
            <button className="add-to-cart">Thêm vào giỏ hàng</button>
          </div>
        </div>

        {/* Thông tin chi tiết */}
        <div className="product-details">
          <h2>Thông tin sản phẩm:</h2>
          <div className="product-description">
            <p>
              {product.describe?.solutionsForSkinHairConditions ||
                "Không có thông tin"}
            </p>
          </div>

          <h2>Thông số sản phẩm:</h2>
          <table>
            <tbody>
              <tr>
                <td>Thương hiệu:</td>
                <td>{product.brandName}</td>
              </tr>
              <tr>
                <td>Xuất xứ thương hiệu:</td>
                <td>
                  {product.specifications?.brandOrigin || "Không có thông tin"}
                </td>
              </tr>
              <tr>
                <td>Nơi sản xuất:</td>
                <td>
                  {product.specifications?.placeOfManufacture ||
                    "Không có thông tin"}
                </td>
              </tr>
              <tr>
                <td>Đối tượng sử dụng:</td>
                <td>
                  {product.describe?.suitableUsers || "Không có thông tin"}
                </td>
              </tr>
            </tbody>
          </table>

          <h2>Thành phần sản phẩm:</h2>
          <p>{product.describe?.uses || "Không có thông tin"}</p>

          <h2>Hướng dẫn sử dụng:</h2>
          <p>{product.describe?.preserve || "Không có thông tin"}</p>
        </div>

        {/* Đánh giá sản phẩm */}
        {/* Đánh giá sản phẩm */}
        <div className="product-reviews">
          <h2>Đánh giá sản phẩm:</h2>
          <div className="review-summary">
            <span className="rating-score">
              {product.averageRating.toFixed(1)}
            </span>
            <div className="stars">
              {"⭐".repeat(Math.round(product.averageRating))}
            </div>
            <p>{product.feedbacks.length} đánh giá</p>
          </div>

          {/* Danh sách đánh giá */}
          <div className="review-list">
            {product.feedbacks.length > 0 ? (
              product.feedbacks.map((fb, index) => (
                <div key={index} className="review-item">
                  <p className="review-user">{fb.userName}</p>
                  <div className="review-stars">{"⭐".repeat(fb.rating)}</div>
                  <p className="review-text">{fb.comment}</p>
                </div>
              ))
            ) : (
              <p>Chưa có đánh giá nào.</p>
            )}
          </div>

          {/* Nút Viết Bình Luận */}
          <button className="write-review">Viết Bình Luận</button>
        </div>
      </div>
    </PageLayOut>
  );
};

export default ProductDetail;
