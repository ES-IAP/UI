import axios from "axios";

const API_URL = "http://localhost:8000"; // Your backend URL

export const login = () => {
  window.location.href = `${API_URL}/login`;
};

export const logout = async () => {
  await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
};

export const getCurrentUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/me`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("User not logged in or session expired");
    return null;
  }
};
