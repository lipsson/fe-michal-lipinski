import axios from 'axios';

const PORT = import.meta.env.VITE_API_PORT ?? 3000;

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? `http://localhost:${PORT}`,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN ?? 'super-secret-doodle-token'}`,
    'Content-Type': 'application/json',
  },
});
