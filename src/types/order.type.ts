export interface JobOrder {
  id: string;
  title: string;
  image: string;
  salary: string;
  date: string;
  location: string;
  age: string;
  description: string;
  category: string;
  country: string;
  gender: "male" | "female" | "both";
  testLocation: string;
}

export interface OrderFilterParams {
  page?: number;
  limit?: number;
  country?: string;
  category?: string;
  testLocation?: string;
  gender?: string;
  birthYear?: string;
}

export interface OrderResponse {
  data: JobOrder[];
  total: number;
  page: number;
  totalPages: number;
}
