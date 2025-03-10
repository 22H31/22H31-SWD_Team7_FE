import { Button, Form, Input, message } from "antd";
import React, { useEffect, useState } from "react";

export default function ProfileInfo() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser); // Chuyển từ chuỗi JSON về object
        setUser(parsedUser);
        console.log(user.email);
        console.log(user.phoneNumber); // Lấy số điện thoại
      } catch (error) {
        console.error("Lỗi khi parse dữ liệu user:", error);
      }
    }
  }, []);
  
  return (
    <div style={{ margin: "10px" }}>
      <Form layout="vertical">
        <Form.Item label="Email:">
          <Input 
            placeholder="Email" 
            value={user?.email || "Chưa có API"} // Dùng optional chaining để tránh lỗi
            readOnly 
          />
        </Form.Item>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          <Form.Item label="Tên:" style={{ flex: 1 }}>
            <Input 
              placeholder="Tên" 
              value={user?.name || "Chưa có API"} 
              readOnly 
            />
          </Form.Item>

          <Form.Item label="Số điện thoai:" style={{ flex: 1 }}>
            <Input 
              placeholder="Số điện thoai" 
              value={user?.phoneNumber  || "Chưa có API"} 
              readOnly 
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
            onClick={() => message.info("Chức năng lưu chưa được xử lý!")}
          >
            Lưu
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
