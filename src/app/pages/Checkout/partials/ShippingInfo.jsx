import { Button, Col, Form, Input, List, message, Radio, Row } from "antd";
import React, { useEffect, useState } from "react";
import {
  APICreateShippingInfo,
  APIDeleteShippingInfo,
  APIGetShippingInfosByUserId,
  APISetDefaultShippingInfo,
  APIUpdateShippingInfo,
} from "../../../api/api";

const ShippingInfo = () => {
  const [form] = Form.useForm();
  const [shippingInfos, setShippingInfos] = useState([]);
  const [userId, setUserId] = useState(null);
  const [editingShippingInfo, setEditingShippingInfo] = useState(null);

  useEffect(() => {
    const userIdFromStorage = localStorage.getItem("userID");
    if (!userIdFromStorage) {
      message.error("Không tìm thấy userId trong localStorage.");
      return;
    }
    setUserId(userIdFromStorage);
    fetchShippingInfos(userIdFromStorage);
  }, []);

  const fetchShippingInfos = async (userId) => {
    try {
      const res = await APIGetShippingInfosByUserId(userId);
      setShippingInfos(res.data.data);
    } catch {
      message.error("Không thể lấy danh sách địa chỉ.");
    }
  };

  const handleFinish = async (values) => {
    if (!userId) return message.error("Không tìm thấy userId. Vui lòng đăng nhập lại.");

    const payload = {
      addressType: values.addressType,
      lastName: values.lastName,
      firstName: values.firstName,
      shippingPhoneNumber: values.phoneNumber,
      province: values.province,
      district: values.district,
      commune: values.commune,
      addressDetail: values.address,
      shippingNote: values.note || "",
    };

    try {
      if (editingShippingInfo) {
        await APIUpdateShippingInfo(editingShippingInfo.shippingInfoId, payload);
        message.success("Cập nhật địa chỉ thành công!");
      } else {
        await APICreateShippingInfo({ id: userId, ...payload });
        message.success("Thêm địa chỉ thành công!");
      }
      await fetchShippingInfos(userId);
      resetForm();
    } catch {
      message.error("Có lỗi xảy ra khi thêm/cập nhật địa chỉ.");
    }
  };

  const handleDelete = async (shippingInfoId) => {
    try {
      await APIDeleteShippingInfo(shippingInfoId);
      message.success("Xóa địa chỉ thành công!");
      fetchShippingInfos(userId);
    } catch {
      message.error("Có lỗi xảy ra khi xóa địa chỉ.");
    }
  };

  const handleSetDefault = async (shippingInfoId) => {
    try {
      await APISetDefaultShippingInfo(userId, shippingInfoId);
      message.success("Đặt địa chỉ mặc định thành công!");
      fetchShippingInfos(userId);
    } catch {
      message.error("Có lỗi xảy ra khi đặt địa chỉ mặc định.");
    }
  };

  const handleEdit = (shippingInfo) => {
    setEditingShippingInfo(shippingInfo);
    form.setFieldsValue({
      addressType: shippingInfo.addressType,
      lastName: shippingInfo.lastName,
      firstName: shippingInfo.firstName,
      phoneNumber: shippingInfo.shippingPhoneNumber,
      province: shippingInfo.province,
      district: shippingInfo.district,
      commune: shippingInfo.commune,
      address: shippingInfo.addressDetail,
      note: shippingInfo.shippingNote,
    });
  };

  const resetForm = () => {
    form.resetFields();
    setEditingShippingInfo(null);
  };

  return (
    <div className="shipping-info">
      <div className="custom-card">
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item
            label="Loại địa chỉ"
            name="addressType"
            rules={[{ required: true, message: "Vui lòng chọn loại địa chỉ!" }]}
          >
            <Radio.Group>
              <Radio value="home">Nhà riêng</Radio>
              <Radio value="company">Công ty</Radio>
            </Radio.Group>
          </Form.Item>

          <Row gutter={16}>
            {[
              { label: "Họ", name: "lastName", placeholder: "Họ của bạn" },
              { label: "Tên", name: "firstName", placeholder: "Tên của bạn" },
            ].map((field) => (
              <Col span={12} key={field.name}>
                <Form.Item
                  label={field.label}
                  name={field.name}
                  rules={[{ required: true, message: `Vui lòng nhập ${field.label.toLowerCase()}!` }]}
                >
                  <Input placeholder={field.placeholder} />
                </Form.Item>
              </Col>
            ))}
          </Row>

          <Form.Item
            label="Số điện thoại"
            name="phoneNumber"
            rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
          >
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>

          <Row gutter={16}>
            {[
              { label: "Tỉnh/Thành phố", name: "province" },
              { label: "Quận/Huyện", name: "district" },
            ].map((field) => (
              <Col span={12} key={field.name}>
                <Form.Item
                  label={field.label}
                  name={field.name}
                  rules={[{ required: true, message: `Vui lòng nhập ${field.label}!` }]}
                >
                  <Input placeholder={`Nhập ${field.label}`} />
                </Form.Item>
              </Col>
            ))}
          </Row>

          <Form.Item
            label="Xã/Phường"
            name="commune"
            rules={[{ required: true, message: "Vui lòng nhập Xã/Phường!" }]}
          >
            <Input placeholder="Nhập Xã/Phường" />
          </Form.Item>

          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ chi tiết!" }]}
          >
            <Input placeholder="Nhập số nhà, tên đường, tòa nhà..." />
          </Form.Item>

          <Form.Item label="Ghi chú đơn hàng" name="note">
            <Input.TextArea rows={2} placeholder="(Tùy chọn) Ghi chú thêm" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingShippingInfo ? "Cập nhật địa chỉ" : "Thêm địa chỉ"}
            </Button>
            {editingShippingInfo && (
              <Button style={{ marginLeft: 8 }} onClick={resetForm}>
                Hủy chỉnh sửa
              </Button>
            )}
          </Form.Item>
        </Form>
      </div>

      <div className="shipping-list">
        <List
          dataSource={shippingInfos}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button onClick={() => handleEdit(item)}>Chỉnh sửa</Button>,
                <Button onClick={() => handleSetDefault(item.shippingInfoId)}>
                  Đặt mặc định
                </Button>,
                <Button danger onClick={() => handleDelete(item.shippingInfoId)}>
                  Xóa
                </Button>,
              ]}
            >
              <List.Item.Meta
                title={`${item.firstName} ${item.lastName}`}
                description={`${item.addressDetail}, ${item.commune}, ${item.district}, ${item.province}`}
              />
              {item.defaultAddress && <span>(Mặc định)</span>}
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default ShippingInfo;
