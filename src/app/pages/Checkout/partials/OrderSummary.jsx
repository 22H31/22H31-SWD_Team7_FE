import { useState } from "react";
import { Card, List, Button, InputNumber, Typography } from "antd";
import { CloseOutlined  } from "@ant-design/icons";

const { Title, Text } = Typography;

const initialCart = [
  {
    id: 1,
    name: "Hada Labo - Serum HA Gi...",
    price: 280000,
    quantity: 1,
    image: "https://toplist.vn/images/800px/hada-labo-1096262.jpg",
  },
  {
    id: 2,
    name: "Hada Labo - Serum HA Gi...",
    price: 280000,
    quantity: 1,
    image: "https://toplist.vn/images/800px/hada-labo-1096262.jpg",
  },
  {
    id: 3,
    name: "Hada Labo - Serum HA Gi...",
    price: 280000,
    quantity: 1,
    image: "https://toplist.vn/images/800px/hada-labo-1096262.jpg",
  },
];

const OrderSummary = () => {
  const [cart, setCart] = useState(initialCart);

  const updateQuantity = (id, newQuantity) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <Card className="order-summary-card" bordered>
      <Title level={3} style={{ color: "#d63384", textAlign: "center" }}>
        Thông tin đơn hàng
      </Title>
      <List
        dataSource={cart}
        renderItem={(item) => (
          <List.Item style={{ display: "", alignItems: "center" }}>
            <img src={item.image} alt={item.name} style={{ width: 100, height: 100, marginRight: 10 }} />
            <div className="order-summary-detail">
            <div style={{ flex: 1 }}>
              <Text strong>{item.name}</Text>
              <br />
              <Text>{item.price.toLocaleString()} Vnd</Text>
            </div>
            <InputNumber
              min={1}
              value={item.quantity}
              onChange={(value) => updateQuantity(item.id, value)}
            />
                        <Button
              type="text"
              icon={<CloseOutlined  style={{ color: "red" }} />}
              onClick={() => removeItem(item.id)}
            />
            </div>

          </List.Item>
        )}
      />
      <div style={{ textAlign: "right", marginTop: 15 }}>
        <Title level={4}>Tổng tiền: {totalPrice.toLocaleString()} Vnd</Title>
      </div>
    </Card>
  );
};

export default OrderSummary;