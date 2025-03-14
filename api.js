import axios from 'axios';

const API_URL = 'https://13a7-185-13-180-48.ngrok-free.app/api/'; 

export const registerUser = async (first_name, last_name, email, phone, password) => {
  try {
    const response = await axios.post(`${API_URL}register`, {
      first_name,
      last_name,
      email,
      phone,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error during registration :", error.response?.data || error.message);
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}login`, { email, password });
    return response.data;
  } catch (error) {
    console.error("Error during login :", error.response?.data || error.message);
    throw error;
  }
};

export const fetchUserProfile = async (token) => {
  try {
    const response = await axios.get(`${API_URL}me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile :", error.response?.data || error.message);
    throw error;
  }
};

export const updateAccount = async (token, data) => {
  try {
    const response = await axios.put(`${API_URL}updateProfile`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating profile :", error.response?.data || error.message);
    throw error;
  }
};
export const addSubscription = async (token, userId, productId) => {
  try {
    const response = await axios.post(
      `${API_URL}subscriptions/add`,
      { userId, productId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding subscription :", error.response?.data || error.message);
    throw error;
  }
};

export const removeSubscription = async (token, userId, productId) => {
  try {
    const response = await axios.delete(
      `${API_URL}subscriptions/remove`,
      { 
        headers: { Authorization: `Bearer ${token}` },
        data: { userId, productId } 
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error removing subscription :", error.response?.data || error.message);
    throw error;
  }
};

export const fetchProducts = async (token) => {
  try {
    const response = await axios.get(`${API_URL}dashboard`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products :", error.response?.data || error.message);
    throw error;
  }
};

export const fetchDashboardData = async (token) => {
  try {
    const response = await axios.get(`${API_URL}dashboard`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard data :", error.response?.data || error.message);
    throw error;
  }
};
