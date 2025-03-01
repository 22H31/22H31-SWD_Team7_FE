import { Button, Card, Col, Form, Input, Modal, Row, Upload } from "antd";
import FormItem from "antd/es/form/FormItem";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  FileAddOutlined,
  FilePdfOutlined,
  UploadOutlined,
} from "@ant-design/icons";

import CV from "./CV";
import { sListCV } from "../profileStore";
import { APIGetCV, APIUploadCV } from "../services/api";
import { SSpin } from "../../../store/store";
export default function UploadCV() {
  const listCV = sListCV.use();
  const getListCV = () => {
    APIGetCV()
      .then((data) => {
        console.log(data);
        sListCV.set(data?.data?.data);
      })
      .catch((error) => {
        toast.error(error.response?.data?.msg);
      });
  };

  const uploadCV = (file) => {
    console.log(file);
    const formData = new FormData();
    // Thêm file vào FormData
    formData.append("file", file);
    SSpin.set(true);
    APIUploadCV(formData)
      .then((data) => {
        console.log(data);
        toast.success("Upload CV Successfully");
        getListCV();
      })
      .catch((error) => {
        toast.error(error.response?.data?.msg);
      }).finally(()=> {SSpin.set(false)});
  };
  useEffect(() => {
    getListCV();
  }, []);
  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      toast.error("You can only upload image files!");
    }
    return isImage; // Chỉ cho phép upload nếu là file hình ảnh
  };

  return (
    <>
      <div
        className="view-favorite-job"
        style={{
          width: "611px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <h3
            style={{
              fontSize: "16px",
            }}
          >
            My CV
          </h3>
          {listCV?.length < 5 && (
            <div>
              <Upload
                action={(file) => uploadCV(file)}
                fileList={[]}
                style={{ width: "100%" }}
                beforeUpload={beforeUpload}
              >
                <Button style={{ width: "100%" }} icon={<UploadOutlined />}>
                  Add new CV
                </Button>
              </Upload>
            </div>
          )}
        </div>

        <Row
          gutter={[24, 24]}
          style={{ paddingRight: "12px", marginBottom: "24px" }}
        >
          {listCV?.map((cv, index) => (
            <CV
              key={index}
              name={cv?.name}
              path={cv?.path}
              getListCV={getListCV}
            />
          ))}
        </Row>
      </div>
      {/* <div
        className="upload-cv"
        style={{
          display: "flex",
          gap: "114px",
          alignItems: "center",
          width: "611px",
          height: "195px",
        }}
      >
        <div style={{ width: "260px", height: "83px" }}>
          <h3 style={{ fontSize: "16px", marginBottom: "5px" }}>
            Upload New CV
          </h3>
          <p style={{ fontSize: "16px", marginBottom: "5px" }}>
            Upload your CV to diversify your profile
          </p>
        </div>
        <div>
          <Button
            style={{
              height: "50px",
              width: "131px",
              backgroundColor: "rgb(70, 64, 222)",
              color: "#fff",
              marginLeft: "10px",
              padding: "0 30px",
              fontSize: "16px",
              borderRadius: "0",
            }}
            onClick={showModalUploadCV}
          >
            Upload CV
          </Button>
        </div>
      </div> */}
      <div
        style={{
          width: "611px",
          borderBottom: "1px solid #e0e0e0",
          margin: "16px 0",
        }}
      ></div>
    </>
  );
}
