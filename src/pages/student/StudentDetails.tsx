import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Pencil, UserRound, GraduationCap } from "lucide-react";

import { getStudentById } from "../../services/helper/api-functions/student.function";
import type { Student } from "../../types/interface/student.interface";

const StudentDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let ignore = false;

    const fetchStudent = async () => {
      if (!id) {
        setError("Student ID is missing.");
        setLoading(false);
        return;
      }

      try {
        const result = await getStudentById(id);

        if (ignore) return;

        if (result.success && result.data) {
          setStudent(result.data);
        } else {
          setError(result.message || "Unable to load student details.");
        }
      } catch (error) {
        console.error("Fetch Student Error:", error);

        if (!ignore) {
          setError("Unable to load student details.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    void fetchStudent();

    return () => {
      ignore = true;
    };
  }, [id]);

  return (
    <main className="min-h-screen bg-[#F7F4EF] px-4 py-8 text-[#21152B] sm:px-6 sm:py-12">
      <div className="mx-auto max-w-3xl">
        {/* Back Navigation */}
        <Link
          to="/student-management"
          className="group mb-7 inline-flex items-center gap-2 rounded-full border border-[#E5DED5] bg-white/70 px-4 py-2.5 text-sm font-medium text-[#6F6678] transition-all duration-300 hover:border-[#D7FF64] hover:bg-white hover:text-[#21152B]"
        >
          <ArrowLeft
            size={17}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />
          Back to Students
        </Link>

        {/* Page Heading */}
        <header className="mb-7">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#8AAE25]">
            Student Management
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-[#21152B] sm:text-4xl">
            Student Details<span className="text-[#8AAE25]">.</span>
          </h1>

          <p className="mt-2 text-sm leading-6 text-[#6F6678]">
            View and manage the complete information for this student.
          </p>
        </header>

        {/* Loading State */}
        {loading ? (
          <section className="rounded-3xl border border-[#E9E2D9] bg-[#FFFDF9] p-12 text-center shadow-[0_20px_60px_rgba(33,21,43,0.06)]">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D7FF64] text-[#21152B]">
              <GraduationCap size={25} />
            </div>

            <p className="text-sm font-medium text-[#6F6678]">
              Loading student details...
            </p>

            <div className="mx-auto mt-4 h-1.5 w-32 overflow-hidden rounded-full bg-[#E9E2D9]">
              <div className="h-full w-1/2 animate-pulse rounded-full bg-[#8AAE25]" />
            </div>
          </section>
        ) : error ? (
          /* Error State */
          <section className="rounded-3xl border border-[#E9E2D9] bg-[#FFFDF9] px-6 py-12 text-center shadow-[0_20px_60px_rgba(33,21,43,0.06)]">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">
              <UserRound size={24} />
            </div>

            <h2 className="text-lg font-bold text-[#21152B]">
              Student Not Found
            </h2>

            <p role="alert" className="mt-2 text-sm text-red-600">
              {error}
            </p>

            <Link
              to="/student-management"
              className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#D7FF64] px-5 py-3 text-sm font-bold text-[#21152B] transition hover:bg-[#C9F34E]"
            >
              <ArrowLeft size={17} />
              Back to Students
            </Link>
          </section>
        ) : student ? (
          /* Student Profile Card */
          <section className="overflow-hidden rounded-3xl border border-[#E9E2D9] bg-[#FFFDF9] shadow-[0_20px_60px_rgba(33,21,43,0.07)]">
            {/* Profile Header */}
            <div className="relative overflow-hidden bg-[#21152B] px-6 py-8 sm:px-9 sm:py-10">
              <div className="absolute -right-10 -top-16 h-44 w-44 rounded-full bg-[#D7FF64]/10" />
              <div className="absolute -bottom-20 right-24 h-36 w-36 rounded-full bg-[#D7FF64]/10" />

              <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#D7FF64] text-[#21152B] shadow-lg shadow-black/10">
                  <UserRound size={32} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D7FF64]">
                    Student Profile
                  </p>

                  <h2 className="mt-2 break-words text-2xl font-bold text-white sm:text-3xl">
                    {student.name}
                  </h2>

                  <p className="mt-2 break-all text-sm text-white/65">
                    {student.email}
                  </p>
                </div>

                <Link
                  to={`/student-management/edit/${student.$id}`}
                  className="inline-flex cursor-pointer items-center justify-center gap-2 self-start rounded-xl bg-[#D7FF64] px-5 py-3 text-sm font-bold text-[#21152B] transition duration-200 hover:-translate-y-0.5 hover:bg-[#C9F34E] hover:shadow-md sm:self-center"
                >
                  <Pencil size={16} />
                  Edit Student
                </Link>
              </div>
            </div>

            {/* Personal Information */}
            <div className="p-5 sm:p-9">
              <div className="mb-7 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F0EDDF] text-[#51415F]">
                  <GraduationCap size={21} />
                </div>

                <div>
                  <h3 className="font-bold text-[#21152B]">
                    Personal Information
                  </h3>

                  <p className="mt-1 text-xs text-[#8B8291]">
                    Student's registered information
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Full Name */}
                <div className="group rounded-2xl border border-[#E9E2D9] bg-white p-5 transition duration-200 hover:border-[#D7FF64] hover:shadow-[0_6px_20px_rgba(33,21,43,0.04)]">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#8B8291]">
                    Full Name
                  </p>

                  <p className="mt-3 break-words text-sm font-semibold leading-6 text-[#21152B]">
                    {student.name}
                  </p>

                  <div className="mt-4 h-1 w-8 rounded-full bg-[#D7FF64] transition-all duration-300 group-hover:w-14" />
                </div>

                {/* Email Address */}
                <div className="group rounded-2xl border border-[#E9E2D9] bg-white p-5 transition duration-200 hover:border-[#D7FF64] hover:shadow-[0_6px_20px_rgba(33,21,43,0.04)]">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#8B8291]">
                    Email Address
                  </p>

                  <p className="mt-3 break-words text-sm font-semibold leading-6 text-[#21152B]">
                    {student.email}
                  </p>

                  <div className="mt-4 h-1 w-8 rounded-full bg-[#D7FF64] transition-all duration-300 group-hover:w-14" />
                </div>

                {/* Phone Number */}
                <div className="group rounded-2xl border border-[#E9E2D9] bg-white p-5 transition duration-200 hover:border-[#D7FF64] hover:shadow-[0_6px_20px_rgba(33,21,43,0.04)]">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#8B8291]">
                    Phone Number
                  </p>

                  <p className="mt-3 break-words text-sm font-semibold leading-6 text-[#21152B]">
                    {student.phone}
                  </p>

                  <div className="mt-4 h-1 w-8 rounded-full bg-[#D7FF64] transition-all duration-300 group-hover:w-14" />
                </div>

                {/* Age */}
                <div className="group rounded-2xl border border-[#E9E2D9] bg-white p-5 transition duration-200 hover:border-[#D7FF64] hover:shadow-[0_6px_20px_rgba(33,21,43,0.04)]">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#8B8291]">
                    Age
                  </p>

                  <p className="mt-3 break-words text-sm font-semibold leading-6 text-[#21152B]">
                    {student.age}
                  </p>

                  <div className="mt-4 h-1 w-8 rounded-full bg-[#D7FF64] transition-all duration-300 group-hover:w-14" />
                </div>

                {/* Course */}
                <div className="group rounded-2xl border border-[#E9E2D9] bg-white p-5 transition duration-200 hover:border-[#D7FF64] hover:shadow-[0_6px_20px_rgba(33,21,43,0.04)]">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#8B8291]">
                    Course
                  </p>

                  <p className="mt-3 break-words text-sm font-semibold leading-6 text-[#21152B]">
                    {student.course}
                  </p>

                  <div className="mt-4 h-1 w-8 rounded-full bg-[#D7FF64] transition-all duration-300 group-hover:w-14" />
                </div>

                {/* Address */}
                <div className="group rounded-2xl border border-[#E9E2D9] bg-white p-5 transition duration-200 hover:border-[#D7FF64] hover:shadow-[0_6px_20px_rgba(33,21,43,0.04)]">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#8B8291]">
                    Address
                  </p>

                  <p className="mt-3 break-words text-sm font-semibold leading-6 text-[#21152B]">
                    {student.address || "Not provided"}
                  </p>

                  <div className="mt-4 h-1 w-8 rounded-full bg-[#D7FF64] transition-all duration-300 group-hover:w-14" />
                </div>
              </div>

              {/* Footer Action */}
              <div className="mt-8 flex flex-col gap-3 border-t border-[#E9E2D9] pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs leading-5 text-[#8B8291]">
                  Review the information above and edit it if necessary.
                </p>

                <Link
                  to="/student-management"
                  className="inline-flex cursor-pointer items-center justify-center gap-2 self-start rounded-xl border border-[#DED5E5] bg-white px-5 py-3 text-sm font-semibold text-[#51465B] transition duration-200 hover:border-[#B9ACBF] hover:bg-[#F8F5FA]"
                >
                  <ArrowLeft size={16} />
                  Student List
                </Link>
              </div>
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
};

export default StudentDetails;
