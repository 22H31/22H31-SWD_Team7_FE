import React, { useEffect, useState } from "react";
import { Header } from "antd/es/layout/layout";
import {
  APIDeleteShippingInfo,
  APIGetShippingInfosByShippingInfo,
  APIGetShippingInfosByUserId,
  APISetDefaultShippingInfo,
} from "../../../api/api";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Form, message, Modal, Popconfirm, Radio } from "antd";
import "./ShippingInfo.css";
import AddAddressModal from "./AddAddressModal/AddAddressModal";
import { useCallback } from "react";
import ChangeInforAddressFol from "./ChangeInforAddress/ChangeInforAddressFol";
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
  //  const [address, setAddress] = useState([]);
  const [shippingInfos, setShippingInfos] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedInfor, setSelectedInfor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalChange, setModalChange] = useState(false);
  const userId = localStorage.getItem("userID");
  const [ShippingInfosByShippingInfo, SetShippingInfosByShippingInfo] =
    useState([]);
  const [form] = Form.useForm();
  const fetchAddresses = useCallback(() => {
    APIGetShippingInfosByUserId(userId)
      .then((rs) => {
        setShippingInfos(rs.data.data);
        console.log(rs.data.data, "12");
      })
      .catch((err) => {
        console.error("Lỗi khi tải danh sách địa chỉ:", err);
      });
  }, [userId]);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);
  // Địa chỉ mặc định
  const defaultInfo = shippingInfos.find(
    (info) => info.defaultAddress === true
  );
  useEffect(() => {
    if (defaultInfo) {
      setSelectedAddress(defaultInfo.shippingInfoId);
    }
  }, [shippingInfos]);
  useEffect(() => {
    const inforSelect = shippingInfos.find(
      (item) => item.shippingInfoId == selectedAddress
    );
    setSelectedInfor(inforSelect);
  }, [selectedAddress]);
  const showModal = () => {
    form.setFieldValue("checkbox", selectedAddress);
    setIsModalOpen(true);
  };
  const showModalChange = () => {
    setModalChange(true);
  };
  const closeModalChange = () => {
    setModalChange(false);
  };
  const handleOk = () => {
    form.submit();
    setIsModalOpen(false);
  };
  const onFinish = (values) => {
    if (selectedAddress != values.checkbox) setSelectedAddress(values.checkbox);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const sortedShippingInfos = [...shippingInfos].sort(
    (a, b) => b.defaultAddress - a.defaultAddress
  );

  const DeleteshippingInfoId = (id) => {
    APIDeleteShippingInfo(id).then((rs) => {
      console.log(rs);
      message.success("Xóa địa chỉ thành công!");
      fetchAddresses();
    });
  };
  const ChangeInforAddress = (id) => {
    console.log(id, "Hello from ChangeInforAddress");

    APIGetShippingInfosByShippingInfo(id)
      .then((rs) => {
        // localStorage.setItem("shippingInfoId", id)
        console.log("Thông tin địa chỉ:", rs.data);
        SetShippingInfosByShippingInfo(rs.data);
        6;
        console.log(ShippingInfosByShippingInfo, "ShippingInfosByShippingInfo");
      })
      .catch((err) => {
        console.error("Lỗi khi lấy thông tin địa chỉ:", err);
        message.error("Không thể lấy thông tin địa chỉ!");
      });
  };

 
  return (
    <div>
      <Header style={headerStyle}>
        {selectedInfor ? (
          <>
            <div className="shipping-info">
              <h3 style={{ margin: 0, display: "flex", height: "fit-content" }}>
                Địa chỉ nhận hàng
              </h3>
              <div className="shipping-info-container">
                <div className="shipping-info-name-phone">
                  <span className="shipping-info-name">
                  {selectedInfor.firstName} {selectedInfor.lastName} 
                  </span>
                  <span className="shipping-info-phone">
                    (+84) {selectedInfor.shippingPhoneNumber}
                  </span>
                </div>

                <div className="shipping-info-address">
                  {selectedInfor.addressDetail}, {selectedInfor.district},{" "}
                  {selectedInfor.province}
                </div>

                <div className="shipping-info-action">
                {selectedInfor?.defaultAddress &&  <p className="dIzOca">Mặc Định</p>}
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
          // <Button>
          //   <PlusOutlined />
          //   Thêm địa chỉ giao hàng
          // </Button>
          <AddAddressModal fetchData={fetchAddresses} />
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
          <Form form={form} onFinish={onFinish}>
            <Form.Item name="checkbox">
              <Radio.Group
                // onChange={(e) => setSelectedAddress(e.target.value)}
                // value={selectedAddress}
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
                    <Popconfirm
    title="Delete the address"
    description="Are you sure to delete this address?"
    okText="Yes"
    cancelText="No"

    onConfirm={() => DeleteshippingInfoId(info.shippingInfoId)}
  >
   <Button
                      type="text"
                      icon={<DeleteOutlined />}
                      danger
                      style={{ color: "#1890ff", fontWeight: "bold" }}
                    ></Button>
  </Popconfirm>
                   
                    <Button
                      type="text"
                      icon={<EditOutlined />}
                      onClick={() => {
                        ChangeInforAddress(info.shippingInfoId);
                        showModalChange();
                      }}
                      style={{ color: "#1890ff", fontWeight: "bold" }}
                    ></Button>
                  </div>
                ))}
              </Radio.Group>
            </Form.Item>
          </Form>
          <AddAddressModal fetchData={fetchAddresses} />
        </Modal>
        <Modal
          title={<h2 style={{ marginBottom: 0 }}>Địa Chỉ Của Tôi</h2>}
          open={isModalChange}
          onOk={() => closeModalChange()}
          onCancel={() => closeModalChange(false)}
          okText="Xác nhận"
          cancelText="Hủy"
          footer={null}
        >
          {ShippingInfosByShippingInfo ? (
            <>
              <ChangeInforAddressFol
                fetchData={fetchAddresses}
                onClose={closeModalChange}
                addressData={ShippingInfosByShippingInfo}
              />
            </>
          ) : (
            <p>Đang tải dữ liệu...</p>
          )}
        </Modal>
      </Header>
    </div>
  );
};

export default ShippingAddress;
