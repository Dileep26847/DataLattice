import { useEffect, useMemo, useState } from "react";

import toast from "react-hot-toast";

import {
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaVideo,
  FaFilePdf,
  FaEye,
  FaFilter,
} from "react-icons/fa";

import {
  getLessons,
  deleteLesson,
} from "../../services/lessonManagementService";

import {
  getCourses,
} from "../../services/courseManagementService";

import AddLessonModal from "./AddLessonModal";
import EditLessonModal from "./EditLessonModal";
import LessonViewModal from "./LessonViewModal";


function LessonTable() {

  const [lessons, setLessons] =
    useState([]);

  const [courses, setCourses] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [courseFilter, setCourseFilter] =
    useState("");


  const [showAdd, setShowAdd] =
    useState(false);

  const [showEdit, setShowEdit] =
    useState(false);

  const [showView, setShowView] =
    useState(false);


  const [selectedLesson, setSelectedLesson] =
    useState(null);


  // ======================================
  // INITIAL LOAD
  // ======================================

  useEffect(() => {

    loadData();

  }, []);


  const loadData = async () => {

    try {

      setLoading(true);

      const [
        lessonsResponse,
        coursesResponse,
      ] = await Promise.all([

        getLessons(),

        getCourses(),

      ]);


      setLessons(
        lessonsResponse.lessons || []
      );

      setCourses(
        coursesResponse.courses || []
      );

    } catch (err) {

      console.error(
        "LOAD LESSON DATA ERROR:",
        err
      );

      toast.error(
        "Failed to load lesson data"
      );

    } finally {

      setLoading(false);

    }

  };


  // ======================================
  // FILTER
  // ======================================

  const filteredLessons =
    useMemo(() => {

      const keyword =
        search
          .trim()
          .toLowerCase();


      return lessons.filter(
        (lesson) => {

          const matchesSearch =
            !keyword ||
            lesson.title
              ?.toLowerCase()
              .includes(keyword) ||
            lesson.course_title
              ?.toLowerCase()
              .includes(keyword);


          const matchesCourse =
            !courseFilter ||
            String(
              lesson.course_id
            ) ===
            String(courseFilter);


          return (
            matchesSearch &&
            matchesCourse
          );

        }
      );

    }, [
      lessons,
      search,
      courseFilter,
    ]);


  // ======================================
  // DELETE
  // ======================================

  const handleDelete =
    async (id) => {

      const confirmed =
        window.confirm(
          "Are you sure you want to delete this lesson?"
        );


      if (!confirmed) {
        return;
      }


      try {

        await deleteLesson(id);

        toast.success(
          "Lesson deleted successfully"
        );

        await loadData();

      } catch (err) {

        console.error(
          "DELETE LESSON ERROR:",
          err
        );

        toast.error(
          err?.response?.data?.message ||
          "Failed to delete lesson"
        );

      }

    };


  return (

    <>

      {/* ======================================
          MAIN CARD
      ====================================== */}

      <div className="bg-white rounded-3xl shadow-xl p-8">

        {/* HEADER */}

        <div
          className="
            flex
            flex-col
            lg:flex-row
            lg:items-center
            lg:justify-between
            gap-5
            mb-8
          "
        >

          <div>

            <h2 className="text-3xl font-black text-slate-800">
              Lessons
            </h2>

            <p className="text-slate-500 mt-1">
              Manage lessons across all courses.
            </p>

          </div>


          <button
            type="button"
            onClick={() => setShowAdd(true)}
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
              gap-3
              transition
            "
          >

            <FaPlus />

            Add Lesson

          </button>

        </div>


        {/* FILTERS */}

        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-[1fr_280px]
            gap-4
            mb-8
          "
        >

          {/* SEARCH */}

          <div className="relative">

            <FaSearch
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search lesson or course..."
              className="
                w-full
                pl-12
                pr-4
                py-3
                rounded-xl
                bg-slate-100
                outline-none
                focus:ring-2
                focus:ring-cyan-500
              "
            />

          </div>


          {/* COURSE FILTER */}

          <div className="relative">

            <FaFilter
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-slate-400
                pointer-events-none
              "
            />

            <select
              value={courseFilter}
              onChange={(e) =>
                setCourseFilter(
                  e.target.value
                )
              }
              className="
                w-full
                pl-11
                pr-4
                py-3
                rounded-xl
                bg-slate-100
                outline-none
                focus:ring-2
                focus:ring-cyan-500
              "
            >

              <option value="">
                All Courses
              </option>

              {courses.map(
                (course) => (

                  <option
                    key={course.id}
                    value={course.id}
                  >
                    {course.title}
                  </option>

                )
              )}

            </select>

          </div>

        </div>


        {/* COUNT */}

        <div className="mb-5 text-sm text-slate-500">

          Showing{" "}
          <span className="font-bold text-slate-700">
            {filteredLessons.length}
          </span>{" "}
          of{" "}
          <span className="font-bold text-slate-700">
            {lessons.length}
          </span>{" "}
          lessons

        </div>


        {/* TABLE */}

        {loading ? (

          <div className="py-20 text-center">

            <p className="text-slate-500">
              Loading lessons...
            </p>

          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full min-w-[900px]">

              <thead>

                <tr className="border-b">

                  <th className="text-left py-4 px-3">
                    Lesson
                  </th>

                  <th className="text-left px-3">
                    Course
                  </th>

                  <th className="text-center px-3">
                    Resources
                  </th>

                  <th className="text-center px-3">
                    Order
                  </th>

                  <th className="text-center px-3">
                    Actions
                  </th>

                </tr>

              </thead>


              <tbody>

                {filteredLessons.length > 0 ? (

                  filteredLessons.map(
                    (lesson) => (

                      <tr
                        key={lesson.id}
                        className="
                          border-b
                          hover:bg-slate-50
                          transition
                        "
                      >

                        {/* LESSON */}

                        <td className="py-5 px-3">

                          <div className="max-w-[350px]">

                            <p className="font-bold text-slate-800">
                              {lesson.title}
                            </p>

                            <p className="
                              text-sm
                              text-slate-500
                              mt-1
                              line-clamp-2
                            ">
                              {lesson.description ||
                                "No description"}
                            </p>

                          </div>

                        </td>


                        {/* COURSE */}

                        <td className="px-3">

                          <span className="
                            inline-flex
                            px-3
                            py-1.5
                            rounded-full
                            bg-cyan-50
                            text-cyan-700
                            text-sm
                            font-semibold
                          ">
                            {lesson.course_title ||
                              "Unknown Course"}
                          </span>

                        </td>


                        {/* RESOURCES */}

                        <td className="px-3">

                          <div className="
                            flex
                            justify-center
                            items-center
                            gap-3
                          ">

                            {lesson.video_url && (

                              <span
                                title="Video available"
                                className="
                                  w-9
                                  h-9
                                  rounded-lg
                                  bg-blue-50
                                  text-blue-600
                                  flex
                                  items-center
                                  justify-center
                                "
                              >

                                <FaVideo />

                              </span>

                            )}


                            {lesson.pdf_url && (

                              <span
                                title="PDF available"
                                className="
                                  w-9
                                  h-9
                                  rounded-lg
                                  bg-red-50
                                  text-red-600
                                  flex
                                  items-center
                                  justify-center
                                "
                              >

                                <FaFilePdf />

                              </span>

                            )}


                            {!lesson.video_url &&
                              !lesson.pdf_url && (

                                <span className="text-xs text-slate-400">
                                  None
                                </span>

                              )}

                          </div>

                        </td>


                        {/* ORDER */}

                        <td className="text-center px-3">

                          <span className="
                            inline-flex
                            w-9
                            h-9
                            items-center
                            justify-center
                            rounded-full
                            bg-slate-100
                            text-slate-700
                            font-bold
                          ">

                            {lesson.lesson_order}

                          </span>

                        </td>


                        {/* ACTIONS */}

                        <td className="px-3">

                          <div className="
                            flex
                            justify-center
                            gap-2
                          ">

                            {/* VIEW */}

                            <button
                              type="button"
                              onClick={() => {

                                setSelectedLesson(
                                  lesson
                                );

                                setShowView(
                                  true
                                );

                              }}
                              title="View Lesson"
                              className="
                                bg-slate-700
                                hover:bg-slate-800
                                text-white
                                p-3
                                rounded-xl
                                transition
                              "
                            >

                              <FaEye />

                            </button>


                            {/* EDIT */}

                            <button
                              type="button"
                              onClick={() => {

                                setSelectedLesson(
                                  lesson
                                );

                                setShowEdit(
                                  true
                                );

                              }}
                              title="Edit Lesson"
                              className="
                                bg-blue-600
                                hover:bg-blue-700
                                text-white
                                p-3
                                rounded-xl
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
                                  lesson.id
                                )
                              }
                              title="Delete Lesson"
                              className="
                                bg-red-600
                                hover:bg-red-700
                                text-white
                                p-3
                                rounded-xl
                                transition
                              "
                            >

                              <FaTrash />

                            </button>

                          </div>

                        </td>

                      </tr>

                    )
                  )

                ) : (

                  <tr>

                    <td
                      colSpan="5"
                      className="
                        py-20
                        text-center
                        text-slate-500
                      "
                    >

                      <div className="space-y-2">

                        <p className="font-semibold">
                          No lessons found
                        </p>

                        <p className="text-sm">
                          Try changing your search or course filter.
                        </p>

                      </div>

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        )}

      </div>


      {/* ======================================
          ADD
      ====================================== */}

      {showAdd && (

        <AddLessonModal
          close={() =>
            setShowAdd(false)
          }
          refresh={loadData}
        />

      )}


      {/* ======================================
          EDIT
      ====================================== */}

      {showEdit && (

        <EditLessonModal
          lesson={selectedLesson}
          close={() =>
            setShowEdit(false)
          }
          refresh={loadData}
        />

      )}


      {/* ======================================
          VIEW
      ====================================== */}

      {showView && (

        <LessonViewModal
          lesson={selectedLesson}
          close={() =>
            setShowView(false)
          }
        />

      )}

    </>

  );

}

export default LessonTable;