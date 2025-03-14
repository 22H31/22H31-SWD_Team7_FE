import PageLayOut from "../../layouts/PageLayOut/PageLayOut";
// Import component banner
import "./home.css";
import BannerHome from "./partials/BannerHome";
import FlashSale from "../../pages/Sale/partials/FlashSale";
import HotSale from "./partials/HotSale";
import BlogHomePage from "./partials/BlogHomePage";
import RelatedBlogs from "./partials/RelatedBlogs";
import SkinQuestion from "./partials/SkinQuestion";
import CustomerExperience from "./partials/CustomerExperience";

export default function Home() {
  return (
    <PageLayOut>
      <div className="home-page">
        <BannerHome /> {/* Thêm banner vào đây */}
        <FlashSale />
        <HotSale />
        <BlogHomePage />
        <RelatedBlogs />
        <SkinQuestion/>
        <CustomerExperience/>
      </div>
    </PageLayOut>
  );
}
