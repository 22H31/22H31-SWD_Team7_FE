import { Button, Form, Input } from "antd";
import React from "react";

export default function ChangePassword() {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
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
              name="password"
              rules={[{ required: true, message: "Vui lòng nhập Mật khẩu!" }]}
            >
              <Input
                size="large"
                type="password"
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
                size="large"
                style={{ width: "100%" }}
                type="password"
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
