import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:py-24">
      {/* Hero Section */}
      <div className="mb-12 max-w-2xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#6F6678]">
          Code • Create • Improve
        </p>

        <h1 className="text-4xl font-bold leading-tight text-[#21152B] sm:text-5xl">
          Ideas Into
          <span className="block">
            Interactive{" "}
            <span className="underline decoration-[#D7FF64] decoration-8 underline-offset-2">
              Experiences.
            </span>
          </span>
        </h1>

        <p className="mt-5 max-w-xl leading-7 text-[#6F6678]">
          Here are some React projects I’ve built while learning and practicing
          different concepts.
        </p>
      </div>

      {/* Project Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Large Form Optimizer */}
        <div className="rounded-2xl border border-[#E7DFD5] bg-white p-7 shadow-sm">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#F0EAF5] text-xl font-bold text-[#342442]">
            01
          </div>

          <h2 className="text-xl font-bold text-[#21152B]">
            Large Form Optimizer
          </h2>

          <p className="mt-3 leading-6 text-[#6F6678]">
            Practice useMemo and useCallback to improve form performance and
            prevent unnecessary re-renders.
          </p>

          <Link
            to="/large-form"
            className="mt-6 inline-flex cursor-pointer rounded-xl bg-[#342442] px-5 py-3 font-medium text-white transition-colors hover:bg-[#21152B]"
          >
            Explore Form →
          </Link>
        </div>

        {/* Stopwatch */}
        <div className="rounded-2xl border border-[#E7DFD5] bg-white p-7 shadow-sm">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#D7FF64] text-xl font-bold text-[#21152B]">
            02
          </div>

          <h2 className="text-xl font-bold text-[#21152B]">Stopwatch</h2>

          <p className="mt-3 leading-6 text-[#6F6678]">
            Build a stopwatch with Start, Pause and Reset controls using useRef.
          </p>

          <Link
            to="/stopwatch"
            className="mt-6 inline-flex cursor-pointer rounded-xl bg-[#342442] px-5 py-3 font-medium text-white transition-colors hover:bg-[#21152B]"
          >
            Open Stopwatch →
          </Link>
        </div>

        {/* Student Management System */}
        <div className="rounded-2xl border border-[#E7DFD5] bg-white p-7 shadow-sm">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#F0EAF5] text-xl font-bold text-[#342442]">
            03
          </div>

          <h2 className="text-xl font-bold text-[#21152B]">
            Student Management System
          </h2>

          <p className="mt-3 leading-6 text-[#6F6678]">
            Manage student records with CRUD operations. Add new students, view
            their details, update information, and delete records using React,
            TypeScript, and Appwrite.
          </p>

          <Link
            to="/student-management"
            className="mt-6 inline-flex cursor-pointer rounded-xl bg-[#342442] px-5 py-3 font-medium text-white transition-colors hover:bg-[#21152B]"
          >
            Manage Students →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;
