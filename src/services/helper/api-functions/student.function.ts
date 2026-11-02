import { ID, Query } from "appwrite";
import { tabledb } from "../../../lib/AppwriteClient";
import type {
  Student,
  StudentFormData,
} from "../../../types/interface/student.interface";

const DATABASE_ID = import.meta.env.VITE_APPWRITE_TABLEDB_ID;
const TABLE_ID = import.meta.env.VITE_APPWRITE_STUDENT_TABLE_ID;

// Add a new student
export const addStudent = async (studentData: StudentFormData) => {
  try {
    const response = await tabledb.createRow({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      rowId: ID.unique(),
      data: {
        name: studentData.name,
        email: studentData.email,
        phone: studentData.phone,
        age: Number(studentData.age),
        course: studentData.course,
        address: studentData.address,
      },
    });

    return {
      success: true,
      message: "Student Added Successfully",
      data: response as unknown as Student,
    };
  } catch (error: any) {
    console.log("error", error.message);

    return {
      success: false,
      message: error?.message,
    };
  }
};

// Get all students
export const getStudents = async () => {
  try {
    const response = await tabledb.listRows({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      queries: [Query.limit(100)],
    });

    return {
      success: true,
      message: "Students Fetched Successfully",
      data: response.rows as unknown as Student[],
    };
  } catch (error: any) {
    console.log("errrror", error.message);

    return {
      success: false,
      message: error?.message,
    };
  }
};

// Get a single student
export const getStudentById = async (id: string) => {
  try {
    const response = await tabledb.getRow({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      rowId: id,
    });

    return {
      success: true,
      message: "Student Fetched Successfully",
      data: response as unknown as Student,
    };
  } catch (error: any) {
    console.log("errrror", error.message);

    return {
      success: false,
      message: error?.message,
    };
  }
};

// Update an existing student
export const updateStudent = async (
  id: string,
  studentData: StudentFormData,
) => {
  try {
    const response = await tabledb.updateRow({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      rowId: id,
      data: {
        name: studentData.name,
        email: studentData.email,
        phone: studentData.phone,
        age: Number(studentData.age),
        course: studentData.course,
        address: studentData.address,
      },
    });

    return {
      success: true,
      message: "Student Updated Successfully",
      data: response as unknown as Student,
    };
  } catch (error: any) {
    console.log("errrror", error.message);

    return {
      success: false,
      message: error?.message,
    };
  }
};

// Delete a student
export const deleteStudent = async (id: string) => {
  try {
    const response = await tabledb.deleteRow({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      rowId: id,
    });

    console.log("response", response);

    return {
      success: true,
      message: "Student deleted successfully",
      data: response,
    };
  } catch (error: any) {
    console.log("errrror", error.message);

    return {
      success: false,
      message: error?.message,
    };
  }
};
