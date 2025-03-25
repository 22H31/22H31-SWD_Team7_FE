import classNames from "classnames/bind";
import { useState } from "react";
import { requestNormal } from "../../models/request";

import styles from "./vnPay.module.scss";

const cx = classNames.bind(styles);

function VnPay() {
  const [orderType, setOrderType] = useState("");
  const [amount, setAmount] = useState(1);
  const [orderDescription, setOrderDescription] = useState("");
  const [name, setName] = useState("");
  const fetchUsers = async () => {
    try {
      const response = await requestNormal.post(
        "/api/payment/vnpay",
        JSON.stringify({ orderType, amount, orderDescription, name })
      );
      console.log(response);
      const paymentUrl = response.data.paymentUrl;
      window.location.href = paymentUrl; // Trả về dữ liệu từ API
    } catch (error) {
      console.error("Có lỗi khi gọi API:", error);
      throw error; // Hoặc có thể xử lý lỗi tùy ý
    }
  }
  return (
    <div>
      <label htmlFor="order-type">Order Type</label>
      <input
        id="order-type"
        type="text"
        value={orderType}
        onChange={(e) => {
          setOrderType(e.target.value);
        }}
      />
      <label htmlFor="amount">Amount</label>
      <input
        id="amount"
        type="number"
        value={amount}
        onChange={(e) => {
          setAmount(e.target.value);
        }}
      />
      <label htmlFor="dsc">Description</label>
      <input
        id="dsc"
        type="text"
        value={orderDescription}
        onChange={(e) => {
            setOrderDescription(e.target.value);
        }}
      />
      <label htmlFor="name" value={name}>
        Name
      </label>
      <input
        id="name"
        type="text"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <button onClick={fetchUsers}>Submit</button>
    </div>
  );
}

export default VnPay;
