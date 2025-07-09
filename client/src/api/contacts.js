import axios from "axios";

export const sendContact = (data) => axios.post("/api/contacts", data);