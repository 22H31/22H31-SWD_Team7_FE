import { useEffect, useState } from "react";
import "./CartItem.css";
import { APIOrderOrderId } from "../../../api/api";
import { message } from "antd";
import { finalTotal } from "../../../globalVariable/cart";

const CartItem = () => {
  const [cart, setCart] = useState([]);
  const [finalAmount, setFinalAmount] = useState(0);
  const [shippingFee, setshippingFee] = useState(0);
  const orderId = localStorage.getItem("orderId");

  useEffect(() => {
    if (!orderId) {
      message.error("Không tìm thấy ID đơn hàng!");
      return;
    }
    APIOrderOrderId(orderId)
      .then((rs) => {
        const res = rs.data.data;
        setshippingFee(res.shippingFee);
        localStorage.setItem("shippingFee", res.shippingFee);
        setCart(res.orderDetails || []);
        setFinalAmount(res.finalAmount || 0);
      })
      .catch(() => {
        message.error("Lỗi khi lấy dữ liệu đơn hàng!");
      });
  }, [orderId]);
  const promotion = Number(localStorage.getItem("promotion")) || 0;
  finalTotal.set(finalAmount + shippingFee - promotion)
  const total = Number(finalAmount + shippingFee - promotion);
  localStorage.setItem("total", total);
  return (
    <div className="cart-item-checkout">
      <h2>Thông tin đơn hàng</h2>
      <div className="cart-detail">
        <p>
          Tổng sản phẩm đã chọn <span>{cart.length}</span>
        </p>
        <p>
          Tạm tính{" "}
          <span className="bold"> {finalAmount.toLocaleString()} VND </span>
        </p>
        <p>
          Mã giảm giá <span> {promotion.toLocaleString()} VND</span>
        </p>
        <p>
          Phí giao hàng <span>{shippingFee.toLocaleString()} VND</span>
        </p>
        <hr />
        <p className="total">
          Tổng thanh toán <span> {total.toLocaleString()} VND đ</span>
        </p>
        <p className="vat-note">(Đã bao gồm VAT)</p>
      </div>
    </div>
  );
};

export default CartItem;
