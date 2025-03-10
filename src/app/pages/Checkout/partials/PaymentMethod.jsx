import { useState } from "react";
import { Form, Input, Radio, Space, Card } from "antd";
import { CreditCardOutlined, BankOutlined } from "@ant-design/icons";
import { FaPaypal } from "react-icons/fa"; // Import PayPal icon từ react-icons

const PaymentMethod = () => {
  const [paymentMethod, setPaymentMethod] = useState("credit_card");

  return (
    <Card className="payment-card">
      <h2>Phương thức thanh toán</h2>
      <Form layout="vertical">
        {/* Chọn phương thức thanh toán */}
        <Form.Item label="Chọn Phương Thức Thanh Toán">
          <Radio.Group value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
            <Space direction="vertical">
              <Radio value="credit_card">
                <CreditCardOutlined /> Credit Card (Visa, Mastercard)
              </Radio>
              <Radio value="paypal">
                <FaPaypal /> PayPal
              </Radio>
              <Radio value="cod">
                <BankOutlined /> Thanh Toán Khi Nhận Hàng
              </Radio>
            </Space>
          </Radio.Group>
        </Form.Item>

        {/* Hiển thị form nếu chọn Credit Card */}
        {paymentMethod === "credit_card" && (
          <>
            <Form.Item label="Số Điện Thoại">
              <Input placeholder="Nhập số điện thoại" />
            </Form.Item>
            <Form.Item label="Tên Thẻ">
              <Input placeholder="Nhập tên trên thẻ" />
            </Form.Item>
            <Form.Item label="Mã Bảo Mật">
              <Input placeholder="CVV" />
            </Form.Item>
          </>
        )}
      </Form>
    </Card>
  );
};

export default PaymentMethod;
