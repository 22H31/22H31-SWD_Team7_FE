import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Flex } from "antd";
import { useNavigate } from "react-router-dom";
import PageLayOut from "../../layouts/PageLayOut/PageLayOut";
import { APIlogin } from "../../api/api";

export default function Login() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = (user) => {
    setIsLoading(true);
    console.log("0");
    APIlogin(user.username, user.password)
    .then((rs) => {
      console.log("1");
      if (rs?.status === 200) {
        navigate("/");
        console.log("2");
      }
    })
    .catch((error) => {
      console.error("Error logging in:", error);
      setErrorMessage(error.response?.data?.message || "Có lỗi xảy ra!");
    })
    .finally(() => {
      setIsLoading(false);
    });
  
  };

  return (
    <PageLayOut>
      <div className="login-mid" style={{ marginTop: "80px" }}>
        <Form className="login" initialValues={{ remember: true }} onFinish={onFinish}>
          <h1 style={{ color: "#44353f", textAlign: "center", fontSize: "25px", marginBottom: "20px" }}>
            ĐĂNG NHẬP
          </h1>

          {errorMessage && (
            <p style={{ color: "red", textAlign: "center", marginBottom: "10px" }}>
              {errorMessage}
            </p>
          )}

          <Form.Item
            name="username"
            rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Tên đăng nhập" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input prefix={<LockOutlined />} type="password" placeholder="Mật khẩu" />
          </Form.Item>

          <Form.Item style={{ display: "flex", justifyContent: "center" }}>
            <Button
              block
              type="primary"
              htmlType="submit"
              loading={isLoading}
              style={{
                backgroundColor: "#C0437F",
                color: "white",
                height: "45px",
                width: "400px",
                borderRadius: "10px",
              }}
            >
              Đăng Nhập
            </Button>
          </Form.Item>

          <Form.Item>
            <Flex justify="space-between" align="center">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Ghi nhớ mật khẩu</Checkbox>
              </Form.Item>
              <a onClick={() => navigate(`/forgotPassword`)} style={{ color: "#C0437F" }}>
                Quên mật khẩu?
              </a>
            </Flex>
          </Form.Item>
        </Form>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", textAlign: "center", width: "100%", margin: "10px 0" }}>
            <div style={{ flex: 1, height: "1px", backgroundColor: "gray" }}></div>
            <span style={{ padding: "0 10px", color: "gray", fontWeight: "bold" }}>HOẶC</span>
            <div style={{ flex: 1, height: "1px", backgroundColor: "gray" }}></div>
          </div>
          <p>
            Bạn chưa có tài khoản?{" "}
            <a style={{ textAlign: "center", color: "#C0437F" }} onClick={() => navigate(`/register`)}>
              Đăng ký
            </a>
          </p>
        </div>
      </div>
    </PageLayOut>
  );
}
