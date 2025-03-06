// import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../../app/pages/Home/Home";
import Sale from "../../app/pages/Sale/Sale";
import Profile from "../../app/pages/Profile/Profile";
import Login from "../../app/pages/Login/Login";
import Register from "../../app/pages/SignUp/Register";
import ForgotPassword from "../../app/pages/ForgotPassword/ForgotPassword";
import PageNotFound from "../../app/layouts/PageNotFound/PageNotFound";
import Blog from "../../app/pages/Blog/Blog";
import BlogDetail from "../pages/BlogDetail";
import Cart from "../pages/cart";
import CustomerSupport from "../pages/CustomerSupport";
import FooterComponent from "../layouts/Footer/Footer";
import { useLocation } from "react-router";

export default function MainRoutes() {
  const location = useLocation();
  const hideFooter = ["/login", "/forgotPassword", "/register"].some((path) =>
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
        <Route path="/blogDetail" element={<BlogDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/customerSupport" element={<CustomerSupport />} />

        {/* Uncomment to handle unknown routes */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {!hideFooter && <FooterComponent />}
    </>
  );
}
