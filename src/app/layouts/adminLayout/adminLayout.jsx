import { Outlet } from "react-router-dom"; 
import Sidebar from "./sideBar/sideBar"; 

export default function AdminLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "20px", backgroundColor: "#F5F5F5" }}>
        <Outlet /> {/* Đây là nơi nội dung của route con sẽ được hiển thị */}
      </div>
    </div>
  );
}
