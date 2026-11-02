import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-5 text-center">
      <h1 className="text-6xl font-bold text-[#21152B]">404</h1>

      <p className="mt-4 text-[#6F6678]">
        Sorry, the page you are looking for was not found.
      </p>

      <Link
        to="/"
        className="mt-6 rounded-xl bg-[#342442] px-5 py-3 text-white hover:bg-[#21152B]"
      >
        Back to Home
      </Link>
    </section>
  );
};

export default NotFound;
