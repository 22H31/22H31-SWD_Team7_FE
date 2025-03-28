import React, { useState, useEffect } from "react";
import { Table, Tag, Button, Select, Space, message, Modal, Input, Descriptions, Divider } from "antd";
import { FilterOutlined, ReloadOutlined } from "@ant-design/icons";
import styles from "./OrderList.module.css";

const { Option } = Select;

const API_URL = "https://swdteam7-hfgrdwa4dfhbe0ga.southeastasia-01.azurewebsites.net/api";

const OrderList = () => {
  const [filters, setFilters] = useState({
    orderStatus: null, // Trạng thái đơn hàng
  });
  const [data, setData] = useState([]); // Dữ liệu đơn hàng
  const [loading, setLoading] = useState(false); // Trạng thái loading
  const [isModalVisible, setIsModalVisible] = useState(false); // Trạng thái hiển thị modal
  const [selectedOrderId, setSelectedOrderId] = useState(null); // ID đơn hàng được chọn
  const [reason, setReason] = useState(""); // Lý do refund
  const [orderDetails, setOrderDetails] = useState(null); // Chi tiết đơn hàng
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false); // Trạng thái hiển thị modal

  // Hàm gọi API để lấy danh sách đơn hàng theo trạng thái
  const fetchOrders = async (status) => {
    setLoading(true); // Bật trạng thái loading
    try {
      const res = await fetch(`${API_URL}/order/manage/status/${status}`);
      if (!res.ok) throw new Error("Lỗi khi lấy danh sách đơn hàng!");
      const result = await res.json();
      const orders = result.data.map((order) => ({
        orderId: order.orderId,
        shippingInfo: order.shippingInfo,
        orderDate: order.orderDate,
        finalAmount: order.finalAmount,
        status: status,
      }));
      setData(orders); // Cập nhật dữ liệu đơn hàng
      message.success(`Lấy danh sách đơn hàng với trạng thái "${status}" thành công!`);
    } catch (err) {
      console.error(err);
      message.error("Không thể lấy danh sách đơn hàng!");
    } finally {
      setLoading(false); // Tắt trạng thái loading
    }
  };

  // Hàm gọi API để xác nhận chuẩn bị (preparing -> shipping)
  const handleConfirmPrepare = async (orderId) => {
    try {
      const trimmedOrderId = orderId.trim(); // Loại bỏ dấu cách
      const res = await fetch(`${API_URL}/order/manage/${trimmedOrderId}/comfirmPrepar`, {
        method: "PUT",
      });
      if (!res.ok) throw new Error("Lỗi khi xác nhận chuẩn bị đơn hàng!");
      const result = await res.json();
      message.success("Đơn hàng đã chuyển sang trạng thái 'Shipping'!");
      fetchOrders(filters.orderStatus); // Cập nhật lại danh sách đơn hàng
    } catch (err) {
      console.error(err);
      message.error("Không thể xác nhận chuẩn bị đơn hàng!");
    }
  };

  // Hàm gọi API để xác nhận giao hàng (shipping -> delivered)
  const handleConfirmShip = async (orderId) => {
    try {
      const trimmedOrderId = orderId.trim(); // Loại bỏ dấu cách
      const res = await fetch(`${API_URL}/order/manage/${trimmedOrderId}/comfirmShip`, {
        method: "PUT",
      });
      if (!res.ok) throw new Error("Lỗi khi xác nhận giao hàng!");
      const result = await res.json();
      message.success("Đơn hàng đã chuyển sang trạng thái 'Delivered'!");
      fetchOrders(filters.orderStatus); // Cập nhật lại danh sách đơn hàng
    } catch (err) {
      console.error(err);
      message.error("Không thể xác nhận giao hàng!");
    }
  };

  // Hàm gọi API để yêu cầu refund
  const handleRequestRefund = async () => {
    try {
      const res = await fetch(`${API_URL}/order/manage/${selectedOrderId}/comfirmRefuning`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reason }),
      });
      if (!res.ok) throw new Error("Lỗi khi yêu cầu refund!");
      const result = await res.json();
      message.success("Yêu cầu refund thành công!");
      setIsModalVisible(false); // Đóng modal
      setReason(""); // Reset lý do
      fetchOrders(filters.orderStatus); // Cập nhật lại danh sách đơn hàng
    } catch (err) {
      console.error(err);
      message.error("Không thể yêu cầu refund!");
    }
  };

  // Hiển thị modal
  const showRefundModal = (orderId) => {
    setSelectedOrderId(orderId);
    setIsModalVisible(true);
  };

  // Đóng modal
  const handleCancel = () => {
    setIsModalVisible(false);
    setReason("");
  };

  // Xử lý khi thay đổi trạng thái đơn hàng
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    if (key === "orderStatus" && value) {
      fetchOrders(value); // Gọi API khi chọn trạng thái
    }
  };

  // Reset bộ lọc
  const handleResetFilters = () => {
    setFilters({
      orderStatus: null,
    });
    setData([]); // Xóa dữ liệu đơn hàng
  };

  const fetchOrderDetails = async (status, orderId) => {
    try {
      const res = await fetch(`${API_URL}/order/manage/status/${status}`);
      if (!res.ok) throw new Error("Lỗi khi lấy chi tiết đơn hàng!");
      const result = await res.json();
  
      // Tìm đơn hàng theo orderId
      const order = result.data.find((item) => item.orderId === orderId);
      if (!order) throw new Error("Không tìm thấy đơn hàng!");
  
      setOrderDetails(order); // Lưu chi tiết đơn hàng vào state
      setIsDetailModalVisible(true); // Hiển thị modal
    } catch (err) {
      console.error(err);
      message.error("Không thể lấy chi tiết đơn hàng!");
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Name",
      key: "name",
      render: (record) => `${record.shippingInfo.firstName} ${record.shippingInfo.lastName}`,
    },
    {
      title: "Address",
      key: "address",
      render: (record) =>
        `${record.shippingInfo.addressDetail}, ${record.shippingInfo.commune}, ${record.shippingInfo.district}, ${record.shippingInfo.province}`,
    },
    {
      title: "Date",
      dataIndex: "orderDate",
      key: "orderDate",
      render: (date) => new Date(date).toLocaleDateString(), // Định dạng ngày
    },
    {
      title: "Total Amount",
      dataIndex: "finalAmount",
      key: "finalAmount",
      render: (amount) => `${amount.toLocaleString()} VND`, // Định dạng tiền tệ
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "";
        switch (status) {
          case "preparing":
            color = "orange";
            break;
          case "shipping":
            color = "blue";
            break;
          case "paying":
            color = "purple";
            break;
          case "delivered":
            color = "green";
            break;
          case "returning": // Thêm trạng thái Returning
            color = "red";
            break;
          default:
            color = "gray";
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <Space>
          {record.status === "preparing" && (
            <Button
              type="primary"
              onClick={() => handleConfirmPrepare(record.orderId.trim())}
            >
              Confirm Prepare
            </Button>
          )}
          {record.status === "shipping" && (
            <Button
              type="primary"
              onClick={() => handleConfirmShip(record.orderId.trim())}
            >
              Confirm Ship
            </Button>
          )}
          <Button
            type="default"
            onClick={() => fetchOrderDetails(record.status, record.orderId.trim())} // Gọi hàm lấy chi tiết
          >
            View Details
          </Button>
          {record.status !== "returning" && (
            <Button
            type="danger"
            style={{
              backgroundColor: "#ff4d4f",
              color: "white",
              border: "none",
              borderRadius: "4px",
              padding: "4px 12px",
              fontWeight: "bold",
            }}
            onClick={() => showRefundModal(record.orderId.trim())}
          >
            Request Refund
          </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="order-list">
      <h1 className="order-list__title">Order Management</h1>

      {/* Bộ lọc */}
      <div className="order-list__filters">
        <Space>
          <Button icon={<FilterOutlined />} type="default">
            Filter By
          </Button>
          <Select
            placeholder="Order Status"
            value={filters.orderStatus}
            onChange={(value) => handleFilterChange("orderStatus", value)}
            style={{ width: 150 }}
          >
            <Option value="preparing">Preparing</Option>
            <Option value="shipping">Shipping</Option>
            <Option value="paying">Paying</Option>
            <Option value="delivered">Delivered</Option>
            <Option value="returning">Returning</Option> {/* Thêm trạng thái Returning */}
          </Select>
          <Button
            icon={<ReloadOutlined />}
            type="default"
            onClick={handleResetFilters}
          >
            Reset Filter
          </Button>
        </Space>
      </div>

      {/* Bảng dữ liệu */}
      <Table
        columns={columns}
        dataSource={data}
        rowKey="orderId"
        pagination={{ pageSize: 5 }}
        loading={loading} // Hiển thị trạng thái loading
        className="order-list__table"
      />

      {/* Modal nhập lý do refund */}
      <Modal
        title="Request Refund"
        visible={isModalVisible}
        onOk={handleRequestRefund}
        onCancel={handleCancel}
        okText="Submit"
        cancelText="Cancel"
      >
        <Input.TextArea
          rows={4}
          placeholder="Enter refund reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </Modal>

      {/* Modal chi tiết đơn hàng */}
      <Modal
        className="custom-modal"
        title="Order Details"
        visible={isDetailModalVisible}
        onCancel={() => setIsDetailModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsDetailModalVisible(false)}>
            Close
          </Button>,
        ]}
        width="90%" // Hoặc sử dụng CSS để kiểm soát
      >
        {orderDetails ? (
          <div>
            <Descriptions title="Order Information" bordered column={2}>
              <Descriptions.Item label="Order ID">{orderDetails.orderId}</Descriptions.Item>
              <Descriptions.Item label="Order Date">
                {new Date(orderDetails.orderDate).toLocaleString()}
              </Descriptions.Item>
              <Descriptions.Item label="Payment ID">{orderDetails.paymentId}</Descriptions.Item>
              <Descriptions.Item label="Shipping Fee">
                {orderDetails.shippingFee.toLocaleString()} VND
              </Descriptions.Item>
              <Descriptions.Item label="Voucher Fee">
                {orderDetails.voucherFee.toLocaleString()} VND
              </Descriptions.Item>
              <Descriptions.Item label="Promotion Fee">
                {orderDetails.promotionFee.toLocaleString()} VND
              </Descriptions.Item>
              <Descriptions.Item label="Total Amount">
                {orderDetails.totalAmount.toLocaleString()} VND
              </Descriptions.Item>
              <Descriptions.Item label="Final Amount">
                {orderDetails.finalAmount.toLocaleString()} VND
              </Descriptions.Item>
            </Descriptions>

            <Divider />

            <Descriptions title="Shipping Information" bordered column={2}>
              <Descriptions.Item label="Name">
                {orderDetails.shippingInfo.firstName} {orderDetails.shippingInfo.lastName}
              </Descriptions.Item>
              <Descriptions.Item label="Phone">
                {orderDetails.shippingInfo.shippingPhoneNumber}
              </Descriptions.Item>
              <Descriptions.Item label="Address">
                {orderDetails.shippingInfo.addressDetail}, {orderDetails.shippingInfo.commune},{" "}
                {orderDetails.shippingInfo.district}, {orderDetails.shippingInfo.province}
              </Descriptions.Item>
              <Descriptions.Item label="Address Type">
                {orderDetails.shippingInfo.addressType}
              </Descriptions.Item>
              <Descriptions.Item label="Note">
                {orderDetails.shippingInfo.shippingNote}
              </Descriptions.Item>
            </Descriptions>

            <Divider />

            <Descriptions title="Order Items" bordered column={1}>
              {orderDetails.manageOrderDetail.map((item) => (
                <Descriptions.Item key={item.variantId} label={item.productName}>
                  <div>
                    <p><strong>Variant ID:</strong> {item.variantId}</p>
                    <p><strong>Product ID:</strong> {item.productId}</p>
                    <p><strong>Image URL:</strong> {item.imageUrl}</p>
                    <p><strong>Volume:</strong> {item.volume} ml</p>
                    <p><strong>Skin Type:</strong> {item.skinType}</p>
                    <p><strong>Quantity:</strong> {item.quantity}</p>
                    <p><strong>Price:</strong> {item.price.toLocaleString()} VND</p>
                  </div>
                </Descriptions.Item>
              ))}
            </Descriptions>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </Modal>
    </div>
  );
};

export default OrderList;