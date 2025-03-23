import { useState, useCallback } from "react";
import { Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CartLayOut from "../../layouts/CartLayout/CartLayout";
import "./Checkout.css";
import CartItem from "./partials/CartItem";
import OrderSummary from "./partials/OrderSummary";
import PaymentMethod from "./partials/PaymentMethod";
import ShippingInfo from "./partials/ShippingInfo";
import CodeDiscount from "./partials/CodeDiscount";

const Checkout = () => {
  const navigate = useNavigate();
  const [cartSummary, setCartSummary] = useState({
    totalItems: 0,
    subtotal: 0,
    discount: 0,
    shippingFee: 0,
    total: 0,
  });
  const [cartItems, setCartItems] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const token = localStorage.getItem("token");

  // Cập nhật giỏ hàng từ OrderSummary
  const handleUpdateCart = useCallback((updatedCartItems) => {
    setCartItems(updatedCartItems);

    const totalItems = CartItem.length;
    const subtotal = updatedCartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const shippingFee = subtotal > 400000 || subtotal === 0 ? 0 : 15000;
    const total = subtotal + shippingFee;

    setCartSummary({
      totalItems,
      subtotal,
      discount: 0,
      shippingFee,
      total,
    });
  }, []);

  // Lưu phương thức thanh toán & hiển thị thông báo nếu cần
  // const handleSavePaymentMethod = useCallback((paymentMethod) => {
  //   setSelectedPaymentMethod(paymentMethod);

  //   if (paymentMethod === "credit_card" || paymentMethod === "paypal") {
  //     message.info("Chức năng đang được phát triển.");
  //   }
  // }, []);

  // Xử lý thanh toán
  const handleCheckout = useCallback(async () => {
    if (!selectedPaymentMethod) {
      message.warning(
        "Vui lòng chọn phương thức thanh toán trước khi thanh toán."
      );
      return;
    }

    try {
      const paymentData = {
        orderType: "billpayment",
        amount: cartSummary.total,
        orderDescription: "Thanh toán đơn hàng",
        name: "Khách hàng",
      };

      let response;

      switch (selectedPaymentMethod) {
        case "vnpay":
          response = await axios.post(
            "https://swdteam7-hfgrdwa4dfhbe0ga.southeastasia-01.azurewebsites.net/api/payment/vnpay",
            paymentData,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          if (response.data.status === "success") {
            window.location.href = response.data.url;
          } else {
            message.error("Thanh toán VNPay thất bại");
          }
          break;

        case "cod":
          message.success("Đơn hàng sẽ được thanh toán khi nhận hàng.");
          break;

        default:
          // Không cần message cho credit_card và paypal ở đây (đã báo lúc chọn rồi)
          break;
      }
    } catch (error) {
      console.error("Lỗi khi thanh toán:", error);
      message.error("Có lỗi xảy ra khi thanh toán");
    }
  }, [selectedPaymentMethod, cartSummary.total, token]);

  return (
    <CartLayOut>
      <div className="checkout-page">
        <div>
          <h2 className="shipping-title">Thông tin giao hàng</h2>
        </div>
        <div>
          <div>
            <ShippingInfo />
          </div>
          <OrderSummary onUpdateCart={handleUpdateCart} />
          {/* <PaymentMethod onSavePaymentMethod={handleSavePaymentMethod} /> */}
          <div>
            <CodeDiscount />
            <CartItem cartSummary={cartSummary} cartItems={cartItems} />
          </div>
          <div></div>
          <div className="checkout-button-container">
            <Button className="checkout-button" onClick={handleCheckout}>
              Thanh Toán
            </Button>
          </div>
        </div>
        {/* <div></div> */}
      </div>
    </CartLayOut>
  );
};

export default Checkout;
