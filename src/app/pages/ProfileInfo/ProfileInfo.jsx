import { Avatar, Button, Form, Input, message, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { APIGetUserId, APIPutUserId, APIUserImg } from "../../api/api";
import { SSpin } from "../../globalVariable/spin";
import { useNavigate } from "react-router";
import { UploadOutlined } from "@ant-design/icons";

export default function ProfileInfo() {
  const UserID = localStorage.getItem("userID");
  const [profile, setProfile] = useState([]);
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const storedUser = localStorage.getItem("user");
  //   if (storedUser) {
  //     try {
  //       const parsedUser = JSON.parse(storedUser); // Chuyển từ chuỗi JSON về object
  //       setUser(parsedUser);
  //       console.log(user.email);
  //       console.log(user.phoneNumber); // Lấy số điện thoại
  //     } catch (error) {
  //       console.error("Lỗi khi parse dữ liệu user:", error);
  //     }
  //   }
  // }, []);
  const [form] = Form.useForm();
  const navigate = useNavigate();

    
  const onFinish = (values) => {
    SSpin.set(true);
    APIPutUserId(values, UserID)
      .then((rs) => {
        if (rs?.status === 200) {
          message.success("Cập nhật thành công!");
          getData();
        }
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        message.error(error.response?.data?.message || "Có lỗi xảy ra!");
      })
      .finally(() => {
        SSpin.set(false);
      });
  };
  const getData = () => {
    if (UserID) {
      console.log("oki m");
      SSpin.set(true);
      APIGetUserId(UserID)
        .then((response) => {
          console.log(response, "hi");
          if (!response || !response.data) {
            console.error("API không trả về dữ liệu hợp lệ:", response);
            return;
          }
          setProfile(response.data);
          const profile = response.data;
          console.log(profile, "1");
          form.setFieldsValue({
            avatar: profile.avatar,
            email: profile.email,
            name: profile.name,
            phone: profile.phoneNumber,
            address: profile.address,
            dateOfBirth: profile.dateOfBirth,
            skinType: profile.skinType,
          });
        })
        .catch((error) => {
          console.error(
            "Lỗi khi gọi API:",
            error.response?.data || error.message
          );
        })
        .finally(() => {
          SSpin.set(false);
        });
    } else {
      console.warn("Không tìm thấy UserID trong localStorage");
    }
  };
  
  
  useEffect(() => {
    getData();
  }, []);

  
  
  const handleUpload = async (file) => {
    if (!file) {
      message.error("Vui lòng chọn ảnh!");
      return;
    }
  
    const formData = new FormData();
    formData.append("fileDtos", file);
  
    try {
      const response = await APIUserImg(UserID, formData);
      if (response?.status === 200) {
        message.success("Tải ảnh lên thành công!");
        getData(); // Cập nhật profile
        localStorage.setItem("userAvatar", response.data.avatar); // Lưu avatar vào localStorage
        window.dispatchEvent(new Event("storage")); // Kích hoạt sự kiện cập nhật header
      } else {
        message.error("Có lỗi xảy ra khi tải ảnh!");
      }
    } catch (error) {
      console.error("Lỗi khi upload ảnh:", error.response?.data || error.message);
      message.error(error.response?.data?.message || "Upload ảnh thất bại!");
    }
  };
  
  
  
  
  
  
  
  
  

  

  return (
    <div style={{ margin: "10px" }}>
      <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item label="Ảnh đại diện:">
  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
    <Avatar size={100} src={profile.avatar} />
    <Upload
  showUploadList={false}
  beforeUpload={(file) => {
    handleUpload(file);
    return false; // Ngăn Ant Design tự động upload
  }}
>
  <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
</Upload>



  </div>
</Form.Item>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          <Form.Item name="name" label="Tên:" style={{ flex: 1 }}>
            <Input
              placeholder="Tên"
              // value={userData?.name || "Vui lòng cập nhật thông tin!"}
            />
          </Form.Item>

          <Form.Item name="phone" label="Số điện thoai:" style={{ flex: 1 }}>
            <Input
              placeholder="Số điện thoai"

              // value={userData?.phoneNumber || "Vui lòng cập nhật thông tin!"}
            />
          </Form.Item>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          <Form.Item name="address" label="Địa chỉ:" style={{ flex: 1 }}>
            <Input
              placeholder="Địa chỉ"
              // value={userData?.name || "Vui lòng cập nhật thông tin!"}
            />
          </Form.Item>

          <Form.Item name="dateOfBirth" label="Ngày sinh:" style={{ flex: 1 }}>
            {/* <DatePicker onChange={onChange} /> */}
            <Input
              placeholder="Ngày sinh"
              // value={userData?.name || "Vui lòng cập nhật thông tin!"}
            />
          </Form.Item>
        </div>
        <div>
          <Form.Item name="skinType" label="Loại da:">
            <Input
              style={{
                display: "flex",
                alignItems: "center",
              }}
              placeholder="Loại da"
              readOnly
              suffix={
                <Button
                  style={{ backgroundColor: "#ffcccc", color: "black" }}
                  type="primary"
                  onClick={() => navigate("/quiz")}
                >
                  Cập Nhật Loại Da Của Bạn
                </Button>
              }
            />
          </Form.Item>
        </div>

        <Form.Item style={{ display: "flex", justifyContent: "left" }}>
          <Button
            block
            htmlType="submit"
            style={{
              backgroundColor: "#C0437F",
              color: "white",
              height: "40px",
              width: "200px",
              borderRadius: "10px",
            }}
          >
            Lưu
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
