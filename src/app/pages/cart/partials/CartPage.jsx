import { DeleteOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Input, Table, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  APICreateOrder,
  APIGetCartItems,
  APIRemoveCartItem,
  APIUpdateCartItem,
} from "../../../api/api";
import { cartLenght } from "../../../globalVariable/cart";
import "./CartPage.css";

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const userId = localStorage.getItem("userID");

  // State lưu trữ các item đã chọn dưới dạng object
  const [selectedItems, setSelectedItems] = useState(
    JSON.parse(localStorage.getItem("selectedItems")) || []
  );

  // Fetch giỏ hàng
  const fetchCartItems = async () => {
    try {
      const response = await APIGetCartItems(userId);
      setCartItems(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy giỏ hàng:", error);
    }
  };

  // Xử lý thay đổi số lượng
  const handleQuantityChange = async (cartItemId, quantity) => {
    if (quantity < 1) return;

    try {
      await APIUpdateCartItem(cartItemId, quantity);

      const updatedCartItems = cartItems.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity } : item
      );
      setCartItems(updatedCartItems);

      const updatedSelectedItems = selectedItems.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity } : item
      );
      setSelectedItems(updatedSelectedItems);
      localStorage.setItem(
        "selectedItems",
        JSON.stringify(updatedSelectedItems)
      );

      message.success("Cập nhật số lượng thành công!");
    } catch (error) {
      message.error("Cập nhật số lượng thất bại!");
    }
  };

  // Xóa item khỏi giỏ hàng
  const handleRemoveItem = async (cartItemId) => {
    try {
      await APIRemoveCartItem(cartItemId);

      setCartItems((prev) =>
        prev.filter((item) => item.cartItemId !== cartItemId)
      );
      const updatedSelectedItems = selectedItems.filter(
        (item) => item.cartItemId !== cartItemId
      );
      setSelectedItems(updatedSelectedItems);
      localStorage.setItem(
        "selectedItems",
        JSON.stringify(updatedSelectedItems)
      );

      const newLength = cartItems.length - 1;
      cartLenght.set(newLength);
      localStorage.setItem("cartItemsLength", newLength);
      window.dispatchEvent(new Event("storage"));

      message.success("Xóa sản phẩm thành công!");
    } catch (error) {
      message.error("Xóa sản phẩm thất bại!");
    }
  };

  // Xử lý chọn/bỏ chọn sản phẩm
  const handleSelectItem = (cartItemId) => {
    const targetItem = cartItems.find((item) => item.cartItemId === cartItemId);

    setSelectedItems((prev) => {
      const exists = prev.some((item) => item.cartItemId === cartItemId);
      let updatedItems;
      if (exists) {
        updatedItems = prev.filter((item) => item.cartItemId !== cartItemId);
      } else {
        updatedItems = [
          ...prev,
          {
            cartItemId: targetItem.cartItemId,
            variantId: targetItem.variantId,
            quantity: targetItem.quantity,
            price: targetItem.price,
          },
        ];
      }
      localStorage.setItem("selectedItems", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("vi-VN").format(amount) + " đ";

  const getTotalPrice = () =>
    selectedItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

  const columns = [
    {
      title: "",
      dataIndex: "select",
      key: "select",
      render: (_, record) => (
        <Checkbox
          checked={selectedItems.some(
            (item) => item.cartItemId === record.cartItemId
          )}
          onChange={() => handleSelectItem(record.cartItemId)}
        />
      ),
      width: 50,
    },
    {
      title: "Sản phẩm",
      key: "product",
      render: (_, record) => (
        <div className="cart-item">
          <img
            src={record.productAvatarImage}
            alt={record.productName}
            className="cart-item-image"
          />
          <div className="cart-item-info">
            <p className="product-name">{record.productName}</p>
            <DeleteOutlined
              className="remove-button"
              onClick={() => handleRemoveItem(record.cartItemId)}
            />
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
      key: "subtotal",
      render: (_, record) => (
        <span className="subtotal">
          {formatCurrency(record.price * record.quantity)}
        </span>
      ),
    },
  ];

  useEffect(() => {
    if (userId) fetchCartItems();
  }, [userId]);

  useEffect(() => {
    cartLenght.set(cartItems.length);
    localStorage.setItem("cartItemsLength", cartItems.length);
  }, [cartItems.length]);
  const handleSubmit = () => {
    const orderData = {
      id: userId,
      totalAmount: getTotalPrice(),
      finalAmount: getTotalPrice(),
      items: selectedItems.map(({ variantId, quantity }) => ({
        variantId,
        quantity,
      })),
    };
  
    APICreateOrder(orderData)
      .then((rs) => {
        console.log(rs,'check');
        if (rs.status === 200) {
          message.success("Vui lòng làm theo hướng dẫn!");
          localStorage.removeItem("selectedItems");
          setSelectedItems([]);
          localStorage.setItem("orderId", rs.data.orderId)
          navigate("/checkout")
          console.log(rs.data.orderId , "rs.data.orderId");
          console.log(rs);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
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
        <div className="cart-item-checkout">
          <h2>Thông tin đơn hàng</h2>
          <div className="cart-detail">
            <p>
              Tổng sản phẩm đã chọn <span>{selectedItems.length}</span>
            </p>
            <p>
              Tạm tính{" "}
              <span className="bold">{formatCurrency(getTotalPrice())}</span>
            </p>
            <hr />
            <p className="total">
              Tổng thanh toán <span>{formatCurrency(getTotalPrice())}</span>
            </p>
            <p className="vat-note">(Đã bao gồm VAT)</p>
          </div>
        </div>
        <Button
          type="primary"
          block
          size="large"
          className="checkout-button"
          disabled={selectedItems.length === 0}
          onClick={handleSubmit}
        >
          Đặt hàng
        </Button>
      </Card>
    </div>
  );
};

export default CartPage;
