import { Button, Form, Input, message } from "antd";
import React, { useState } from "react";
import { APIGetInformation } from "../../api/api";

export default function ProfileInfo() {
  const [information, setInformation] = useState([]);

  const onFinish = () => {
    APIGetInformation()
      .then((rs) => {
        console.log(rs.data);
        if (rs.status === 200) {
          setInformation(rs.data); // Cập nhật state đúng cách
        }
      })
      .catch((error) => {
        console.log("Lỗi:", error);
        message.error(error.response?.data?.message || "Có lỗi xảy ra");
      });
  };

  return (
    <>
      <div style={{ margin: "10px" }}>
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item label="Email:">
            <Input placeholder="Email" value={information.email || "chưa có API"} />
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
                value={information.name || "chưa có API"}
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item label="Tên:" style={{ flex: 1 }}>
              <Input
                placeholder="Tên"
                value={information.firstName || "chưa có API"}
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
