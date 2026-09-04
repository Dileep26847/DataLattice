function Modal({
  title,
  children,
  onClose,
}) {

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

        /*
         * Close only when clicking the dark
         * background, not when clicking inside
         * the modal.
         */

        if (
          event.target ===
          event.currentTarget
        ) {

          onClose();

        }

      }}
    >

      {/* =====================================================
          MODAL CONTAINER
      ====================================================== */}

      <div
        className="
          bg-white
          rounded-2xl
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

        {/* ===================================================
            MODAL HEADER
        ==================================================== */}

        <div
          className="
            flex
            justify-between
            items-center
            p-6
            border-b
            border-slate-200
            bg-white
            shrink-0
          "
        >

          <h2
            className="
              text-2xl
              font-bold
              text-slate-800
            "
          >

            {title}

          </h2>


          {/* ================================================
              CLOSE BUTTON
          ================================================= */}

          <button

            type="button"

            onClick={onClose}

            aria-label="Close modal"

            className="
              w-10
              h-10
              rounded-xl
              flex
              items-center
              justify-center
              text-2xl
              text-slate-500
              hover:text-slate-800
              hover:bg-slate-100
              transition
              duration-200
              shrink-0
            "

          >

            ×

          </button>

        </div>


        {/* ===================================================
            MODAL CONTENT
        ==================================================== */}

        <div
          className="
            p-6
            overflow-y-auto
            overscroll-contain
            flex-1
            min-h-0
          "
        >

          {children}

        </div>

      </div>

    </div>

  );

}


export default Modal;