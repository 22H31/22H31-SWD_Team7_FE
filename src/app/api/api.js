import api from "./axios";

export const APIlogin = (userName, passWord) =>
  api.post("account/login", { username: userName, password: passWord });
export const APIregis = (user) =>
  api.post("account/register", {
    userName: user.userName,
    name: "",
    email: user.email,
    password: user.password,
    phoneNumber: "",
    //     userName: "11221",
    // name:"122122",
    // email: "1212@gmail.com",
    // password:"1@NaaaaaaaaaNaaaaaaaaa",
    // phoneNumber: "122333313121122333313121",
  });
export const APIForgotpass = (user) =>
  api.post("account/forgot-password", { email: user.email });
export const APIGetInformation = () =>
  api.get("User", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
export const APIChangePassword = (
  currentPassword,
  newPassword,
  newPasswordConfirmation
) =>
  api.post(
    "account/change-password",
    {
      currentPassword: currentPassword,
      newPassword: newPassword,
      newPasswordConfirmation: newPasswordConfirmation,
    },
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );

export const APIGetUserId = (userId) =>
  api.get(`User/${userId}`);
  export const APILogOut= () => api.post("account/logout")
