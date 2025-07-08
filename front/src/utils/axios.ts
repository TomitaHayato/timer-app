import axios from 'axios';

// Cookieを伴わないリクエスト
export const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
})

// Cookieを伴うリクエスト
export const clientCredentials = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 2000,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
})
