// import React from "react";
import CartLayOut from "../../layouts/CartLayout/CartLayout";
import "./cart.css";
import CartPage from "./partials/CartPage";

export default function Cart() {
  return (
    <CartLayOut>
      <div className="cart-page">
        <CartPage />
      </div>
    </CartLayOut>
  );
}
