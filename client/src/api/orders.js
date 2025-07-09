import axios from "axios";

export const createOrder = (orderData) => axios.post("/api/orders", orderData);
export const getOrders = () => axios.get("/api/orders");