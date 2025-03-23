import { Card, Input, Button } from "antd";
import "./CodeDiscount.css";

const CodeDiscount = () => {
  return (
    <>
      {" "}
      <Card className="discount-code-card">
        <h3>Mã giảm giá</h3>
        <div className="discount-input-container">
          <Input className="discount-input" placeholder="Nhập mã giảm giá" />
          <Button className="apply-button">Áp dụng</Button>
        </div>
      </Card>
    </>
  );
};

export default CodeDiscount;
