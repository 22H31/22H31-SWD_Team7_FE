import React, { useEffect, useState } from "react";
import { Header } from "antd/es/layout/layout";
import { APIGetShippingInfosByUserId } from "../../../api/api";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Modal, Radio } from "antd";
import "./ShippingInfo.css";

const ShippingAddress = () => {
  const headerStyle = {
    paddingInline: 48,
    lineHeight: "64px",
    backgroundColor: "#fff",
    height: "fit-content",
    marginBottom: 24,
    border: "1px solid #ddd",
    borderRadius: 5,
  };

  const [shippingInfos, setShippingInfos] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userId = localStorage.getItem("userID");

  useEffect(() => {
    APIGetShippingInfosByUserId(userId).then((rs) => {
      console.log("Full API Response:", rs);
      console.log("res.data:", rs.data.data);
      setShippingInfos(rs.data.data);
    });
  }, []);

  // Địa chỉ mặc định
  const defaultInfo = shippingInfos.find(
    (info) => info.defaultAddress === true
  );
  useEffect(() => {
    if (defaultInfo) {
      setSelectedAddress(defaultInfo.shippingInfoId);
    }
  }, [shippingInfos]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    const selectedInfo = shippingInfos.find(
      (info) => info.shippingInfoId === selectedAddress
    );
    console.log("Selected Address:", selectedInfo);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const sortedShippingInfos = [...shippingInfos].sort(
    (a, b) => b.defaultAddress - a.defaultAddress
  );

  return (
    <div>
      <Header style={headerStyle}>
        {defaultInfo ? (
          <>
            <div className="shipping-info">
              <h3 style={{ margin: 0, display: "flex", height: "fit-content" }}>
                Địa chỉ nhận hàng
              </h3>
              <div className="shipping-info-container">
                <div className="shipping-info-name-phone">
                  <span className="shipping-info-name">
                    {defaultInfo.lastName} {defaultInfo.firstName}
                  </span>
                  <span className="shipping-info-phone">
                    (+84) {defaultInfo.shippingPhoneNumber}
                  </span>
                </div>

                <div className="shipping-info-address">
                  {defaultInfo.addressDetail}, {defaultInfo.commune},{" "}
                  {defaultInfo.district}, {defaultInfo.province}
                </div>

                <div className="shipping-info-action">
                  <p className="dIzOca">Mặc Định</p>
                </div>
                <div>
                  <button
                    onClick={showModal}
                    className="shipping-info-edit-button"
                  >
                    Thay Đổi
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <Button>
            <PlusOutlined />
            Thêm địa chỉ giao hàng
          </Button>
        )}

        {/* Modal chọn địa chỉ */}
        <Modal
          title={<h2 style={{ marginBottom: 0 }}>Địa Chỉ Của Tôi</h2>}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Xác nhận"
          cancelText="Hủy"
        >
          <Radio.Group
            onChange={(e) => setSelectedAddress(e.target.value)}
            value={selectedAddress}
            style={{ width: "100%" }}
          >
            {sortedShippingInfos.map((info) => (
              <div
                key={info.shippingInfoId}
                style={{
                  padding: "16px",
                  borderRadius: "12px",
                  border: "1px solid #e0e0e0",
                  marginBottom: "12px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "#fff",
                  transition: "all 0.3s",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
                }}
              >
                <Radio
                  value={info.shippingInfoId}
                  style={{ display: "flex", flex: 1 }}
                >
                  <div style={{ marginLeft: "10px" }}>
                    <strong>
                      {info.firstName} {info.lastName}
                    </strong>{" "}
                    | (+84) {info.shippingPhoneNumber}
                    <div style={{ color: "#555", marginTop: "4px" }}>
                      {info.addressDetail}, {info.district}, {info.province}
                    </div>
                    {info.defaultAddress && (
                      <span
                        style={{
                          color: "red",
                          fontWeight: "bold",
                          marginTop: "8px",
                          display: "inline-block",
                        }}
                      >
                        Mặc định
                      </span>
                    )}
                  </div>
                </Radio>
                <Button
                  type="text"
                  icon={<EditOutlined />}
                  onClick={() =>
                    console.log("Thay đổi địa chỉ", info.shippingInfoId)
                  }
                  style={{ color: "#1890ff", fontWeight: "bold" }}
                >
                  Thay đổi
                </Button>
              </div>
            ))}
          </Radio.Group>
          <Button 
        type="dashed" 
        icon={<PlusOutlined />} 
        // onClick={onAddAddress} 
        style={{ width: '100%', marginTop: '12px' }}
      >
        Thêm Địa Chỉ Mới
      </Button>
        </Modal>
      </Header>
    </div>
  );
};

export default ShippingAddress;
