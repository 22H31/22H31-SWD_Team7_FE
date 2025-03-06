import { Button, Form, Input } from "antd";
import React from "react";

export default function ProfileInfo() {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  return (
    <>
      <div style={{ margin: "10px" }}>
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item label="Email:">
            <Input placeholder="Email" defaultValue={"chưa có API"} />
          </Form.Item>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "16px",
            }}
          >
            <Form.Item label="Họ:" style={{ flex: 1 }}>
              <Input
                placeholder="Họ"
                defaultValue={"chưa có API"}
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item label="Tên:" style={{ flex: 1 }}>
              <Input
                placeholder="Tên"
                defaultValue={"chưa có API"}
                style={{ width: "100%" }}
              />
            </Form.Item>
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
