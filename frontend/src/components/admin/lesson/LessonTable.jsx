import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import {
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaVideo,
  FaFilePdf,
} from "react-icons/fa";

import {
  getLessons,
  deleteLesson,
} from "../../../services/lessonManagementService";

import AddLessonModal from "./AddLessonModal";
import EditLessonModal from "./EditLessonModal";

function LessonTable() {

  const [lessons, setLessons] = useState([]);

  const [filteredLessons, setFilteredLessons] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [showAdd, setShowAdd] = useState(false);

  const [showEdit, setShowEdit] = useState(false);

  const [selectedLesson, setSelectedLesson] = useState(null);

  useEffect(() => {

    loadLessons();

  }, []);

  useEffect(() => {

    const keyword = search.toLowerCase();

    setFilteredLessons(

      lessons.filter(

        (lesson) =>

          lesson.title
            .toLowerCase()
            .includes(keyword) ||

          lesson.course_title
            ?.toLowerCase()
            .includes(keyword)

      )

    );

  }, [search, lessons]);

  const loadLessons = async () => {

    try {

      const data = await getLessons();

      setLessons(data.lessons);

      setFilteredLessons(data.lessons);

    }

    catch (err) {

      console.log(err);

      toast.error("Failed to load lessons");

    }

    finally {

      setLoading(false);

    }

  };

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this lesson?"
    );

    if (!confirmDelete) return;

    try {

      await deleteLesson(id);

      toast.success("Lesson Deleted");

      loadLessons();

    }

    catch (err) {

      console.log(err);

      toast.error("Delete Failed");

    }

  };

  return (

    <>

      <div className="bg-white rounded-3xl shadow-xl p-8">

        {/* Header */}

        <div className="flex justify-between items-center mb-8">

          <div>

            <h2 className="text-3xl font-black">

              Lessons

            </h2>

            <p className="text-slate-500 mt-2">

              Manage all course lessons

            </p>

          </div>

          <button

            onClick={() => setShowAdd(true)}

            className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-xl flex items-center gap-3"

          >

            <FaPlus />

            Add Lesson

          </button>

        </div>

        {/* Search */}

        <div className="relative mb-8">

          <FaSearch className="absolute left-4 top-4 text-slate-400" />

          <input

            value={search}

            onChange={(e) =>

              setSearch(e.target.value)

            }

            placeholder="Search Lesson..."

            className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-100 outline-none"

          />

        </div>

        {

          loading

          ?

          (

            <div className="py-20 text-center">

              Loading Lessons...

            </div>

          )

          :

          (

            <table className="w-full">

              <thead>

                <tr className="border-b">

                  <th className="text-left py-4">

                    Lesson

                  </th>

                  <th>

                    Course

                  </th>

                  <th>

                    Resources

                  </th>

                  <th>

                    Order

                  </th>

                  <th>

                    Actions

                  </th>

                </tr>

              </thead>

              <tbody>

                             {

                  filteredLessons.length > 0

                  ?

                  (

                    filteredLessons.map((lesson) => (

                      <tr
                        key={lesson.id}
                        className="border-b hover:bg-slate-50 transition"
                      >

                        {/* Lesson */}

                        <td className="py-5">

                          <div>

                            <h3 className="font-bold text-slate-800">

                              {lesson.title}

                            </h3>

                            <p className="text-sm text-slate-500 mt-1 line-clamp-2">

                              {lesson.description}

                            </p>

                          </div>

                        </td>

                        {/* Course */}

                        <td>

                          <span className="px-4 py-2 rounded-full bg-cyan-100 text-cyan-700 font-semibold">

                            {lesson.course_title || `Course #${lesson.course_id}`}

                          </span>

                        </td>

                        {/* Resources */}

                        <td>

                          <div className="flex justify-center gap-3">

                            {

                              lesson.video_url &&

                              <span className="bg-blue-100 text-blue-700 p-3 rounded-xl">

                                <FaVideo />

                              </span>

                            }

                            {

                              lesson.pdf_url &&

                              <span className="bg-red-100 text-red-600 p-3 rounded-xl">

                                <FaFilePdf />

                              </span>

                            }

                            {

                              !lesson.video_url &&

                              !lesson.pdf_url &&

                              <span className="text-slate-400">

                                No Files

                              </span>

                            }

                          </div>

                        </td>

                        {/* Lesson Order */}

                        <td className="text-center">

                          <span className="bg-slate-200 px-4 py-2 rounded-full font-bold">

                            {lesson.lesson_order}

                          </span>

                        </td>

                        {/* Actions */}

                        <td>

                          <div className="flex justify-center gap-3">

                            <button

                              onClick={() => {

                                setSelectedLesson(lesson);

                                setShowEdit(true);

                              }}

                              className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl"

                            >

                              <FaEdit />

                            </button>

                            <button

                              onClick={() => handleDelete(lesson.id)}

                              className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-xl"

                            >

                              <FaTrash />

                            </button>

                          </div>

                        </td>

                      </tr>

                    ))

                  )

                  :

                  (

                    <tr>

                      <td
                        colSpan="5"
                        className="py-20 text-center text-slate-500"
                      >

                        <div className="space-y-3">

                          <h3 className="text-2xl font-bold">

                            No Lessons Found

                          </h3>

                          <p>

                            Click "Add Lesson" to create your first lesson.

                          </p>

                        </div>

                      </td>

                    </tr>

                  )

                }

              </tbody>

            </table>

          )

        }

      </div>

      {

        showAdd &&

        <AddLessonModal

          close={() => setShowAdd(false)}

          refresh={loadLessons}

        />

      }

      {

        showEdit &&

        <EditLessonModal

          lesson={selectedLesson}

          close={() => setShowEdit(false)}

          refresh={loadLessons}

        />

      }

    </>

  );

}

export default LessonTable;