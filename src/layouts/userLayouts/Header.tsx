import { NavLink } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="border-b border-[#E7DFD5] bg-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5">
        {/* Logo */}
        <NavLink to="/" className="flex items-center">
          <span className="mr-3 h-2 w-2 rounded-full bg-[#D7FF64]"></span>

          <span className="text-lg font-semibold text-[#21152B]">
            React Assignments
          </span>
        </NavLink>

        {/* Navigation */}
        <nav className="flex h-full items-center">
          {/* Home */}
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex h-full items-center border-b-2 px-5 text-base transition-colors ${
                isActive
                  ? "border-[#342442] text-[#342442]"
                  : "border-transparent text-[#6F6678] hover:text-[#21152B]"
              }`
            }
          >
            Home
          </NavLink>

          {/* Large Form */}
          <NavLink
            to="/large-form"
            className={({ isActive }) =>
              `flex h-full items-center border-b-2 px-5 text-base transition-colors ${
                isActive
                  ? "border-[#342442] text-[#342442]"
                  : "border-transparent text-[#6F6678] hover:text-[#21152B]"
              }`
            }
          >
            Large Form
          </NavLink>

          {/* Stopwatch */}
          <NavLink
            to="/stopwatch"
            className={({ isActive }) =>
              `flex h-full items-center border-b-2 px-5 text-base transition-colors ${
                isActive
                  ? "border-[#342442] text-[#342442]"
                  : "border-transparent text-[#6F6678] hover:text-[#21152B]"
              }`
            }
          >
            Stopwatch
          </NavLink>

          {/* Student Management */}
          <NavLink
            to="/student-management"
            className={({ isActive }) =>
              `flex h-full items-center border-b-2 px-5 text-base transition-colors ${
                isActive
                  ? "border-[#342442] text-[#342442]"
                  : "border-transparent text-[#6F6678] hover:text-[#21152B]"
              }`
            }
          >
            Students
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
