import axios from "axios";

// Replace with your backend's base URL
const API_URL = "http://localhost:8000";

axios.defaults.withCredentials = true; // Include credentials for Cognito or other auth

// Fetch tasks for the logged-in user
export const fetchTasks = async () => {
  try {
    const response = await axios.get(`${API_URL}/tasks`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};

// Create a new task for the logged-in user
export const createTask = async (task) => {
  try {
    const response = await axios.post(`${API_URL}/tasks`, task);
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    return null;
  }
};
