import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useLocation } from "react-router";

function PaymentCallback() {
  const location = useLocation();
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [error, setError] = useState(null);
  const fetchUsers = async () => {
    const params = new URLSearchParams(window.location.search);
    try {
      const response = await api.get("payment/vnpay", {
        params,
      });
      console.log(response);
      setPaymentInfo(response.data);
      // Trả về dữ liệu từ API
    } catch (error) {
      console.error("Có lỗi khi gọi API:", error);
      throw error; // Hoặc có thể xử lý lỗi tùy ý
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    const txnRef = queryParams.get("vnp_TxnRef");
    const responseCode = queryParams.get("vnp_ResponseCode");
    const amount = queryParams.get("vnp_Amount");
    const orderInfo = queryParams.get("vnp_OrderInfo");

    if (txnRef && responseCode && amount) {
      if (responseCode === "00") {
        setPaymentInfo({
          status: "Payment Successful",
          txnRef,
          amount,
          orderInfo,
        });
      } else {
        setError("Payment failed. Please try again.");
      }
    } else {
      setError("Invalid response from payment gateway.");
    }
  }, [location]);

  return (
    <div>
      {paymentInfo ? (
        <div>
          <h2>{paymentInfo.status}</h2>
          {/* <p>Transaction Ref: {paymentInfo.txnRef}</p> */}
          <p>Message: {paymentInfo.message}</p>
          {/* <p>Order Info: {paymentInfo.orderInfo}</p> */}
        </div>
      ) : (
        <div>{error ? <p>{error}</p> : <h2>Processing payment...</h2>}</div>
      )}
    </div>
  );
}

export default PaymentCallback;
