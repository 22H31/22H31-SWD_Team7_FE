import {
    DeleteOutlined,
    HeartOutlined,
    RightOutlined,
  } from "@ant-design/icons";
  import { Button, Card, Input, Table } from "antd";
  import { useState } from "react";
  import "./CartPage.css";
  import { useNavigate } from "react-router-dom";
  
  const fakeCartData = [
    {
      key: "1",
      name: "Hada Labo - Serum HA cấp ẩm giúp trắng da, mờ thâm 30ml",
      price: 280000,
      quantity: 1,
      image:
        "https://slowsoak.com/wp-content/uploads/2020/05/Hada-Labo-Gokujyun-Hyaluronic-Lotion-600x600.jpg",
    },
    {
      key: "2",
      name: "Hada Labo - Serum HA cấp ẩm giúp trắng da, mờ thâm 30ml",
      price: 280000,
      quantity: 1,
      image:
        "https://slowsoak.com/wp-content/uploads/2020/05/Hada-Labo-Gokujyun-Hyaluronic-Lotion-600x600.jpg",
    },
    {
      key: "3",
      name: "Hada Labo - Serum HA cấp ẩm giúp trắng da, mờ thâm 30ml",
      price: 280000,
      quantity: 1,
      image:
        "https://slowsoak.com/wp-content/uploads/2020/05/Hada-Labo-Gokujyun-Hyaluronic-Lotion-600x600.jpg",
    },
  ];
  
  const CartPage = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState(fakeCartData);
    const [discountCode, setDiscountCode] = useState("");
  
    const handleQuantityChange = (key, value) => {
      const updatedCart = cartItems.map((item) =>
        item.key === key ? { ...item, quantity: value } : item
      );
      setCartItems(updatedCart);
    };
  
    const handleRemoveItem = (key) => {
      setCartItems(cartItems.filter((item) => item.key !== key));
    };
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("vi-VN").format(amount) + " vnđ";
    };
    const getTotalPrice = () => {
      return cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    };
  
    const columns = [
      {
        title: "Sản phẩm",
        dataIndex: "name",
        key: "name",
        render: (text, record) => (
          <div className="cart-item">
            <img src={record.image} alt={text} className="cart-item-image" />
            <div>
              <p>{text}</p>
              <div className="cart-actions">
                <HeartOutlined className="cart-icon" />
                <DeleteOutlined
                  className="cart-icon"
                  onClick={() => handleRemoveItem(record.key)}
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
              handleQuantityChange(record.key, parseInt(e.target.value))
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
          <span>{new Intl.NumberFormat("vi-VN").format(record.price * record.quantity)} vnđ</span>
        ),
      },
      
    ];
  
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
          {/* thêm ưu đãi của tôi ở đâyđây */}
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
              <Button className="apply" type="primary">Áp dụng</Button>
            </div>
          </div>
          <Button
      block
      size="large"
      className="checkout-button"
      onClick={() => navigate("/checkout")} // Điều hướng tới trang Checkout
    >
      Đặt Hàng
    </Button>
        </Card>
      </div>
    );
  };
  
  export default CartPage;
  