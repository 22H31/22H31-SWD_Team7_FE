import { Button, Form, Input, message } from "antd";
import React, { useState } from "react";
import { APIChangePassword } from "../../api/api";

export default function ChangePassword() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = (user) => {
    setIsLoading(true); // Bật trạng thái loading
  console.log('1');
    APIChangePassword(user.oldPassword, user.currentPassword, user.confirmPassword)
      .then((rs) => {
        console.log(user);
        if (rs?.status === 200) {
          // message.success("Đổi mật khẩu thành công!"); // Thông báo thành công
          console.log("Mật khẩu đã được thay đổi:", rs.data);
        }
      })
      .catch((error) => {
        console.error("Lỗi khi đổi mật khẩu:", error);
        setErrorMessage(error.response?.data?.message || "Có lỗi xảy ra!");
      })
      .finally(() => {
        setIsLoading(false); // Tắt loading
      });
   
  };
  return (
    <>
      <div style={{ margin: "10px" }}>
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item
            name="oldPassword"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu cũ!" }]}
          >
            <Input size="large" placeholder="Mật khẩu cũ" />
          </Form.Item>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "16px",
            }}
          >
            <Form.Item
              style={{ flex: 1 }}
              name="currentPassword"
              rules={[{ required: true, message: "Vui lòng nhập Mật khẩu!" }]}
            >
              <Input
                size="large"
                // type="password"
                placeholder="Mật khẩu"
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item
              style={{ flex: 1 }}
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Vui lòng xác nhận Mật khẩu!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("currentPassword") === value) {
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
                size="large"
                style={{ width: "100%" }}
                // type="password"
                placeholder="Xác nhận Mật khẩu"
              />
            </Form.Item>
            {/* <Form.Item  style={{ flex: 1 }}>
              <Input size='large'
                placeholder="Mật khẩu mới"
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item style={{ flex: 1 }}>
              <Input size='large'
                placeholder="Xác nhận mật khẩu mới"
                style={{ width: "100%" }}
              />
            </Form.Item> */}
          </div>

          <Form.Item style={{ display: "flex", justifyContent: "left" }}>
            <Button
              block
              style={{
                backgroundColor: "#C0437F",
                color: "white",
                height: "40px",
                width: "200px",
                borderRadius: "10px",
              }}
              htmlType="submit"
            >
              Lưu
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
