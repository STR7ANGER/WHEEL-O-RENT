// src/services/carService.ts
import axios from "axios";
import { Car } from "../types/car";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const carService = {
  getAllCars: async (): Promise<Car[]> => {
    const response = await axios.get(`${API_URL}/api/car/all`);
    if (response.data.success) {
      return response.data.data;
    }
    throw new Error(response.data.message || "Failed to fetch cars");
  },
};
