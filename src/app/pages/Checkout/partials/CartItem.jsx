import "./CartItem.css";

const CartItem = ({ cartSummary }) => {
  return (
    <div className="cart-item-checkout">
      <h2>Thông tin đơn hàng</h2>
      <div className="cart-detail">
        <p>
          Tổng sản phẩm đã chọn <span>{cartSummary.totalItems}</span>
        </p>
        <p>
          Tạm tính <span className="bold">{cartSummary.subtotal.toLocaleString()} đ</span>
        </p>
        <p>
          Mã giảm giá <span>{cartSummary.discount.toLocaleString()} đ</span>
        </p>
        <p>
          Phí giao hàng <span>{cartSummary.shippingFee.toLocaleString()} đ</span>
        </p>
        <hr />
        <p className="total">
          Tổng thanh toán <span>{cartSummary.total.toLocaleString()} đ</span>
        </p>
        <p className="vat-note">(Đã bao gồm VAT)</p>
      </div>
    </div>
  );
};

export default CartItem;
