import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Flex } from "antd";
import { useNavigate } from "react-router-dom";
import PageLayOut from "../../layouts/PageLayOut/PageLayOut";
import { APIlogin } from "../../api/api";
import { SSpin } from "../../globalVariable/spin";

export default function Login() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  
  
  const onFinish = (user) => {
    SSpin.set(true)
    APIlogin(user.username, user.password)
      .then((rs) => {
        if (rs?.status === 200) {
          console.log(user,"1");
          console.log(rs.data.email,"tw");
          console.log(rs.data.jwtToken);
          localStorage.setItem("token",rs.data.jwtToken); // Lưu token vào localStorage
          localStorage.setItem("user", JSON.stringify(rs.data));
          localStorage.setItem("userID", rs.data.id);
          // localStorage.setItem("user", JSON.stringify({ email: "test@example.com", firstName: "A", lastName: "B" }));
          console.log(localStorage.getItem("user"));
          console.log(localStorage.getItem("userID"));
          console.log(localStorage.getItem("token"));
        
          // const information = JSON.parse(localStorage.getItem("user"));
          navigate("/");
          // if (user) {
          
          //   console.log("Email:", information.email);
          // }
        }
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        setErrorMessage(error.response?.data?.message || "Có lỗi xảy ra!");
      })
      .finally(() => {
        SSpin.set(false)
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
