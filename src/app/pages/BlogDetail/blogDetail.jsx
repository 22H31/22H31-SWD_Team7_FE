import { useParams } from "react-router-dom";
import PageLayOut from "../../layouts/PageLayOut/PageLayOut";
import "./blogDetail.css";
import BlogDescription from "./partials/BlogDescription";
import RelatedBlogs from "./partials/RelatedBlogs";

export default function BlogDetail() {
  const { blogId } = useParams(); // Lấy blogId từ URL

  return (
    <PageLayOut>
      <div className="blogDetail-page">
        <BlogDescription /> {/* Không cần truyền blogId nữa vì đã lấy trong component */}
        <RelatedBlogs blogId={blogId} />
      </div>
    </PageLayOut>
  );
}
