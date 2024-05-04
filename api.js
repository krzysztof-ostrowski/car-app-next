import axios from "axios";

const API_URL = "https://localhost:5000/cars";

export const fetchCars = () => axios.get(API_URL);
export const fetchCar = (id) => axios.get(`${API_URL}/${id}`);
export const createCar = (car) => axios.post(API_URL, car);
export const updateCar = (id, car) => axios.put(`${API_URL}/${id}`, car);
export const deleteCar = (id) => axios.delete(`${API_URL}/${id}`);
