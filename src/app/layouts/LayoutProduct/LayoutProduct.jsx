import React from "react";
import { Card, Checkbox, Button, Slider, Collapse } from "antd";
import PageLayOut from "../PageLayOut/PageLayOut";
import "./Layout.css";
const { Panel } = Collapse;

const LayoutProduct = ({ children }) => {
  return (
    <PageLayOut>
     <div className="menu" style={{ width: 300, padding: 10, display: "flex", flexDirection: "column" }}>
  {/* Bộ lọc */}
  <h3 style={{ marginTop: 20 }}>BỘ LỌC</h3>
  <Collapse defaultActiveKey={["1", "2", "3", "4", "5", "6"]} ghost>
        <Panel header="Loại Da" key="1">
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <Checkbox>Tất cả</Checkbox>
        <Checkbox>Hỗn hợp/Dầu</Checkbox>
        <Checkbox>Khô</Checkbox>
        <Checkbox>Bình thường</Checkbox>
        <Checkbox>Nhạy cảm</Checkbox>
      </div>
    </Panel>
    <Panel header="Loại Thành Phần" key="2">
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <Checkbox>Tất cả</Checkbox>
        <Checkbox>BHA/AHA</Checkbox>
        <Checkbox>B5</Checkbox>
        <Checkbox>Niacinamide</Checkbox>
        <Checkbox>Tranexamic acid</Checkbox>
      </div>
    </Panel>
    <Panel header="Làm Sạch Kép" key="3">
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <Checkbox>Tất cả</Checkbox>
        <Checkbox>Sữa rửa mặt</Checkbox>
        <Checkbox>Nước tẩy trang</Checkbox>
        <Checkbox>Dầu tẩy trang</Checkbox>
        <Checkbox>Tẩy tế bào chết</Checkbox>
      </div>
    </Panel>
    <Panel header="Giá" key="4">
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <Checkbox>Dưới 500 vnđ</Checkbox>
        <Checkbox>500 vnđ - 1.000.000 vnđ</Checkbox>
        <Checkbox>1.000.000 vnđ - 2.000.000 vnđ</Checkbox>
        <Slider range defaultValue={[0, 100]} />
      </div>
    </Panel>
  </Collapse>

  <Button type="primary" block style={{ marginTop: 10 }}>
    Tìm Kiếm
  </Button>
</div>

      <div>{children}</div>
    </PageLayOut>
  );
};

export default LayoutProduct;
