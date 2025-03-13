import { Button, Form, Input, message } from "antd";
import React, { useState } from "react";
import { APIChangePassword } from "../../api/api";

export default function ChangePassword() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");
  const onFinish = async (user) => {
    setIsLoading(true);
    console.log(token);

    try {
      
      if (!token) {
        message.error("Bạn chưa đăng nhập!");
        setIsLoading(false);
        return;
      }

      const rs = await APIChangePassword(
        user.currentPassword,
        user.newPassword,
        user.newPasswordConfirmation
      );

      if (rs?.status === 200) {
        console.log(
          "Mật khẩu đã được thay đổi:",
          rs.data || "Không có dữ liệu trả về"
        );
        message.success("Đổi mật khẩu thành công!");
      }
    } catch (error) {
      console.error("Lỗi khi đổi mật khẩu:", error);
      if (error.response?.status === 403) {
        message.error(
          "Bạn không có quyền đổi mật khẩu! Vui lòng đăng nhập lại."
        );
      } else {
        message.error(error.response?.data?.message || "Có lỗi xảy ra!");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div style={{ margin: "10px" }}>
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item
            name="currentPassword"
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
              name="newPassword"
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
              name="newPasswordConfirmation"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Vui lòng xác nhận Mật khẩu!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
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
