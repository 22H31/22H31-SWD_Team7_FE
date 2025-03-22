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
import PageLayOut from "../../../layouts/PageLayOut/PageLayOut";
import "./ProductDetail.css";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [isFeedbackModalVisible, setFeedbackModalVisible] = useState(false);
  const [editingFeedback, setEditingFeedback] = useState(null);
  const { productId } = useParams();
  const userId = localStorage.getItem("userID");

  // Fetch product details
  useEffect(() => {
    if (!productId) return;

    // Fetch product details
    APIGetProductById(productId)
      .then((response) => {
        setProduct(response.data);
        console.log("Product Data:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, [productId]);

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
        // cartLenght.set(cartLenght.value +1)
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
      const response = await APISubmitFeedback(
        userId,
        productId,
        rating,
        comment
      );
      if (response.status === 200) {
        message.success("Đánh giá của bạn đã được gửi thành công!");

        // Thêm feedback mới vào state mà không cần gọi lại API
        const newFeedback = {
          id: userId, // Giả sử `id` là userId của người dùng
          userName: await fetchUserInfo(userId), // Lấy tên người dùng
          rating,
          comment,
          productId,
          feedbackId: response.data.feedbackId, 
        };

        // Cập nhật state feedbacks
        setFeedbacks((prevFeedbacks) => [...prevFeedbacks, newFeedback]);

        // Đóng modal
        setFeedbackModalVisible(false); 
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      message.error("Gửi đánh giá thất bại.");
    }
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
          </div>
        </div>

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
