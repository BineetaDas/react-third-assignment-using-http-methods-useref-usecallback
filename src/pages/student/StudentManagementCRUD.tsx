import { Outlet } from "react-router-dom";

const StudentManagementCRUD: React.FC = () => {
  return (
    <section className="min-h-screen bg-[#F7F4EF]">
      <Outlet />
    </section>
  );
};

export default StudentManagementCRUD;
