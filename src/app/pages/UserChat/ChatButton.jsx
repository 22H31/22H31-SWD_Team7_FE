import React, { useState } from "react";
import { Button, Modal } from "antd";
import { UserOutlined } from '@ant-design/icons';  // Sử dụng MessageOutlined từ Ant Design
import ChatUser from "../UserChat/ChatUser";

const ChatButton = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button
        type="primary"
        shape="circle"
        icon={<UserOutlined />}  // Thêm icon từ Ant Design vào đây
        size="large"
        style={{
          position: "fixed",
          bottom: 1010,  // Điều chỉnh để nhích nút lên
          right: 23,
          zIndex: 1000,
          backgroundColor: "#0084ff", // Màu giống Messenger
          color: "white",
          border: "none",
        }}
        onClick={() => setVisible(true)}
      />

      <Modal
        title="Hỗ Trợ Tư Vấn"
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        width={350}
        style={{
          position: "fixed",
          bottom: 30,
          right: 30,
          borderRadius: "12px", // Bo góc cho modal giống Messenger
        }}
        bodyStyle={{
          padding: "10px",
          borderRadius: "10px",
          height: "400px", // Đặt chiều cao cho popup
          overflowY: "auto", // Thêm thanh cuộn khi cần
        }}
      >
        <ChatUser />
      </Modal>
    </>
  );
};

export default ChatButton;