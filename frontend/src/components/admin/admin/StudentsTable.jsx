import { useEffect, useState } from "react";
import { FaTrash, FaSearch } from "react-icons/fa";
import {
  getAllStudents,
  deleteStudent,
} from "../../services/adminService";
import {
  successToast,
  errorToast,
} from "../../utils/toast";

function StudentsTable() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    const filtered = students.filter(
      (student) =>
        student.full_name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        student.email
          .toLowerCase()
          .includes(search.toLowerCase())
    );

    setFilteredStudents(filtered);
  }, [search, students]);

  const fetchStudents = async () => {
    try {
      const data = await getAllStudents();

      setStudents(data.students);
      setFilteredStudents(data.students);

    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this student?"
    );

    if (!confirmDelete) return;

    try {
      const data = await deleteStudent(id);

      successToast(data.message);

      fetchStudents();

    } catch (error) {
      errorToast(
        error.response?.data?.message ||
          "Delete Failed"
      );
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">

      <div className="flex justify-between items-center mb-8">

        <h2 className="text-2xl font-bold">
          Students
        </h2>

        <div className="relative">

          <FaSearch className="absolute left-4 top-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="border rounded-xl py-3 pl-12 pr-4"
          />

        </div>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left py-4">
                Name
              </th>

              <th className="text-left">
                Email
              </th>

              <th className="text-left">
                Role
              </th>

              <th className="text-left">
                Joined
              </th>

              <th className="text-center">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredStudents.map((student) => (

              <tr
                key={student.id}
                className="border-b hover:bg-slate-50"
              >

                <td className="py-4">
                  {student.full_name}
                </td>

                <td>
                  {student.email}
                </td>

                <td>

                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">

                    {student.role}

                  </span>

                </td>

                <td>
                  {new Date(
                    student.created_at
                  ).toLocaleDateString()}
                </td>

                <td className="text-center">

                  <button
                    onClick={() =>
                      handleDelete(student.id)
                    }
                    className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-xl"
                  >

                    <FaTrash />

                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default StudentsTable;