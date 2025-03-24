import { useLocation } from "react-router-dom";

const ComparePage = () => {
  const { state } = useLocation();
  const products = state?.products || [];

  return (
    <div>
      <h1>So Sánh Sản Phẩm</h1>
      {products.map((product) => (
        <div key={product.productId}>{product.productName}</div>
      ))}
    </div>
  );
};

export default ComparePage;
