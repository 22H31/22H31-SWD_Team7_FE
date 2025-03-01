// import React from "react";
import { Button, Avatar, Typography } from "antd";
import "./Banner.css"; 

const { Title, Paragraph } = Typography;

const Banner = () => {
  const fakeAvatars = [
    { id: 1, src: "https://randomuser.me/api/portraits/women/45.jpg" },
    { id: 2, src: "https://randomuser.me/api/portraits/men/32.jpg" },
    { id: 3, src: "https://randomuser.me/api/portraits/women/28.jpg" },
  ];

  return (
    <div className="banner">
      <div className="banner-content">
        <Title level={1} className="banner-title">
          Khuyến mãi <span className="banner-highlight">Dịp Hè</span>
        </Title>
        <Paragraph className="banner-text">
          Tận hưởng mức giảm giá lên tới <strong>45%</strong> giảm giá độc quyền và quà tặng kèm khi mua hàng.
        </Paragraph>
        <Button type="primary" className="banner-btn">
          Tham gia ưu đãi
        </Button>
        <div className="banner-participants">
          <div className="banner-avatars">
            {fakeAvatars.map((avatar) => (
              <Avatar key={avatar.id} src={avatar.src} className="ant-avatar" />
            ))}
            <Avatar className="banner-more">
              99+
            </Avatar>
          </div>
          <span className="banner-span">đã tham gia</span>
        </div>
      </div>
    </div>
  );
};

export default Banner;
