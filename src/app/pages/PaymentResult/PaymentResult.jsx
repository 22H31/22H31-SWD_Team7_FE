import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useLocation, useNavigate } from "react-router";
import PageLayOut from "../../layouts/PageLayOut/PageLayOut";
import { Alert, Button, Card, Result, Spin, Tag } from "antd";

function PaymentCallback() {
  const location = useLocation();
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
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
    console.log(paymentInfo, "paymentInfo");
  }, [location]);

  return (
    <PageLayOut>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // height: "100vh",
        }}
      >
        {paymentInfo ? (
          <Result
            status={paymentInfo.status === "success" ? "success" : "warning"}
            title={
              paymentInfo.status === "success"
                ? "Thanh Toán Thành Công!"
                : "Thanh Toán Thất Bại"
            }
            subTitle={paymentInfo.message}
            extra={[
              <>
                {" "}
                <Button type="primary" onClick={() => navigate("/cart")}>
                  Quay lại giỏ hàng
                </Button>
              </>,
            ]}
          />
        ) : (
          <div>
            {error ? (
              <Alert message={error} type="error" showIcon />
            ) : (
              <Spin tip="Processing payment..." size="large" />
            )}
          </div>
        )}
      </div>
    </PageLayOut>
  );
}

export default PaymentCallback;
