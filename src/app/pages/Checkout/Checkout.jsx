import CartLayOut from "../../layouts/CartLayout/CartLayout";
import "./Checkout.css";
import CartItem from "./partials/CartItem";
import CodeDiscount from "./partials/CodeDiscount";
import OrderSummary from "./partials/OrderSummary";
import PaymentMethod from "./partials/PaymentMethod";
import ShippingInfo from "./partials/ShippingInfo";
import { Button } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const navigate = useNavigate();
  const [cartSummary, setCartSummary] = useState({
    totalItems: 0,
    subtotal: 0,
    discount: 0,
    shippingFee: 0,
    total: 0,
  });

  return (
    <CartLayOut>
      <div className="checkout-page">
        <div>
          <h2 className="shipping-title">Thông tin giao hàng</h2>{" "}
          {/* Thêm tiêu đề */}
        </div>
        <div></div>
        <ShippingInfo />
        <OrderSummary onUpdateCartSummary={setCartSummary} />
        <PaymentMethod />
        <div>
          <CodeDiscount />
          <CartItem cartSummary={cartSummary} />
        </div>
        {/* div nay de căn grid */}
        <diV></diV>
        <div className="checkout-button-container">
          <Button
            className="checkout-button"
            onClick={() => navigate("/paymentSuccess")} // Điều hướng tới trang Payment Success
          >
            Thanh Toán
          </Button>
        </div>
      </div>
    </CartLayOut>
  );
}
