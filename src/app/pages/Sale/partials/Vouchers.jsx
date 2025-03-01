import { Card, Button, Row, Col } from "antd";
import "./Voucher.css";

const vouchers = [
  {
    id: 1,
    logo: "https://th.bing.com/th/id/OIP.nwFbwaRTXx2zXr4SjB3nvAHaGr?w=720&h=649&rs=1&pid=ImgDetMain",
    title: "Giảm 15%",
    description: "Giảm tối đa 50k Đơn Tối Thiểu 300k",
  },
  {
    id: 2,
    logo: "https://cf.shopee.com.my/file/1d41c0691d1e08614e8d3971ab4e1d2b",
    title: "Giảm 15%",
    description: "Giảm tối đa 50k Đơn Tối Thiểu 300k",
  },
  {
    id: 3,
    logo: "https://www.lottemart.vn/media/catalog/product/cache/0x0/8/9/8934681028027.jpg.webp",
    title: "Giảm 15%",
    description: "Giảm tối đa 50k Đơn Tối Thiểu 300k",
  },
  {
    id: 4,
    logo: "https://img.bonjourglobal.net/1/1762/1264.jpg",
    title: "Giảm 15%",
    description: "Giảm tối đa 50k Đơn Tối Thiểu 300k",
  },
];

const Voucher = () => {
  return (
    <div className="voucher-container">
      <h2 className="voucher-title">Voucher</h2>
      <Row gutter={[16, 16]} justify="center">
        {vouchers.map((voucher) => (
          <Col key={voucher.id} xs={24} sm={12} md={6}>
            <Card className="voucher-card">
              <div className="voucher-content">
                {/* Bên trái chứa ảnh */}
                <div className="voucher-logo-container">
                  <img src={voucher.logo} alt="Logo" className="voucher-logo" />
                </div>
                {/* Bên phải chứa nội dung */}
                <div className="voucher-info">
                  <p className="voucher-discount">{voucher.title}</p>
                  <p className="voucher-description">{voucher.description}</p>
                  <Button type="primary" className="voucher-button">Lưu</Button>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Voucher;