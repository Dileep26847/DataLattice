import {
  useEffect,
  useState,
} from "react";

import {
  FaPlus,
  FaSearch,
  FaUsers,
  FaEdit,
  FaTrash,
  FaEye,
} from "react-icons/fa";

import toast from "react-hot-toast";


import {
  getBatches,
  deleteBatch,
} from "../../services/batchService";


import AddBatchModal
  from "./AddBatchModal";

import EditBatchModal
  from "./EditBatchModal";

import AssignStudentModal
  from "./AssignStudentModal";

import BatchDetailsModal
  from "./BatchDetailsModal";


// ============================================================
// BATCH TABLE
// ============================================================

function BatchTable() {

  // ==========================================================
  // STATE
  // ==========================================================

  const [batches, setBatches] =
    useState([]);

  const [filtered, setFiltered] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");


  // ==========================================================
  // MODAL STATE
  // ==========================================================

  const [showAdd, setShowAdd] =
    useState(false);

  const [showEdit, setShowEdit] =
    useState(false);

  const [showAssign, setShowAssign] =
    useState(false);

  const [showDetails, setShowDetails] =
    useState(false);


  // ==========================================================
  // SELECTED BATCH
  // ==========================================================

  const [selectedBatch, setSelectedBatch] =
    useState(null);


  // ==========================================================
  // INITIAL LOAD
  // ==========================================================

  useEffect(() => {

    loadBatches();

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

      setFiltered(
        batches
      );

      return;

    }


    const results =
      batches.filter(
        (batch) => {

          return (

            batch.batch_name
              ?.toLowerCase()
              .includes(keyword)

            ||

            batch.course_title
              ?.toLowerCase()
              .includes(keyword)

            ||

            batch.mentor_name
              ?.toLowerCase()
              .includes(keyword)

            ||

            batch.status
              ?.toLowerCase()
              .includes(keyword)

          );

        }
      );


    setFiltered(
      results
    );

  }, [
    search,
    batches,
  ]);


  // ==========================================================
  // LOAD BATCHES
  // ==========================================================

  const loadBatches =
    async () => {

      try {

        setLoading(true);


        const data =
          await getBatches();


        const batchList =
          data.batches || [];


        setBatches(
          batchList
        );


        setFiltered(
          batchList
        );

      }

      catch (error) {

        console.error(
          "LOAD BATCHES ERROR:",
          error
        );


        toast.error(

          error.response?.data?.message ||

          "Failed to load batches."

        );

      }

      finally {

        setLoading(false);

      }

    };


  // ==========================================================
  // DELETE
  // ==========================================================

  const handleDelete =
    async (id) => {

      const confirmed =
        window.confirm(

          "Are you sure you want to delete this batch?"

        );


      if (!confirmed) {

        return;

      }


      try {

        await deleteBatch(
          id
        );


        toast.success(
          "Batch deleted successfully."
        );


        await loadBatches();

      }

      catch (error) {

        console.error(
          "DELETE BATCH ERROR:",
          error
        );


        toast.error(

          error.response?.data?.message ||

          "Failed to delete batch."

        );

      }

    };


  // ==========================================================
  // OPEN DETAILS
  // ==========================================================

  const handleView =
    (batch) => {

      setSelectedBatch(
        batch
      );

      setShowDetails(
        true
      );

    };


  // ==========================================================
  // OPEN ASSIGN
  // ==========================================================

  const handleAssign =
    (batch) => {

      setSelectedBatch(
        batch
      );

      setShowAssign(
        true
      );

    };


  // ==========================================================
  // OPEN EDIT
  // ==========================================================

  const handleEdit =
    (batch) => {

      setSelectedBatch(
        batch
      );

      setShowEdit(
        true
      );

    };


  // ==========================================================
  // STATUS STYLE
  // ==========================================================

  const getStatusClasses =
    (status) => {

      switch (status) {

        case "Ongoing":

          return `
            bg-green-100
            text-green-700
          `;


        case "Completed":

          return `
            bg-slate-200
            text-slate-700
          `;


        case "Upcoming":

        default:

          return `
            bg-amber-100
            text-amber-700
          `;

      }

    };


  // ==========================================================
  // DATE FORMAT
  // ==========================================================

  const formatDate =
    (date) => {

      if (!date) {

        return "—";

      }


      return new Date(
        date
      ).toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      );

    };


  // ==========================================================
  // RENDER
  // ==========================================================

  return (

    <>

      {/* ======================================================
          MAIN CARD
      ====================================================== */}

      <div
        className="
          bg-white
          rounded-3xl
          shadow-xl
          p-6
          md:p-8
        "
      >

        {/* ====================================================
            HEADER
        ==================================================== */}

        <div
          className="
            flex
            flex-col
            md:flex-row
            md:items-center
            md:justify-between
            gap-4
            mb-8
          "
        >

          <div>

            <h2
              className="
                text-2xl
                md:text-3xl
                font-black
                text-slate-800
              "
            >

              Batches

            </h2>


            <p
              className="
                text-slate-500
                mt-1
              "
            >

              Manage training batches

            </p>

          </div>


          <button
            type="button"
            onClick={() =>
              setShowAdd(true)
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
              gap-3
              font-semibold
              transition
            "
          >

            <FaPlus />

            Add Batch

          </button>

        </div>


        {/* ====================================================
            SEARCH
        ==================================================== */}

        <div
          className="
            relative
            mb-8
          "
        >

          <FaSearch
            className="
              absolute
              left-4
              top-4
              text-slate-400
            "
          />


          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
            placeholder="
              Search batch, course, mentor or status...
            "
            className="
              w-full
              pl-12
              pr-4
              py-3
              rounded-xl
              bg-slate-100
              border
              border-transparent
              outline-none
              focus:bg-white
              focus:border-cyan-500
              focus:ring-2
              focus:ring-cyan-100
              transition
            "
          />

        </div>


        {/* ====================================================
            LOADING
        ==================================================== */}

        {loading ? (

          <div
            className="
              py-20
              text-center
              text-slate-500
            "
          >

            Loading batches...

          </div>

        ) : filtered.length === 0 ? (

          /* ==================================================
             EMPTY
          ================================================== */

          <div
            className="
              py-20
              text-center
              border
              border-dashed
              border-slate-300
              rounded-2xl
            "
          >

            <FaUsers
              className="
                mx-auto
                text-4xl
                text-slate-300
                mb-4
              "
            />


            <h3
              className="
                text-lg
                font-bold
                text-slate-700
              "
            >

              {search
                ? "No matching batches found."
                : "No batches available."}

            </h3>


            <p
              className="
                text-sm
                text-slate-500
                mt-1
              "
            >

              {search
                ? "Try a different search term."
                : "Create your first batch to get started."}

            </p>

          </div>

        ) : (

          /* ==================================================
             TABLE
          ================================================== */

          <div
            className="
              overflow-x-auto
              rounded-2xl
              border
              border-slate-100
            "
          >

            <table
              className="
                w-full
                min-w-[950px]
              "
            >

              <thead>

                <tr
                  className="
                    bg-slate-50
                    border-b
                    border-slate-200
                  "
                >

                  <th
                    className="
                      px-5
                      py-4
                      text-left
                      text-sm
                      font-bold
                      text-slate-600
                    "
                  >

                    Batch

                  </th>


                  <th
                    className="
                      px-5
                      py-4
                      text-left
                      text-sm
                      font-bold
                      text-slate-600
                    "
                  >

                    Course

                  </th>


                  <th
                    className="
                      px-5
                      py-4
                      text-left
                      text-sm
                      font-bold
                      text-slate-600
                    "
                  >

                    Mentor

                  </th>


                  <th
                    className="
                      px-5
                      py-4
                      text-center
                      text-sm
                      font-bold
                      text-slate-600
                    "
                  >

                    Students

                  </th>


                  <th
                    className="
                      px-5
                      py-4
                      text-center
                      text-sm
                      font-bold
                      text-slate-600
                    "
                  >

                    Status

                  </th>


                  <th
                    className="
                      px-5
                      py-4
                      text-center
                      text-sm
                      font-bold
                      text-slate-600
                    "
                  >

                    Dates

                  </th>


                  <th
                    className="
                      px-5
                      py-4
                      text-center
                      text-sm
                      font-bold
                      text-slate-600
                    "
                  >

                    Actions

                  </th>

                </tr>

              </thead>


              <tbody>

                {filtered.map(
                  (batch) => (

                    <tr
                      key={batch.id}
                      className="
                        border-b
                        border-slate-100
                        last:border-b-0
                        hover:bg-slate-50
                        transition
                      "
                    >

                      {/* BATCH */}

                      <td
                        className="
                          px-5
                          py-5
                        "
                      >

                        <div>

                          <p
                            className="
                              font-bold
                              text-slate-800
                            "
                          >

                            {batch.batch_name}

                          </p>


                          <p
                            className="
                              text-xs
                              text-slate-400
                              mt-1
                            "
                          >

                            Batch #{batch.id}

                          </p>

                        </div>

                      </td>


                      {/* COURSE */}

                      <td
                        className="
                          px-5
                          py-5
                          text-slate-600
                        "
                      >

                        {batch.course_title ||
                          "Not assigned"}

                      </td>


                      {/* MENTOR */}

                      <td
                        className="
                          px-5
                          py-5
                          text-slate-600
                        "
                      >

                        {batch.mentor_name ||
                          "Not assigned"}

                      </td>


                      {/* STUDENTS */}

                      <td
                        className="
                          px-5
                          py-5
                          text-center
                        "
                      >

                        <span
                          className="
                            inline-flex
                            items-center
                            gap-2
                            bg-cyan-100
                            text-cyan-700
                            px-4
                            py-2
                            rounded-full
                            font-semibold
                          "
                        >

                          <FaUsers />

                          {
                            batch.total_students ??
                            0
                          }

                        </span>

                      </td>


                      {/* STATUS */}

                      <td
                        className="
                          px-5
                          py-5
                          text-center
                        "
                      >

                        <span
                          className={`
                            inline-flex
                            px-4
                            py-2
                            rounded-full
                            text-sm
                            font-semibold
                            ${getStatusClasses(
                              batch.status
                            )}
                          `}
                        >

                          {batch.status ||
                            "Upcoming"}

                        </span>

                      </td>


                      {/* DATES */}

                      <td
                        className="
                          px-5
                          py-5
                          text-center
                        "
                      >

                        <div
                          className="
                            text-xs
                            text-slate-500
                            whitespace-nowrap
                          "
                        >

                          <div>

                            {formatDate(
                              batch.start_date
                            )}

                          </div>


                          <div
                            className="
                              text-slate-300
                              my-1
                            "
                          >

                            ↓

                          </div>


                          <div>

                            {formatDate(
                              batch.end_date
                            )}

                          </div>

                        </div>

                      </td>


                      {/* ACTIONS */}

                      <td
                        className="
                          px-5
                          py-5
                        "
                      >

                        <div
                          className="
                            flex
                            gap-2
                            justify-center
                          "
                        >

                          {/* VIEW */}

                          <button
                            type="button"
                            onClick={() =>
                              handleView(
                                batch
                              )
                            }
                            title="View Batch Details"
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


                          {/* ASSIGN */}

                          <button
                            type="button"
                            onClick={() =>
                              handleAssign(
                                batch
                              )
                            }
                            title="Assign Student"
                            className="
                              bg-indigo-600
                              hover:bg-indigo-700
                              text-white
                              p-3
                              rounded-xl
                              transition
                            "
                          >

                            <FaUsers />

                          </button>


                          {/* EDIT */}

                          <button
                            type="button"
                            onClick={() =>
                              handleEdit(
                                batch
                              )
                            }
                            title="Edit Batch"
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
                                batch.id
                              )
                            }
                            title="Delete Batch"
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
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>


      {/* ======================================================
          ADD BATCH
      ====================================================== */}

      {showAdd && (

        <AddBatchModal

          close={() =>
            setShowAdd(false)
          }

          refresh={
            loadBatches
          }

        />

      )}


      {/* ======================================================
          EDIT BATCH
      ====================================================== */}

      {showEdit && (

        <EditBatchModal

          batch={
            selectedBatch
          }

          close={() => {

            setShowEdit(false);

            setSelectedBatch(null);

          }}

          refresh={
            loadBatches
          }

        />

      )}


      {/* ======================================================
          ASSIGN STUDENT
      ====================================================== */}

      {showAssign && (

        <AssignStudentModal

          batch={
            selectedBatch
          }

          close={() => {

            setShowAssign(false);

            setSelectedBatch(null);

            loadBatches();

          }}

        />

      )}


      {/* ======================================================
          BATCH DETAILS
      ====================================================== */}

      {showDetails && (

        <BatchDetailsModal

          batch={
            selectedBatch
          }

          close={() => {

            setShowDetails(false);

            setSelectedBatch(null);

          }}

        />

      )}

    </>

  );

}


export default BatchTable;