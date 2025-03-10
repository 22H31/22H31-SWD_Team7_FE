import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../../app/pages/Home/Home";
import Sale from "../../app/pages/Sale/Sale"; 
import Profile from "../../app/pages/Profile/Profile";
import Login from "../../app/pages/Login/Login";
import Register from "../../app/pages/SignUp/Register";
import ForgotPassword from "../../app/pages/ForgotPassword/ForgotPassword";
import PageNotFound from "../../app/layouts/PageNotFound/PageNotFound";
import Blog from "../../app/pages/Blog/Blog";
import AdminLogin from "../pages/Admin/login/adminLogin";
import AdminLayout from "../layouts/adminLayout/adminLayout";
import Dashboard from "../pages/Admin/dashBoard";
import ProductsGrid from "../pages/Admin/productManage/productsGrid";
import ProductStock from "../pages/Admin/productStock/productStock";
import TeamManage from "../pages/Admin/teamManage/teamPage";
import Brand from "../pages/Admin/brandManage/brandPage";
import Category from "../pages/Admin/categoryManage/categoryPage";
import CategoryTitle from "../pages/Admin/categoryManage/categoryTitlePage";
import BlogManage from "../pages/Admin/blogManage/blogPage";



// function ProtectedRoute({ children }) {
//   const isAuthenticated = localStorage.getItem("adminToken"); // Kiểm tra token đăng nhập admin
//   return isAuthenticated ? children : <Navigate to="/admin/login" />;
// }



export default function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sale" element={<Sale />} /> 
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
      <Route path="/blog" element ={<Blog />} />

      {/* Routes cho admin */}
      {/* <Route path="/admin/login" element={<AdminLogin />} />
      <Route 
        path="/admin/*" 
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products" element={<ProductsGrid />} />
        <Route path="productStock" element={<ProductStock />} />
        <Route path="teamPage" element={<TeamManage />} />
      </Route> */}

      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products" element={<ProductsGrid />} />
        <Route path="productStock" element={<ProductStock />} />
        <Route path="teamPage" element={<TeamManage />} />
        <Route path="brandPage" element={<Brand />} />
        <Route path="categoryPage" element={<Category />} />
        <Route path="categoryTitlePage" element={<CategoryTitle />} />
        <Route path="blog" element={<BlogManage />} />
      </Route>
      
      {/* Uncomment to handle unknown routes */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
