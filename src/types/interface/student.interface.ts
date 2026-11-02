export interface Student {
  $id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  course: string;
  address?: string;
}

export interface StudentFormData {
  name: string;
  email: string;
  phone: string;
  age: number;
  course: string;
  address: string;
}
