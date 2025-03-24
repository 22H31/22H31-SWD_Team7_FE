import { useEffect, useState } from "react";
import { Row, Col, Card, Spin } from "antd";
import PageLayOut from "../../layouts/PageLayOut/PageLayOut";
import { APIGetBrands } from "../../api/api";
import "./FullBrands.css";

export default function FullBrands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await APIGetBrands();
        setBrands(res.data); // Tùy theo API response structure
      } catch (err) {
        console.error("Failed to fetch brands:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBrands();
  }, []);

  return (
    <PageLayOut>
      <div className="full-brands-page">
        <h1 className="brands-title">All Brands</h1>

        {loading ? (
          <Spin size="large" />
        ) : (
          <Row gutter={[24, 24]} justify="start">
            {brands.map((brand) => (
              <Col key={brand.brandId} xs={12} sm={8} md={6} lg={4} xl={4}>
                <Card
                  hoverable
                  cover={
                    <div className="brand-logo-container">
                      <img
                        alt={brand.brandName}
                        src={brand.avartarBrandUrl}
                        className="brand-logo"
                      />
                    </div>
                  }
                  className="brand-card"
                >
                  <Card.Meta title={brand.brandName} className="brand-name" />
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </PageLayOut>
  );
}
