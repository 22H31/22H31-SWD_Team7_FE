import React from "react";
import "./index.scss";
export default function PageLayOut({ children, isContent }) {
  return (
    <div className="page-layout">
      {isContent ? (
        <div
          style={{
            maxWidth: "1296px",
            width: "100%",
            backgroundColor: "rgb(228, 241, 249)",
            marginBottom: "16px",
            borderRadius: "8px",
            minHeight: "700px",
          }}
        >
          <div style={{ padding: "64px 64px" }}>{children} </div>
        </div>
      ) : (
        <>{children}</>
      )}
    </div>
  );
}
