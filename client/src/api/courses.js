import axios from "axios";

export const getCourses = () => axios.get("/api/courses");
export const getCourseDetail = (id) => axios.get(`/api/courses/${id}`);