import api from "./axios";

export const APIlogin = (userName, passWord) =>
  api.post("account/login", { username: userName, password: passWord });
export const APIregis = (
user
) =>
  api.post("account/register", {
    userName: user.userName,
    name: "123213213",
    email: user.email,
    password: user.password,
    phoneNumber: "11232131123213",
    //     userName: "11221",
    // name:"122122",
    // email: "1212@gmail.com",
    // password:"1@NaaaaaaaaaNaaaaaaaaa",
    // phoneNumber: "122333313121122333313121",
  });
  export const APIForgotpass = (user) =>
    api.post("account/forgot-password", { email: user.email });
  export const APIGetInformation = () => api.get("User");