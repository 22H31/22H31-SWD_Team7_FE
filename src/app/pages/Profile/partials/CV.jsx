import { DeleteOutlined, FilePdfOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Image, Input, Modal, Popconfirm } from "antd";
import React, { useState } from "react";
import { BaseURLCV } from "../../../const/const";
import FormItem from "antd/es/form/FormItem";
import { toast } from "react-toastify";
import { APIDeleteCV } from "../services/api";

export default function CV({ name, path, getListCV }) {
  const [visible, setVisible] = useState(false);
  const onConfirm = () => {
    console.log(name);
    APIDeleteCV(name).then((data) => {
      console.log(data);
      toast.success(`Deleted ${name} successfully`);
      getListCV();
    });
  };
  return (
    <>
      <Col span={12} className="component-cv">
        <Card
          style={{
            textAlign: "center",
            backgroundColor: "#E5E9EDFF",
            borderRadius: "8px",
            width: "100%",
          }}
          size="small"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Button
              style={{
                alignItems: "center",
                backgroundColor: "#CED4D900",
                border: "none",
                // padding: "8px",
              }}
              onClick={() => setVisible(true)}
            >
              <FilePdfOutlined style={{ fontSize: "32px", color: "#1890ff" }} />
              <Image
                style={{ display: "none" }}
                src={BaseURLCV + path}
                preview={{
                  visible,
                  //   scaleStep,
                  src: BaseURLCV + path,
                  onVisibleChange: (value) => {
                    setVisible(value);
                  },
                }}
              />
              <div style={{ flexGrow: 1 }}>
                <p style={{ fontWeight: "bold" }}>{name.substring(0, 12)}</p>
                {/* <p style={{ color: "#8c8c8c" }}>{cv.uploadTime}</p> */}
              </div>
            </Button>
            <Popconfirm
              title="Delete the task"
              description={`Are you sure to delete ${name}?`}
              onConfirm={onConfirm}
              // onCancel={cancel}
              className="popconfirm-delete"
              placement="bottomRight"
              okText="Yes"
              okType="danger"
            >
              <Button
                className="button-delete"
                style={{ padding: "4px" }}
                danger
              >
                <DeleteOutlined style={{ fontSize: "16px" }} theme="outlined" />
              </Button>
            </Popconfirm>
          </div>
        </Card>
      </Col>
    </>
  );
}
