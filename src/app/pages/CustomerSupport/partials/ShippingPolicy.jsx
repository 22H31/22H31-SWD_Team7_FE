// import React from "react";
import "./ShippingPolicy.css";

const ShippingPolicy = () => {
  return (
    <div className="shipping-policy-container">
      <h2 className="shipping-title">Chính sách giao hàng</h2>
      <div className="shipping-table">
        <div className="table-header">
          <span className="header-item">Giá trị đơn hàng</span>
          <span className="header-item">Phí giao hàng</span>
        </div>
        <div className="table-row">
          <span className="row-item">{">"}=100.000đ</span>
          <span className="row-item">Miễn phí giao</span>
        </div>
        <div className="table-row">
          <span className="row-item">&lt; 100.000đ</span>
          <span className="row-item">15.000đ/đơn</span>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;