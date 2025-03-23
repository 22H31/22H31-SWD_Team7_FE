import { BankOutlined, CreditCardOutlined } from "@ant-design/icons";
import { Card, Form, Input, Radio, Space, Button, message } from "antd";
import { useState } from "react";
import { FaPaypal } from "react-icons/fa";

const PaymentMethod = ({ onSavePaymentMethod }) => {
  const [paymentMethod, setPaymentMethod] = useState("vnpay"); // Mặc định là VNPay
  const [loading, setLoading] = useState(false); // State để hiển thị loading khi lưu

  // Hàm xử lý khi nhấn nút "Lưu"
  const handleSave = async () => {
    setLoading(true); // Bật trạng thái loading
    try {
      // Gọi hàm callback từ component cha để lưu phương thức thanh toán
      await onSavePaymentMethod(paymentMethod);
      message.success("Lưu phương thức thanh toán thành công!");
    } catch (error) {
      console.error("Lỗi khi lưu phương thức thanh toán:", error);
      message.error("Lưu phương thức thanh toán thất bại.");
    } finally {
      setLoading(false); // Tắt trạng thái loading
    }
  };

  return (
    <>
      <div className="payment-container">
        <h2 className="payment-title">Phương thức thanh toán</h2>
        <Card className="payment-card">
          <Form layout="vertical">
            <Form.Item label={<strong>Chọn Phương Thức Thanh Toán:</strong>}>
              <Radio.Group
                value={paymentMethod}
                onChange={(e) => {
                  const selectedMethod = e.target.value;
                  setPaymentMethod(selectedMethod);

                  // Hiển thị thông báo ngay khi chọn phương thức chưa hỗ trợ
                  if (
                    selectedMethod === "credit_card" ||
                    selectedMethod === "paypal"
                  ) {
                    message.info("Chức năng đang được phát triển.");
                  }
                }}
              >
                <Space direction="vertical">
                  <Radio value="vnpay">
                    <img
                      src="https://vinadesign.vn/uploads/images/2023/05/vnpay-logo-vinadesign-25-12-57-55.jpg"
                      alt="VNPay"
                      width="30"
                    />{" "}
                    VNPay
                  </Radio>
                  <Radio value="credit_card">
                    <CreditCardOutlined /> Credit Card &nbsp;
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Mastercard-logo.png/50px-Mastercard-logo.png"
                      alt="Mastercard"
                      width="30"
                    />
                    &nbsp;
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Visa_Logo.png/50px-Visa_Logo.png"
                      alt="Visa"
                      width="30"
                    />
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

            {/* Nút Lưu */}
            <div className="checkout-button-container">
              <Button
                type="primary"
                style={{ backgroundColor: "#ff69b4", borderColor: "#ff69b4" }} // Màu hồng
                onClick={handleSave}
                loading={loading} // Hiển thị loading khi đang xử lý
              >
                Lưu
              </Button>
            </div>
          </Form>
        </Card>
      </div>
      <h1>Payment Method</h1>
    </>
  );
};

export default PaymentMethod;
