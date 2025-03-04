// import React from "react";
import PageLayOut from "../../layouts/PageLayOut/PageLayOut";
import "./blogDetail.css";
import BlogDescription from "./partials/BlogDescription";
import RelatedBlogs from "./partials/RelatedBlogs";

export default function Blog() {
  return (
    <PageLayOut>
      <div className="blogDetail-page">
      <BlogDescription/> 
      <RelatedBlogs />
      </div>
    </PageLayOut>
  );
}
