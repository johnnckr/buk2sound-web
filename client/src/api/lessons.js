import axios from "axios";

export const getLesson = (id) => axios.get(`/api/lessons/${id}`);
export const getLessonsByCourse = (courseId) => axios.get(`/api/courses/${courseId}/lessons`);