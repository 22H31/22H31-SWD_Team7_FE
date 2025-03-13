import { useState } from "react";
import "./HotSale.css";

const fakeProducts = [
  {
    id: 1,
    name: "DHC - Serum",
    category: "DHC",
    price: "590.000 đ",
    oldPrice: "690.000 đ",
    rating: 5,
    reviews: 29,
    image:
      "https://japana.vn/uploads/japana.vn/product/2021/11/20/1637384224-vien-uong-trang-da-coix-dhc-30-vien.jpg",
  },
  {
    id: 2,
    name: "DHC - Viên Uống",
    category: "DHC",
    price: "170.000 đ",
    oldPrice: "200.000 đ",
    rating: 5,
    reviews: 29,
    image:
      "https://myphamnhatonline.com/Uploaded_products/img_product_small/vien-uong-collagen-dhc-60-vien-hong.jpg",
  },
  {
    id: 3,
    name: "Hada Labo - Kem",
    category: "Hada Labo",
    price: "500.000 đ",
    oldPrice: "600.000 đ",
    rating: 4,
    reviews: 20,
    image:
      "https://images.soco.id/b6d8a32f-7051-4220-9a3e-923821196bcb-.jpg",
  },
  {
    id: 4,
    name: "Hada Labo - Toner",
    category: "Hada Labo",
    price: "500.000 đ",
    oldPrice: "600.000 đ",
    rating: 4,
    reviews: 20,
    image:
      "https://images.soco.id/b8878032-a6af-42c0-9194-c9cac1323fc3-.jpg",
  },
  {
    id: 5,
    name: "Sofina - Serum",
    category: "Sofina",
    price: "800.000 đ",
    oldPrice: "900.000 đ",
    rating: 5,
    reviews: 25,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqcJzFTz2m-6V8MLiRVri4ihxr9lYh2wI36w&s",
  },
  {
    id: 6,
    name: "Bioré - Kem Dưỡng",
    category: "Bioré",
    price: "450.000 đ",
    oldPrice: "550.000 đ",
    rating: 4,
    reviews: 18,
    image:
      "https://product.hstatic.net/200000551679/product/biore_uv_anti-pollution_body_care_serum_intensive_aura_caac176dbc5748e4b3b5ac522a45222b.jpeg",
  },
  {
    id: 7,
    name: "Shiseido - Toner",
    category: "Shiseido",
    price: "700.000 đ",
    oldPrice: "800.000 đ",
    rating: 5,
    reviews: 32,
    image:
      "https://img.bonjourglobal.net/1/1762/1264.jpg",
  },
  {
    id: 8,
    name: "DHC - Combo",
    category: "DHC",
    price: "599.000 đ",
    oldPrice: "699.000 đ",
    rating: 5,
    reviews: 22,
    image:
      "https://salt.tikicdn.com/cache/w1200/ts/product/b2/68/f7/fd8e002c3000b9fb9639e583ba3322fb.png",
  },
  {
    id: 9,
    name: "Sofina - Kem Dưỡng",
    category: "Sofina",
    price: "900.000 đ",
    oldPrice: "1.000.000 đ",
    rating: 4,
    reviews: 15,
    image:
      "https://cf.shopee.com.my/file/1d41c0691d1e08614e8d3971ab4e1d2b",
  },
  {
    id: 10,
    name: "Bioré - Sữa Rửa Mặt",
    category: "Bioré",
    price: "250.000 đ",
    oldPrice: "350.000 đ",
    rating: 4,
    reviews: 12,
    image:
      "https://www.lottemart.vn/media/catalog/product/cache/0x0/8/9/8934681028027.jpg.webp",
  },
  {
    id: 11,
    name: "Shiseido - Serum",
    category: "Shiseido",
    price: "1.200.000 đ",
    oldPrice: "1.500.000 đ",
    rating: 5,
    reviews: 40,
    image:
      "https://www.ivisitkorea.com/wp-content/uploads/2022/12/6.-Isntree.png",
  },
  {
    id: 12,
    name: "Hada Labo - Serum",
    category: "Hada Labo",
    price: "500.000 đ",
    oldPrice: "600.000 đ",
    rating: 4,
    reviews: 29,
    image:
      "https://www.ivisitkorea.com/wp-content/uploads/2022/12/6.-Isntree.png",
  },
];

const ITEMS_PER_PAGE = 12;

const HotSale = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(fakeProducts.length / ITEMS_PER_PAGE);
  const displayedProducts = fakeProducts.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  return (
    <div className="OnSale">
      <h2>Sản phẩm đang hot</h2>

      {/* Danh sách sản phẩm */}
      <div className="product-list">
        {displayedProducts.map((product) => (
          <div key={product.id} className="product">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p className="price">
              {product.price} <del>{product.oldPrice}</del>
            </p>
            <div className="rating">
              {Array.from({ length: product.rating }, (_, i) => (
                <span key={i} className="star">
                  ⭐
                </span>
              ))}
              <span className="reviews">{product.reviews} Đánh giá</span>
            </div>
            <button className="buy">Mua ngay</button>
          </div>
        ))}
      </div>

      {/* Phân trang */}
      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`page-number ${currentPage === index ? "active" : ""}`}
              onClick={() => setCurrentPage(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default HotSale;