import axios from "axios";

export const createPayment = (paymentData) => axios.post("/api/payments", paymentData);
export const getPayments = () => axios.get("/api/payments");