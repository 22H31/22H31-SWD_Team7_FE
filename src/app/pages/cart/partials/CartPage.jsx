import { DeleteOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Card, Input, Table, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  APIAddToCart,
  APIGetCartItems,
  APIRemoveCartItem,
  APIUpdateCartItem,
} from "../../../api/api"; // Import API functions
import "./CartPage.css";

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [discountCode, setDiscountCode] = useState("");
  const userId = localStorage.getItem("userID"); // Get userId from localStorage
  // Fetch cart items
  const fetchCartItems = async () => {
    try {
      const response = await APIGetCartItems(userId);
      setCartItems(response.data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      message.error("Không thể lấy danh sách sản phẩm trong giỏ hàng.");
    }
  };

  // Add item to cart
  // const handleAddToCart = async (variantId, quantity) => {
  //   try {
  //     await APIAddToCart(userId, variantId, quantity).then((rs) => {
  //       console.log(rs);
  //     });
  //     message.success("Thêm sản phẩm vào giỏ hàng thành công!");
  //     fetchCartItems(); // Refresh cart items
  //   } catch (error) {
  //     console.error("Error adding to cart:", error);
  //     message.error("Thêm sản phẩm vào giỏ hàng thất bại.");
  //   }
  // };

  // Update item quantity
  const handleQuantityChange = async (cartItemId, quantity) => {
    try {
      await APIAddToCart(userId, cartItemId, quantity);
      message.success("Thêm sản phẩm vào giỏ hàng thành công!");
      await fetchCartItems(); // Lấy lại danh sách giỏ hàng
  
      // Cập nhật số lượng sản phẩm trong localStorage
      const newCartLength = cartItems.length + 1;
      localStorage.setItem("cartItemsLength", newCartLength);
      window.dispatchEvent(new Event("storage")); // Phát sự kiện để cập nhật Header
    } catch (error) {
      console.error("Error adding to cart:", error);
      message.error("Thêm sản phẩm vào giỏ hàng thất bại.");
    }
  };

  // Remove item from cart
  const handleRemoveItem = async (cartItemId) => {
    try {
      await APIRemoveCartItem(cartItemId);
      message.success("Xóa sản phẩm khỏi giỏ hàng thành công!");
      fetchCartItems(); // Refresh cart items
    } catch (error) {
      console.error("Error removing item:", error);
      message.error("Xóa sản phẩm khỏi giỏ hàng thất bại.");
    }
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN").format(amount) + " đ";
  };

  // Calculate total price
  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

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
                className="cart-icon"
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
      render: (text, record) => (
        <span>
          {new Intl.NumberFormat("vi-VN").format(
            record.price * record.quantity
          )}{" "}
          vnđ
        </span>
      ),
    },
  ];

  // Fetch cart items on component mount
  useEffect(() => {
    if (userId) {
      fetchCartItems();
    }
  }, [userId]);
  useEffect(() => {
    localStorage.setItem("cartItemsLength", cartItems.length);
  }, [cartItems.length]); // Chỉ cập nhật khi số lượng sản phẩm thay đổi

  return (
    <div className="cart-container">
      <Card
        title={`Giỏ hàng (${cartItems.length} sản phẩm)`}
        className="cart-card"
      >
        <Table columns={columns} dataSource={cartItems} pagination={false} />
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
