import { useEffect, useState } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import toast from "react-hot-toast";

import {
  getAssignments,
  deleteAssignment,
} from "../../services/assignmentService";

import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import SearchBar from "../../components/common/SearchBar";
import DataTable from "../../components/common/DataTable";
import ConfirmDialog from "../../components/common/ConfirmDialog";

import AddAssignmentModal from "./AddAssignmentModal";
import EditAssignmentModal from "./EditAssignmentModal";

function AssignmentTable() {

  const [assignments, setAssignments] = useState([]);
  const [filteredAssignments, setFilteredAssignments] = useState([]);

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const [selectedAssignment, setSelectedAssignment] = useState(null);

  useEffect(() => {
    loadAssignments();
  }, []);

  useEffect(() => {

    const keyword = search.toLowerCase();

    setFilteredAssignments(

      assignments.filter((assignment) =>

        assignment.title
          .toLowerCase()
          .includes(keyword) ||

        assignment.course_title
          ?.toLowerCase()
          .includes(keyword)

      )

    );

  }, [search, assignments]);

  const loadAssignments = async () => {

    try {

      setLoading(true);

      const data = await getAssignments();

      setAssignments(data.assignments || []);
      setFilteredAssignments(data.assignments || []);

    }

    catch (err) {

      console.log(err);

      toast.error("Failed to load assignments");

    }

    finally {

      setLoading(false);

    }

  };

  const confirmDelete = async () => {

    try {

      await deleteAssignment(selectedAssignment.id);

      toast.success("Assignment Deleted");

      setShowDelete(false);

      loadAssignments();

    }

    catch (err) {

      console.log(err);

      toast.error("Delete Failed");

    }

  };

  const columns = [

    {
      key: "title",
      label: "Assignment",
    },

    {
      key: "course_title",
      label: "Course",
    },

    {
      key: "due_date",
      label: "Due Date",
    },

    {
      key: "total_marks",
      label: "Marks",
    },

  ];

  return (

    <>

      <Card

        title="Assignments"

        subtitle="Manage assignments for all courses"

        action={

          <Button
            onClick={() => setShowAdd(true)}
          >

            <FaPlus className="inline mr-2" />

            Add Assignment

          </Button>

        }

      >

        <div className="mb-6">

          <SearchBar

            value={search}

            onChange={setSearch}

            placeholder="Search assignments..."

          />

        </div>

        {

          loading

          ?

          (

            <div className="py-20 text-center">

              Loading Assignments...

            </div>

          )

          :

          (

            <DataTable

              columns={columns}

              data={filteredAssignments}

              emptyMessage="No Assignments Found"

              renderActions={(assignment) => (

                <div className="flex justify-center gap-3">

                  <Button

                    size="sm"

                    onClick={() => {

                      setSelectedAssignment(assignment);

                      setShowEdit(true);

                    }}

                  >

                    <FaEdit />

                  </Button>

                  <Button

                    size="sm"

                    variant="danger"

                    onClick={() => {

                      setSelectedAssignment(assignment);

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

      {

        showAdd &&

        <AddAssignmentModal

          close={() => setShowAdd(false)}

          refresh={loadAssignments}

        />

      }

      {

        showEdit &&

        <EditAssignmentModal

          assignment={selectedAssignment}

          close={() => setShowEdit(false)}

          refresh={loadAssignments}

        />

      }

      <ConfirmDialog

        isOpen={showDelete}

        onClose={() => setShowDelete(false)}

        onConfirm={confirmDelete}

        title="Delete Assignment"

        message={`Delete "${selectedAssignment?.title}" ?`}

        confirmText="Delete"

        danger

      />

    </>

  );

}

export default AssignmentTable;