import { Row, Col, Spin, Typography, message } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import {
  APIGetBrandById,
  APIGetProducts,
  APIGetProductById,
} from "../../../api/api";
import PageLayOut from "../../../layouts/PageLayOut/PageLayOut";
import "./BrandProduct.css";

const { Title, Paragraph } = Typography;

const BrandProduct = () => {
  const { brandId } = useParams();
  const [brand, setBrand] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchBrandData = async () => {
      try {
        setLoading(true);
        const brandRes = await APIGetBrandById(brandId);
        if (!brandRes?.data) {
          message.error("Không thể tải thông tin thương hiệu.");
          return;
        }
        setBrand(brandRes.data);

        const productsRes = await APIGetProducts();
        if (!productsRes?.data?.items) {
          message.warning("Không có sản phẩm nào.");
          setProducts([]);
          return;
        }

        const filteredProducts = productsRes.data.items.filter(
          (product) => product.brandName === brandRes.data.brandName
        );
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
        message.error("Đã xảy ra lỗi khi tải dữ liệu.");
      } finally {
        setLoading(false);
      }
    };

    fetchBrandData();
  }, [brandId]);

  const handleBuyNow = (productId) => {
    APIGetProductById(productId).then((rs) => {
      console.log(rs.data, "product");
      localStorage.setItem("productId", productId);
      navigate(`/product/${productId}`);
    });
  };
  return (
    <PageLayOut>
      <div className="brand-container">
        {loading ? (
          <div className="loading-container">
            {/* <Spin size="large" /> */}
          </div>
        ) : (
          <>
            {brand && (
              <div className="brand-header">
                <img
                  src={brand.avartarBrandUrl || "/images/default-brand.png"}
                  alt={brand.brandName}
                  className="brand-avatar"
                />
                <div>
                  <Title level={2}>{brand.brandName}</Title>
                  <Paragraph>
                    {brand.brandDescription || "Không có mô tả."}
                  </Paragraph>
                </div>
              </div>
            )}
            <div className="product-list">
              {products.length > 0 ? (
                products.map((product) => {
                  const cheapestVariant = product.variants?.reduce(
                    (min, variant) =>
                      variant.price < min.price ? variant : min,
                    product.variants[0]
                  );

                  return (
                    <div
                      key={product?.productId}
                      className="product-card"
                      onClick={() => handleBuyNow(product?.productId)}
                    >
                      <img
                        src={
                          product.avartarImageUrl ||
                          "/images/default-product.png"
                        }
                        alt={product.productName}
                        className="product-image"
                      />
                      <h3 className="product-name">{product.productName}</h3>
                      <p className="product-price">
                        <span className="current-price">
                          {cheapestVariant?.price?.toLocaleString()} VND
                        </span>
                        <span className="original-price">
                          {Math.round(
                            cheapestVariant?.price * 1.1
                          ).toLocaleString()}{" "}
                          VND
                        </span>
                      </p>
                      <button
                        className="buy"
                        onClick={() => handleBuyNow(product.productId)}
                      >
                        Mua ngay
                      </button>
                      <p className="rating">
                        ⭐⭐⭐⭐⭐ {product?.totalFeedback} Đánh giá
                      </p>
                    </div>
                  );
                })
              ) : (
                <Paragraph className="no-products">
                  Không có sản phẩm nào!
                </Paragraph>
              )}
            </div>
          </>
        )}
      </div>
    </PageLayOut>
  );
};

export default BrandProduct;
