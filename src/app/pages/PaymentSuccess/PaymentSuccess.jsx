import { CheckCircleTwoTone } from "@ant-design/icons";
// import CartLayOut from "../../layouts/CartLayout/CartLayout";
import "./PaymentSuccess.css";
import { useNavigate } from "react-router-dom";

export default function PaymentSuccess() {
  const navigate = useNavigate();

  return (
      <div className="payment-success-wrapper">
        <div className="payment-success">
          <div className="success-card">
            <CheckCircleTwoTone twoToneColor="#d63384" className="success-icon" />
            <h2 className="success-title">Thanh toán thành công</h2>
            <p className="success-subtitle">Đơn hàng đã được gửi</p>
            <p className="success-message">
            Cảm ơn vì đã mua hàng. Nếu cần hỗ trợ về đơn hàng hãy liên lạc với chúng tôi
            </p>
            <div className="button-group">
              <button className="btn-primary" onClick={() => navigate("/")}>
                Tiếp tục mua sắm
              </button>
              <button className="btn-secondary" onClick={() => navigate("/checkout")}>
                Chi tiết đơn hàng
              </button>
            </div>
          </div>
        </div>
      </div>
  );
}
