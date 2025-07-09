import axios from "axios";

export const getCart = () => axios.get("/api/cart");
export const addToCart = (item) => axios.post("/api/cart", item);
export const removeFromCart = (id) => axios.delete(`/api/cart/${id}`);