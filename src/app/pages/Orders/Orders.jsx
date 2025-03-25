import { Button, Card, Pagination, Tabs, Tag, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { APIGetOrderUser } from "../../api/api";

const statusTabs = [
  { key: "paying", label: "Chờ thanh toán" },
  { key: "preparing", label: "Chờ lấy hàng" },
  { key: "shipping", label: "Đang giao" },
  { key: "delivered", label: "Đã giao" },
  { key: "cancelled", label: "Đã hủy" },
];

export default function Orders() {
  const [activeTab, setActiveTab] = useState(statusTabs[0].key); // Tab đầu tiên
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // Số đơn hàng mỗi trang

  const userID = localStorage.getItem("userID");

  useEffect(() => {
    APIGetOrderUser(userID).then((rs) => {
      if (rs.data?.success) {
        setOrders(rs.data.data);
        console.log(rs.data, "data");
      }
    });
  }, []);

  const filteredOrders = orders.filter(
    (order) => order.orderStatus === activeTab
  );

  // Lấy danh sách đơn hàng theo trang
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div
      style={{ padding: "20px", minHeight: "80vh", backgroundColor: "#f8f8f8" }}
    >
      <Tabs
        activeKey={activeTab}
        onChange={(key) => {
          setActiveTab(key);
          setCurrentPage(1); // Reset về trang đầu tiên khi đổi tab
        }}
        tabBarStyle={{ fontWeight: "bold", fontSize: "16px" }}
      >
        {statusTabs.map((tab) => (
          <Tabs.TabPane tab={tab.label} key={tab.key} />
        ))}
      </Tabs>

      <div style={{ minHeight: "60vh" }}>
        {paginatedOrders.length > 0 ? (
          paginatedOrders.map((order) => (
            <Card
              key={order.orderId}
              style={{
                marginBottom: "15px",
                padding: "15px",
                borderRadius: "10px",
                border: "1px solid #e0e0e0",
                backgroundColor: "#fff",
              }}
            >
              {/* Thông tin shop */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #eaeaea",
                  paddingBottom: "10px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Tag color="red" style={{ marginRight: "10px" }}>
                    Yêu thích
                  </Tag>
                  <span
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "#333",
                    }}
                  >
                    {order.shopName || "Beauty Love"}
                  </span>
                </div>
                <Button
                  type="link"
                  style={{ color: "#ff424e", fontWeight: "bold" }}
                >
                  {statusTabs.find((tab) => tab.key === activeTab)?.label ||
                    "Trạng thái"}
                </Button>
              </div>

              {/* Sản phẩm */}
              {order.orderDetails.map((product, index) => (
                <div
                  key={index}
                  style={{
                    textAlign: "left",
                    display: "flex",
                    alignItems: "center",
                    padding: "15px 0",
                    borderBottom:
                      index !== order.orderDetails.length - 1
                        ? "1px solid #eaeaea"
                        : "none",
                  }}
                >
                  <img
                    src={product.imageUrl}
                    alt={product.productName}
                    style={{
                      width: 80,
                      height: 80,
                      marginRight: 15,
                      borderRadius: "5px",
                      border: "1px solid #e0e0e0",
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <h4
                      style={{
                        margin: 0,
                        fontSize: "14px",
                        color: "#333",
                        fontWeight: "bold",
                      }}
                    >
                      {product.productName}
                    </h4>
                    <p
                      style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        color: "#d0021b",
                      }}
                    >
                      {product.price.toLocaleString()} đ
                    </p>
                    <p
                      style={{
                        margin: "5px 0",
                        fontSize: "14px",
                        color: "#000",
                      }}
                    >
                      x{product.quantity}
                    </p>
                  </div>
                </div>
              ))}

              {/* Tổng tiền */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  padding: "15px 0",
                  borderTop: "1px solid #eaeaea",
                }}
              >
                <span style={{ fontSize: "14px", color: "#666" }}>
                  Thành tiền:
                </span>
                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "#d0021b",
                    marginLeft: "10px",
                  }}
                >
                  {order.finalAmount.toLocaleString()} VND
                </span>
              </div>

              {/* Nút hành động */}
              <div
                style={{
                  marginTop: 15,
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button type="primary" onClick={() => setSelectedOrder(order)}>
                  Xem Thông Tin Đơn Hàng
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <p style={{ textAlign: "center", fontSize: "16px", color: "#888" }}>
            Không có đơn hàng nào.
          </p>
        )}
      </div>

      {/* Phân trang */}
      {filteredOrders.length > pageSize && (
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={filteredOrders.length}
          onChange={(page) => setCurrentPage(page)}
          style={{ textAlign: "center", marginTop: "20px" }}
        />
      )}
      <Modal
        title="Chi Tiết Đơn Hàng"
        visible={!!selectedOrder}
        onCancel={() => setSelectedOrder(null)}
        footer={null}
      >
        {selectedOrder && (
          <div>
            <p>
              <strong>Mã đơn hàng:</strong> {selectedOrder.orderId}
            </p>
            <p>
              <strong>Trạng thái:</strong>{" "}
              {
                statusTabs.find((tab) => tab.key === selectedOrder.orderStatus)
                  ?.label
              }
            </p>
            <p>
              <strong>Tên cửa hàng:</strong>{" "}
              {selectedOrder.shopName || "Beauty Love"}
            </p>
            <p>
              <strong>Tổng tiền:</strong>{" "}
              {selectedOrder.finalAmount.toLocaleString()} VND
            </p>

            <h3>Sản phẩm:</h3>
            {selectedOrder.orderDetails.map((product, index) => (
              <div
                key={index}
                style={{
                  marginBottom: "10px",
                  borderBottom: "1px solid #eee",
                  paddingBottom: "10px",
                }}
              >
                <img
                  src={product.imageUrl}
                  alt={product.productName}
                  style={{ width: 50, height: 50, marginRight: 10 }}
                />
                <strong>{product.productName}</strong> - {product.quantity} x{" "}
                {product.price.toLocaleString()} đ
              </div>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
}
