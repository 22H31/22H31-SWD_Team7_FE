import React from "react";
import { Card } from "antd";

const PaymentStatusPage = ({ paymentInfo }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Card title="Trạng thái thanh toán" style={{ width: 400, textAlign: "center" }}>
        <h2>{paymentInfo?.status || "Không có thông tin"}</h2>
      </Card>
    </div>
  );
};

export default PaymentStatusPage;
