import axios from "axios";

const BASE_URL = "http://localhost:5000/api"; // Backend URL

export const registerUser = async (email, username, password, role) => {
  return await axios.post(`${BASE_URL}/register`, { email, username, password, role });
};


export const loginUser = async (email, password) => {
  return await axios.post(`${BASE_URL}/login`, { email, password }); // Send email instead of username
};
