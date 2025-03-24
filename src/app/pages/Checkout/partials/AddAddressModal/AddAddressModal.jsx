import React, { lazy, useState } from "react";
import { Tabs, Select, Input, Button, Checkbox, message, Modal } from "antd";
import vietnamAddress from "../../../../../Json/vietnamAddress.json";
import "./AddAddressModal.css";
import { PlusOutlined } from "@ant-design/icons";
import {
  APICreateShippingInfo,
  APISetDefaultShippingInfo,
} from "../../../../api/api";

const { TabPane } = Tabs;

export default function AddAddressModal() {
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const [address, setAddress] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  // const [DefaultShippingInfo, CheckDefaultShippingInfo] = useState("");
  const [isDefault, setIsDefault] = useState(false);

  const provinces = vietnamAddress || [];

  const handleProvinceChange = (value) => {
    const province = provinces.find((p) => p.Id === value);
    setSelectedProvince(province);
    setSelectedDistrict(null);
    setSelectedWard(null);
  };

  const handleDistrictChange = (value) => {
    const district = selectedProvince?.Districts.find((d) => d.Id === value);
    setSelectedDistrict(district);
    setSelectedWard(null);
  };

  const handleWardChange = (value) => {
    const ward = selectedDistrict?.Wards.find((w) => w.Id === value);
    setSelectedWard(ward);
  };
  const UserId = localStorage.getItem("userID");
  const data = {
    addressType: "Home", // hoặc loại địa chỉ phù hợp
    lastName: LastName, // Lấy họ
    firstName: FirstName, // Lấy tên
    shippingPhoneNumber: phone,
    province: selectedProvince?.Name,
    district: selectedDistrict?.Name,
    commune: selectedWard?.Name,
    addressDetail: address,
    shippingNote: isDefault ? "Default address" : "",
    id: UserId,
  };
  const handleSubmit = () => {
    if (
      !LastName ||
      !FirstName ||
      !phone ||
      !selectedProvince ||
      !selectedDistrict ||
      !selectedWard ||
      !address
    ) {
      message.error("Vui lòng điền đầy đủ thông tin.");
      return;
    }
    const fullAddress = `${FirstName} ${LastName},${phone},${address}, ${selectedWard.Name}, ${selectedDistrict.Name}, ${selectedProvince.Name}`;
    APICreateShippingInfo(data).then((rs) => {
      message.success("Thêm địa chỉ thành công!");
      console.log(rs, "rs");
      // CheckDefaultShippingInfo(rs.data.data.shippingInfoId);
      setIsModalOpenAddAddress(false);
    });

    console.log(`Địa chỉ đã lưu:`, data.id);
  };
  const [isModalOpenAddAddress, setIsModalOpenAddAddress] = useState(false);
  const openAddAddressModal = () => {
    setIsModalOpenAddAddress(true);
  };
  const closeAddAddressModal = () => {
    setIsModalOpenAddAddress(false);
  };
  // const SetDefaultShippingInfo = (value) => {
  //   console.log(value, "value");
  //   if (value === true) {
  //     console.log("oki");
  //     APISetDefaultShippingInfo(UserId, DefaultShippingInfo).then((rs) => {
  //       console.log(DefaultShippingInfo);
  //     });
  //   } else {
  //     console.log("uk");
  //   }
  //   // {
  //   //
  //   // }
  // };
  return (
    <>
      <Button
        type="dashed"
        icon={<PlusOutlined />}
        onClick={openAddAddressModal}
        style={{ width: "100%", marginTop: "12px" }}
      >
        Thêm Địa Chỉ Mới
      </Button>
      <Modal
        title="Thêm Địa Chỉ Mới"
        open={isModalOpenAddAddress}
        onCancel={closeAddAddressModal}
        style={{ height: "100vh" }}
        footer={null}
      >
        <div className="modal-container">
          <div className="form-group">
            <div style={{ display: "flex", gap: "10px" }}>
              <label>
                Họ:
                <Input
                  value={FirstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Nhập họ và tên"
                />
              </label>

              <label>
                Tên:
                <Input
                  value={LastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Nhập họ và tên"
                />
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>Số điện thoại:</label>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Nhập số điện thoại"
            />
          </div>

          <div className="form-group">
            <label>Tỉnh / Thành phố:</label>
            <Select
              value={selectedProvince?.Id}
              onChange={handleProvinceChange}
              style={{ width: "100%" }}
              placeholder="Chọn tỉnh / thành phố"
            >
              {provinces.map((province) => (
                <Select.Option key={province.Id} value={province.Id}>
                  {province.Name}
                </Select.Option>
              ))}
            </Select>
          </div>

          {selectedProvince && (
            <div className="form-group">
              <label>Quận / Huyện:</label>
              <Select
                value={selectedDistrict?.Id}
                onChange={handleDistrictChange}
                style={{ width: "100%" }}
                placeholder="Chọn quận / huyện"
              >
                {selectedProvince.Districts.map((district) => (
                  <Select.Option key={district.Id} value={district.Id}>
                    {district.Name}
                  </Select.Option>
                ))}
              </Select>
            </div>
          )}

          {selectedDistrict && (
            <div className="form-group">
              <label>Phường / Xã:</label>
              <Select
                value={selectedWard?.Id}
                onChange={handleWardChange}
                style={{ width: "100%" }}
                placeholder="Chọn phường / xã"
              >
                {selectedDistrict.Wards.map((ward) => (
                  <Select.Option key={ward.Id} value={ward.Id}>
                    {ward.Name}
                  </Select.Option>
                ))}
              </Select>
            </div>
          )}

          <div className="form-group">
            <label>Địa chỉ cụ thể:</label>
            <Input.TextArea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Nhập địa chỉ cụ thể"
              rows={3}
            />
          </div>

          {/* <div className="form-group">
            <Checkbox
              checked={isDefault}
              onChange={(e) => {
                // console.log(e.target.checked);

                SetDefaultShippingInfo(e.target.checked);
                setIsDefault(e.target.checked);
                console.log(e.target.checked);
              }}
            >
              Đặt làm địa chỉ mặc định
            </Checkbox>
          </div> */}

          <div className="button-group">
            <Button key="back" onClick={closeAddAddressModal}>
              Hủy
            </Button>
            <Button
              type="primary"
              onClick={handleSubmit}
              disabled={
                !LastName ||
                !FirstName ||
                !phone ||
                !selectedProvince ||
                !selectedDistrict ||
                !selectedWard ||
                !address
              }
            >
              Hoàn Thành
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
