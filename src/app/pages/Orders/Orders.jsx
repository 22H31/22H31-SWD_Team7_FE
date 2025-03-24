import React, { useEffect, useState } from "react";
import { Tabs, Card, Button, Tag } from "antd";
import { APIGetOrderUser } from "../../api/api";

const statusTabs = [
  { key: "preparing", label: "Chờ xác nhận" },
  { key: "waiting", label: "Chờ lấy hàng" },
  { key: "delivering", label: "Đang giao" },
  { key: "delivered", label: "Đã giao" },
  { key: "cancelled", label: "Đã hủy" },
];

export default function Orders() {
  const [activeTab, setActiveTab] = useState("preparing");
  const [orders, setOrders] = useState([]);
  const userID = localStorage.getItem("userID");

  useEffect(() => {
    APIGetOrderUser(userID).then((rs) => {
      console.log(rs.data);
      if (rs.data?.success) {
        setOrders(rs.data.data);
      }
    });
  }, []);

  const filteredOrders = orders.filter(order => order.orderStatus === activeTab);

  return (
    <div style={{ padding: "20px", minHeight: "80vh", backgroundColor: "#f8f8f8" }}>
      <Tabs activeKey={activeTab} onChange={setActiveTab} tabBarStyle={{ fontWeight: "bold", fontSize: "16px" }}>
        {statusTabs.map((tab) => (
          <Tabs.TabPane tab={tab.label} key={tab.key} />
        ))}
      </Tabs>
      <div style={{ minHeight: "60vh" }}>
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <Card 
              key={order.orderId} 
              style={{ marginBottom: "10px", padding: "15px", borderRadius: "10px", border: "1px solid #e0e0e0", backgroundColor: "#fff" }}
            >
              {order.orderDetails.map((product, index) => (
                <div 
                  key={index} 
                  style={{ display: "flex", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #eaeaea" }}
                >
                  <img src={product.imageUrl} alt={product.productName} style={{ width: 80, height: 80, marginRight: 15, borderRadius: "5px" }} />
                  <div>
                    <h4 style={{ margin: 0, fontSize: "14px", color: "#333" }}>{product.productName}</h4>
                    <p style={{ margin: "5px 0", fontSize: "14px", fontWeight: "bold", color: "#d0021b" }}>{order.finalAmount.toLocaleString()} VND</p>
                  </div>
                </div>
              ))}
              <Tag color="blue" style={{ marginTop: "10px", fontSize: "14px", padding: "5px 10px" }}>{order.orderStatus}</Tag>
              <div style={{ marginTop: 15, display: "flex", justifyContent: "space-between" }}>
                <Button type="primary" style={{ flex: 1, marginRight: "5px" }}>Xem chi tiết</Button>
                <Button danger style={{ flex: 1 }}>Hủy đơn</Button>
              </div>
            </Card>
          ))
        ) : (
          <p style={{ textAlign: "center", fontSize: "16px", color: "#888" }}>Không có đơn hàng nào.</p>
        )}
      </div>
    </div>
  );
}
