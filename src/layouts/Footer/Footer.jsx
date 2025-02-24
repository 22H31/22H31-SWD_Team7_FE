import {
  FacebookOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  XOutlined,
} from "@ant-design/icons";
import Search from "antd/es/input/Search";
import React from "react";
import "./index.scss";

export default function Footer() {
  const onSearch = (value) => {
    console.log("Subscribed with:", value);
  };

  return (
    <div className="footer">
      <div className="body-footer">
        <div
          className="hint"
          style={{
            width: "30%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {" "}
            <img src="/logo.svg" alt="" />
            <h3>CLCA</h3>
          </div>
          <p>
            Great platform for the job seeker that passionate about startups.
            Find your dream job easier.
          </p>
        </div>
        <div className="about">
          <h3>About</h3>
          <p>Companies</p>
          <p>Pricing</p>
          <p>Terms</p>
          <p>Advice</p>
          <p>Privacy Policy</p>
        </div>
        <div className="resources">
          <h3>Resources</h3>
          <p>Help Docs</p>
          <p>Guide</p>
          <p>Updates</p>
          <p>Contact Us</p>
        </div>
        <div className="get-job-notifications">
          <h3>Get job notifications</h3>
          <p>The latest job news, articles, sent to your inbox weekly.</p>
          <Search
            placeholder="Email Address"
            enterButton="Subscribe"
            size="large"
            onSearch={onSearch}
            readOnly
          />
        </div>
      </div>
      <div className="footer-bottom">
        <p>2024 @ CLCA</p>
        <div className="social-icons">
          <a href="#">
            <FacebookOutlined />
          </a>
          <a href="#">
            <XOutlined />
          </a>
          <a href="#">
            <InstagramOutlined />
          </a>
          <a href="#">
            <LinkedinOutlined />
          </a>
        </div>
      </div>
    </div>
  );
}
