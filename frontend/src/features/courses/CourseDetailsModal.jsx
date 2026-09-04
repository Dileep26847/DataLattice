import {
  FaTimes,
  FaBookOpen,
  FaUserTie,
  FaTag,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaIdBadge,
} from "react-icons/fa";

import Modal from "../../components/common/Modal";

function CourseDetailsModal({
  course,
  close,
}) {

  if (!course) {
    return null;
  }

  const formatDate = (date) => {

    if (!date) {
      return "Not available";
    }

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };


  const thumbnail = course.thumbnail
    ? `http://localhost:5000/uploads/thumbnails/${course.thumbnail}`
    : null;


  return (

    <Modal
      isOpen={true}
      onClose={close}
      title="Course Details"
      subtitle={course.title}
      maxWidth="max-w-5xl"
    >

      <div className="space-y-8">

        {/* ==================================================
            COURSE HEADER
        ================================================== */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Thumbnail */}

          <div className="lg:col-span-1">

            {thumbnail ? (

              <img
                src={thumbnail}
                alt={course.title}
                className="
                  w-full
                  h-64
                  rounded-3xl
                  object-cover
                  border
                  border-slate-200
                  shadow-md
                "
              />

            ) : (

              <div
                className="
                  w-full
                  h-64
                  rounded-3xl
                  bg-slate-100
                  flex
                  items-center
                  justify-center
                  text-slate-400
                "
              >

                <FaBookOpen className="text-5xl" />

              </div>

            )}

          </div>


          {/* Basic Information */}

          <div className="lg:col-span-2">

            <h3
              className="
                text-3xl
                font-black
                text-slate-800
              "
            >

              {course.title}

            </h3>


            <p
              className="
                text-slate-500
                mt-2
                leading-relaxed
              "
            >

              {course.description ||
                "No course description available."}

            </p>


            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                gap-4
                mt-6
              "
            >

              <InfoItem
                icon={<FaUserTie />}
                label="Instructor"
                value={
                  course.instructor ||
                  "Not assigned"
                }
              />


              <InfoItem
                icon={<FaTag />}
                label="Category"
                value={
                  course.category ||
                  "Not specified"
                }
              />


              <InfoItem
                icon={<FaMoneyBillWave />}
                label="Price"
                value={
                  `₹${Number(
                    course.price || 0
                  ).toLocaleString("en-IN")}`
                }
              />


              <InfoItem
                icon={<FaCalendarAlt />}
                label="Created"
                value={
                  formatDate(
                    course.created_at
                  )
                }
              />

            </div>

          </div>

        </div>


        {/* ==================================================
            DESCRIPTION
        ================================================== */}

        <section>

          <h3
            className="
              text-xl
              font-bold
              text-slate-800
              mb-4
            "
          >

            Course Description

          </h3>


          <div
            className="
              bg-slate-50
              border
              border-slate-100
              rounded-2xl
              p-6
            "
          >

            <p
              className="
                text-slate-600
                leading-7
                whitespace-pre-wrap
              "
            >

              {course.description ||
                "No description has been added for this course."}

            </p>

          </div>

        </section>


        {/* ==================================================
            COURSE INFORMATION
        ================================================== */}

        <section>

          <h3
            className="
              text-xl
              font-bold
              text-slate-800
              mb-4
            "
          >

            Course Information

          </h3>


          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-4
            "
          >

            <InfoItem
              icon={<FaIdBadge />}
              label="Course ID"
              value={course.id}
            />


            <InfoItem
              icon={<FaCalendarAlt />}
              label="Created Date"
              value={
                formatDate(
                  course.created_at
                )
              }
            />

          </div>

        </section>


        {/* ==================================================
            FOOTER
        ================================================== */}

        <div
          className="
            flex
            justify-end
            pt-2
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

    </Modal>

  );
}


// ============================================================
// INFO ITEM
// ============================================================

function InfoItem({
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

        {value || "Not available"}

      </p>

    </div>

  );

}


export default CourseDetailsModal;