// src/data/api.ts
import axios, { AxiosError } from 'axios';
import { User, UserCreate, UserUpdate, Token } from '../types';

const API_URL = 'http://localhost:8000'; // Adjust if your backend URL differs

// Helper to get the auth token from localStorage
const getAuthHeader = () => {
  const token = localStorage.getItem('access_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Register a new user
export const registerUser = async (userData: UserCreate): Promise<User> => {
  try {
    const response = await axios.post<User>(`${API_URL}/users/`, userData);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ detail: string }>;
    throw new Error(axiosError.response?.data.detail || 'Registration failed');
  }
};

// Login and get access token
export const loginUser = async (email: string, password: string): Promise<Token> => {
  try {
    const response = await axios.post<Token>(
      `${API_URL}/users/login`,
      new URLSearchParams({ username: email, password }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
    localStorage.setItem('access_token', response.data.access_token);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ detail: string }>;
    throw new Error(axiosError.response?.data.detail || 'Login failed');
  }
};

// Get current user
export const getCurrentUser = async (): Promise<User> => {
  try {
    const response = await axios.get<User>(`${API_URL}/users/me`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ detail: string }>;
    throw new Error(axiosError.response?.data.detail || 'Failed to fetch user');
  }
};

// Get user by ID
export const getUserById = async (userId: string): Promise<User> => {
  try {
    const response = await axios.get<User>(`${API_URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ detail: string }>;
    throw new Error(axiosError.response?.data.detail || 'Failed to fetch user');
  }
};

// Update user
export const updateUser = async (userId: string, userData: UserUpdate): Promise<User> => {
  try {
    const response = await axios.put<User>(`${API_URL}/users/${userId}`, userData, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ detail: string }>;
    throw new Error(axiosError.response?.data.detail || 'Update failed');
  }
};

// Delete user
export const deleteUser = async (userId: string): Promise<{ detail: string }> => {
  try {
    const response = await axios.delete<{ detail: string }>(`${API_URL}/users/${userId}`, {
      headers: getAuthHeader(),
    });
    localStorage.removeItem('access_token'); // Clear token on deletion
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ detail: string }>;
    throw new Error(axiosError.response?.data.detail || 'Deletion failed');
  }
};

// Search users
export const searchUsers = async (email?: string, artist_name?: string): Promise<User[]> => {
  try {
    const params = new URLSearchParams();
    if (email) params.append('email', email);
    if (artist_name) params.append('artist_name', artist_name);
    const response = await axios.get<User[]>(`${API_URL}/users/search/`, { params });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ detail: string }>;
    throw new Error(axiosError.response?.data.detail || 'Search failed');
  }
};