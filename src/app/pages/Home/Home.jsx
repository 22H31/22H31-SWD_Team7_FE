import PageLayOut from "../../layouts/PageLayOut/PageLayOut";
 // Import component banner
import "./home.css";
import Banner from "./partials/Banner";

export default function Home() {
  return (
    <PageLayOut>
      <div className="home-page">
       <Banner /> {/* Thêm banner vào đây */}
      </div>
    </PageLayOut>
  );
}
