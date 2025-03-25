import { useState, useCallback, useEffect } from "react";
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
import { APIPayment, APIUpdateVoucherPromotion } from "../../api/api";

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

  const promotion = Number(localStorage.getItem("promotion"));
  const shippingFee = Number(localStorage.getItem("shippingFee"));
  const orderId = localStorage.getItem("orderId");
  const total = Number(localStorage.getItem("total"));
  const discountCode = localStorage.getItem("discountCode");
  const promotionId = localStorage.getItem("promotionId");
  const handleCheckout = () => {
    const data = {
      promotionId: promotionId,
      voucherId: "",
      voucherFee: 0,
      promotionCode: discountCode || "",
      promotionFee: promotion || 0,
      finalAmount: total,
      shippingFee: shippingFee,
    };
    APIUpdateVoucherPromotion(orderId, data).then((rs) => {
      if (rs.data.success) {
        console.log(rs,'1');
        APIPayment(orderId)
          .then((rs) => {
            if (rs.status === 200) {
              const Url = rs.data.paymentUrl
              console.log(rs,"rs2");
              window.location.href = Url
              // console.log("oki", Url);
            }
          })
          // .finally(() => {
          //   localStorage.removeItem("promotion");
          //   localStorage.removeItem("shippingFee");
          //   localStorage.removeItem("orderId");
          //   localStorage.removeItem("total");
          //   localStorage.removeItem("discountCode");
          //   localStorage.removeItem("promotionId");
          // });
      }
    });
  };
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
            <CartItem />
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
