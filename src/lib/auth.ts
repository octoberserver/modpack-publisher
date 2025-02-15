import { User } from '../types';

// In a real app, this would be handled by a backend
const DEMO_USER: User = {
  username: 'admin',
  password: 'admin123'
};

export const authenticateUser = (username: string, password: string): boolean => {
  return username === DEMO_USER.username && password === DEMO_USER.password;
};

export const setAuthToken = () => {
  localStorage.setItem('isAuthenticated', 'true');
};

export const clearAuthToken = () => {
  localStorage.removeItem('isAuthenticated');
};

export const isAuthenticated = (): boolean => {
  return localStorage.getItem('isAuthenticated') === 'true';
};
