// src/types/car.ts
export interface Car {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string[]; // Array of image URLs
    location: string;
    category: string;
    date: string;
    userId: string;
  }