import type { ChangeEvent, FormEvent } from "react";

export interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  productName: string;
  category: string;
  quantity: number;
  price: number;
  discount: number;
}

export interface OrderSummaryProps {
  formData: FormData;
  subtotal: number;
  discountAmount: number;
  totalCost: number;
}

export interface OptimizerFormProps {
  formData: FormData;
  submitted: boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleReset: () => void;
}
