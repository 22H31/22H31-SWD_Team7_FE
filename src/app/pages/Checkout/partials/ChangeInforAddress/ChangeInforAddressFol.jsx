import React, { useEffect, useState } from "react";
import { Select, Input, Button, message, Form, Checkbox } from "antd";
import vietnamAddress from "../../../../../Json/vietnamAddress.json";
import { SSpin } from "../../../../globalVariable/spin";
import { APIUpdateShippingInfo } from "../../../../api/api";

export default function ChangeInforAddressFol({ addressData, onClose }) {
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const [form] = Form.useForm();
  const provinces = vietnamAddress || [];

  useEffect(() => {
    if (addressData?.data) {
      const { data } = addressData;
      form.setFieldsValue({
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        phone: data.shippingPhoneNumber || "",
        addressDetail: data.addressDetail || "",
        isDefault: data.isDefault || false,
      });

      const province = provinces.find((p) => p.Name === data.province);
      if (province) {
        setSelectedProvince(province);
        form.setFieldsValue({ province: province.Id });

        const district = province.Districts.find((d) => d.Name === data.district);
        if (district) {
          setSelectedDistrict(district);
          form.setFieldsValue({ district: district.Id });

          const ward = district.Wards.find((w) => w.Name === data.commune);
          if (ward) {
            setSelectedWard(ward);
            form.setFieldsValue({ ward: ward.Id });
          }
        }
      }
    }
  }, [addressData, provinces, form]);

  const handleProvinceChange = (value) => {
    const province = provinces.find((p) => p.Id === value);
    setSelectedProvince(province);
    setSelectedDistrict(null);
    setSelectedWard(null);
    form.resetFields(["district", "ward"]);
  };

  const handleDistrictChange = (value) => {
    const district = selectedProvince?.Districts.find((d) => d.Id === value);
    setSelectedDistrict(district);
    setSelectedWard(null);
    form.resetFields(["ward"]);
  };

  const handleWardChange = (value) => {
    const ward = selectedDistrict?.Wards.find((w) => w.Id === value);
    setSelectedWard(ward);
  };

  const handleClose = () => onClose?.(false);

  const onFinish = async (values) => {
    const shippingInfoIdData = addressData?.data?.shippingInfoId;
  
    if (!shippingInfoIdData) {
      return message.error("Lỗi dữ liệu địa chỉ!");
    }
    if (!selectedProvince || !selectedDistrict || !selectedWard) {
      return message.error("Vui lòng chọn đầy đủ địa chỉ!");
    }
  
    const data = {
      addressType: "Home",
      firstName: values?.firstName,
      lastName: values?.lastName,
      shippingPhoneNumber: values?.phone,
      province: selectedProvince?.Name,
      district: selectedDistrict?.Name,
      commune: selectedWard?.Name,
      addressDetail: values?.addressDetail,
      shippingNote: "Delivery before 6 PM",
    };
  
    console.log("Payload being sent:", data); // Debug log
  
    try {
      SSpin.set(true);
      const response = await APIUpdateShippingInfo(shippingInfoIdData, data);
      console.log("API Response:", response); // Debug log
  
      if (response?.status === 200) {
        message.success("Cập nhật thành công!");
        onClose?.(true);
      } else {
        throw new Error(response?.message || "Có lỗi xảy ra!");
      }
    } catch (error) {
      console.error("Error updating address:", error); // Debug log
      message.error(error.message || "Có lỗi xảy ra khi cập nhật địa chỉ!");
    } finally {
      SSpin.set(false);
    }
  };
  

  return (
    <div className="modal-container">
      <Form form={form} onFinish={onFinish} layout="vertical">
        <div style={{ display: "flex", gap: "10px" }}>
          <Form.Item
            name="firstName"
            label="Họ"
            rules={[{ required: true, message: "Vui lòng nhập họ!" }]}
          >
            <Input placeholder="Nhập họ" />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Tên"
            rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
          >
            <Input placeholder="Nhập tên" />
          </Form.Item>
        </div>

        <Form.Item
          name="phone"
          label="Số điện thoại"
          rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
        >
          <Input placeholder="Nhập số điện thoại" />
        </Form.Item>

        <Form.Item
          name="province"
          label="Tỉnh / Thành phố"
          rules={[{ required: true, message: "Vui lòng chọn tỉnh / thành phố!" }]}
        >
          <Select
            onChange={handleProvinceChange}
            placeholder="Chọn tỉnh / thành phố"
            loading={!provinces.length}
          >
            {provinces.map((province) => (
              <Select.Option key={province.Id} value={province.Id}>
                {province.Name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="district"
          label="Quận / Huyện"
          rules={[{ required: true, message: "Vui lòng chọn quận / huyện!" }]}
        >
          <Select
            onChange={handleDistrictChange}
            placeholder="Chọn quận / huyện"
            disabled={!selectedProvince}
          >
            {selectedProvince?.Districts?.map((district) => (
              <Select.Option key={district.Id} value={district.Id}>
                {district.Name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="ward"
          label="Phường / Xã"
          rules={[{ required: true, message: "Vui lòng chọn phường / xã!" }]}
        >
          <Select
            onChange={handleWardChange}
            placeholder="Chọn phường / xã"
            disabled={!selectedDistrict}
          >
            {selectedDistrict?.Wards?.map((ward) => (
              <Select.Option key={ward.Id} value={ward.Id}>
                {ward.Name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="addressDetail"
          label="Địa chỉ cụ thể"
          rules={[{ required: true, message: "Vui lòng nhập địa chỉ cụ thể!" }]}
        >
          <Input.TextArea placeholder="Nhập địa chỉ cụ thể" rows={3} />
        </Form.Item>

        <Form.Item name="isDefault" valuePropName="checked">
          <Checkbox>Đặt làm địa chỉ mặc định</Checkbox>
        </Form.Item>

        <Form.Item>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
            <Button onClick={handleClose}>Hủy</Button>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                backgroundColor: "#C0437F",
                width: "150px",
              }}
            >
              Xác nhận
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}
