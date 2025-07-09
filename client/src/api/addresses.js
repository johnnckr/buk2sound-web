import axios from "axios";

export const getAddresses = () => axios.get("/api/addresses");
export const addAddress = (data) => axios.post("/api/addresses", data);
export const updateAddress = (id, data) => axios.put(`/api/addresses/${id}`, data);
export const deleteAddress = (id) => axios.delete(`/api/addresses/${id}`);