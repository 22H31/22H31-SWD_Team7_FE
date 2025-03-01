import { Button, Input, Modal, Popconfirm } from "antd";
import Form from "antd/es/form/Form";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { APIUpdatePass } from "../services/api";

export default function ChangePassWord() {
  const [isModalChangePassOpen, setIsModalChangePassOpen] = useState(false);
  const [form] = Form.useForm();

  const showModalChangePass = () => {
    setIsModalChangePassOpen(true);
  };

  const handleCancelChangePass = () => {
    setIsModalChangePassOpen(false);
    form.resetFields();
  };

  const onFinishChangePass = async (values) => {
    try {
      await APIUpdatePass(values.newPassword);
      toast.success("Password changed successfully!");
      handleCancelChangePass();
    } catch (error) {
      toast.error(error.response?.data?.msg || "Failed to change password!");
    }
  };
  return (
    <>
      <Modal
        title="Change Password"
        visible={isModalChangePassOpen}
        onCancel={handleCancelChangePass}
        footer={[
          <Button key="back" onClick={handleCancelChangePass}>
            Cancel
          </Button>,
          <Popconfirm
            title="Are you sure you want to change your password?"
            onConfirm={() => form.submit()}
            okText="Yes"
            cancelText="No"
          >
            <Button key="submit" type="primary">
              Change Password
            </Button>
          </Popconfirm>,
        ]}
      >
        <Form form={form} layout="vertical" onFinish={onFinishChangePass}>
          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[
              { required: true, message: "Please enter your new password!" },
              {
                min: 8,
                message: "Password must be at least 8 characters long!",
              },
            ]}
          >
            <Input.Password placeholder="Enter your new password" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm your new password" />
          </Form.Item>
        </Form>
      </Modal>
      <div
        className="update-pass"
        style={{
          display: "flex",
          gap: "78px",
          alignItems: "center",
          width: "611px",
          height: "130px",
        }}
      >
        <div style={{ width: "260px", height: "83px" }}>
          <h3 style={{ fontSize: "16px", marginBottom: "5px" }}>
            New Password
          </h3>
          <p style={{ fontSize: "16px", marginBottom: "5px" }}>
            Manage your password to make sure it is safe
          </p>
        </div>
        <div>
          <Button
            type="primary"
            onClick={showModalChangePass}
            style={{
              width: "193px",
              height: "50px",
              backgroundColor: "rgb(70, 64, 222)",
              color: "#fff",
              marginLeft: "10px",
              padding: "0 30px",
              fontSize: "16px",
              borderRadius: "0",
            }}
          >
            Change Password
          </Button>
        </div>
      </div>
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
