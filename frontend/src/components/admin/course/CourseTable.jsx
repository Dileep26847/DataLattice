import { useEffect, useState } from "react";
import {
  FaEdit,
  FaTrash,
  FaPlus,
} from "react-icons/fa";
import toast from "react-hot-toast";

import {
  getCourses,
  deleteCourse,
} from "../../../services/courseManagementService";

import Card from "../../common/Card";
import Button from "../../common/Button";
import SearchBar from "../../common/SearchBar";
import DataTable from "../../common/DataTable";
import ConfirmDialog from "../../common/ConfirmDialog";

import AddCourseModal from "./AddCourseModal";
import EditCourseModal from "./EditCourseModal";

function CourseTable() {

  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const [showDelete, setShowDelete] = useState(false);

  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {

    loadCourses();

  }, []);

  useEffect(() => {

    const keyword = search.toLowerCase();

    setFilteredCourses(

      courses.filter(

        (course) =>

          course.title.toLowerCase().includes(keyword) ||

          course.instructor.toLowerCase().includes(keyword) ||

          course.category.toLowerCase().includes(keyword)

      )

    );

  }, [search, courses]);

  const loadCourses = async () => {

    try {

      setLoading(true);

      const data = await getCourses();

      setCourses(data.courses || []);

      setFilteredCourses(data.courses || []);

    } catch (err) {

      console.log(err);

      toast.error("Failed to load courses");

    } finally {

      setLoading(false);

    }

  };

  const confirmDelete = async () => {

    try {

      await deleteCourse(selectedCourse.id);

      toast.success("Course Deleted");

      setShowDelete(false);

      loadCourses();

    } catch (err) {

      console.log(err);

      toast.error("Delete Failed");

    }

  };

  const columns = [

    {
      key: "course",
      label: "Course",
      render: (course) => (

        <div className="flex items-center gap-4">

          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-20 h-12 rounded-xl object-cover"
          />

          <div>

            <h3 className="font-bold">

              {course.title}

            </h3>

          </div>

        </div>

      ),
    },

    {
      key: "instructor",
      label: "Instructor",
    },

    {
      key: "category",
      label: "Category",
    },

    {
      key: "price",
      label: "Price",
      render: (course) => `₹${course.price}`,
    },

  ];

  return (

    <>

      <Card

        title="Courses"

        subtitle="Manage all LMS courses"

        action={

          <Button onClick={() => setShowAdd(true)}>

            <FaPlus className="inline mr-2"/>

            Add Course

          </Button>

        }

      >

        <div className="mb-6">

          <SearchBar

            value={search}

            onChange={setSearch}

            placeholder="Search courses..."

          />

        </div>

        {

          loading ?

          (

            <div className="py-20 text-center">

              Loading Courses...

            </div>

          )

          :

          (

            <DataTable

              columns={columns}

              data={filteredCourses}

              emptyMessage="No Courses Found"

              renderActions={(course)=>(

                <div className="flex justify-center gap-3">

                  <Button

                    size="sm"

                    onClick={()=>{

                      setSelectedCourse(course);

                      setShowEdit(true);

                    }}

                  >

                    <FaEdit/>

                  </Button>

                  <Button

                    size="sm"

                    variant="danger"

                    onClick={()=>{

                      setSelectedCourse(course);

                      setShowDelete(true);

                    }}

                  >

                    <FaTrash/>

                  </Button>

                </div>

              )}

            />

          )

        }

      </Card>

      {

        showAdd &&

        <AddCourseModal

          close={()=>setShowAdd(false)}

          refresh={loadCourses}

        />

      }

      {

        showEdit &&

        <EditCourseModal

          course={selectedCourse}

          close={()=>setShowEdit(false)}

          refresh={loadCourses}

        />

      }

      <ConfirmDialog

        isOpen={showDelete}

        onClose={()=>setShowDelete(false)}

        onConfirm={confirmDelete}

        title="Delete Course"

        message={`Are you sure you want to delete "${selectedCourse?.title}"? This action cannot be undone.`}

        confirmText="Delete"

        danger

      />

    </>

  );

}

export default CourseTable;