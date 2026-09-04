import {
  FaTimes,
  FaUserGraduate,
  FaPhone,
  FaEnvelope,
  FaGraduationCap,
  FaLayerGroup,
  FaBriefcase,
  FaCertificate,
} from "react-icons/fa";


// ============================================================
// STUDENT PROFILE MODAL
// ============================================================

function StudentProfileModal({
  student,
  close,
}) {

  if (!student) {
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
          max-w-2xl
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
            items-center
            justify-between
            p-6
            border-b
            border-slate-100
          "
        >

          <div
            className="
              flex
              items-center
              gap-4
            "
          >

            <div
              className="
                w-14
                h-14
                rounded-2xl
                bg-cyan-100
                text-cyan-700
                flex
                items-center
                justify-center
                text-xl
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


            <div>

              <h2
                className="
                  text-2xl
                  font-bold
                  text-slate-800
                "
              >

                Student Profile

              </h2>

              <p
                className="
                  text-sm
                  text-slate-500
                "
              >

                {student.full_name}

              </p>

            </div>

          </div>


          <button

            type="button"

            onClick={close}

            aria-label="Close student profile"

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

        <div className="p-6 space-y-6">

          {/* BASIC INFORMATION */}

          <section>

            <h3
              className="
                text-lg
                font-bold
                text-slate-800
                mb-4
              "
            >

              Basic Information

            </h3>


            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-4
              "
            >

              <ProfileItem

                icon={
                  <FaUserGraduate />
                }

                label="Full Name"

                value={
                  student.full_name
                }

              />


              <ProfileItem

                icon={
                  <FaEnvelope />
                }

                label="Email"

                value={
                  student.email
                }

              />


              <ProfileItem

                icon={
                  <FaPhone />
                }

                label="Phone"

                value={
                  student.phone ||
                  "Not provided"
                }

              />


              <ProfileItem

                icon={
                  <FaGraduationCap />
                }

                label="Education"

                value={
                  student.education ||
                  "Not provided"
                }

              />

            </div>

          </section>


          {/* ACADEMIC INFORMATION */}

          <section>

            <h3
              className="
                text-lg
                font-bold
                text-slate-800
                mb-4
              "
            >

              Academic Information

            </h3>


            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-4
              "
            >

              <ProfileItem

                icon={
                  <FaLayerGroup />
                }

                label="Batch"

                value={
                  student.batch_name ||
                  "Not assigned"
                }

              />


              <ProfileItem

                icon={
                  <FaGraduationCap />
                }

                label="College"

                value={
                  student.college_name ||
                  "Not provided"
                }

              />


              <ProfileItem

                icon={
                  <FaGraduationCap />
                }

                label="Graduation Year"

                value={
                  student.graduation_year ||
                  "Not provided"
                }

              />

            </div>

          </section>


          {/* CAREER STATUS */}

          <section>

            <h3
              className="
                text-lg
                font-bold
                text-slate-800
                mb-4
              "
            >

              Career Status

            </h3>


            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-4
              "
            >

              <ProfileItem

                icon={
                  <FaBriefcase />
                }

                label="Placement"

                value={
                  student.placement_status ||
                  "Training"
                }

              />


              <ProfileItem

                icon={
                  <FaCertificate />
                }

                label="Certificate"

                value={
                  student.certificate_status ||
                  "Pending"
                }

              />

            </div>

          </section>


          {/* PROFILE STATUS */}

          {!student.profile_id && (

            <div
              className="
                bg-amber-50
                border
                border-amber-200
                rounded-2xl
                p-4
                text-sm
                text-amber-700
              "
            >

              <strong>
                Profile information not completed.
              </strong>

              <p className="mt-1">

                This student account does not currently
                have a complete student profile. Use
                Edit Student to add the missing information.

              </p>

            </div>

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
// PROFILE ITEM
// ============================================================

function ProfileItem({
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


export default StudentProfileModal;