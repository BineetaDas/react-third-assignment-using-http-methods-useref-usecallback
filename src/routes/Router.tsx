import { createBrowserRouter } from "react-router-dom";

import UserWrapper from "../layouts/userLayouts/UserWrapper";

import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Stopwatch from "../pages/stopwatch/Stopwatch";
import LargeFormOptimizer from "../pages/largeForm/LargeFormOptimizer";

import StudentList from "../pages/student/StudentList";
import AddStudent from "../pages/student/AddStudent";
import EditStudent from "../pages/student/EditStudent";
import StudentDetails from "../pages/student/StudentDetails";
import StudentManagementCRUD from "../pages/student/StudentManagementCRUD";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <UserWrapper />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "large-form",
        element: <LargeFormOptimizer />,
      },
      {
        path: "stopwatch",
        element: <Stopwatch />,
      },
      {
        path: "student-management",
        element: <StudentManagementCRUD />,
        children: [
          {
            index: true,
            element: <StudentList />,
          },
          {
            path: "add",
            element: <AddStudent />,
          },
          {
            path: "edit/:id",
            element: <EditStudent />,
          },
          {
            path: "details/:id",
            element: <StudentDetails />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default Router;
