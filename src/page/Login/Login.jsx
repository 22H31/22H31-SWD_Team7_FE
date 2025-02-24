import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Flex } from "antd";
import { useNavigate } from "react-router";
import PageLayOut from "../../layouts/PageLayOut/PageLayOut";

export default function Login({chirldren}) {
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <> <PageLayOut>
      <div className="login-mid">
          <Form
            className="login"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <h1
              style={{
                color: " #44353f",
                textAlign: "center",
                fontSize: "25px",
                marginBottom: "20px",
              }}
            >
              ĐĂNG NHẬP
            </h1>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!",
                },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item style={{ display: "flex", justifyContent: "center" }}>
              <Button
                block
                style={{
                  backgroundColor: "#C0437F",
                  alignItems: "center",
                  color: "white",
                  height: "45px",
                  width: "400px",
                  borderRadius: "10px",
                }}
                htmlType="submit"
              >
                Đăng Nhập
              </Button>
            </Form.Item>
            <Form.Item>
              <Flex justify="space-between" align="center">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Ghi nhớ mật khẩu</Checkbox>
                </Form.Item>
                <a href="" style={{ color: "#C0437F" }}>
                  Quên mật khẩu ?
                </a>
              </Flex>
            </Form.Item>
          </Form>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
                width: "100%",
                margin: "10px 0",
              }}
            >
              <div
                style={{ flex: 1, height: "1px", backgroundColor: "gray" }}
              ></div>
              <span
                style={{ padding: "0 10px", color: "gray", fontWeight: "bold" }}
              >
                HOẶC
              </span>
              <div
                style={{ flex: 1, height: "1px", backgroundColor: "gray" }}
              ></div>
            </div>
            <p>
              Bạn chưa có tài khoản ?{" "}
              <a
                style={{ textAlign: "center", color: "#C0437F" }}
                onClick={() => navigate(`/Register`)}
              >
                Đăng ký
              </a>
            </p>
          </div>
        </div>
    </PageLayOut>
        
    </>
  );
}
