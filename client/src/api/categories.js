import axios from "axios";

export const getCategories = () => axios.get("/api/categories");
export const getCategoryById = (id) => axios.get(`/api/categories/${id}`);