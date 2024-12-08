import axios from "axios";

// Replace with your backend's base URL
export const API_URL = import.meta.env.VITE_API_URL;

axios.defaults.withCredentials = true; // Include credentials for Cognito

// Fetch tasks for the logged-in user
export const fetchTasks = async () => {
  try {
    const response = await axios.get(`${API_URL}/tasks`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};

// Create a new task for the logged-in user
export const createTask = async (task) => {
  try {
    const response = await axios.post(`${API_URL}/tasks`, task, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    return null;
  }
};

export const deleteTask = async (taskId) => {
  try {
    const response = await axios.delete(`${API_URL}/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting task:", error);
    return null;
  }
}

// Update task (supports partial updates)
export const updateTask = async (taskId, updates) => {
  try {
    const response = await axios.put(`${API_URL}/tasks/${taskId}`, updates, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};