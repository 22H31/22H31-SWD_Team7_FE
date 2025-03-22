import { DeleteOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Card, Input, Table, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  APIGetCartItems,
  APIRemoveCartItem,
  APIUpdateCartItem,
} from "../../../api/api";
import { cartLenght } from "../../../globalVariable/cart";
import "./CartPage.css";

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [discountCode, setDiscountCode] = useState("");
  const userId = localStorage.getItem("userID");

  // Fetch cart items
  const fetchCartItems = async () => {
    try {
      const response = await APIGetCartItems(userId);
      setCartItems(response.data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      // message.error("Không thể lấy danh sách sản phẩm trong giỏ hàng.");
    }
  };

  // Update item quantity
  const handleQuantityChange = async (cartItemId, quantity) => {
    if (quantity < 1) return;

    try {
      await APIUpdateCartItem(cartItemId, quantity);

      const updatedCartItems = cartItems.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity } : item
      );
      setCartItems(updatedCartItems);

      message.success("Cập nhật số lượng thành công!");
    } catch (error) {
      console.error("Error updating quantity:", error);
      message.error("Cập nhật số lượng thất bại.");
    }
  };

  // Remove item from cart
  const handleRemoveItem = async (cartItemId) => {
    try {
      await APIRemoveCartItem(cartItemId);

      const updatedCartItems = cartItems.filter(
        (item) => item.cartItemId !== cartItemId
      );
      setCartItems(updatedCartItems);

      // Update cart length
      const newCartLength = updatedCartItems.length;
      cartLenght.set(newCartLength);
      localStorage.setItem("cartItemsLength", newCartLength);
      window.dispatchEvent(new Event("storage"));

      message.success("Xóa sản phẩm khỏi giỏ hàng thành công!");
    } catch (error) {
      console.error("Error removing item:", error);
      message.error("Xóa sản phẩm khỏi giỏ hàng thất bại.");
    }
  };

  // Format currency
  const formatCurrency = (amount) =>
    new Intl.NumberFormat("vi-VN").format(amount) + " đ";

  // Calculate total price
  const getTotalPrice = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // Table columns
  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "productName",
      key: "productName",
      render: (text, record) => (
        <div className="cart-item">
          <img
            src={record.productAvatarImage}
            alt={text}
            className="cart-item-image"
          />
          <div>
            <p>{text}</p>
            <div className="cart-actions">
              <DeleteOutlined
                className="remove-button"
                onClick={() => handleRemoveItem(record.cartItemId)}
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record) => (
        <Input
          type="number"
          min={1}
          value={text}
          onChange={(e) =>
            handleQuantityChange(record.cartItemId, parseInt(e.target.value))
          }
          className="quantity-input"
        />
      ),
    },
    {
      title: "Tạm tính",
      dataIndex: "price",
      key: "price",
      width: 140,
      render: (text, record) => (
        <span>{formatCurrency(record.price * record.quantity)}</span>
      ),
    },
  ];

  // Fetch items on mount
  useEffect(() => {
    if (userId) {
      fetchCartItems();
    }
  }, [userId]);

  // Update cart length
  useEffect(() => {
    cartLenght.set(cartItems.length);
    localStorage.setItem("cartItemsLength", cartItems.length);
  }, [cartItems.length]);

  return (
    <div className="cart-container">
      <Card
        title={`Giỏ hàng (${cartItems.length} sản phẩm)`}
        className="cart-card"
      >
        <Table
          columns={columns}
          dataSource={cartItems}
          pagination={false}
          className="custom-table"
          rowKey="cartItemId"
        />
      </Card>

      <Card title="Thông tin đơn hàng" className="summary-card">
        <p>Tổng sản phẩm: {cartItems.length}</p>
        <p>Tạm tính: {formatCurrency(getTotalPrice())}</p>
        <p>Mã giảm giá: {formatCurrency(0)}</p>
        <p>
          <b>Tổng thanh toán: {formatCurrency(getTotalPrice())}</b>
        </p>

        <div className="my-discount">
          <Button className="discount-button" type="default">
            <span className="discount-text">Ưu đãi của tôi</span>
            <RightOutlined className="arrow-icon" />
          </Button>
        </div>

        <div className="discount-space">
          <h3>Mã giảm giá</h3>
          <div className="discount-section">
            <Input
              placeholder="Nhập mã giảm giá"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
            />
            <Button className="apply" type="primary">
              Áp dụng
            </Button>
          </div>
        </div>

        <Button
          block
          size="large"
          className="checkout-button"
          onClick={() => navigate("/checkout")}
        >
          Đặt Hàng
        </Button>
      </Card>
    </div>
  );
};

export default CartPage;
