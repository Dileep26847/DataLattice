import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  FaTimes,
  FaUsers,
  FaBookOpen,
  FaChalkboardTeacher,
  FaCalendarAlt,
  FaCheckCircle,
} from "react-icons/fa";

import {
  getBatchById,
  getBatchStudents,
} from "../../services/batchService";

function BatchDetailsModal({
  batch,
  close,
}) {

  const [batchDetails, setBatchDetails] =
    useState(batch);

  const [students, setStudents] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    if (batch?.id) {

      loadDetails();

    }

  }, [batch]);


  const loadDetails = async () => {

    try {

      setLoading(true);

      const [
        batchResponse,
        studentsResponse,
      ] = await Promise.all([

        getBatchById(batch.id),

        getBatchStudents(batch.id),

      ]);


      setBatchDetails(
        batchResponse.batch || batch
      );

      setStudents(
        studentsResponse.students || []
      );

    } catch (error) {

      console.error(
        "LOAD BATCH DETAILS ERROR:",
        error
      );

      toast.error(
        error.response?.data?.message ||
        "Failed to load batch details."
      );

    } finally {

      setLoading(false);

    }

  };


  const getStatusClasses = (
    status
  ) => {

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


  const formatDate = (
    date
  ) => {

    if (!date) {

      return "Not provided";

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


  if (!batch) {

    return null;

  }


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
          max-w-4xl
          max-h-[90vh]
          overflow-hidden
          flex
          flex-col
        "
      >

        {/* ==================================================
            HEADER
        ================================================== */}

        <div
          className="
            flex
            items-center
            justify-between
            p-6
            border-b
            border-slate-100
            shrink-0
          "
        >

          <div>

            <p
              className="
                text-sm
                text-cyan-600
                font-semibold
                mb-1
              "
            >

              Batch Details

            </p>

            <h2
              className="
                text-2xl
                font-bold
                text-slate-800
              "
            >

              {batchDetails?.batch_name ||
                batch.batch_name}

            </h2>

          </div>


          <button
            type="button"
            onClick={close}
            aria-label="Close batch details"
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

            <FaTimes />

          </button>

        </div>


        {/* ==================================================
            CONTENT
        ================================================== */}

        <div
          className="
            p-6
            overflow-y-auto
            space-y-6
          "
        >

          {loading ? (

            <div
              className="
                py-16
                text-center
                text-slate-500
              "
            >

              Loading batch details...

            </div>

          ) : (

            <>

              {/* ============================================
                  BATCH INFORMATION
              ============================================ */}

              <div
                className="
                  grid
                  grid-cols-1
                  md:grid-cols-2
                  lg:grid-cols-3
                  gap-4
                "
              >

                <InfoCard
                  icon={<FaBookOpen />}
                  label="Course"
                  value={
                    batchDetails?.course_title ||
                    "Not assigned"
                  }
                />

                <InfoCard
                  icon={<FaChalkboardTeacher />}
                  label="Mentor"
                  value={
                    batchDetails?.mentor_name ||
                    "Not assigned"
                  }
                />

                <InfoCard
                  icon={<FaUsers />}
                  label="Students"
                  value={
                    batchDetails?.total_students ??
                    students.length
                  }
                />

                <InfoCard
                  icon={<FaCalendarAlt />}
                  label="Start Date"
                  value={formatDate(
                    batchDetails?.start_date
                  )}
                />

                <InfoCard
                  icon={<FaCalendarAlt />}
                  label="End Date"
                  value={formatDate(
                    batchDetails?.end_date
                  )}
                />

                <div
                  className="
                    bg-slate-50
                    rounded-2xl
                    p-4
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      text-xs
                      text-slate-400
                      mb-2
                    "
                  >

                    <FaCheckCircle
                      className="text-cyan-600"
                    />

                    Status

                  </div>

                  <span
                    className={`
                      inline-flex
                      px-3
                      py-1
                      rounded-full
                      text-sm
                      font-semibold
                      ${getStatusClasses(
                        batchDetails?.status
                      )}
                    `}
                  >

                    {batchDetails?.status ||
                      "Upcoming"}

                  </span>

                </div>

              </div>


              {/* ============================================
                  STUDENTS
              ============================================ */}

              <section>

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    mb-4
                  "
                >

                  <div>

                    <h3
                      className="
                        text-xl
                        font-bold
                        text-slate-800
                      "
                    >

                      Students

                    </h3>

                    <p
                      className="
                        text-sm
                        text-slate-500
                        mt-1
                      "
                    >

                      Students currently assigned
                      to this batch.

                    </p>

                  </div>


                  <div
                    className="
                      flex
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

                    {students.length}

                  </div>

                </div>


                {students.length === 0 ? (

                  <div
                    className="
                      border
                      border-dashed
                      border-slate-300
                      rounded-2xl
                      p-10
                      text-center
                      text-slate-500
                    "
                  >

                    <FaUsers
                      className="
                        mx-auto
                        text-3xl
                        text-slate-300
                        mb-3
                      "
                    />

                    <p className="font-semibold">

                      No students assigned yet.

                    </p>

                    <p
                      className="
                        text-sm
                        mt-1
                      "
                    >

                      Use Assign Student to add
                      students to this batch.

                    </p>

                  </div>

                ) : (

                  <div
                    className="
                      border
                      border-slate-200
                      rounded-2xl
                      overflow-hidden
                    "
                  >

                    <div
                      className="
                        max-h-72
                        overflow-y-auto
                      "
                    >

                      <table className="w-full">

                        <thead
                          className="
                            bg-slate-50
                            sticky
                            top-0
                            z-10
                          "
                        >

                          <tr>

                            <th
                              className="
                                text-left
                                px-5
                                py-3
                                text-sm
                                font-semibold
                                text-slate-600
                              "
                            >

                              Student

                            </th>

                            <th
                              className="
                                text-left
                                px-5
                                py-3
                                text-sm
                                font-semibold
                                text-slate-600
                              "
                            >

                              Email

                            </th>

                          </tr>

                        </thead>

                        <tbody>

                          {students.map(
                            (student) => (

                              <tr
                                key={student.id}
                                className="
                                  border-t
                                  border-slate-100
                                  hover:bg-slate-50
                                "
                              >

                                <td
                                  className="
                                    px-5
                                    py-4
                                  "
                                >

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
                                        rounded-xl
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

                                    <span
                                      className="
                                        font-semibold
                                        text-slate-700
                                      "
                                    >

                                      {student.full_name}

                                    </span>

                                  </div>

                                </td>

                                <td
                                  className="
                                    px-5
                                    py-4
                                    text-slate-500
                                  "
                                >

                                  {student.email}

                                </td>

                              </tr>

                            )
                          )}

                        </tbody>

                      </table>

                    </div>

                  </div>

                )}

              </section>

            </>

          )}

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
            shrink-0
          "
        >

          <button
            type="button"
            onClick={close}
            className="
              px-6
              py-3
              rounded-xl
              bg-slate-800
              hover:bg-slate-900
              text-white
              font-semibold
              transition
            "
          >

            Close

          </button>

        </div>

      </div>

    </div>

  );

}


// ============================================================
// INFO CARD
// ============================================================

function InfoCard({
  icon,
  label,
  value,
}) {

  return (

    <div
      className="
        bg-slate-50
        rounded-2xl
        p-4
      "
    >

      <div
        className="
          flex
          items-center
          gap-2
          text-xs
          text-slate-400
          mb-2
        "
      >

        <span className="text-cyan-600">

          {icon}

        </span>

        {label}

      </div>


      <p
        className="
          font-semibold
          text-slate-700
          break-words
        "
      >

        {value || "Not provided"}

      </p>

    </div>

  );

}


export default BatchDetailsModal;