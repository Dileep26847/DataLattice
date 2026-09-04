import {
  FaTimes,
  FaUserTie,
  FaEnvelope,
  FaPhone,
  FaBriefcase,
  FaCode,
  FaCalendarAlt,
  FaUserShield,
} from "react-icons/fa";


// ============================================================
// MENTOR PROFILE MODAL
// ============================================================

function MentorProfileModal({
  mentor,
  close,
}) {

  if (!mentor) {
    return null;
  }


  // ==========================================================
  // FORMAT DATE
  // ==========================================================

  const formatDate = (date) => {

    if (!date) {
      return "Not provided";
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
      "en-US",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );

  };


  // ==========================================================
  // PROFILE COMPLETENESS
  // ==========================================================

  const profileFields = [

    mentor.full_name,

    mentor.email,

    mentor.phone,

    mentor.designation,

    mentor.specialization,

    mentor.experience,

  ];


  const completedFields =
    profileFields.filter(
      (field) =>
        field !== null &&
        field !== undefined &&
        String(field).trim() !== ""
    ).length;


  const profilePercentage =
    Math.round(
      (
        completedFields /
        profileFields.length
      ) * 100
    );


  // ==========================================================
  // RENDER
  // ==========================================================

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
        overflow-y-auto
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

      {/* ====================================================
          MODAL
      ===================================================== */}

      <div
        className="
          bg-white
          rounded-3xl
          shadow-2xl
          w-full
          max-w-2xl
          max-h-[90vh]
          flex
          flex-col
          overflow-hidden
          my-4
        "
      >

        {/* ==================================================
            HEADER
        =================================================== */}

        <div
          className="
            flex
            items-center
            justify-between
            p-6
            border-b
            border-slate-100
            bg-white
            shrink-0
          "
        >

          <div
            className="
              flex
              items-center
              gap-4
            "
          >

            {/* Avatar */}

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
                shrink-0
              "
            >

              {(
                mentor.full_name ||
                "M"
              )
                .charAt(0)
                .toUpperCase()}

            </div>


            {/* Title */}

            <div>

              <h2
                className="
                  text-2xl
                  font-bold
                  text-slate-800
                "
              >

                Mentor Profile

              </h2>

              <p
                className="
                  text-sm
                  text-slate-500
                  mt-1
                "
              >

                {mentor.full_name ||
                  "Mentor"}

              </p>

            </div>

          </div>


          {/* Close */}

          <button
            type="button"
            onClick={close}
            aria-label="Close mentor profile"
            className="
              w-10
              h-10
              rounded-xl
              bg-slate-100
              text-slate-500
              hover:bg-slate-200
              hover:text-slate-800
              flex
              items-center
              justify-center
              transition
              shrink-0
            "
          >

            <FaTimes />

          </button>

        </div>


        {/* ==================================================
            CONTENT
        =================================================== */}

        <div
          className="
            p-6
            overflow-y-auto
            flex-1
            min-h-0
            space-y-7
          "
        >

          {/* =================================================
              PROFILE COMPLETION
          ================================================== */}

          <section
            className="
              bg-cyan-50
              border
              border-cyan-100
              rounded-2xl
              p-5
            "
          >

            <div
              className="
                flex
                items-center
                justify-between
                mb-3
              "
            >

              <div>

                <p
                  className="
                    text-sm
                    font-semibold
                    text-cyan-800
                  "
                >

                  Profile Completion

                </p>

                <p
                  className="
                    text-xs
                    text-cyan-600
                    mt-1
                  "
                >

                  {completedFields} of{" "}
                  {profileFields.length}{" "}
                  important fields completed

                </p>

              </div>


              <span
                className="
                  text-lg
                  font-bold
                  text-cyan-700
                "
              >

                {profilePercentage}%

              </span>

            </div>


            <div
              className="
                w-full
                h-2
                bg-cyan-100
                rounded-full
                overflow-hidden
              "
            >

              <div
                className="
                  h-full
                  bg-cyan-600
                  rounded-full
                  transition-all
                "
                style={{
                  width:
                    `${profilePercentage}%`,
                }}
              />

            </div>

          </section>


          {/* =================================================
              BASIC INFORMATION
          ================================================== */}

          <ProfileSection
            title="Basic Information"
          >

            <ProfileItem
              icon={
                <FaUserTie />
              }
              label="Full Name"
              value={
                mentor.full_name
              }
            />


            <ProfileItem
              icon={
                <FaEnvelope />
              }
              label="Email"
              value={
                mentor.email
              }
            />


            <ProfileItem
              icon={
                <FaPhone />
              }
              label="Phone"
              value={
                mentor.phone
              }
            />

          </ProfileSection>


          {/* =================================================
              PROFESSIONAL INFORMATION
          ================================================== */}

          <ProfileSection
            title="Professional Information"
          >

            <ProfileItem
              icon={
                <FaBriefcase />
              }
              label="Designation"
              value={
                mentor.designation
              }
            />


            <ProfileItem
              icon={
                <FaCode />
              }
              label="Specialization"
              value={
                mentor.specialization
              }
              fullWidth
            />


            <ProfileItem
              icon={
                <FaBriefcase />
              }
              label="Experience"
              value={
                mentor.experience
                  ? `${mentor.experience} Years`
                  : "Not provided"
              }
            />

          </ProfileSection>


          {/* =================================================
              ACCOUNT INFORMATION
          ================================================== */}

          <ProfileSection
            title="Account Information"
          >

            <ProfileItem
              icon={
                <FaUserShield />
              }
              label="Role"
              value={
                mentor.role ||
                "mentor"
              }
            />


            <ProfileItem
              icon={
                <FaCalendarAlt />
              }
              label="Joined"
              value={
                formatDate(
                  mentor.created_at
                )
              }
            />

          </ProfileSection>


          {/* =================================================
              PROFILE STATUS
          ================================================== */}

          {!mentor.mentor_profile_id && (

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
                Mentor profile is incomplete.
              </strong>

              <p className="mt-1">

                This mentor account does not currently
                have a mentor profile record. Use
                Edit Mentor to complete the profile.

              </p>

            </div>

          )}

        </div>


        {/* ==================================================
            FOOTER
        =================================================== */}

        <div
          className="
            border-t
            border-slate-100
            p-6
            flex
            justify-end
            bg-white
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
              font-medium
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
// PROFILE SECTION
// ============================================================

function ProfileSection({
  title,
  children,
}) {

  return (

    <section>

      <h3
        className="
          text-lg
          font-bold
          text-slate-800
          mb-4
        "
      >

        {title}

      </h3>


      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-4
        "
      >

        {children}

      </div>

    </section>

  );

}


// ============================================================
// PROFILE ITEM
// ============================================================

function ProfileItem({
  icon,
  label,
  value,
  fullWidth = false,
}) {

  return (

    <div
      className={`
        bg-slate-50
        rounded-2xl
        p-4
        ${fullWidth
          ? "md:col-span-2"
          : ""}
      `}
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

        <span
          className="
            text-cyan-600
          "
        >

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


export default MentorProfileModal;