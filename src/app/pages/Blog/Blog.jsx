import React from "react";
import PageLayOut from "../../layouts/PageLayOut/PageLayOut";
// Import component banner
import Banner from "./partials/BannerBlog";
import BlogCategory from "./partials/BlogCategory";
import BlogList from "./partials/Bloglist";
import HealthCare from "./partials/HealthCare";
import JapaneseCosmetics from "./partials/JapaneseCosmetics";
import LastPicture from "./partials/LastPicture"
import "./blog.css";

export default function Blog() {
  return (
    <PageLayOut>
      <div className="blog-page">
        <Banner /> 
        <BlogCategory /> 
        <BlogList />
        <HealthCare />
        <JapaneseCosmetics />
        <LastPicture />
      </div>
    </PageLayOut>
  );
}
