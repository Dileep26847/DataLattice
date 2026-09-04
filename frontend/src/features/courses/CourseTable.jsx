import {
  useEffect,
  useState,
} from "react";

import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaEye,
} from "react-icons/fa";

import toast from "react-hot-toast";


import {
  getCourses,
  deleteCourse,
} from "../../services/courseManagementService";


import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import SearchBar from "../../components/common/SearchBar";
import DataTable from "../../components/common/DataTable";
import ConfirmDialog from "../../components/common/ConfirmDialog";


import AddCourseModal
  from "./AddCourseModal";

import EditCourseModal
  from "./EditCourseModal";

import CourseDetailsModal
  from "./CourseDetailsModal";


// ============================================================
// COURSE TABLE
// ============================================================

function CourseTable() {

  const [courses, setCourses] =
    useState([]);

  const [filteredCourses, setFilteredCourses] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [search, setSearch] =
    useState("");


  // ==========================================================
  // MODALS
  // ==========================================================

  const [showAdd, setShowAdd] =
    useState(false);

  const [showEdit, setShowEdit] =
    useState(false);

  const [showDelete, setShowDelete] =
    useState(false);

  const [showDetails, setShowDetails] =
    useState(false);


  // ==========================================================
  // SELECTED COURSE
  // ==========================================================

  const [selectedCourse, setSelectedCourse] =
    useState(null);


  // ==========================================================
  // LOAD COURSES
  // ==========================================================

  useEffect(() => {

    loadCourses();

  }, []);


  // ==========================================================
  // SEARCH
  // ==========================================================

  useEffect(() => {

    const keyword =
      search
        .trim()
        .toLowerCase();


    if (!keyword) {

      setFilteredCourses(
        courses
      );

      return;

    }


    const filtered =
      courses.filter(
        (course) => {

          return (

            course.title
              ?.toLowerCase()
              .includes(keyword)

            ||

            course.instructor
              ?.toLowerCase()
              .includes(keyword)

            ||

            course.category
              ?.toLowerCase()
              .includes(keyword)

          );

        }
      );


    setFilteredCourses(
      filtered
    );

  }, [
    search,
    courses,
  ]);


  // ==========================================================
  // LOAD COURSES
  // ==========================================================

  const loadCourses =
    async () => {

      try {

        setLoading(true);


        const data =
          await getCourses();


        const courseList =
          data.courses || [];


        setCourses(
          courseList
        );


        setFilteredCourses(
          courseList
        );

      }

      catch (err) {

        console.error(
          "LOAD COURSES ERROR:",
          err
        );


        toast.error(

          err.response?.data?.message ||

          "Failed to load courses"

        );

      }

      finally {

        setLoading(false);

      }

    };


  // ==========================================================
  // DELETE
  // ==========================================================

  const confirmDelete =
    async () => {

      if (!selectedCourse) {
        return;
      }


      try {

        await deleteCourse(
          selectedCourse.id
        );


        toast.success(
          "Course deleted successfully"
        );


        setShowDelete(
          false
        );


        setSelectedCourse(
          null
        );


        await loadCourses();

      }

      catch (err) {

        console.error(
          "DELETE COURSE ERROR:",
          err
        );


        toast.error(

          err.response?.data?.message ||

          "Failed to delete course"

        );

      }

    };


  // ==========================================================
  // OPEN VIEW
  // ==========================================================

  const handleView =
    (course) => {

      setSelectedCourse(
        course
      );

      setShowDetails(
        true
      );

    };


  // ==========================================================
  // OPEN EDIT
  // ==========================================================

  const handleEdit =
    (course) => {

      setSelectedCourse(
        course
      );

      setShowEdit(
        true
      );

    };


  // ==========================================================
  // OPEN DELETE
  // ==========================================================

  const handleDelete =
    (course) => {

      setSelectedCourse(
        course
      );

      setShowDelete(
        true
      );

    };


  // ==========================================================
  // TABLE COLUMNS
  // ==========================================================

  const columns = [

    {
      key: "course",

      label: "Course",

      render: (course) => (

        <div
          className="
            flex
            items-center
            gap-4
          "
        >

          {course.thumbnail ? (

            <img
              src={
                `http://localhost:5000/uploads/thumbnails/${course.thumbnail}`
              }
              alt={course.title}
              className="
                w-20
                h-12
                rounded-xl
                object-cover
                border
                border-slate-200
              "
            />

          ) : (

            <div
              className="
                w-20
                h-12
                rounded-xl
                bg-slate-100
                flex
                items-center
                justify-center
                text-slate-400
              "
            >

              <FaPlus />

            </div>

          )}


          <div>

            <h3
              className="
                font-bold
                text-slate-800
              "
            >

              {course.title}

            </h3>


            <p
              className="
                text-xs
                text-slate-400
                mt-1
              "
            >

              Course #{course.id}

            </p>

          </div>

        </div>

      ),
    },


    {
      key: "instructor",

      label: "Instructor",

      render: (course) => (

        <span>

          {course.instructor ||
            "Not assigned"}

        </span>

      ),
    },


    {
      key: "category",

      label: "Category",

      render: (course) => (

        <span>

          {course.category ||
            "Not specified"}

        </span>

      ),
    },


    {
      key: "price",

      label: "Price",

      render: (course) => (

        <span
          className="
            font-semibold
            text-slate-700
          "
        >

          ₹
          {Number(
            course.price || 0
          ).toLocaleString("en-IN")}

        </span>

      ),
    },

  ];


  // ==========================================================
  // RENDER
  // ==========================================================

  return (

    <>

      <Card

        title="Courses"

        subtitle="Manage all LMS courses"

        action={

          <Button
            onClick={() =>
              setShowAdd(true)
            }
          >

            <FaPlus
              className="
                inline
                mr-2
              "
            />

            Add Course

          </Button>

        }

      >

        {/* SEARCH */}

        <div className="mb-6">

          <SearchBar

            value={search}

            onChange={setSearch}

            placeholder="
              Search courses by title, instructor or category...
            "

          />

        </div>


        {/* TABLE */}

        {loading ? (

          <div
            className="
              py-20
              text-center
              text-slate-500
            "
          >

            Loading Courses...

          </div>

        ) : (

          <DataTable

            columns={columns}

            data={filteredCourses}

            emptyMessage={
              search
                ? "No matching courses found"
                : "No courses found"
            }


            renderActions={
              (course) => (

                <div
                  className="
                    flex
                    justify-center
                    gap-2
                  "
                >

                  {/* VIEW */}

                  <Button

                    size="sm"

                    onClick={() =>
                      handleView(
                        course
                      )
                    }

                  >

                    <FaEye />

                  </Button>


                  {/* EDIT */}

                  <Button

                    size="sm"

                    onClick={() =>
                      handleEdit(
                        course
                      )
                    }

                  >

                    <FaEdit />

                  </Button>


                  {/* DELETE */}

                  <Button

                    size="sm"

                    variant="danger"

                    onClick={() =>
                      handleDelete(
                        course
                      )
                    }

                  >

                    <FaTrash />

                  </Button>

                </div>

              )
            }

          />

        )}

      </Card>


      {/* ======================================================
          ADD COURSE
      ====================================================== */}

      {showAdd && (

        <AddCourseModal

          close={() =>
            setShowAdd(false)
          }

          refresh={
            loadCourses
          }

        />

      )}


      {/* ======================================================
          EDIT COURSE
      ====================================================== */}

      {showEdit && (

        <EditCourseModal

          course={
            selectedCourse
          }

          close={() => {

            setShowEdit(
              false
            );

            setSelectedCourse(
              null
            );

          }}

          refresh={
            loadCourses
          }

        />

      )}


      {/* ======================================================
          COURSE DETAILS
      ====================================================== */}

      {showDetails && (

        <CourseDetailsModal

          course={
            selectedCourse
          }

          close={() => {

            setShowDetails(
              false
            );

            setSelectedCourse(
              null
            );

          }}

        />

      )}


      {/* ======================================================
          DELETE CONFIRMATION
      ====================================================== */}

      <ConfirmDialog

        isOpen={
          showDelete
        }

        onClose={() => {

          setShowDelete(
            false
          );

          setSelectedCourse(
            null
          );

        }}

        onConfirm={
          confirmDelete
        }

        title="Delete Course"

        message={

          `Are you sure you want to delete "${selectedCourse?.title}"? This action cannot be undone.`

        }

        confirmText="Delete"

        danger

      />

    </>

  );

}


export default CourseTable;