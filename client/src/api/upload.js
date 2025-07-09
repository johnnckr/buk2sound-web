import axios from "axios";

export const uploadFile = (formData) =>
  axios.post("/api/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });