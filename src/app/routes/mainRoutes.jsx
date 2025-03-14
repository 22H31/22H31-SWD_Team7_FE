// import React from "react";
import { useLocation } from "react-router";
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
import ProductStock from "../pages/Admin/productStock/productStock";
import TeamManage from "../pages/Admin/teamManage/teamPage";
import BlogDetail from "../pages/BlogDetail";
import Cart from "../pages/cart";
import Checkout from "../pages/Checkout";
import CustomerSupport from "../pages/CustomerSupport";
import PaymentSuccess from "../pages/PaymentSuccess";
import ProductDetail from "../pages/Home/ProductDetail/ProductDetail";

export default function MainRoutes() {
  const location = useLocation();
  const hideFooter = ["/login", "/forgotPassword", "/register","/admin"].some((path) =>
    location.pathname.includes(path)
  );
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
        <Route path="/paymentSuccess" element={<PaymentSuccess/>} />

        <Route path="/admin" element={<AdminLayout />}>
        <Route path="products" element={<ProductsGrid />} />
        <Route path="productStock" element={<ProductStock />} />
        <Route path="teamPage" element={<TeamManage />} />
        <Route path="brandPage" element={<Brand />} />
        <Route path="categoryPage" element={<Category />} />
        <Route path="categoryTitlePage" element={<CategoryTitle />} />
        <Route path="blog" element={<BlogManage />} />
        </Route>
        <Route path="/product/:id" element={<ProductDetail />} />
        {/* Uncomment to handle unknown routes */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <GeminiChat />
      {!hideFooter && <FooterComponent />}
    </>
  );
}
