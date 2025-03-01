import { api } from "../../../api/axios";

export const APIUpdatePass = (password) =>
  api.patch("user", { password: password });
export const APIDeleteCV = (name) =>
  api.delete("user/cv", {
    data: { name: name },
  });
export const APIGetCV = () => api.get("user/cv");
export const APIUploadCV = (formData) =>
  api.post("user/cv", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const APIUpdateProfile = (
  name,
  dob,
  description,
  address,
  phone,
  school,
  major,
  degree
) =>
  api.put("user", {
    name: name,
    dob: dob,
    description: description,
    address: address,
    phone: phone,
    school: school,
    major: major,
    degree: degree,
  });
export const APIGetInformation = () => api.get("user");
export const APIUploadAvatar = (formData) =>
      api.post("user/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
