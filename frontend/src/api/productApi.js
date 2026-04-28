import axios from "axios";
const API_URL = "http://localhost:5129/api/products";
export const getProducts = () => axios.get(API_URL);
export const createProduct = (formData) => axios.post(API_URL, formData);
export const updateProduct = (id, formData) => axios.put(`${API_URL}/${id}`, formData);
export const deleteProduct = (id) => axios.delete(`${API_URL}/${id}`);