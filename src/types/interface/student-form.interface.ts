import type { ChangeEvent, FormEvent } from "react";
import type { StudentFormData } from "./student.interface";

export interface StudentFormProps {
  title: string;
  buttonText: string;
  formData: StudentFormData;
  loading: boolean;
  error: string;
  success: string;
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}
