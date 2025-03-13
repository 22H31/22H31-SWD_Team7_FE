import PageLayOut from "../../layouts/PageLayOut/PageLayOut";
 // Import component banner
import "./home.css";
import BannerHome from "./partials/BannerHome";
import FlashSale from "../../pages/Sale/partials/FlashSale"
import HotSale from "./partials/HotSale";
import BlogHomePage from "./partials/BlogHomePage";

export default function Home() {
  return (
    <PageLayOut>
      <div className="home-page">
       <BannerHome /> {/* Thêm banner vào đây */}
       <FlashSale />
       <HotSale/>
       <BlogHomePage/>
      </div>
    </PageLayOut>
  );
}
