import { CloseOutlined } from "@ant-design/icons";
import { Button, Card, InputNumber, List, Typography } from "antd";
import { useEffect, useState } from "react";

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

const OrderSummary = ({ onUpdateCartSummary }) => {
  const [cart, setCart] = useState(initialCart);

  const updateQuantity = (id, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  useEffect(() => {
    onUpdateCartSummary({
      totalItems: cart.reduce((sum, item) => sum + item.quantity, 0),
      subtotal: totalPrice,
      discount: 0,
      shippingFee: 0,
      total: totalPrice,
    });
  }, [cart, totalPrice, onUpdateCartSummary]);

  return (
    
    <Card className="order-summary-card" bordered>
      <Title level={3} style={{ color: "#d63384", textAlign: "center" }}>
        Thông tin đơn hàng
      </Title>
      <List
        dataSource={cart}
        renderItem={(item) => (
          <List.Item style={{ alignItems: "center" }}>
            <img
              src={item.image}
              alt={item.name}
              style={{ width: 100, height: 100, marginRight: 5}}
            />
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
                icon={<CloseOutlined style={{ color: "red" }} />}
                onClick={() => removeItem(item.id)}
              />
            </div>
          </List.Item>
        )}
      />
       <div style={{ flexGrow: 1 }}></div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 20,
          padding:"20px",
          borderTop: "solid 1px pink",
        }}
      >
        <Title level={4} style={{ margin: 0 }}>
          Tổng tiền:
        </Title>
        <Title level={4} style={{ margin: 0 }}>
          {totalPrice.toLocaleString()} Vnd
        </Title>
      </div>
    </Card>
  );
};

export default OrderSummary;
