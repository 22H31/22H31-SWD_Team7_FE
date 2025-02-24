import { Button, Input } from "antd";
import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import NavigationBar from "../NavigationBar/NavigationBar";
import "./index.scss"
export default function HeaderDefault() {
  const { Search } = Input;

  const onSearch = (value, _e, info) => console.log(info?.source, value);
  return (
    <>
      <div>
        <div className="Header">
          <div className="tittle">
            <h5>TLTT</h5>
          </div>
          <div className="find">
            <Search
              style={{
                width: 400,
              }}
              placeholder="input search text"
              enterButton={
                <Button style={{ backgroundColor: "#C0437F", color: "white" }}>
                 
                  <SearchOutlined
                    style={{
                      fontSize: 16,
                    }}
                  />
                  Search
                </Button>
              }
              size="middle"
              onSearch={onSearch}
            />
          </div>
          <div>
            {" "}
            <p>Tun Tun</p>
          </div>
        </div>
      </div>
      <NavigationBar />
    </>
  );
}
