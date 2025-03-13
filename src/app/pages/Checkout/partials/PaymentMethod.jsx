import { BankOutlined, CreditCardOutlined } from "@ant-design/icons";
import { Card, Form, Input, Radio, Space, Button } from "antd";
import { useState } from "react";
import { FaPaypal, FaGooglePay } from "react-icons/fa";

const PaymentMethod = () => {
  const [paymentMethod, setPaymentMethod] = useState("credit_card");

  return (
    <div className="payment-container">
      <h2 className="payment-title">Phương thức thanh toán</h2>
      <Card className="payment-card">
        <Form layout="vertical">
          {/* Chọn phương thức thanh toán */}
          <Form.Item label={<strong>Chọn Phương Thức Thanh Toán:</strong>}>
            <Radio.Group value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
              <Space direction="vertical">
                <Radio value="credit_card">
                  <CreditCardOutlined /> Credit Card &nbsp;
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Mastercard-logo.png/50px-Mastercard-logo.png" alt="Mastercard" width="30"/>
                  &nbsp;
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Visa_Logo.png/50px-Visa_Logo.png" alt="Visa" width="30"/>
                </Radio>
                <Radio value="gpay">
                  <FaGooglePay size={20} /> G Pay
                </Radio>
                <Radio value="paypal">
                  <FaPaypal size={20} /> PayPal
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
              <Form.Item>
                <Input placeholder="Số Điện Thoại" />
              </Form.Item>
              <Form.Item>
                <Input placeholder="Tên Thẻ" />
              </Form.Item>
              <div className="card-info">
                <Form.Item className="half-width">
                  <Input placeholder="Ngày Hết Hạn (MM/YY)" />
                </Form.Item>
                <Form.Item className="half-width">
                  <Input placeholder="Mã Bảo Mật" />
                </Form.Item>
              </div>
            </>
          )}

          {/* Nút Save */}
          <div className="checkout-button-container">
            <Button type="primary" className="save-button">Lưu</Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default PaymentMethod;
