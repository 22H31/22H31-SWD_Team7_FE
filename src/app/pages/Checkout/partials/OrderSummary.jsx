import { CloseOutlined } from "@ant-design/icons";
import { Button, Card, InputNumber, List, Typography, message } from "antd";
import { useEffect, useState } from "react";
import { APIGetCartItems, APIRemoveCartItem, APIUpdateCartItem } from "../../../api/api";

const { Title, Text } = Typography;

const OrderSummary = ({ onUpdateCart }) => {
  const [cart, setCart] = useState([]);
  const userId = localStorage.getItem("userID");

  // Fetch cart từ API
  const fetchCartItems = async () => {
    try {
      const response = await APIGetCartItems(userId);
      setCart(response.data);
      onUpdateCart(response.data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      message.error("Không thể lấy thông tin giỏ hàng.");
    }
  };

  // Update số lượng sản phẩm
  const updateQuantity = async (id, newQuantity) => {
    try {
      await APIUpdateCartItem(id, newQuantity);
      const updatedCart = cart.map((item) =>
        item.cartItemId === id ? { ...item, quantity: newQuantity } : item
      );
      setCart(updatedCart);
      onUpdateCart(updatedCart); // Truyền cart mới!
      message.success("Cập nhật số lượng thành công!");
    } catch (error) {
      console.error("Error updating quantity:", error);
      message.error("Cập nhật số lượng thất bại.");
    }
  };

  // Xóa sản phẩm
  const removeItem = async (id) => {
    try {
      await APIRemoveCartItem(id);
      const updatedCart = cart.filter((item) => item.cartItemId !== id);
      setCart(updatedCart);
      onUpdateCart(updatedCart); // Truyền cart mới!
      message.success("Xóa sản phẩm thành công!");
    } catch (error) {
      console.error("Error removing item:", error);
      message.error("Xóa sản phẩm thất bại.");
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

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
              src={item.productAvatarImage}
              alt={item.productName}
              style={{ width: 100, height: 100, marginRight: 5 }}
            />
            <div className="order-summary-detail">
              <div style={{ flex: 1 }}>
                <Text strong>{item.productName}</Text>
                <br />
                <Text>{item.price.toLocaleString()} VND</Text>
              </div>
              <InputNumber
                min={1}
                value={item.quantity}
                onChange={(value) => updateQuantity(item.cartItemId, value)}
              />
              <Button
                style={{ background: "#c0437f", marginLeft: "5px" }}
                icon={<CloseOutlined style={{ color: "white" }} />}
                onClick={() => removeItem(item.cartItemId)}
              />
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
          {cart.reduce((total, item) => total + item.price * item.quantity, 0).toLocaleString()} VND
        </Title>
      </div>
    </Card>
  );
};

export default OrderSummary;
