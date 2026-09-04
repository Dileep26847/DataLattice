import { FaTimes } from "react-icons/fa";

function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = "max-w-4xl",
}) {
  if (!isOpen) return null;

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
        sm:p-6
      "
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >

      {/* MODAL */}

      <div
        className={`
          bg-white
          rounded-3xl
          shadow-2xl
          w-full
          ${maxWidth}
          max-h-[92vh]
          flex
          flex-col
          overflow-hidden
          animate-fadeIn
        `}
        onMouseDown={(event) => {
          event.stopPropagation();
        }}
      >

        {/* ==================================================
            HEADER
        ================================================== */}

        <div
          className="
            flex
            items-center
            justify-between
            gap-4
            px-6
            py-5
            sm:px-8
            sm:py-6
            border-b
            border-slate-100
            shrink-0
            bg-white
          "
        >

          <div className="min-w-0">

            <h2
              className="
                text-xl
                sm:text-2xl
                lg:text-3xl
                font-black
                text-slate-800
                truncate
              "
            >

              {title}

            </h2>

            {subtitle && (
              <p
                className="
                  text-sm
                  sm:text-base
                  text-slate-500
                  mt-1
                  truncate
                "
              >

                {subtitle}

              </p>
            )}

          </div>


          {/* CLOSE */}

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="
              shrink-0
              w-10
              h-10
              sm:w-12
              sm:h-12
              rounded-full
              bg-slate-100
              text-slate-600
              hover:bg-red-500
              hover:text-white
              transition-all
              duration-200
              flex
              items-center
              justify-center
            "
          >

            <FaTimes />

          </button>

        </div>


        {/* ==================================================
            SCROLLABLE CONTENT
        ================================================== */}

        <div
          className="
            flex-1
            min-h-0
            overflow-y-auto
            overscroll-contain
            px-6
            py-6
            sm:px-8
            sm:py-8
          "
        >

          {children}

        </div>

      </div>

    </div>
  );
}

export default Modal;