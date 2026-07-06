import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.nexus.local',
  timeout: 10000,
});

export const apiClient = instance;

export const setAuthToken = (token: string) => {
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const clearAuthToken = () => {
  delete instance.defaults.headers.common['Authorization'];
};
