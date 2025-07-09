import axios from "axios";

export const getShopList = () => axios.get("/api/products");
export const getShopDetail = (id) => axios.get(`/api/products/${id}`);