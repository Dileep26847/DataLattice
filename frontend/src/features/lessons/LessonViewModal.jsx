import {
  FaTimes,
  FaBookOpen,
  FaVideo,
  FaFilePdf,
  FaLayerGroup,
} from "react-icons/fa";

function LessonViewModal({
  lesson,
  close,
}) {

  if (!lesson) {
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
          overflow-y-auto
        "
      >

        {/* HEADER */}

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

          <div>

            <p className="text-sm text-cyan-600 font-semibold">
              {lesson.course_title || "Course"}
            </p>

            <h2 className="text-2xl font-black text-slate-800 mt-1">
              {lesson.title}
            </h2>

          </div>


          <button
            type="button"
            onClick={close}
            className="
              w-10
              h-10
              rounded-xl
              bg-slate-100
              text-slate-500
              hover:bg-red-500
              hover:text-white
              flex
              items-center
              justify-center
              transition
            "
          >

            <FaTimes />

          </button>

        </div>


        {/* CONTENT */}

        <div className="p-6 space-y-6">

          {/* DESCRIPTION */}

          <section>

            <div className="flex items-center gap-2 mb-3">

              <FaBookOpen className="text-cyan-600" />

              <h3 className="font-bold text-slate-800">
                Description
              </h3>

            </div>

            <div className="bg-slate-50 rounded-2xl p-5">

              <p className="text-slate-600 whitespace-pre-wrap">
                {lesson.description ||
                  "No description provided."}
              </p>

            </div>

          </section>


          {/* LESSON ORDER */}

          <section>

            <div className="flex items-center gap-2 mb-3">

              <FaLayerGroup className="text-cyan-600" />

              <h3 className="font-bold text-slate-800">
                Lesson Order
              </h3>

            </div>

            <div className="bg-slate-50 rounded-2xl p-5">

              <span className="inline-flex items-center justify-center bg-cyan-100 text-cyan-700 px-4 py-2 rounded-full font-bold">
                Lesson {lesson.lesson_order}
              </span>

            </div>

          </section>


          {/* VIDEO */}

          {lesson.video_url && (

            <section>

              <div className="flex items-center gap-2 mb-3">

                <FaVideo className="text-blue-600" />

                <h3 className="font-bold text-slate-800">
                  Lesson Video
                </h3>

              </div>

              <div className="bg-black rounded-2xl overflow-hidden">

                <video
                  src={lesson.video_url}
                  controls
                  className="w-full max-h-[450px]"
                />

              </div>

            </section>

          )}


          {/* PDF */}

          {lesson.pdf_url && (

            <section>

              <div className="flex items-center gap-2 mb-3">

                <FaFilePdf className="text-red-600" />

                <h3 className="font-bold text-slate-800">
                  Lesson PDF
                </h3>

              </div>

              <a
                href={lesson.pdf_url}
                target="_blank"
                rel="noreferrer"
                className="
                  flex
                  items-center
                  justify-between
                  gap-4
                  bg-red-50
                  border
                  border-red-100
                  rounded-2xl
                  p-5
                  hover:bg-red-100
                  transition
                "
              >

                <div>

                  <p className="font-bold text-red-700">
                    Lesson PDF
                  </p>

                  <p className="text-sm text-slate-500 mt-1">
                    Open lesson resource
                  </p>

                </div>

                <FaFilePdf className="text-red-600 text-2xl" />

              </a>

            </section>

          )}


          {!lesson.video_url &&
            !lesson.pdf_url && (

              <div className="bg-slate-50 rounded-2xl p-6 text-center text-slate-500">

                No resources attached to this lesson.

              </div>

            )}

        </div>


        {/* FOOTER */}

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

export default LessonViewModal;