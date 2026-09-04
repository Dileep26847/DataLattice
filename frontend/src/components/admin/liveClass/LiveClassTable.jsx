import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  FaPlus,
  FaSearch,
  FaVideo,
  FaEdit,
  FaTrash,
  FaPlayCircle,
  FaExternalLinkAlt,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

import {
  getLiveClasses,
  deleteLiveClass,
} from "../../../services/liveClassService";

import AddLiveClassModal from "./AddLiveClassModal";
import EditLiveClassModal from "./EditLiveClassModal";

function LiveClassTable() {

  // ============================================================
  // STATE
  // ============================================================

  const [classes, setClasses] = useState([]);

  const [filteredClasses, setFilteredClasses] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [showAdd, setShowAdd] =
    useState(false);

  const [showEdit, setShowEdit] =
    useState(false);

  const [selectedClass, setSelectedClass] =
    useState(null);


  // ============================================================
  // LOAD CLASSES
  // ============================================================

  useEffect(() => {

    loadClasses();

  }, []);


  // ============================================================
  // SEARCH
  // ============================================================

  useEffect(() => {

    const keyword =
      search.trim().toLowerCase();

    if (!keyword) {

      setFilteredClasses(classes);

      return;

    }

    const filtered =
      classes.filter((item) => {

        const title =
          String(item.title || "")
            .toLowerCase();

        const batch =
          String(item.batch_name || "")
            .toLowerCase();

        const status =
          String(item.status || "")
            .toLowerCase();

        return (
          title.includes(keyword) ||
          batch.includes(keyword) ||
          status.includes(keyword)
        );

      });

    setFilteredClasses(filtered);

  }, [search, classes]);


  // ============================================================
  // LOAD
  // ============================================================

  const loadClasses = async () => {

    try {

      setLoading(true);

      const data =
        await getLiveClasses();

      const liveClasses =
        data?.liveClasses || [];

      setClasses(liveClasses);

      setFilteredClasses(liveClasses);

    }

    catch (error) {

      console.error(
        "LOAD LIVE CLASSES ERROR:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
        "Failed to load live classes"
      );

    }

    finally {

      setLoading(false);

    }

  };


  // ============================================================
  // DELETE
  // ============================================================

  const handleDelete = async (id) => {

    const confirmed =
      window.confirm(
        "Delete this live class?\n\n" +
        "This will permanently remove the class " +
        "and its recording link."
      );

    if (!confirmed) {

      return;

    }

    try {

      await deleteLiveClass(id);

      toast.success(
        "Live Class Deleted Successfully"
      );

      await loadClasses();

    }

    catch (error) {

      console.error(
        "DELETE LIVE CLASS ERROR:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
        "Delete Failed"
      );

    }

  };


  // ============================================================
  // STATUS STYLE
  // ============================================================

  const getStatusClass = (status) => {

    switch (
      String(status || "")
        .toLowerCase()
    ) {

      case "live":

        return "bg-red-100 text-red-700";

      case "completed":

        return "bg-green-100 text-green-700";

      case "cancelled":

        return "bg-slate-200 text-slate-600";

      case "upcoming":

        return "bg-indigo-100 text-indigo-700";

      default:

        return "bg-slate-100 text-slate-600";

    }

  };


  // ============================================================
  // FORMAT DATE
  // ============================================================

  const formatDate = (date) => {

    if (!date) {

      return "-";

    }

    const parsedDate =
      new Date(date);

    if (
      Number.isNaN(
        parsedDate.getTime()
      )
    ) {

      return date;

    }

    return parsedDate.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );

  };


  // ============================================================
  // FORMAT TIME
  // ============================================================

  const formatTime = (time) => {

    if (!time) {

      return "-";

    }

    const value =
      String(time).slice(0, 5);

    const [hours, minutes] =
      value.split(":");

    if (
      hours === undefined ||
      minutes === undefined
    ) {

      return time;

    }

    const date =
      new Date();

    date.setHours(
      Number(hours),
      Number(minutes),
      0,
      0
    );

    return date.toLocaleTimeString(
      "en-IN",
      {
        hour: "numeric",
        minute: "2-digit",
      }
    );

  };


  // ============================================================
  // RECORDING STATUS
  // ============================================================

  const hasRecording =
    (liveClass) =>
      Boolean(
        liveClass?.recording_link &&
        String(
          liveClass.recording_link
        ).trim()
      );


  // ============================================================
  // RENDER
  // ============================================================

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
        ===================================================== */}

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

            <div
              className="
                flex
                items-center
                gap-3
              "
            >

              <div
                className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-cyan-50
                  text-cyan-600
                  flex
                  items-center
                  justify-center
                "
              >

                <FaVideo />

              </div>

              <div>

                <h2
                  className="
                    text-2xl
                    md:text-3xl
                    font-black
                    text-slate-800
                  "
                >

                  Live Classes

                </h2>

                <p
                  className="
                    text-slate-500
                    mt-1
                  "
                >

                  Schedule, manage and publish
                  recorded sessions.

                </p>

              </div>

            </div>

          </div>


          {/* ADD */}

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
              shadow-sm
            "

          >

            <FaPlus />

            Schedule Class

          </button>

        </div>


        {/* ====================================================
            SEARCH
        ===================================================== */}

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
              Search by class, batch or status...
            "

            className="
              w-full
              pl-12
              pr-4
              py-3
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              outline-none
              focus:bg-white
              focus:ring-2
              focus:ring-cyan-100
              focus:border-cyan-500
              transition
            "

          />

        </div>


        {/* ====================================================
            LOADING
        ===================================================== */}

        {loading ? (

          <div
            className="
              py-20
              text-center
              text-slate-500
            "
          >

            <div
              className="
                w-10
                h-10
                border-4
                border-cyan-100
                border-t-cyan-600
                rounded-full
                animate-spin
                mx-auto
              "
            />

            <p className="mt-4">

              Loading live classes...

            </p>

          </div>

        ) : filteredClasses.length === 0 ? (

          /* ==================================================
              EMPTY
          =================================================== */

          <div
            className="
              py-16
              text-center
              border
              border-dashed
              border-slate-200
              rounded-2xl
              bg-slate-50
            "
          >

            <FaVideo
              className="
                mx-auto
                text-slate-300
              "
              size={42}
            />

            <h3
              className="
                text-xl
                font-bold
                text-slate-700
                mt-4
              "
            >

              No Live Classes Found

            </h3>

            <p
              className="
                text-slate-500
                mt-2
              "
            >

              {search
                ? "Try a different search."
                : "Schedule your first live class."}

            </p>

          </div>

        ) : (

          /* ==================================================
              TABLE
          =================================================== */

          <div className="overflow-x-auto">

            <table
              className="
                w-full
                min-w-[1100px]
              "
            >

              <thead>

                <tr
                  className="
                    border-b
                    border-slate-200
                    bg-slate-50
                  "
                >

                  <th
                    className="
                      text-left
                      py-4
                      px-4
                      text-sm
                      font-bold
                      text-slate-600
                    "
                  >

                    Class

                  </th>

                  <th
                    className="
                      text-left
                      py-4
                      px-4
                      text-sm
                      font-bold
                      text-slate-600
                    "
                  >

                    Batch

                  </th>

                  <th
                    className="
                      text-left
                      py-4
                      px-4
                      text-sm
                      font-bold
                      text-slate-600
                    "
                  >

                    Date

                  </th>

                  <th
                    className="
                      text-left
                      py-4
                      px-4
                      text-sm
                      font-bold
                      text-slate-600
                    "
                  >

                    Time

                  </th>

                  <th
                    className="
                      text-left
                      py-4
                      px-4
                      text-sm
                      font-bold
                      text-slate-600
                    "
                  >

                    Status

                  </th>

                  <th
                    className="
                      text-left
                      py-4
                      px-4
                      text-sm
                      font-bold
                      text-slate-600
                    "
                  >

                    Recording

                  </th>

                  <th
                    className="
                      text-center
                      py-4
                      px-4
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

                {filteredClasses.map(
                  (liveClass) => (

                    <tr
                      key={liveClass.id}
                      className="
                        border-b
                        border-slate-100
                        hover:bg-slate-50
                        transition
                      "
                    >

                      {/* CLASS */}

                      <td className="py-5 px-4">

                        <div
                          className="
                            flex
                            items-start
                            gap-3
                          "
                        >

                          <div
                            className="
                              w-10
                              h-10
                              rounded-xl
                              bg-indigo-50
                              text-indigo-600
                              flex
                              items-center
                              justify-center
                              shrink-0
                            "
                          >

                            <FaVideo />

                          </div>


                          <div className="min-w-0">

                            <h3
                              className="
                                font-bold
                                text-slate-800
                                break-words
                              "
                            >

                              {liveClass.title}

                            </h3>

                            {liveClass.description && (

                              <p
                                className="
                                  text-xs
                                  text-slate-500
                                  mt-1
                                  max-w-xs
                                  truncate
                                "
                              >

                                {liveClass.description}

                              </p>

                            )}

                          </div>

                        </div>

                      </td>


                      {/* BATCH */}

                      <td className="py-5 px-4">

                        <span
                          className="
                            inline-flex
                            bg-cyan-50
                            text-cyan-700
                            px-3
                            py-1.5
                            rounded-full
                            text-sm
                            font-semibold
                            whitespace-nowrap
                          "
                        >

                          {liveClass.batch_name ||
                            "Not assigned"}

                        </span>

                      </td>


                      {/* DATE */}

                      <td className="py-5 px-4">

                        <span
                          className="
                            text-sm
                            font-medium
                            text-slate-700
                            whitespace-nowrap
                          "
                        >

                          {formatDate(
                            liveClass.class_date
                          )}

                        </span>

                      </td>


                      {/* TIME */}

                      <td className="py-5 px-4">

                        <div
                          className="
                            flex
                            items-center
                            gap-2
                            text-sm
                            text-slate-600
                            whitespace-nowrap
                          "
                        >

                          <FaClock
                            className="
                              text-orange-500
                            "
                          />

                          {formatTime(
                            liveClass.start_time
                          )}

                          {liveClass.end_time && (
                            <>
                              {" - "}
                              {formatTime(
                                liveClass.end_time
                              )}
                            </>
                          )}

                        </div>

                      </td>


                      {/* STATUS */}

                      <td className="py-5 px-4">

                        <span
                          className={`
                            inline-flex
                            items-center
                            gap-2
                            px-3
                            py-1.5
                            rounded-full
                            text-xs
                            font-bold
                            ${getStatusClass(
                              liveClass.status
                            )}
                          `}
                        >

                          {String(
                            liveClass.status || ""
                          ).toLowerCase() ===
                            "completed" && (
                              <FaCheckCircle />
                          )}

                          {liveClass.status ||
                            "Upcoming"}

                        </span>

                      </td>


                      {/* RECORDING */}

                      <td className="py-5 px-4">

                        {hasRecording(
                          liveClass
                        ) ? (

                          <a
                            href={
                              liveClass.recording_link
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                              inline-flex
                              items-center
                              gap-2
                              bg-green-50
                              text-green-700
                              hover:bg-green-100
                              px-3
                              py-1.5
                              rounded-full
                              text-xs
                              font-bold
                              transition
                              whitespace-nowrap
                            "
                          >

                            <FaPlayCircle />

                            Available

                            <FaExternalLinkAlt
                              size={10}
                            />

                          </a>

                        ) : (

                          <span
                            className="
                              inline-flex
                              items-center
                              gap-2
                              bg-slate-100
                              text-slate-500
                              px-3
                              py-1.5
                              rounded-full
                              text-xs
                              font-semibold
                              whitespace-nowrap
                            "
                          >

                            Not Uploaded

                          </span>

                        )}

                      </td>


                      {/* ACTIONS */}

                      <td className="py-5 px-4">

                        <div
                          className="
                            flex
                            justify-center
                            gap-2
                          "
                        >

                          {/* EDIT */}

                          <button

                            type="button"

                            onClick={() => {

                              setSelectedClass(
                                liveClass
                              );

                              setShowEdit(true);

                            }}

                            title="
                              Edit class / add recording
                            "

                            className="
                              w-10
                              h-10
                              rounded-xl
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
                                liveClass.id
                              )
                            }

                            title="Delete class"

                            className="
                              w-10
                              h-10
                              rounded-xl
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

          </div>

        )}

      </div>


      {/* ======================================================
          ADD MODAL
      ====================================================== */}

      {showAdd && (

        <AddLiveClassModal

          close={() =>
            setShowAdd(false)
          }

          refresh={
            loadClasses
          }

        />

      )}


      {/* ======================================================
          EDIT MODAL
      ====================================================== */}

      {showEdit && (

        <EditLiveClassModal

          liveClass={
            selectedClass
          }

          close={() =>
            setShowEdit(false)
          }

          refresh={
            loadClasses
          }

        />

      )}

    </>

  );

}

export default LiveClassTable;