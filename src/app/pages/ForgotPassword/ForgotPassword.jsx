// import React from "react";
import { MailOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import PageLayOut from "../../layouts/PageLayOut/PageLayOut";
import { Button, Form, Input, message } from "antd";
import { APIForgotpass } from "../../api/api";
import { useState } from "react";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = (user) => {
    APIForgotpass(user)
      .then((rs) => {
        console.log("Response từ API:", rs);
        if (rs.status === 200) {
          message.success("Kiểm tra email!")
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error("Lỗi đăng ký:", error);
        console.log(
          "Chi tiết lỗi:",
          error.response?.data || "Không có dữ liệu lỗi"
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <PageLayOut>
      <div className="forgot-password-mid" style={{marginTop: "80px"}}>
        <Form className="forgot-password" onFinish={onFinish}>
          <h1
            style={{
              color: "#44353f",
              textAlign: "center",
              fontSize: "25px",
              marginBottom: "20px",
            }}
          >
            QUÊN MẬT KHẨU
          </h1>

          <p style={{ textAlign: "center", marginBottom: "20px" }}>
            Nhập email bạn đã sử dụng để tạo tài khoản của mình, chúng tôi sẽ
            gửi cho bạn hướng dẫn để đặt lại mật khẩu.
          </p>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập Email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input  style={{
                height: "50px",
                borderRadius: "10px",
              }} prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item style={{ display: "flex", justifyContent: "center" }}>
            <Button
              block
              style={{
                backgroundColor: "#C0437F",
                color: "white",
                height: "45px",
                width: "400px",
                borderRadius: "10px",
              }}
              htmlType="submit"
            >
              Gửi Email
            </Button>
          </Form.Item>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Button
              type="dashed"
              block
              style={{
                height: "40px",
                width: "400px",
                borderRadius: "10px",
              }}
              onClick={() => {
                navigate("/login");
              }}
            >
              Back to Login
            </Button>
          </div>
        </Form>
      </div>
    </PageLayOut>
  );
}
