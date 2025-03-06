import React, { useState } from "react";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import PageLayOut from "../../layouts/PageLayOut/PageLayOut";
import { Button, Form, Input, message } from "antd";
import { APIregis } from "../../api/api";

export default function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = (user) => {
  console.log(user);
    // const requestData = {
    //   userName: user.username, // Kiểm tra null/undefined
    //   name: user.name || "", 
    //   email: user.email,
    //   password: user.password,
    //   phoneNumber: user.phoneNumber || "",
    // };
  
    // console.log("Dữ liệu gửi lên API:", JSON.stringify(requestData, null, 2));
  
    APIregis(user)
      .then((rs) => {
        console.log("Response từ API:", rs);
        if (rs.status === 200) {
          message.success("Kiểm tra email và confirm!")
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
      <div className="register-mid" style={{ marginTop: "80px" }}>
        <Form className="register" onFinish={onFinish}>
          <h1
            style={{
              color: "#44353f",
              textAlign: "center",
              fontSize: "25px",
              marginBottom: "20px",
            }}
          >
            ĐĂNG KÝ
          </h1>

          <Form.Item
            name="userName"
            rules={[
              { required: true, message: "Vui lòng nhập Tên đăng nhập!" },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Tên đăng nhập" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Vui lòng nhập Email!" }]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập Mật khẩu!" }]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Mật khẩu"
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Vui lòng xác nhận Mật khẩu!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Mật khẩu xác nhận không khớp!")
                  );
                },
              }),
            ]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Xác nhận Mật khẩu"
            />
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
              Đăng Ký
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
            <p>
              Bạn đã có tài khoản ?{" "}
              <a
                style={{ color: "#C0437F" }}
                onClick={() => navigate(`/login`)}
              >
                Đăng nhập
              </a>
            </p>
          </div>
        </Form>
      </div>
    </PageLayOut>
  );
}
