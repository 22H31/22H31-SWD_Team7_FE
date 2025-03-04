// import React from "react";
import "./FAQ.css";

const FAQ = () => {
  return (
    <div className="faq-container">
      <h2 className="faq-title">Câu hỏi thường gặp</h2>
      <div className="faq-content">
        <div className="faq-column">
          <a href="#">Về Chúng Tôi</a>
          <a href="#">Câu Chuyện Thương Hiệu</a>
          <a href="#">Quyền Lợi Thành Viên</a>
          <a href="#">Hướng Dẫn Mua Hàng Online</a>
          <a href="#">Hướng Dẫn Mua Hàng Online Nhận Hàng Tại Cửa Hàng</a>
          <a href="#">Hướng dẫn thanh toán mua trả sau Kaypay</a>
        </div>
        <div className="faq-column">
          <a href="#">FLIK - Hình Thức Trả Góp 0% Lãi Suất Với Thanh Toán Lần Đầu Đủ Qua Ví Momo</a>
          <a href="#">Hướng dẫn Mua trước trả sau qua Fundiin tại Website</a>
          <a href="#">Chính Sách Giao Nhận Và Thanh Toán</a>
          <a href="#">Liên Hệ</a>
          <a href="#">Điều Kiện Sử Dụng</a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;