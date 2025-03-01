import React, { useState } from "react";
import { SUser } from "../../../store/store";
import { Avatar, Dropdown, Image, Upload } from "antd";
import { toast } from "react-toastify";
import { BaseURLAvatar } from "../../../const/const";
import { APIUploadAvatar } from "../services/api";

export default function AvatarProfile() {
  const [isPreviewVisible, setPreviewVisible] = useState(false);
  const user = SUser.use();
  console.log(user);
  const items = [
    {
      key: "1",
      label: (
        <Upload
          action={(file) => {
            const formData = new FormData();
            formData.append("file", file);
            APIUploadAvatar(formData)
              .then((data) => {
                console.log(data);
                SUser.set((v) => (v.value.avatar = data?.data?.data));
                toast.success("Update Avatar Success");
              })
              .catch((error) => {
                console.error(error);
              });
            console.log(file);
          }}
          fileList={[]}
        >
          Update Avatar
        </Upload>
      ),
      onClick: () => {},
    },
    {
      key: "2",
      label: "View Avatar",
      onClick: () => {
        setPreviewVisible(!isPreviewVisible);
      },
    },
    // {
    //   key: "2",
    //   label: <Link to={"/login"}>1st menu item</Link>,
    // },
  ];
  return (
    <div>
      <Dropdown
        menu={{
          items,
        }}
        placement="bottomRight"
      >
        <Image
          height={100}
          width={100}
          style={{ borderRadius: "99%", objectFit: "cover" }}
          preview={{
            getContainer: false,
            visible: isPreviewVisible,
            onVisibleChange: (visible, prevVisible) =>
              setPreviewVisible(visible),
          }}
          src={
            user?.avatar
              ? BaseURLAvatar + user?.avatar
              : "https://api.dicebear.com/7.x/miniavs/svg?seed=1"
          }
        />
      </Dropdown>

      {/* <Upload
        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        listType="picture-circle"
        // fileList={fileList}
        // onPreview={handlePreview}
        // onChange={handleChange}
      >
      </Upload> */}
    </div>
  );
}
