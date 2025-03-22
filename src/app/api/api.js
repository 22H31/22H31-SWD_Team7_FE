import api from "./axios";

export const APIlogin = (userName, passWord) =>
  api.post("account/login", { username: userName, password: passWord });
export const APIregis = (user) =>
  api.post("account/register", {
    userName: user.userName,
    name: "",
    email: user.email,
    password: user.password,
    phoneNumber: "",
  });
export const APIForgotpass = (user) =>
  api.post("account/forgot-password", { email: user.email });
export const APIGetInformation = () =>
  api.get("User", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
export const APIChangePassword = (values) =>
  api.post("account/change-password", {
    currentPassword: values.currentPassword,
    newPassword: values.newPassword,
    newPasswordConfirmation: values.newPasswordConfirmation,
  });

// ================= User APIs =================

export const APIGetUserId = (userId) => api.get(`User/${userId}`);
export const APILogOut = () => api.post("account/logout");
export const APIPutUserId = (values, userId) =>
  api.put(`User/${userId}`, {
    name: values.name,
    phoneNumber: values.phone,
    address: values.address,
    dateOfBirth: values.dateOfBirth,
  });

// ================= Cart APIs =================

//cart
export const APIGetCategories = () => api.get("categories");
export const APIGetProducts = () => api.get("products");
export const APIGetProductById = (productId) => api.get(`products/${productId}`);
export const APIGetSkintestQuestion = () => api.get("skintest-question/questions");
export const APIGetSkintestResult = (id, answers) =>
  api.post("Skin_Test_Result/create", { id: id, answerIds: answers });
export const APIGetFullProduct = () => api.get("products");
export const APIAddToCart = (userId, variantId, quantity) =>
  api.post("cartitem/add", {
    userId,
    variantId,
    quantity,
  });
export const APIGetCartItems = (userId) => api.get(`cartitem/user/${userId}`);
export const APIUpdateCartItem = (cartItemId, quantity) =>
  api.put(`cartitem/update-cartitem/${cartItemId}`, { quantity });
export const APIRemoveCartItem = (cartItemId) =>
  api.delete(`cartitem/${cartItemId}`);

// ================= Feedback APIs =================

// API để lấy danh sách Feedback
export const APIGetFeedbacks = () => api.get("feedback");

// API để thêm Feedback mới
export const APISubmitFeedback = (id, productId, rating, comment) =>
  api.post("feedback", {
    id: id, // userId
    productId: productId,
    rating: rating,
    comment: comment,
  });

// API để cập nhật Feedback
export const APIUpdateFeedback = (feedbackId, rating, comment) =>
  api.put(`feedback/${feedbackId}`, {
    rating: rating,
    comment: comment,
  });

// API để xóa Feedback
export const APIDeleteFeedback = (feedbackId) =>
  api.delete(`feedback/${feedbackId}`);


// ================= Voucher APIs =================

// Base URL cho API voucher
const API_VOUCHER_BASE_URL = "voucher";
const API_PROMOTION_BASE_URL = "promotion";

// Voucher APIs
export const APIGetVouchers = () => api.get(`${API_VOUCHER_BASE_URL}`);
export const APICreateVoucher = (data) => api.post(API_VOUCHER_BASE_URL, data);
export const APIUpdateVoucher = (id, data) =>
  api.put(`${API_VOUCHER_BASE_URL}/${id}`, data);
export const APIDeleteVoucher = (id) =>
  api.delete(`${API_VOUCHER_BASE_URL}/${id}`);

// Promotion APIs
export const APIGetPromotions = () => api.get(`${API_PROMOTION_BASE_URL}/all`);
export const APICreatePromotion = (data) =>
  api.post(`${API_PROMOTION_BASE_URL}/create`, data);
export const APIUpdatePromotion = (id, data) =>
  api.put(`${API_PROMOTION_BASE_URL}/update/${id}`, data);
export const APIDeletePromotion = (id) =>
  api.delete(`${API_PROMOTION_BASE_URL}/delete/${id}`);

export default api;