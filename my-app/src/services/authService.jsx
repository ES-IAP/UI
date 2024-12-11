import axios from "axios";
import { toast } from "react-toastify";


export const API_URL = import.meta.env.VITE_API_URL;
console.log(API_URL);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      toast.error("Session expired. Redirecting to login.");
      window.location.href = `${API_URL}/login`; // Redirect to login
    }
    return Promise.reject(error);
  }
);

export const login = () => {
  window.location.href = `${API_URL}/login`;
};

export const logout = async () => {
  try {
    // Redirect user to the backend logout endpoint
    window.location.href = `${API_URL}/logout`;
  } catch (error) {
    console.error("Error during logout:", error);
    alert("Logout failed. Please try again.");
  }
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
