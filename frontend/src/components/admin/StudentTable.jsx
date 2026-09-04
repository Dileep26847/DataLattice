import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaTrash,
  FaEye,
  FaUserEdit,
} from "react-icons/fa";

import {
  getStudents,
  deleteStudent,
} from "../../services/studentService";

import Card from "../common/Card";
import Button from "../common/Button";
import SearchBar from "../common/SearchBar";
import DataTable from "../common/DataTable";
import ConfirmDialog from "../common/ConfirmDialog";

function StudentTable() {

  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [showDelete, setShowDelete] = useState(false);

  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {

    loadStudents();

  }, []);

  useEffect(() => {

    const keyword = search.toLowerCase();

    setFilteredStudents(

      students.filter(

        (student) =>

          student.full_name.toLowerCase().includes(keyword) ||

          student.email.toLowerCase().includes(keyword)

      )

    );

  }, [search, students]);

  const loadStudents = async () => {

    try {

      setLoading(true);

      const data = await getStudents();

      setStudents(data.students || []);

      setFilteredStudents(data.students || []);

    }

    catch (err) {

      console.log(err);

      toast.error("Failed to load students");

    }

    finally {

      setLoading(false);

    }

  };

  const confirmDelete = async () => {

    try {

      await deleteStudent(selectedStudent.id);

      toast.success("Student Deleted");

      setShowDelete(false);

      loadStudents();

    }

    catch (err) {

      console.log(err);

      toast.error("Delete Failed");

    }

  };

  const columns = [

    {

      key: "student",

      label: "Student",

      render: (student) => (

        <div className="flex items-center gap-4">

          <img

            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              student.full_name
            )}&background=0891b2&color=fff&size=128`}

            alt={student.full_name}

            className="w-14 h-14 rounded-full"

          />

          <div>

            <h3 className="font-bold">

              {student.full_name}

            </h3>

            <p className="text-sm text-slate-500">

              ID #{student.id}

            </p>

          </div>

        </div>

      ),

    },

    {

      key: "email",

      label: "Email",

    },

    {

      key: "role",

      label: "Role",

      render: (student) => (

        <span className="capitalize bg-cyan-100 text-cyan-700 px-4 py-2 rounded-full text-sm font-semibold">

          {student.role}

        </span>

      ),

    },

    {

      key: "created_at",

      label: "Joined",

      render: (student) =>

        new Date(student.created_at).toLocaleDateString(),

    },

  ];

  return (

    <>

      <Card

        title="Students"

        subtitle="Registered student accounts"

      >

        <div className="mb-6">

          <SearchBar

            value={search}

            onChange={setSearch}

            placeholder="Search students..."

          />

        </div>

        {

          loading ?

          (

            <div className="py-20 text-center">

              Loading Students...

            </div>

          )

          :

          (

            <DataTable

              columns={columns}

              data={filteredStudents}

              emptyMessage="No Students Found"

              renderActions={(student)=>(

                <div className="flex justify-center gap-2">

                  <Button

                    size="sm"

                    variant="secondary"

                  >

                    <FaEye />

                  </Button>

                  <Button

                    size="sm"

                  >

                    <FaUserEdit />

                  </Button>

                  <Button

                    size="sm"

                    variant="danger"

                    onClick={()=>{

                      setSelectedStudent(student);

                      setShowDelete(true);

                    }}

                  >

                    <FaTrash />

                  </Button>

                </div>

              )}

            />

          )

        }

      </Card>

      <ConfirmDialog

        isOpen={showDelete}

        onClose={()=>setShowDelete(false)}

        onConfirm={confirmDelete}

        title="Delete Student"

        message={`Are you sure you want to delete "${selectedStudent?.full_name}"? This action cannot be undone.`}

        confirmText="Delete"

        danger

      />

    </>

  );

}

export default StudentTable;