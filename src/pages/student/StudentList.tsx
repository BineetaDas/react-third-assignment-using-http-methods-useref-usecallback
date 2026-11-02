import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Eye, Pencil, Trash2, UserPlus, Users, RefreshCw } from "lucide-react";
import {
  getStudents,
  deleteStudent,
} from "../../services/helper/api-functions/student.function";
import type { Student } from "../../types/interface/student.interface";
import DeleteConfirmModal from "../../components/student/DeleteConfirmModal";

const StudentList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [deleting, setDeleting] = useState<boolean>(false);

  // Fetch students
  useEffect(() => {
    let ignore = false;

    const loadStudents = async () => {
      setLoading(true);
      setError("");

      try {
        const result = await getStudents();

        if (ignore) return;

        if (result.success && result.data) {
          setStudents(result.data);
        } else {
          setError(result.message || "Unable to load students.");
        }
      } catch (error) {
        console.error("Failed to fetch students:", error);

        if (!ignore) {
          setError("Unable to load students. Please try again.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    void loadStudents();

    return () => {
      ignore = true;
    };
  }, []);

  // Retry loading students
  const handleRetry = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await getStudents();

      if (result.success && result.data) {
        setStudents(result.data);
      } else {
        setError(result.message || "Unable to load students.");
      }
    } catch (error) {
      console.error("Failed to fetch students:", error);
      setError("Unable to load students. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Delete selected student
  const handleDelete = async () => {
    if (!selectedStudent) return;

    setDeleting(true);

    try {
      const result = await deleteStudent(selectedStudent.$id);

      if (result.success) {
        setStudents((previousStudents) =>
          previousStudents.filter(
            (student) => student.$id !== selectedStudent.$id,
          ),
        );

        setSelectedStudent(null);
      } else {
        window.alert(result.message || "Failed to delete student.");
      }
    } catch (error) {
      console.error("Failed to delete student:", error);
      window.alert("Unable to delete student. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F7F4EF] px-4 py-8 text-[#21152B] sm:px-6 lg:px-10 lg:py-12">
      <div className="mx-auto max-w-6xl">
        {/* Page Header */}
        <header className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#6F6678]">
              Student Records
            </p>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Student Management
              <span className="text-[#8AAE25]">.</span>
            </h1>

            <p className="mt-2 text-sm leading-6 text-[#6F6678]">
              Manage and organize all your student records in one place.
            </p>
          </div>

          <Link
            to="/student-management/add"
            className="inline-flex cursor-pointer items-center justify-center gap-2 self-start rounded-xl bg-[#D7FF64] px-5 py-3 text-sm font-bold text-[#21152B] transition hover:-translate-y-0.5 hover:bg-[#C9F34E] sm:self-auto"
          >
            <UserPlus size={19} />
            Add Student
          </Link>
        </header>

        {/* Student Summary */}
        <div className="mb-6 flex items-center gap-4 rounded-2xl border border-[#E9E2D9] bg-[#FFFDF9] p-5 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#D7FF64] text-[#21152B]">
            <Users size={23} />
          </div>

          <div>
            <p className="text-sm text-[#6F6678]">Total Students</p>
            <p className="text-2xl font-bold">{students.length}</p>
          </div>
        </div>

        {/* Student Table */}
        <section className="overflow-hidden rounded-2xl border border-[#E9E2D9] bg-[#FFFDF9] shadow-sm">
          <div className="border-b border-[#E9E2D9] px-5 py-5 sm:px-6">
            <h2 className="text-lg font-bold">All Students</h2>

            <p className="mt-1 text-sm text-[#6F6678]">
              View, edit, or remove student information.
            </p>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex flex-col items-center justify-center px-6 py-14">
              <RefreshCw size={26} className="animate-spin text-[#342442]" />

              <p className="mt-4 text-sm text-[#6F6678]">Loading students...</p>
            </div>
          ) : error ? (
            /* Error State */
            <div className="px-6 py-12 text-center">
              <p className="text-sm font-medium text-red-600">{error}</p>

              <button
                type="button"
                onClick={() => void handleRetry()}
                className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#342442] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#493457]"
              >
                <RefreshCw size={16} />
                Try Again
              </button>
            </div>
          ) : students.length === 0 ? (
            /* Empty State */
            <div className="px-6 py-14 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F0EAF4] text-[#342442]">
                <Users size={26} />
              </div>

              <h3 className="mt-4 font-bold">No students yet</h3>

              <p className="mt-2 text-sm text-[#6F6678]">
                Add your first student to get started.
              </p>

              <Link
                to="/student-management/add"
                className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#D7FF64] px-5 py-3 text-sm font-bold text-[#21152B] transition hover:bg-[#C9F34E]"
              >
                <UserPlus size={18} />
                Add Your First Student
              </Link>
            </div>
          ) : (
            /* Student Records */
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left">
                <thead className="bg-[#F7F4EF] text-xs uppercase tracking-wider text-[#6F6678]">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Student</th>
                    <th className="px-6 py-4 font-semibold">Email</th>
                    <th className="px-6 py-4 font-semibold">Phone</th>
                    <th className="px-6 py-4 font-semibold">Course</th>
                    <th className="px-6 py-4 text-center font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#E9E2D9]">
                  {students.map((student) => (
                    <tr
                      key={student.$id}
                      className="transition-colors hover:bg-[#FCFAF7]"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F0EAF4] font-bold text-[#342442]">
                            {student.name.charAt(0).toUpperCase()}
                          </div>

                          <span className="font-semibold">{student.name}</span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm text-[#6F6678]">
                        {student.email}
                      </td>

                      <td className="px-6 py-4 text-sm text-[#6F6678]">
                        {student.phone}
                      </td>

                      <td className="px-6 py-4">
                        <span className="inline-flex rounded-lg bg-[#F0EAF4] px-3 py-1.5 text-xs font-semibold text-[#342442]">
                          {student.course}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <Link
                            to={`/student-management/details/${student.$id}`}
                            title="View student"
                            aria-label={`View ${student.name}`}
                            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-[#E9E2D9] text-[#342442] transition hover:bg-[#D7FF64]"
                          >
                            <Eye size={17} />
                          </Link>

                          <Link
                            to={`/student-management/edit/${student.$id}`}
                            title="Edit student"
                            aria-label={`Edit ${student.name}`}
                            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-[#E9E2D9] text-[#342442] transition hover:bg-[#D7FF64]"
                          >
                            <Pencil size={16} />
                          </Link>

                          <button
                            type="button"
                            title="Delete student"
                            aria-label={`Delete ${student.name}`}
                            onClick={() => setSelectedStudent(student)}
                            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-[#F0D9D5] text-red-600 transition hover:bg-red-50"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={selectedStudent !== null}
        studentName={selectedStudent?.name ?? ""}
        loading={deleting}
        onCancel={() => {
          if (!deleting) {
            setSelectedStudent(null);
          }
        }}
        onConfirm={() => void handleDelete()}
      />
    </main>
  );
};

export default StudentList;
