import React from "react";
import "./JapaneseCosmetics.css";

const JapaneseCosmetics = () => {
  return (
    <div className="japanese-cosmetics">
      <div className="cosmetics-image">
        <img
          src="https://catim.vn/wp-content/uploads/2021/11/san-pham-hada-labo.jpeg"
          alt="Hada Labo Nhật Bản"
        />
      </div>
      <div className="cosmetics-content">
        <h2 className="cosmetics-title">MỸ PHẨM ĐẾN TỪ NHẬT BẢN</h2>
        <h3 className="cosmetics-subtitle">
          Top 10 Thương Hiệu Mỹ Phẩm Đến Từ Nhật Bản
        </h3>
        <p className="cosmetics-description">
          Mỹ phẩm đến từ Nhật Bản rất được ưa chuộng tại Việt Nam một phần bởi
          chất lượng tốt và mẫu mã đa dạng. Về mức chi phí cho mỗi sản phẩm cũng
          khá là phù hợp với thu nhập của phần đa người dùng mỹ phẩm. Hầu hết
          các mỹ phẩm đến từ Nhật Bản luôn được nhắc đến là những sản phẩm lành
          tính với da, chiết xuất từ thiên nhiên, rất tốt cho da.Vậy chị em nên
          dùng thương hiệu mỹ phẩm làm đẹp nào của Nhật, trong bài viết hôm nay
          ....
        </p>
        <ul className="cosmetics-brands">
          <li>• Naris Cosmetics</li>
          <li>• Sunplay</li>
          <li>• DHC</li>
          <li>• Hatomugi</li>
        </ul>
        <button className="cosmetics-button">Xem thêm</button>
      </div>
    </div>
  );
};

export default JapaneseCosmetics;
