import React, { useEffect, useState } from "react";
import { APIGetFullProduct, APIGetProductById } from "../../api/api";
import PageLayOut from "../../layouts/PageLayOut/PageLayOut";
import "./ProductList.css";
import { useNavigate } from "react-router";
import LayoutProduct from "../../layouts/LayoutProduct/LayoutProduct";

import { Button, Checkbox, Collapse, Radio, Slider } from "antd";
const { Panel } = Collapse;

const listFillter = [
  {
    key: "price",
    options: [
      { key: "1", label: "All", value: "0-99999999" },
      { key: "2", label: "Dưới 150000 vnđ", value: "0-150000" },
      {
        key: "3",
        label: "150000 vnđ - 1.000.000 vnđ",
        value: "150000-1000000",
      },
    ],
  },
];
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const ITEMS_PER_PAGE = 12;
  const [filter, setFilter] = useState({ key: "price", value: "" });
  const displayedProducts = products?.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );
  const [totalPages, setTotalPages] = useState(1);
  // const pageSize = 1;
  const navigate = useNavigate();

  useEffect(() => {
    APIGetFullProduct().then((rs) => {
     
      setProducts(rs.data.items);
      setTotalPages(Math.ceil(rs.data.totalCount / ITEMS_PER_PAGE));
    });
  }, []);

  const handleBuyNow = (productId) => {
    APIGetProductById(productId).then((rs) => {
      console.log(rs.data, "product");
      localStorage.setItem("productId", productId);
      navigate(`/product/${productId}`);
    });
  };

  return (
    <PageLayOut>
      <div
        className="menu"
        style={{
          width: 300,
          padding: 10,
          display: "flex",
          flexDirection: "column",
          marginLeft: "50px",
          marginRight: "40px",
        }}
      >
        {/* Bộ lọc */}
        <h3 style={{ marginTop: 20 }}>BỘ LỌC</h3>
        <Collapse defaultActiveKey={["1", "2", "3", "4", "5", "6"]} ghost>
          
          <Panel header="Loại Da" key="1">
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <Checkbox>Tất cả</Checkbox>
              <Checkbox>Hỗn hợp/Dầu</Checkbox>
              <Checkbox>Khô</Checkbox>
              <Checkbox>Bình thường</Checkbox>
              <Checkbox>Nhạy cảm</Checkbox>
            </div>
          </Panel>
          <Panel header="Loại Thành Phần" key="2">
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <Checkbox>Tất cả</Checkbox>
              <Checkbox>BHA/AHA</Checkbox>
              <Checkbox>B5</Checkbox>
              <Checkbox>Niacinamide</Checkbox>
              <Checkbox>Tranexamic acid</Checkbox>
            </div>
          </Panel>
          <Panel header="Làm Sạch Kép" key="3">
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <Checkbox>Tất cả</Checkbox>
              <Checkbox>Sữa rửa mặt</Checkbox>
              <Checkbox>Nước tẩy trang</Checkbox>
              <Checkbox>Dầu tẩy trang</Checkbox>
              <Checkbox>Tẩy tế bào chết</Checkbox>
            </div>
          </Panel>
          <Panel header="Giá" key="4">
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              {/* <Checkbox type="" >Dưới 500 vnđ</Checkbox>
       <Checkbox>500 vnđ - 1.000.000 vnđ</Checkbox>
       <Checkbox>1.000.000 vnđ - 2.000.000 vnđ</Checkbox> */}
              <Radio.Group
                onChange={(e) => {
                  setFilter({ key: "price", value: e.target.value });
                }}
                style={{ display: "flex", flexDirection: "column", gap: 8 }}
                options={listFillter[0].options}
              />
              <Slider range defaultValue={[0, 100]} />
            </div>
          </Panel>
        </Collapse>

        <Button type="primary" block style={{ marginTop: 10 }}>
          Tìm Kiếm
        </Button>
      </div>

      <div style={{ flex: 1 }}>
        <div className="product-list">
          {displayedProducts.map((product) => {
            const cheapestVariant = product?.variants.reduce(
              (min, variant) => (variant.price < min.price ? variant : min),
              product?.variants[0]
            );
            if (
              cheapestVariant.price > filter.value.split("-")[1] ||
              cheapestVariant.price < filter.value.split("-")[0]
            ) {
              return false;
            }
            return (
              <div
                key={product?.productId}
                className="product-card"
                onClick={() => handleBuyNow(product?.productId)}
              >
                <img
                  src={product?.avartarImageUrl}
                  alt={product?.productName}
                  className="product-image"
                />
                <h3 className="product-name">{product?.productName}</h3>
                <p className="product-price">
                  <span className="current-price">
                    {cheapestVariant.price.toLocaleString()} VND
                  </span>

                  <span className="original-price">
                    {Math.round(cheapestVariant.price * 1.1).toLocaleString()}{" "}
                    VND
                  </span>
                </p>

                <button
                  onClick={() => handleBuyNow(product?.productId)}
                  className="buy"
                >
                  Mua ngay
                </button>
                <p className="rating">
                  ⭐⭐⭐⭐⭐ {product?.totalFeedback} Đánh giá
                </p>
              </div>
            );
          })}
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`page-number ${
                  currentPage === index ? "active" : ""
                }`}
                onClick={() => setCurrentPage(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </PageLayOut>
  );
};

export default ProductList;
