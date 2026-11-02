import type React from "react";
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import StudentForm from "../../components/student/StudentForm";
import { addStudent } from "../../services/helper/api-functions/student.function";
import type { StudentFormData } from "../../types/interface/student.interface";

const AddStudent: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<StudentFormData>({
    name: "",
    email: "",
    phone: "",
    age: 18,
    course: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: name === "age" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await addStudent(formData);

      if (response.success) {
        setSuccess(response.message || "Student added successfully!");

        setTimeout(() => {
          navigate("/student-management");
        }, 800);
      } else {
        setError(response.message || "Failed to add student.");
      }
    } catch {
      setError("Something went wrong while adding the student.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <StudentForm
      title="Add Student"
      buttonText="Add Student"
      formData={formData}
      loading={loading}
      error={error}
      success={success}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
};

export default AddStudent;
