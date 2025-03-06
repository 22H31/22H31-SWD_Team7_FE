import api from "./axios";

export const APIlogin = (userName, passWord) =>
    api.post("account/login", { username: userName, password: passWord });