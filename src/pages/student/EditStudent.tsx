import type React from "react";
import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StudentForm from "../../components/student/StudentForm";
import {
  getStudentById,
  updateStudent,
} from "../../services/helper/api-functions/student.function";
import type {
  Student,
  StudentFormData,
} from "../../types/interface/student.interface";

const EditStudent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<StudentFormData>({
    name: "",
    email: "",
    phone: "",
    age: 18,
    course: "",
    address: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    let ignore = false;

    const fetchStudent = async () => {
      if (!id) {
        setError("Student ID is missing.");
        setLoading(false);
        return;
      }

      try {
        const response = await getStudentById(id);

        if (ignore) return;

        if (response.success && response.data) {
          const student = response.data as Student;

          setFormData({
            name: student.name,
            email: student.email,
            phone: student.phone,
            age: student.age,
            course: student.course,
            address: student.address || "",
          });
        } else {
          setError(response.message || "Failed to fetch student.");
        }
      } catch {
        if (!ignore) {
          setError("Something went wrong while fetching student details.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchStudent();

    return () => {
      ignore = true;
    };
  }, [id]);

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

    if (!id) {
      setError("Student ID is missing.");
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const response = await updateStudent(id, formData);

      if (response.success) {
        setSuccess(response.message || "Student updated successfully!");

        setTimeout(() => {
          navigate("/student-management");
        }, 800);
      } else {
        setError(response.message || "Failed to update student.");
      }
    } catch {
      setError("Something went wrong while updating the student.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-[#F7F4EF] px-4 py-16 text-center text-[#21152B]">
        Loading student details...
      </section>
    );
  }

  if (error && !formData.name) {
    return (
      <section className="min-h-screen bg-[#F7F4EF] px-4 py-16 text-center text-[#21152B]">
        <p className="mb-4 text-red-700">{error}</p>
        <button
          type="button"
          onClick={() => navigate("/student-management")}
          className="cursor-pointer rounded-xl bg-[#D7FF64] px-5 py-3 font-semibold text-[#21152B]"
        >
          Back to Students
        </button>
      </section>
    );
  }

  return (
    <StudentForm
      title="Edit Student"
      buttonText="Save Changes"
      formData={formData}
      loading={saving}
      error={error}
      success={success}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
};

export default EditStudent;
