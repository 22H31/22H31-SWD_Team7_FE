import React from "react";
import { MailOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import PageLayOut from "../../layouts/PageLayOut/PageLayOut";
import { Button, Form, Input } from "antd";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <PageLayOut>
      <div className="forgot-password-mid">
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
