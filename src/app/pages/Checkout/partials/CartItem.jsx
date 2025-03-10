import "./CartItem.css"
const CartItem = () => {
  // Fake data giỏ hàng
  const cartItems = [
    { id: 1, name: "Sữa Rửa Mặt", price: 150000, quantity: 2 },
    { id: 2, name: "Kem Dưỡng Ẩm", price: 250000, quantity: 1 },
    { id: 3, name: "Tẩy Tế Bào Chết", price: 180000, quantity: 3 },
  ];

  return (
    <div className="cart-item-checkout">
      <h2>Thông tin đơn hàng</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} - {item.quantity} x {item.price.toLocaleString()}đ
          </li>
        ))}
      </ul>
      <h3>
        Tổng tiền:{" "}
        {cartItems
          .reduce((total, item) => total + item.price * item.quantity, 0)
          .toLocaleString()}
        đ
      </h3>
    </div>
  );
};

export default CartItem;
