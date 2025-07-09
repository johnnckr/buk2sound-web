import axios from "axios";

export const enrollCourse = (courseId) => axios.post(`/api/enrollments`, { courseId });
export const getMyEnrollments = () => axios.get("/api/enrollments/me");