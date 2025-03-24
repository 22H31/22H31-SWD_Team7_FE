import { Button, Col, Form, Image, Input, message, Modal, Rate } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  APIAddToCart,
  APIDeleteFeedback,
  APIGetFeedbacks,
  APIGetProductById,
  APIGetUserId,
  APISubmitFeedback,
  APIUpdateFeedback,
} from "../../../api/api";
import { cartLenght } from "../../../globalVariable/cart";
import PageLayOut from "../../../layouts/PageLayOut/PageLayOut";
import "./ProductDetail.css";
// import { useNavigate } from "react-router-dom";




const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [isFeedbackModalVisible, setFeedbackModalVisible] = useState(false);
  const [editingFeedback, setEditingFeedback] = useState(null);
  const { productId } = useParams();
  const userId = localStorage.getItem("userID");
  const [compareModalVisible, setCompareModalVisible] = useState(false);
  const [categoryProducts, setCategoryProducts] = useState([]);
  // const navigate = useNavigate();
  // const [productData, setProductData] = useState([]);
  const [comparePopupVisible, setComparePopupVisible] = useState(false);
  const [comparisonData, setComparisonData] = useState([]);



  // Fetch product details
  useEffect(() => {
    if (!productId) return;

    const fetchProductDetails = async () => {
        try {
            console.log("Gọi API với productId:", productId); // 🔍 Kiểm tra productId trước khi gọi API
            const response = await APIGetProductById(productId);
            console.log("Kết quả API:", response); // 🔍 Kiểm tra response có dữ liệu không

            if (!response || !response.data) {
                console.error("Error: response hoặc response.data không hợp lệ!");
                return;
            }

            const productDetails = response.data;
            setProduct(productDetails);
            console.log("Product Data:", productDetails);

            if (productDetails.categoryId) {
                fetchCategoryProducts(productDetails.categoryId, productDetails.productId);
            } else {
                console.warn("Warning: categoryId không tồn tại!");
            }
        } catch (error) {
            console.error("Error fetching product:", error);
        }
    };

    fetchProductDetails();
}, [productId]);



  const fetchCategoryProducts = async (categoryId, currentProductId) => {
    try {
        const response = await fetch(
            `https://swdteam7-hfgrdwa4dfhbe0ga.southeastasia-01.azurewebsites.net/api/products/category/${categoryId}`
        );
        const data = await response.json();

        console.log("Category Products API Response:", data);

        // Kiểm tra nếu API trả về object có key `items`, thay vì mảng trực tiếp
        const productsArray = Array.isArray(data) ? data : data.items;

        if (!Array.isArray(productsArray)) {
            console.error("Error: API không trả về mảng sản phẩm hợp lệ", data);
            return;
        }

        // Lọc ra sản phẩm không trùng với sản phẩm hiện tại
        const filteredProducts = productsArray.filter((p) => p.productId !== currentProductId);
        console.log("Danh sách sản phẩm sau khi lọc:", filteredProducts);

        setCategoryProducts(filteredProducts);
    } catch (error) {
        console.error("Error fetching category products:", error);
    }
};




  // Hàm để lấy thông tin người dùng
  const fetchUserInfo = async (userId) => {
    try {
      const response = await APIGetUserId(userId); // Sử dụng APIGetUserId
      return response.data.name || "Người dùng ẩn danh"; // Trả về tên người dùng
    } catch (error) {
      console.error("Error fetching user info:", error);
      return "Người dùng ẩn danh"; // Trả về giá trị mặc định nếu có lỗi
    }
  };
  // Khi fetch feedbacks, lấy thông tin người dùng
  useEffect(() => {
    if (productId) {
      APIGetFeedbacks()
        .then(async (response) => {
          const productFeedbacks = response.data.filter(
            (fb) => fb.productId === productId
          );
          // Lấy thông tin người dùng cho từng feedback
          const feedbacksWithUser = await Promise.all(
            productFeedbacks.map(async (fb) => {
              const userName = await fetchUserInfo(fb.id); // Lấy tên người dùng
              return { ...fb, userName }; // Thêm userName vào feedback
            })
          );
          setFeedbacks(feedbacksWithUser); // Cập nhật state feedbacks
        })
        .catch((error) => {
          console.error("Error fetching feedbacks:", error);
        });
    }
  }, [productId]);

  // Add to cart
  const handleAddToCart = async (variantId) => {
    if (!userId) {
      message.error("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.");
      return;
    }

    try {
      const response = await APIAddToCart(userId, variantId, 1);
      if (response.status === 200) {
        cartLenght.set(cartLenght.value +1)
        message.success("Thêm sản phẩm vào giỏ hàng thành công!");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      message.error("Thêm sản phẩm vào giỏ hàng thất bại.");
    }
  };

  // Feedback form submission
  const handleSubmitFeedback = async (rating, comment) => {
  if (!userId) {
    message.error("Vui lòng đăng nhập để đánh giá sản phẩm.");
    return;
  }

  try {
    // Hiển thị loading trong khi gửi đánh giá
    // const hideLoading = message.loading("Đang gửi đánh giá...", 0);
    
    const response = await APISubmitFeedback(
      userId,
      productId,
      rating,
      comment
    );
    
    // hideLoading(); 
    
    if (response.status === 200 || response.status === 201) {
      message.success("Đánh giá của bạn đã được gửi thành công!");

      // Lấy thông tin người dùng
      const userName = await fetchUserInfo(userId);
      
      // Tạo feedback mới với đầy đủ thông tin
      const newFeedback = {
        id: userId,
        userId: userId, // Thêm cả userId để dễ kiểm tra
        userName,
        rating,
        comment,
        productId,
        feedbackId: response.data.feedbackId,
        createdAt: new Date().toISOString(), // Thêm thời gian tạo
        updatedAt: new Date().toISOString() // Thêm thời gian cập nhật
      };

      // Cập nhật state theo cách không làm mất dữ liệu cũ
      setFeedbacks(prevFeedbacks => {
        // Kiểm tra xem feedback đã tồn tại chưa (trường hợp update)
        const existingIndex = prevFeedbacks.findIndex(
          fb => fb.feedbackId === newFeedback.feedbackId
        );
        
        if (existingIndex >= 0) {
          // Nếu đã tồn tại thì cập nhật
          const updated = [...prevFeedbacks];
          updated[existingIndex] = newFeedback;
          return updated;
        }
        
        // Nếu chưa tồn tại thì thêm mới vào đầu mảng
        return [newFeedback, ...prevFeedbacks];
      });

      // Đóng modal và reset trạng thái editing
      setFeedbackModalVisible(false);
      setEditingFeedback(null);
      
      // Cập nhật rating trung bình nếu cần
      if (product) {
        const newAvgRating = calculateNewAverageRating([...feedbacks, newFeedback]);
        setProduct(prev => ({ ...prev, averageRating: newAvgRating }));
      }
    }
  } catch (error) {
    console.error("Error submitting feedback:", error);
    message.error("Gửi đánh giá thất bại. Vui lòng thử lại.");
  }
};

// Hàm tính rating trung bình mới
const calculateNewAverageRating = (feedbacks) => {
  if (feedbacks.length === 0) return 0;
  const sum = feedbacks.reduce((acc, fb) => acc + fb.rating, 0);
  return sum / feedbacks.length;
};
  // Update feedback
  const handleUpdateFeedback = async (feedbackId, rating, comment) => {
    try {
      const response = await APIUpdateFeedback(feedbackId, rating, comment);
      if (response.status === 200) {
        message.success("Đánh giá của bạn đã được cập nhật thành công!");
        const updatedFeedbacks = await APIGetFeedbacks();
        setFeedbacks(
          updatedFeedbacks.data.filter((fb) => fb.productId === productId)
        );
        setEditingFeedback(null);
      }
    } catch (error) {
      console.error("Error updating feedback:", error);
      message.error("Cập nhật đánh giá thất bại.");
    }
  };

  // Delete feedback
  const handleDeleteFeedback = async (feedbackId) => {
    try {
      const response = await APIDeleteFeedback(feedbackId);
      if (response.status === 200) {
        message.success("Đánh giá của bạn đã được xóa thành công!");
        const updatedFeedbacks = await APIGetFeedbacks();
        setFeedbacks(
          updatedFeedbacks.data.filter((fb) => fb.productId === productId)
        );
      }
    } catch (error) {
      console.error("Error deleting feedback:", error);
      message.error("Xóa đánh giá thất bại.");
    }
  };



const handleCompare = async (selectedProductId) => {
  try {
    if (!product || !selectedProductId) {
      alert("Lỗi: Không có dữ liệu sản phẩm.");
      return;
    }

    // Gọi API lấy thông tin sản phẩm hiện tại
    const responseCurrent = await fetch(
      `https://swdteam7-hfgrdwa4dfhbe0ga.southeastasia-01.azurewebsites.net/api/products/${product.productId}`
    );
    if (!responseCurrent.ok) throw new Error("Lỗi khi lấy sản phẩm hiện tại");

    const currentProductData = await responseCurrent.json();

    // Gọi API lấy thông tin sản phẩm được chọn để so sánh
    const responseSelected = await fetch(
      `https://swdteam7-hfgrdwa4dfhbe0ga.southeastasia-01.azurewebsites.net/api/products/${selectedProductId}`
    );
    if (!responseSelected.ok) throw new Error("Lỗi khi lấy sản phẩm so sánh");

    const selectedProductData = await responseSelected.json();

    console.log("Sản phẩm hiện tại:", currentProductData);
    console.log("Sản phẩm so sánh:", selectedProductData);

    // Cập nhật danh sách so sánh
    setComparisonData([currentProductData, selectedProductData]);
    setComparePopupVisible(true);
  } catch (error) {
    console.error("Lỗi khi lấy thông tin sản phẩm:", error);
    alert("Lỗi khi lấy thông tin sản phẩm! Vui lòng thử lại.");
  }
};





  // Feedback form modal
  const FeedbackForm = ({ visible, onCancel, onSubmit, initialValues }) => {
    const [form] = Form.useForm();

    useEffect(() => {
      if (initialValues) {
        form.setFieldsValue({
          rating: initialValues.rating,
          comment: initialValues.comment,
        });
      }
    }, [initialValues, form]);

    const onFinish = (values) => {
      onSubmit(values.rating, values.comment);
      form.resetFields();
    };
    
    

    return (
      <Modal
        title={initialValues ? "Cập nhật Đánh Giá" : "Viết Đánh Giá"}
        visible={visible}
        onCancel={onCancel}
        footer={null}
      >
        <Form form={form} onFinish={onFinish} initialValues={initialValues}>
          <Form.Item
            name="rating"
            label="Đánh giá"
            rules={[{ required: true }]}
          >
            <Rate />
          </Form.Item>
          <Form.Item
            name="comment"
            label="Bình luận"
            rules={[{ required: true }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {initialValues ? "Cập nhật" : "Gửi"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>      
    );
  };

  if (!product) return <p>Loading...</p>;

  return (
    <PageLayOut>
      <div className="product-detail-container">
        {/* Product Image */}
        <div className="product-header">
          <Col span={10}>
            <Image src={product.avatarImageUrl} alt={product.productName} />
          </Col>

          {/* General Information */}
          <div className="product-info">
            <h1 style={{ textAlign: "left", color: "#C0437F" }}>
              {product.productName}
            </h1>
            <div className="product-meta">
              <span className="rating">{product.averageRating} ⭐</span> |
              <span
                style={{ textAlign: "left", color: "#C0437F" }}
                className="reviews"
              >
                ({feedbacks.length} đánh giá)
              </span>{" "}
              |
              <span
                style={{ textAlign: "left", color: "#C0437F" }}
                className="product-code"
              >
                Mã sản phẩm: {productId}
              </span>
            </div>

            <p className="price">
              {product.variants && product.variants.length > 0 ? (
                <>
                  <span className="discounted-price">
                    {Number(product.variants[0].price).toLocaleString("vi-VN")}{" "}
                    đ
                  </span>
                  <del className="original-price">
                    {Number(product.variants[0].price * 1.05).toLocaleString(
                      "vi-VN"
                    )}{" "}
                    VND
                  </del>
                </>
              ) : (
                <span>Liên hệ để biết giá</span>
              )}
            </p>
            <p>Dung tích: {product.variants[0].volume}ml</p>
            <p>Số lượng còn: {product.variants[0].stockQuantity}</p>
            <Button
              type="primary"
              className="add-to-cart"
              onClick={() => handleAddToCart(product.variants[0].variantId)}
            >
              Thêm vào giỏ hàng
            </Button>
            <Button
              type="default"
              className="compare-button"
              onClick={() => setCompareModalVisible(true)}
            >
              SO SÁNH
            </Button>
          </div>
        </div>

        <Modal
  title="Chọn sản phẩm để so sánh"
  open={compareModalVisible}
  onCancel={() => setCompareModalVisible(false)}
  footer={null}
>
  {categoryProducts.length > 0 ? (
    <div className="compare-product-list">
      {categoryProducts.map((p) => (
        <div key={p.productId} className="compare-product-card">
          <img src={product.avatarImageUrl} alt={product.productName} width="150" />
          <p className="compare-product-name">{p.productName}</p>
          <button className="compare-product-button" onClick={() => handleCompare(p.productId, p.categoryId)}>
            Chọn để so sánh
          </button>
        </div>
      ))}
    </div>
  ) : (
    <p className="no-product-message">Không có sản phẩm nào cùng danh mục.</p>
  )}
</Modal>







<Modal
  title="So sánh sản phẩm"
  open={comparePopupVisible}
  onCancel={() => setComparePopupVisible(false)}
  footer={null}
  width={800} // Tăng chiều rộng modal cho dễ nhìn
>
  {comparisonData.length === 2 ? (
    <div className="compare-container">
      <table className="compare-table">
        <thead>
          <tr>
            <th>Thông tin</th>
            {comparisonData.map((product) => (
              <th key={product.productId}>{product.productName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Hình ảnh sản phẩm */}
          <tr>
            <td><strong>Hình ảnh</strong></td>
            {comparisonData.map((product) => (
              <td key={product.productId}>
                <img src={product.avatarImageUrl} alt={product.productName} width="120" />
              </td>
            ))}
          </tr>

          {/* Thông tin chung */}
          <tr>
            <td><strong>Thương hiệu</strong></td>
            {comparisonData.map((product) => <td key={product.productId}>{product.brandName}</td>)}
          </tr>
          <tr>
            <td><strong>Danh mục</strong></td>
            {comparisonData.map((product) => <td key={product.productId}>{product.categoryName}</td>)}
          </tr>

          {/* Lấy thông tin từ variant */}
          {comparisonData[0].variants?.length > 0 && (
            <>
              <tr>
                <td><strong>Thể tích</strong></td>
                {comparisonData.map((product) => <td key={product.productId}>{product.variants[0].volume} ml</td>)}
              </tr>
              <tr>
                <td><strong>Loại da phù hợp</strong></td>
                {comparisonData.map((product) => <td key={product.productId}>{product.variants[0].skinType}</td>)}
              </tr>
              <tr>
                <td><strong>Giá</strong></td>
                {comparisonData.map((product) => <td key={product.productId}>{product.variants[0].price} VND</td>)}
              </tr>
              <tr>
                <td><strong>Số lượng kho</strong></td>
                {comparisonData.map((product) => <td key={product.productId}>{product.variants[0].stockQuantity}</td>)}
              </tr>
            </>
          )}

          {/* Thành phần */}
          <tr>
            <td><strong>Thành phần chính</strong></td>
            {comparisonData.map((product) => <td key={product.productId}>{product.variants[0].mainIngredients}</td>)}
          </tr>
          <tr>
            <td><strong>Thành phần đầy đủ</strong></td>
            {comparisonData.map((product) => <td key={product.productId}>{product.variants[0].fullIngredients}</td>)}
          </tr>

          {/* Mô tả sản phẩm */}
          <tr>
            <td><strong>Mô tả</strong></td>
            {comparisonData.map((product) => <td key={product.productId}>{product.describe?.summary || "Không có"}</td>)}
          </tr>
          <tr>
            <td><strong>Người dùng phù hợp</strong></td>
            {comparisonData.map((product) => <td key={product.productId}>{product.describe?.suitableUsers || "Không có"}</td>)}
          </tr>
        </tbody>
      </table>
    </div>
  ) : (
    <p>Đang tải dữ liệu sản phẩm...</p>
  )}
</Modal>


        {/* Product Details */}
        <div className="product-details">
          <h2>Thông tin sản phẩm:</h2>
          <div className="product-description">
            <p>
              {product.describe?.solutionsForSkinHairConditions ||
                "Không có thông tin"}
            </p>
          </div>

          <h2>Thông số sản phẩm:</h2>
          <table>
            <tbody>
              <tr>
                <td>Thương hiệu:</td>
                <td>{product.brandName}</td>
              </tr>
              <tr>
                <td>Xuất xứ thương hiệu:</td>
                <td>
                  {product.specifications?.brandOrigin || "Không có thông tin"}
                </td>
              </tr>
              <tr>
                <td>Nơi sản xuất:</td>
                <td>
                  {product.specifications?.placeOfManufacture ||
                    "Không có thông tin"}
                </td>
              </tr>
              <tr>
                <td>Đối tượng sử dụng:</td>
                <td>
                  {product.describe?.suitableUsers || "Không có thông tin"}
                </td>
              </tr>
            </tbody>
          </table>

          <h2>Thành phần sản phẩm:</h2>
          <p>{product.describe?.uses || "Không có thông tin"}</p>

          <h2>Hướng dẫn sử dụng:</h2>
          <p>{product.describe?.preserve || "Không có thông tin"}</p>
        </div>

        {/* Product Reviews */}
        <div className="product-reviews">
          <h1>Đánh giá sản phẩm:</h1>
          <div className="review-summary">
            <span className="rating-score">
              {product.averageRating.toFixed(1)}
            </span>
            <div className="stars">
              {"⭐".repeat(Math.round(product.averageRating))}
            </div>
            <p>{feedbacks.length} đánh giá</p>
          </div>

          {/* Review List */}
          <div className="review-list">
            {feedbacks.length > 0 ? (
              feedbacks.map((fb, index) => (
                <div key={index} className="review-item">
                  <p className="review-user">{fb.userName}</p>
                  <div className="review-stars">{"⭐".repeat(fb.rating)}</div>
                  <p className="review-text">{fb.comment}</p>
                  {fb.id === userId && (
                    <div>
                      <Button onClick={() => setEditingFeedback(fb)}>
                        Cập nhật
                      </Button>
                      <Button
                        onClick={() => handleDeleteFeedback(fb.feedbackId)}
                      >
                        Xóa
                      </Button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p>Chưa có đánh giá nào.</p>
            )}
          </div>

          {/* Write Review Button */}
          <Button
            className="write-review"
            onClick={() => setFeedbackModalVisible(true)}
          >
            Viết Bình Luận
          </Button>
        </div>
      </div>

      {/* Feedback Form Modal */}
      <FeedbackForm
        visible={isFeedbackModalVisible || editingFeedback !== null}
        onCancel={() => {
          setFeedbackModalVisible(false);
          setEditingFeedback(null);
        }}
        onSubmit={(rating, comment) => {
          if (editingFeedback) {
            handleUpdateFeedback(editingFeedback.feedbackId, rating, comment);
          } else {
            handleSubmitFeedback(rating, comment);
          }
        }}
        initialValues={editingFeedback}
      />
    </PageLayOut>
    );
  };

export default ProductDetail;
