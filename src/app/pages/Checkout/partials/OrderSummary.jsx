import { Button, Card, List, Typography, message } from "antd";
import { useEffect, useState } from "react";
import { APIOrderOrderId } from "../../../api/api";

const { Title, Text } = Typography;

const OrderSummary = () => {
  const [cart, setCart] = useState([]);
  const [finalAmount, setFinalAmount] = useState(0);
  const orderId = localStorage.getItem("orderId");

  useEffect(() => {
    if (!orderId) {
      message.error("Không tìm thấy ID đơn hàng!");
      return;
    }
    APIOrderOrderId(orderId)
      .then((rs) => {
        const res = rs.data.data;
        setCart(res.orderDetails || []);
        setFinalAmount(res.totalAmount || 0);
        console.log(res,'res');
      })
      .catch(() => {
        message.error("Lỗi khi lấy dữ liệu đơn hàng!");
      });
  }, [orderId]);

  return (
    <>
      
      <Card className="order-summary-card" bordered>
        <Title level={3} style={{ color: "#d63384", textAlign: "center" }}>
          Thông tin đơn hàng
        </Title>
        <List
          header={
            <div
              style={{
                display: "flex",
                fontWeight: "bold",
                padding: "10px 0",
                borderBottom: "2px solid #ddd",
              }}
            >
              <span style={{ flex: 2 }}>Tên sản phẩm</span>
              <span style={{ flex: 1, textAlign: "right" }}>Giá</span>
              <span style={{ flex: 1, textAlign: "center" }}>Số lượng</span>
              <span style={{ flex: 1, textAlign: "right" }}>Thành tiền</span>
            </div>
          }
          dataSource={cart}
          renderItem={(item) => (
            <List.Item style={{ display: "flex", alignItems: "center" }}>
              <div style={{ flex: 2, display: "flex", alignItems: "center" }}>
                <img
                  src={item.imageUrl}
                  alt={item.productName}
                  style={{ width: 60, height: 60, marginRight: 10 }}
                />
                <Text strong>{item.productName}</Text>
              </div>
              <div style={{ flex: 1, textAlign: "right" }}>
                <Text>{item.price.toLocaleString()} VND</Text>
              </div>
              <div style={{ flex: 1, textAlign: "center" }}>
                <Text>{item.quantity}</Text>
              </div>
              <div style={{ flex: 1, textAlign: "right" }}>
                <Text>{(item.price * item.quantity).toLocaleString()} VND</Text>
              </div>
            </List.Item>
          )}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 20,
            padding: "20px",
            borderTop: "solid 1px pink",
          }}
        >
          <Title level={4} style={{ margin: 0 }}>
            Tổng tiền:
          </Title>
          <Title level={4} style={{ margin: 0 }}>
            {finalAmount.toLocaleString()} VND
          </Title>
        </div>
      </Card>
    </>
  );
};

export default OrderSummary;
