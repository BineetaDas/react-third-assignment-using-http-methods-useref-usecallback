import type React from "react";
import { ArrowLeft, Save, UserPlus, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import type { StudentFormProps } from "../../types/interface/student-form.interface";

const StudentForm: React.FC<StudentFormProps> = ({
  title,
  buttonText,
  formData,
  loading,
  error,
  success,
  onChange,
  onSubmit,
}) => {
  return (
    <section className="min-h-screen bg-[#F7F4EF] px-4 py-8 sm:px-6 sm:py-12">
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

        {/* Form Card */}
        <div className="overflow-hidden rounded-3xl border border-[#E9E2D9] bg-[#FFFDF9] shadow-[0_20px_60px_rgba(33,21,43,0.07)]">
          {/* Card Header */}
          <div className="relative overflow-hidden bg-[#21152B] px-6 py-8 sm:px-9 sm:py-10">
            <div className="absolute -right-10 -top-16 h-44 w-44 rounded-full bg-[#D7FF64]/10" />
            <div className="absolute -bottom-20 right-24 h-36 w-36 rounded-full bg-[#D7FF64]/10" />

            <div className="relative flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#D7FF64] text-[#21152B] shadow-lg shadow-black/10">
                <GraduationCap size={25} />
              </div>

              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#D7FF64]">
                  Student Management
                </p>

                <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  {title}
                </h1>

                <p className="mt-2 max-w-md text-sm leading-6 text-white/65">
                  {title === "Add Student"
                    ? "Add a new student and keep all their academic information organised."
                    : "Update student information and keep the records accurate."}
                </p>
              </div>
            </div>
          </div>

          {/* Form Body */}
          <div className="px-5 py-7 sm:px-9 sm:py-9">
            <div className="mb-7">
              <h2 className="text-lg font-bold text-[#21152B]">
                Personal Information
              </h2>
              <p className="mt-1 text-sm text-[#817887]">
                Fill in the details below to continue.
              </p>
            </div>

            {error && (
              <div
                role="alert"
                className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3.5 text-sm text-red-700"
              >
                <span className="mt-0.5 font-bold">!</span>
                <p>{error}</p>
              </div>
            )}

            {success && (
              <div
                role="status"
                className="mb-6 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3.5 text-sm text-green-800"
              >
                <span className="mt-0.5 font-bold">✓</span>
                <p>{success}</p>
              </div>
            )}

            <form onSubmit={onSubmit} className="space-y-6">
              {/* Name and Email */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-[#30233A]"
                  >
                    Full Name <span className="text-[#8AAE25]">*</span>
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={onChange}
                    placeholder="e.g. Rahul Sharma"
                    autoComplete="name"
                    className="w-full rounded-xl border border-[#E5DED5] bg-white px-4 py-3.5 text-sm text-[#21152B] outline-none transition duration-200 placeholder:text-[#B0A9B4] hover:border-[#C8BECF] focus:border-[#8AAE25] focus:ring-4 focus:ring-[#D7FF64]/25"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-[#30233A]"
                  >
                    Email Address <span className="text-[#8AAE25]">*</span>
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={onChange}
                    placeholder="student@example.com"
                    autoComplete="email"
                    className="w-full rounded-xl border border-[#E5DED5] bg-white px-4 py-3.5 text-sm text-[#21152B] outline-none transition duration-200 placeholder:text-[#B0A9B4] hover:border-[#C8BECF] focus:border-[#8AAE25] focus:ring-4 focus:ring-[#D7FF64]/25"
                    required
                  />
                </div>
              </div>

              {/* Phone and Age */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-semibold text-[#30233A]"
                  >
                    Phone Number <span className="text-[#8AAE25]">*</span>
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={onChange}
                    placeholder="Enter phone number"
                    autoComplete="tel"
                    className="w-full rounded-xl border border-[#E5DED5] bg-white px-4 py-3.5 text-sm text-[#21152B] outline-none transition duration-200 placeholder:text-[#B0A9B4] hover:border-[#C8BECF] focus:border-[#8AAE25] focus:ring-4 focus:ring-[#D7FF64]/25"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="age"
                    className="mb-2 block text-sm font-semibold text-[#30233A]"
                  >
                    Age <span className="text-[#8AAE25]">*</span>
                  </label>

                  <input
                    id="age"
                    name="age"
                    type="number"
                    value={formData.age}
                    onChange={onChange}
                    min={12}
                    max={60}
                    className="w-full rounded-xl border border-[#E5DED5] bg-white px-4 py-3.5 text-sm text-[#21152B] outline-none transition duration-200 placeholder:text-[#B0A9B4] hover:border-[#C8BECF] focus:border-[#8AAE25] focus:ring-4 focus:ring-[#D7FF64]/25"
                    required
                  />
                </div>
              </div>

              {/* Course */}
              <div>
                <label
                  htmlFor="course"
                  className="mb-2 block text-sm font-semibold text-[#30233A]"
                >
                  Course <span className="text-[#8AAE25]">*</span>
                </label>

                <input
                  id="course"
                  name="course"
                  type="text"
                  value={formData.course}
                  onChange={onChange}
                  placeholder="e.g. React Engineering Program"
                  className="w-full rounded-xl border border-[#E5DED5] bg-white px-4 py-3.5 text-sm text-[#21152B] outline-none transition duration-200 placeholder:text-[#B0A9B4] hover:border-[#C8BECF] focus:border-[#8AAE25] focus:ring-4 focus:ring-[#D7FF64]/25"
                  required
                />
              </div>

              {/* Address */}
              <div>
                <label
                  htmlFor="address"
                  className="mb-2 block text-sm font-semibold text-[#30233A]"
                >
                  Address
                  <span className="ml-2 font-normal text-[#A49BA9]">
                    (Optional)
                  </span>
                </label>

                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={onChange}
                  placeholder="Enter the student's full address..."
                  rows={3}
                  className="w-full resize-y rounded-xl border border-[#E5DED5] bg-white px-4 py-3.5 text-sm leading-6 text-[#21152B] outline-none transition duration-200 placeholder:text-[#B0A9B4] hover:border-[#C8BECF] focus:border-[#8AAE25] focus:ring-4 focus:ring-[#D7FF64]/25"
                />
              </div>

              {/* Actions */}
              <div className="flex flex-col-reverse gap-3 border-t border-[#EEE8E0] pt-6 sm:flex-row sm:justify-end">
                <Link
                  to="/student-management"
                  className="inline-flex items-center justify-center rounded-xl border border-[#DED5E5] bg-white px-6 py-3.5 text-sm font-semibold text-[#51465B] transition duration-200 hover:border-[#B9ACBF] hover:bg-[#F8F5FA]"
                >
                  Cancel
                </Link>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#D7FF64] px-7 py-3.5 text-sm font-bold text-[#21152B] shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-[#C9F34E] hover:shadow-md focus:outline-none focus:ring-4 focus:ring-[#D7FF64]/40 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#21152B]/30 border-t-[#21152B]" />
                      Saving...
                    </>
                  ) : (
                    <>
                      {buttonText === "Add Student" ? (
                        <UserPlus size={18} />
                      ) : (
                        <Save size={18} />
                      )}
                      {buttonText}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        <p className="mt-5 text-center text-xs text-[#928897]">
          Fields marked with * are required.
        </p>
      </div>
    </section>
  );
};

export default StudentForm;
