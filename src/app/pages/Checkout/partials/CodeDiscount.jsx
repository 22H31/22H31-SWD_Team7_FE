import { Card, Input, Button, Form, message } from "antd";
import "./CodeDiscount.css";
import { useEffect, useState } from "react";
import { APIPromotionApply } from "../../../api/api";
import { Value } from "sass";

const CodeDiscount = () => {
  const [form] = Form.useForm();
  const [promotion, setPromotion] = useState(0);
  const handleApplyDiscount = (values) => {
    console.log(values.discountCode, "values");
    APIPromotionApply(values.discountCode).then((rs) => {
      console.log(rs.data.data, "rs");
      if (rs.data?.success) {
        message.success("Áp mã giảm giá thành công!");
        setPromotion(rs.data.data.discountRate);
        console.log(rs.data.data.discountRate);
        console.log(promotion);
        localStorage.setItem("promotion", rs.data.data.discountRate);
      } else{
        message.warning("Áp mã giảm giá không thành công!")
      }
    });
  };
  return (
    <>
      {" "}
      <Card className="discount-code-card">
        <Form form={form} onFinish={handleApplyDiscount}>
          <h3>Mã giảm giá</h3>
          <div className="discount-input-container">
            <Form.Item
              name="discountCode"
              // className="discountCode"
              rules={[
                { required: true, message: "Vui lòng nhập mã giảm giá!" },
              ]}
              style={{ flex: 1 }}
            >
              <Input
                className="discount-input"
                placeholder="Nhập mã giảm giá"
                value={promotion}
              />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" className="apply-button">
                Áp dụng
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Card>
    </>
  );
};

export default CodeDiscount;
