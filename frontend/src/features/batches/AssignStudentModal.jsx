import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { assignStudent } from "../../services/batchService";
import { getStudents } from "../../services/adminStudentService";

function AssignStudentModal({
  batch,
  close,
}) {

  const [students, setStudents] = useState([]);

  const [selectedStudent, setSelectedStudent] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [loadingStudents, setLoadingStudents] =
    useState(true);


  // ============================================================
  // LOAD STUDENTS
  // ============================================================

  useEffect(() => {

    loadStudents();

  }, []);


  const loadStudents = async () => {

    try {

      setLoadingStudents(true);

      const response =
        await getStudents();

      setStudents(
        response.students || []
      );

    } catch (error) {

      console.error(
        "LOAD STUDENTS ERROR:",
        error
      );

      toast.error(
        error.response?.data?.message ||
        "Failed to load students."
      );

    } finally {

      setLoadingStudents(false);

    }

  };


  // ============================================================
  // ASSIGN STUDENT
  // ============================================================

  const handleAssign = async () => {

    if (!selectedStudent) {

      toast.error(
        "Please select a student."
      );

      return;

    }


    try {

      setLoading(true);

      const response =
        await assignStudent(

          batch.id,

          Number(selectedStudent)

        );


      toast.success(

        response.message ||
        "Student assigned successfully."

      );

      close();

    } catch (error) {

      console.error(
        "ASSIGN STUDENT ERROR:",
        error
      );


      if (
        error.response?.status === 409
      ) {

        toast.error(

          error.response?.data?.message ||
          "Student is already assigned to this batch."

        );

      } else {

        toast.error(

          error.response?.data?.message ||
          "Failed to assign student."

        );

      }

    } finally {

      setLoading(false);

    }

  };


  return (

    <div
      className="
        fixed
        inset-0
        z-[100]
        bg-black/50
        backdrop-blur-sm
        flex
        items-center
        justify-center
        p-4
      "
      onMouseDown={(event) => {

        if (
          event.target ===
          event.currentTarget
        ) {

          close();

        }

      }}
    >

      <div
        className="
          bg-white
          rounded-3xl
          shadow-2xl
          w-full
          max-w-xl
          max-h-[90vh]
          overflow-y-auto
        "
      >

        {/* ==================================================
            HEADER
        ================================================== */}

        <div
          className="
            flex
            justify-between
            items-center
            p-6
            border-b
            border-slate-100
          "
        >

          <div>

            <h2
              className="
                text-2xl
                font-bold
                text-slate-800
              "
            >

              Assign Student

            </h2>

            <p
              className="
                text-sm
                text-slate-500
                mt-1
              "
            >

              {batch?.batch_name}

            </p>

          </div>


          <button
            type="button"
            onClick={close}
            aria-label="Close assign student modal"
            className="
              w-10
              h-10
              rounded-xl
              bg-slate-100
              text-slate-500
              hover:bg-slate-200
              flex
              items-center
              justify-center
              transition
            "
          >

            ✕

          </button>

        </div>


        {/* ==================================================
            CONTENT
        ================================================== */}

        <div className="p-6">

          <label
            className="
              block
              mb-2
              font-semibold
              text-slate-700
            "
          >

            Select Student

          </label>


          <select
            value={selectedStudent}
            onChange={(event) =>
              setSelectedStudent(
                event.target.value
              )
            }
            disabled={loadingStudents}
            className="
              w-full
              rounded-xl
              border
              border-slate-300
              px-4
              py-3
              outline-none
              focus:ring-2
              focus:ring-cyan-500
              disabled:bg-slate-100
            "
          >

            <option value="">

              {loadingStudents
                ? "Loading students..."
                : "Select Student"}

            </option>


            {!loadingStudents &&
              students.map((student) => (

                <option
                  key={student.id}
                  value={student.id}
                >

                  {student.full_name}
                  {" "}
                  ({student.email})

                </option>

              ))

            }

          </select>


          {!loadingStudents &&
            students.length === 0 && (

              <p
                className="
                  text-sm
                  text-amber-600
                  mt-3
                "
              >

                No students are available.

              </p>

            )
          }

        </div>


        {/* ==================================================
            FOOTER
        ================================================== */}

        <div
          className="
            border-t
            border-slate-100
            p-6
            flex
            justify-end
            gap-3
          "
        >

          <button
            type="button"
            onClick={close}
            disabled={loading}
            className="
              px-6
              py-3
              rounded-xl
              bg-slate-100
              hover:bg-slate-200
              text-slate-700
              transition
              disabled:opacity-50
            "
          >

            Cancel

          </button>


          <button
            type="button"
            onClick={handleAssign}
            disabled={
              loading ||
              loadingStudents ||
              !selectedStudent
            }
            className="
              px-6
              py-3
              rounded-xl
              bg-cyan-600
              hover:bg-cyan-700
              text-white
              font-semibold
              transition
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >

            {loading
              ? "Assigning..."
              : "Assign Student"}

          </button>

        </div>

      </div>

    </div>

  );

}

export default AssignStudentModal;