import axios from "axios";

export const getProfile = () => axios.get("/api/users/me");
export const updateProfile = (data) => axios.put("/api/users/me", data);
export const getUserById = (id) => axios.get(`/api/users/${id}`);