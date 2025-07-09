import axios from "axios";

export const getDashboardSummary = () => axios.get("/api/dashboard/summary");