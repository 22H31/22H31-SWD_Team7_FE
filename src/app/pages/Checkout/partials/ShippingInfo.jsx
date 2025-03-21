import  { useEffect, useState } from "react";
import { Form, Input, Radio, Row, Col, Button, message } from "antd";
import axios from "axios";

const ShippingInfo = () => {
  const [form] = Form.useForm(); // Sử dụng Form của Ant Design
  const [userInfo, setUserInfo] = useState({
    name: "", // Tên người dùng
    phoneNumber: "", // Số điện thoại
    address: "", // Địa chỉ
  });
  const userId = localStorage.getItem("userID"); // Lấy userId từ localStorage
  const token = localStorage.getItem("token"); // Lấy token từ localStorage

  // Hàm lấy thông tin người dùng từ API
  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(
        `https://swdteam7-hfgrdwa4dfhbe0ga.southeastasia-01.azurewebsites.net/api/User/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { name, phoneNumber, address } = response.data;
      setUserInfo({ name, phoneNumber, address }); // Cập nhật state với thông tin người dùng
      form.setFieldsValue({ name, phoneNumber, address }); // Đặt giá trị cho form
    } catch (error) {
      console.error("Lỗi khi lấy thông tin người dùng:", error);
      message.error("Không thể lấy thông tin người dùng.");
    }
  };

  // Hàm xử lý khi nhấn nút "Lưu"
  const handleSave = async () => {
    try {
      const values = await form.validateFields(); // Lấy giá trị từ form
      await axios.put(
        `https://swdteam7-hfgrdwa4dfhbe0ga.southeastasia-01.azurewebsites.net/api/User/${userId}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      message.success("Cập nhật thông tin thành công!");
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin:", error);
      message.error("Cập nhật thông tin thất bại.");
    }
  };

  // Gọi API khi component được render
  useEffect(() => {
    if (userId && token) {
      fetchUserInfo();
    }
  }, [userId, token]);

  return (
    <div className="shipping-info">
      <div className="custom-card">
        <Form form={form} layout="vertical">
          <Form.Item label="Loại địa chỉ">
            <Radio.Group defaultValue="home">
              <Radio value="home">Nhà riêng</Radio>
              <Radio value="company">Công ty</Radio>
            </Radio.Group>
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Tên" name="name" rules={[{ required: true, message: "Vui lòng nhập tên" }]}>
                <Input placeholder="Tên của bạn" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Số điện thoại"
            name="phoneNumber"
            rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
          >
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>

          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
          >
            <Input placeholder="Nhập số nhà, tên đường, tòa nhà..." />
          </Form.Item>

          <Form.Item label="Ghi chú đơn hàng">
            <Input.TextArea rows={2} placeholder="Nhập ghi chú" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              style={{ backgroundColor: "#ff69b4", borderColor: "#ff69b4" }} // Màu hồng
              onClick={handleSave}
            >
              Lưu
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ShippingInfo;