// import React from "react";
import CartLayOut from "../../layouts/CartLayout/CartLayout";
import "./Checkout.css";
import CartItem from "./partials/CartItem";
import CodeDiscount from "./partials/CodeDiscount";
import OrderSummary from "./partials/OrderSummary";
import PaymentMethod from "./partials/PaymentMethod";
import ShippingInfo from "./partials/ShippingInfo";
import { Button } from "antd";
export default function Checkout() {
  return (
    <CartLayOut>
      <div >
        <div className="checkout-page">
          <ShippingInfo />
          <OrderSummary />
          <PaymentMethod />

          <div>
            <CodeDiscount />
            <CartItem />
          </div>
        </div>
        <div className="checkout-button-container">
          <Button type="primary" className="checkout-button">
            Thanh Toán
          </Button>
        </div>
      </div>
    </CartLayOut>
  );
}
