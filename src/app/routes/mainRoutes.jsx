import { Navigate, useLocation } from "react-router";
import { Route, Routes } from "react-router-dom";
import PageNotFound from "../../app/layouts/PageNotFound/PageNotFound";
import Blog from "../../app/pages/Blog/Blog";
import ForgotPassword from "../../app/pages/ForgotPassword/ForgotPassword";
import Home from "../../app/pages/Home/Home";
import Login from "../../app/pages/Login/Login";
import Profile from "../../app/pages/Profile/Profile";
import Sale from "../../app/pages/Sale/Sale";
import Register from "../../app/pages/SignUp/Register";
import GeminiChat from "../AI/GeminiChat";
import AdminLayout from "../layouts/adminLayout/adminLayout";
import FooterComponent from "../layouts/Footer/Footer";
import BlogManage from "../pages/Admin/blogManage/blogPage";
import Brand from "../pages/Admin/brandManage/brandPage";
import Category from "../pages/Admin/categoryManage/categoryPage";
import CategoryTitle from "../pages/Admin/categoryManage/categoryTitlePage";
import ProductsGrid from "../pages/Admin/productManage/productsGrid";
import TeamManage from "../pages/Admin/teamManage/teamPage";
import BlogDetail from "../pages/BlogDetail";
import Cart from "../pages/cart";
import Checkout from "../pages/Checkout";
import CustomerSupport from "../pages/CustomerSupport";
import PaymentSuccess from "../pages/PaymentSuccess";
import ProductDetail from "../pages/Home/ProductDetail/ProductDetail";
import QuizPopup from "../QuizPopup/QuizPopup";
import ProductFull from "../pages/Product/ProductFull";
import LayoutProduct from "../layouts/LayoutProduct/LayoutProduct";
import ChatForAdmin from "../pages/Admin/chatAdmin/ChatAdmin";
import ChatForUser from "../pages/UserChat/ChatButton";
import VoucherManagement from "../pages/Admin/voucherManage/VoucherManagement";
import PromotionManagement from "../pages/Admin/promotionManage/PromotionManagement";
import OrderList from "../pages/Admin/orderList/OrderList";
import Page401 from "../layouts/pageNotFound/401";
import FullBrands from "../pages/Brand";

import PaymentCallback from "../pages/PaymentResult/PaymentResult.jsx";

import BrandProduct from "../pages/Brand/BrandProduct/BrandProduct";
import ChatButton from "../pages/UserChat/ChatButton";

export default function MainRoutes() {
  const location = useLocation();
  const hideFooter = ["/login", "/forgotPassword", "/register", "/admin"].some(
    (path) => location.pathname.includes(path)
  );
  const hideChat = ["/admin"].some((path) => location.pathname.includes(path));
  const ProtectedRoute = ({ children, allowedRoles }) => {
    const Role = localStorage.getItem("Role");
    // const userRole='admin2'
    console.log(Role);
    if (!allowedRoles.includes(Role)) {
      return <Navigate to="/401" replace />;
    }
    return children;
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sale" element={<Sale />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:blogId" element={<BlogDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/customerSupport" element={<CustomerSupport />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/paymentSuccess" element={<PaymentSuccess />} />

        <Route path="/fullBrands" element={<FullBrands />} />
        <Route path="/result/payment" element={<PaymentCallback />} />
        <Route path="/brand/:brandId" element={<BrandProduct />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["Admin", "Staff", "StaffSale"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="products" element={<ProductsGrid />} />
          <Route path="teamPage" element={<TeamManage />} />
          <Route path="brandPage" element={<Brand />} />
          <Route path="categoryPage" element={<Category />} />
          <Route path="categoryTitlePage" element={<CategoryTitle />} />
          <Route path="blog" element={<BlogManage />} />
          <Route path="chatAdmin" element={<ChatForAdmin />} />
          <Route path="vouchers" element={<VoucherManagement />} />
          <Route path="promotions" element={<PromotionManagement />} />
          <Route path="orders" element={<OrderList />} />
        </Route>

        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/quiz" element={<QuizPopup />} />
        <Route path="/productFull" element={<ProductFull />} />
        <Route path="/LayoutProduct" element={<LayoutProduct />} />

        {/* Handle unknown routes */}
        <Route path="/401" element={<Page401 />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      {!hideChat && <GeminiChat />}

      {!hideChat && <ChatForUser />}
      {!hideFooter && <FooterComponent />}
    </>
  );
}
