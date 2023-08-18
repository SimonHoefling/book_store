// src/services/api.ts
import axios from 'axios';

const API_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Accept': 'application/json, */*',
  },
});

// Authenticate and set Bearer token for future requests
export const authenticate = async () => {
  const response = await api.post('/login', {
    username: 'admin',
    password: 'admin',
  });
  api.defaults.headers['Authorization'] = `Bearer ${response.data}`;
  return response.data;
};

// Fetch sorted list of books
export const fetchBooks = async () => {
  await authenticate();
  return api.get('/books?sort=title');
};

// Update a specific book's details
export const updateBook = async (id: string, data: any) => {
  await authenticate();
  return api.patch(`/books/${id}`, data);
};

// Create a new book entry
export const createBook = async (data: any) => {
  await authenticate();
  return api.post('/books', data);
};

// Delete a specific book
export const deleteBook = async (id: string) => {
  await authenticate();
  return api.delete(`/books/${id}`);
};

export default api;
