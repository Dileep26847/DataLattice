import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaEye,
  FaUsers,
  FaUserGraduate,
} from "react-icons/fa";

import toast from "react-hot-toast";

import AddStudentModal from "./AddStudentModal";
import EditStudentModal from "./EditStudentModal";
import StudentProfileModal from "./StudentProfileModal";

import {
  getStudents,
  deleteStudent,
} from "../../services/adminStudentService";


// ============================================================
// STUDENT TABLE
// ============================================================

function StudentTable() {

  // ==========================================================
  // STATE
  // ==========================================================

  const [students, setStudents] =
    useState([]);

  const [filteredStudents, setFilteredStudents] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [currentPage, setCurrentPage] =
    useState(1);

  const studentsPerPage = 10;


  // ==========================================================
  // MODAL STATE
  // ==========================================================

  const [showAddModal, setShowAddModal] =
    useState(false);

  const [showEditModal, setShowEditModal] =
    useState(false);

  const [showProfileModal, setShowProfileModal] =
    useState(false);


  const [selectedStudent, setSelectedStudent] =
    useState(null);


  // ==========================================================
  // LOAD STUDENTS
  // ==========================================================

  useEffect(() => {

    loadStudents();

  }, []);


  const loadStudents = async () => {

    try {

      setLoading(true);


      const response =
        await getStudents();


      const studentList =
        Array.isArray(
          response?.students
        )
          ? response.students
          : [];


      setStudents(
        studentList
      );


      /*
       * If there is an active search,
       * re-apply it after refresh.
       */

      if (
        search.trim()
      ) {

        const searchValue =
          search
            .trim()
            .toLowerCase();


        const filtered =
          studentList.filter(
            (student) => {

              return (

                student.full_name
                  ?.toLowerCase()
                  .includes(searchValue)

                ||

                student.email
                  ?.toLowerCase()
                  .includes(searchValue)

                ||

                student.phone
                  ?.toLowerCase()
                  .includes(searchValue)

                ||

                student.education
                  ?.toLowerCase()
                  .includes(searchValue)

                ||

                student.batch_name
                  ?.toLowerCase()
                  .includes(searchValue)

              );

            }
          );


        setFilteredStudents(
          filtered
        );

      } else {

        setFilteredStudents(
          studentList
        );

      }

    }

    catch (error) {

      console.error(
        "LOAD STUDENTS ERROR:",
        error
      );


      toast.error(
        error?.response?.data?.message ||
        "Failed to load students."
      );


      setStudents([]);

      setFilteredStudents([]);

    }

    finally {

      setLoading(false);

    }

  };


  // ==========================================================
  // SEARCH
  // ==========================================================

  const handleSearch = (
    event
  ) => {

    const value =
      event.target.value;


    setSearch(
      value
    );


    const searchValue =
      value
        .trim()
        .toLowerCase();


    if (!searchValue) {

      setFilteredStudents(
        students
      );

      setCurrentPage(1);

      return;

    }


    const filtered =
      students.filter(
        (student) => {

          return (

            student.full_name
              ?.toLowerCase()
              .includes(searchValue)

            ||

            student.email
              ?.toLowerCase()
              .includes(searchValue)

            ||

            student.phone
              ?.toLowerCase()
              .includes(searchValue)

            ||

            student.education
              ?.toLowerCase()
              .includes(searchValue)

            ||

            student.college_name
              ?.toLowerCase()
              .includes(searchValue)

            ||

            student.batch_name
              ?.toLowerCase()
              .includes(searchValue)

            ||

            student.placement_status
              ?.toLowerCase()
              .includes(searchValue)

          );

        }
      );


    setFilteredStudents(
      filtered
    );

    setCurrentPage(1);

  };


  // ==========================================================
  // OPEN PROFILE
  // ==========================================================

  const handleViewProfile = (
    student
  ) => {

    setSelectedStudent(
      student
    );

    setShowProfileModal(
      true
    );

  };


  // ==========================================================
  // CLOSE PROFILE
  // ==========================================================

  const closeProfile = () => {

    setShowProfileModal(
      false
    );

    setSelectedStudent(
      null
    );

  };


  // ==========================================================
  // OPEN EDIT
  // ==========================================================

  const handleEdit = (
    student
  ) => {

    setSelectedStudent(
      student
    );

    setShowEditModal(
      true
    );

  };


  // ==========================================================
  // CLOSE EDIT
  // ==========================================================

  const closeEdit = () => {

    setShowEditModal(
      false
    );

    setSelectedStudent(
      null
    );

  };


  // ==========================================================
  // DELETE STUDENT
  // ==========================================================

  const handleDelete = async (
    student
  ) => {

    if (
      !student?.id
    ) {

      toast.error(
        "Invalid student."
      );

      return;

    }


    const confirmed =
      window.confirm(

        `Delete "${student.full_name}"?\n\n` +
        "This will permanently remove the student account " +
        "and its linked profile."

      );


    if (!confirmed) {

      return;

    }


    try {

      const response =
        await deleteStudent(
          student.id
        );


      toast.success(

        response?.message ||
        "Student deleted successfully."

      );


      await loadStudents();

    }

    catch (error) {

      console.error(
        "DELETE STUDENT ERROR:",
        error
      );


      toast.error(

        error?.response?.data?.message ||
        "Unable to delete student."

      );

    }

  };


  // ==========================================================
  // STATISTICS
  // ==========================================================

  const totalStudents =
    students.length;


  const activeStudents =
    useMemo(
      () => {

        return students.filter(
          (student) =>
            student.role ===
            "student"
        ).length;

      },
      [students]
    );


  const displayedStudents =
    filteredStudents.length;


  // ==========================================================
  // PAGINATION
  // ==========================================================

  const indexOfLastStudent =
    currentPage *
    studentsPerPage;


  const indexOfFirstStudent =
    indexOfLastStudent -
    studentsPerPage;


  const currentStudents =
    filteredStudents.slice(
      indexOfFirstStudent,
      indexOfLastStudent
    );


  const totalPages =
    Math.ceil(
      filteredStudents.length /
      studentsPerPage
    );


  // ==========================================================
  // RENDER
  // ==========================================================

  return (

    <div className="space-y-6">

      {/* ======================================================
          STATISTICS
      ====================================================== */}

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-6
        "
      >

        {/* TOTAL */}

        <div
          className="
            bg-white
            rounded-2xl
            shadow
            p-6
            flex
            items-center
            justify-between
          "
        >

          <div>

            <p className="text-gray-500 text-sm">

              Total Students

            </p>

            <h2
              className="
                text-3xl
                font-bold
                mt-2
              "
            >

              {totalStudents}

            </h2>

          </div>


          <div
            className="
              bg-blue-100
              p-4
              rounded-full
            "
          >

            <FaUsers
              className="
                text-blue-600
                text-2xl
              "
            />

          </div>

        </div>


        {/* ACTIVE */}

        <div
          className="
            bg-white
            rounded-2xl
            shadow
            p-6
            flex
            items-center
            justify-between
          "
        >

          <div>

            <p className="text-gray-500 text-sm">

              Active Students

            </p>

            <h2
              className="
                text-3xl
                font-bold
                mt-2
              "
            >

              {activeStudents}

            </h2>

          </div>


          <div
            className="
              bg-green-100
              p-4
              rounded-full
            "
          >

            <FaUserGraduate
              className="
                text-green-600
                text-2xl
              "
            />

          </div>

        </div>


        {/* SEARCH */}

        <div
          className="
            bg-white
            rounded-2xl
            shadow
            p-6
            flex
            items-center
            justify-between
          "
        >

          <div>

            <p className="text-gray-500 text-sm">

              Search Result

            </p>

            <h2
              className="
                text-3xl
                font-bold
                mt-2
              "
            >

              {displayedStudents}

            </h2>

          </div>


          <div
            className="
              bg-orange-100
              p-4
              rounded-full
            "
          >

            <FaSearch
              className="
                text-orange-600
                text-2xl
              "
            />

          </div>

        </div>

      </div>


      {/* ======================================================
          TOOLBAR
      ====================================================== */}

      <div
        className="
          bg-white
          rounded-2xl
          shadow
          p-6
        "
      >

        <div
          className="
            flex
            flex-col
            md:flex-row
            justify-between
            gap-4
          "
        >

          {/* SEARCH */}

          <div
            className="
              relative
              flex-1
            "
          >

            <FaSearch
              className="
                absolute
                left-4
                top-4
                text-gray-400
              "
            />

            <input

              type="text"

              value={search}

              onChange={handleSearch}

              placeholder="Search students..."

              className="
                w-full
                border
                rounded-xl
                pl-12
                p-3
                outline-none
                focus:ring-2
                focus:ring-cyan-500
              "

            />

          </div>


          {/* ADD */}

          <button

            type="button"

            onClick={() =>
              setShowAddModal(true)
            }

            className="
              bg-cyan-600
              hover:bg-cyan-700
              text-white
              px-6
              py-3
              rounded-xl
              flex
              items-center
              justify-center
              gap-2
              transition
            "

          >

            <FaPlus />

            Add Student

          </button>

        </div>

      </div>


      {/* ======================================================
          TABLE
      ====================================================== */}

      <div
        className="
          bg-white
          rounded-2xl
          shadow
          overflow-x-auto
        "
      >

        {loading ? (

          <div
            className="
              text-center
              py-10
              text-slate-500
            "
          >

            Loading Students...

          </div>

        ) : currentStudents.length === 0 ? (

          <div
            className="
              text-center
              py-10
              text-gray-500
            "
          >

            {search.trim()
              ? "No students match your search."
              : "No students found."}

          </div>

        ) : (

          <table
            className="
              w-full
              min-w-[900px]
            "
          >

            <thead
              className="
                bg-gray-100
              "
            >

              <tr>

                <th className="p-4 text-left">
                  Student
                </th>

                <th className="p-4 text-left">
                  Contact
                </th>

                <th className="p-4 text-left">
                  Batch
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

                <th className="p-4 text-left">
                  Created
                </th>

                <th className="p-4 text-center">
                  Actions
                </th>

              </tr>

            </thead>


            <tbody>

              {currentStudents.map(
                (student) => (

                  <tr

                    key={student.id}

                    className="
                      border-b
                      hover:bg-gray-50
                      transition
                    "

                  >

                    {/* STUDENT */}

                    <td className="p-4">

                      <div
                        className="
                          flex
                          items-center
                          gap-3
                        "
                      >

                        <div
                          className="
                            w-10
                            h-10
                            rounded-full
                            bg-cyan-100
                            text-cyan-700
                            flex
                            items-center
                            justify-center
                            font-bold
                          "
                        >

                          {(
                            student.full_name ||
                            "S"
                          )
                            .charAt(0)
                            .toUpperCase()}

                        </div>


                        <div>

                          <p
                            className="
                              font-semibold
                              text-slate-800
                            "
                          >

                            {student.full_name}

                          </p>

                          <p
                            className="
                              text-xs
                              text-slate-400
                            "
                          >

                            {student.education ||
                              "Student"}

                          </p>

                        </div>

                      </div>

                    </td>


                    {/* CONTACT */}

                    <td className="p-4">

                      <p className="text-sm">

                        {student.email}

                      </p>

                      <p
                        className="
                          text-xs
                          text-slate-400
                          mt-1
                        "
                      >

                        {student.phone ||
                          "No phone"}

                      </p>

                    </td>


                    {/* BATCH */}

                    <td className="p-4">

                      {student.batch_name ? (

                        <span
                          className="
                            bg-cyan-50
                            text-cyan-700
                            px-3
                            py-1
                            rounded-full
                            text-sm
                            font-medium
                          "
                        >

                          {student.batch_name}

                        </span>

                      ) : (

                        <span
                          className="
                            text-slate-400
                            text-sm
                          "
                        >

                          Not assigned

                        </span>

                      )}

                    </td>


                    {/* STATUS */}

                    <td className="p-4">

                      <div className="space-y-1">

                        <span
                          className="
                            inline-block
                            bg-green-100
                            text-green-700
                            px-3
                            py-1
                            rounded-full
                            text-xs
                            font-medium
                          "
                        >

                          {student.placement_status ||
                            "Training"}

                        </span>


                        <div>

                          <span
                            className="
                              text-xs
                              text-slate-400
                            "
                          >

                            Certificate:{" "}

                            {student.certificate_status ||
                              "Pending"}

                          </span>

                        </div>

                      </div>

                    </td>


                    {/* CREATED */}

                    <td className="p-4">

                      {student.created_at ? (

                        new Date(
                          student.created_at
                        ).toLocaleDateString()

                      ) : (

                        "-"

                      )}

                    </td>


                    {/* ACTIONS */}

                    <td className="p-4">

                      <div
                        className="
                          flex
                          justify-center
                          gap-2
                        "
                      >

                        {/* PROFILE */}

                        <button

                          type="button"

                          onClick={() =>
                            handleViewProfile(
                              student
                            )
                          }

                          title="View Profile"

                          aria-label={
                            `View ${student.full_name} profile`
                          }

                          className="
                            w-9
                            h-9
                            rounded-lg
                            bg-slate-100
                            text-slate-600
                            hover:bg-cyan-100
                            hover:text-cyan-700
                            flex
                            items-center
                            justify-center
                            transition
                          "

                        >

                          <FaEye />

                        </button>


                        {/* EDIT */}

                        <button

                          type="button"

                          onClick={() =>
                            handleEdit(
                              student
                            )
                          }

                          title="Edit Student"

                          aria-label={
                            `Edit ${student.full_name}`
                          }

                          className="
                            w-9
                            h-9
                            rounded-lg
                            bg-blue-50
                            text-blue-600
                            hover:bg-blue-100
                            flex
                            items-center
                            justify-center
                            transition
                          "

                        >

                          <FaEdit />

                        </button>


                        {/* DELETE */}

                        <button

                          type="button"

                          onClick={() =>
                            handleDelete(
                              student
                            )
                          }

                          title="Delete Student"

                          aria-label={
                            `Delete ${student.full_name}`
                          }

                          className="
                            w-9
                            h-9
                            rounded-lg
                            bg-red-50
                            text-red-600
                            hover:bg-red-100
                            flex
                            items-center
                            justify-center
                            transition
                          "

                        >

                          <FaTrash />

                        </button>

                      </div>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        )}

      </div>


      {/* ======================================================
          PAGINATION
      ====================================================== */}

      {totalPages > 1 && (

        <div
          className="
            flex
            justify-center
            items-center
            gap-2
            flex-wrap
          "
        >

          {Array.from(
            {
              length:
                totalPages,
            },
            (_, index) => (

              <button

                type="button"

                key={index}

                onClick={() =>
                  setCurrentPage(
                    index + 1
                  )
                }

                className={`px-4 py-2 rounded-lg transition ${
                  currentPage ===
                  index + 1

                    ? "bg-cyan-600 text-white"

                    : "bg-gray-200 hover:bg-gray-300"
                }`}

              >

                {index + 1}

              </button>

            )
          )}

        </div>

      )}


      {/* ======================================================
          ADD MODAL
      ====================================================== */}

      {showAddModal && (

        <AddStudentModal

          close={() =>
            setShowAddModal(false)
          }

          refresh={
            loadStudents
          }

        />

      )}


      {/* ======================================================
          EDIT MODAL
      ====================================================== */}

      {showEditModal && (

        <EditStudentModal

          student={
            selectedStudent
          }

          close={
            closeEdit
          }

          refresh={
            loadStudents
          }

        />

      )}


      {/* ======================================================
          PROFILE MODAL
      ====================================================== */}

      {showProfileModal && (

        <StudentProfileModal

          student={
            selectedStudent
          }

          close={
            closeProfile
          }

        />

      )}

    </div>

  );

}


// ============================================================
// EXPORT
// ============================================================

export default StudentTable;