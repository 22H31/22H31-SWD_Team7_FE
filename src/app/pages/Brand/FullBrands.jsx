import { Card, Col, Row, Spin, message } from "antd";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { APIGetBrands } from "../../api/api";
import PageLayOut from "../../layouts/PageLayOut/PageLayOut";
import "./FullBrands.css";

export default function FullBrands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading(true);
        const res = await APIGetBrands();
        if (res?.data) {
          setBrands(res.data);
        } else {
          message.error("Không thể tải danh sách thương hiệu!");
        }
      } catch (err) {
        console.error("Failed to fetch brands:", err);
        message.error("Đã xảy ra lỗi khi tải thương hiệu.");
      } finally {
        setLoading(false);
      }
    };
    fetchBrands();
  }, []);

  const handleBrandClick = useCallback((brandId) => {
    navigate(`/brand/${brandId}`);
  }, [navigate]);

  return (
    <PageLayOut>
      <div className="full-brands-page">
        <h1 className="brands-title">Tất cả thương hiệu</h1>

        {loading ? (
          <div className="loading-spinner">
            {/* <Spin size="large" /> */}
          </div>
        ) : (
          <Row gutter={[24, 24]} justify="start">
            {brands.length > 0 ? (
              brands.map((brand) => (
                <Col key={brand.brandId} xs={12} sm={8} md={6} lg={4} xl={4}>
                  <Card
                    hoverable
                    onClick={() => handleBrandClick(brand.brandId)}
                    cover={
                      <div className="brand-logo-container">
                        <img
                          alt={brand.brandName}
                          src={brand.avartarBrandUrl || "/images/default-brand.png"}
                          className="brand-logo"
                        />
                      </div>
                    }
                    className="brand-card"
                    bodyStyle={{ padding: "12px" }}
                  >
                    <Card.Meta
                      title={brand.brandName}
                      className="brand-name"
                      description={<div className="view-products-link">Xem sản phẩm →</div>}
                    />
                  </Card>
                </Col>
              ))
            ) : (
              <div className="no-brands-message">Không có thương hiệu nào!</div>
            )}
          </Row>
        )}
      </div>
    </PageLayOut>
  );
}
