import { signify } from "react-signify";

export const cartLenght = signify(parseInt(localStorage.getItem("cartItemsLength")) || 0);
export const finalTotal = signify(0);