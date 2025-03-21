import React from "react";
import "./PageNotFound.css";
import { useNavigate } from "react-router-dom";
import { Button, Result } from "antd";
export default function Page401() {
  const navigate = useNavigate();
  return (
    <div style={{ flex: 1, marginTop: "120px" }}>
      <Result
        status="500"
        title="401"
        subTitle="Bạn không có quyền truy cập trang Wed này."
        extra={
          <Button
            type="primary"
            onClick={() => {
              const Role = localStorage.getItem("Role");
              Role === "Staff" || Role === "StaffSale" ? navigate("/admin") :
              navigate("/");
            }}
          >
            Back Home
          </Button>
        }
      />
    </div>
  );
}
