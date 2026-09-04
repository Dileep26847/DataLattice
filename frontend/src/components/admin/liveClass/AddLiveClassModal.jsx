import { useState } from "react";

import toast from "react-hot-toast";

import LiveClassForm
  from "./LiveClassForm";

import {
  createLiveClass,
} from "../../../services/liveClassService";


function AddLiveClassModal({
  close,
  refresh,
}) {

  const [loading, setLoading] =
    useState(false);


  // ============================================================
  // FORM
  // ============================================================

  const [form, setForm] = useState({

    batch_id: "",

    title: "",

    description: "",

    recording_link: "",

    class_date: "",

    start_time: "",

    end_time: "",

    status: "Upcoming",

  });


  // ============================================================
  // HANDLE CHANGE
  // ============================================================

  const handleChange = (event) => {

    const {
      name,
      value,
    } = event.target;


    setForm((previous) => ({

      ...previous,

      [name]: value,

    }));

  };


  // ============================================================
  // HANDLE SUBMIT
  // ============================================================

  const handleSubmit = async (event) => {

    event.preventDefault();


    // ========================================================
    // VALIDATION
    // ========================================================

    if (
      !form.batch_id ||
      !form.title.trim() ||
      !form.class_date ||
      !form.start_time
    ) {

      toast.error(
        "Batch, Title, Date and Start Time are required."
      );

      return;

    }


    // ========================================================
    // END TIME VALIDATION
    // ========================================================

    if (form.end_time) {

      if (
        form.end_time <=
        form.start_time
      ) {

        toast.error(
          "End time must be later than start time."
        );

        return;

      }

    }


    try {

      setLoading(true);


      // ======================================================
      // IMPORTANT
      //
      // Do NOT send:
      //
      // zoom_link
      // meeting_id
      // meeting_password
      //
      // Backend creates them automatically.
      // ======================================================

      const payload = {

        batch_id:
          Number(form.batch_id),

        title:
          form.title.trim(),

        description:
          form.description.trim(),

        recording_link:
          form.recording_link.trim(),

        class_date:
          form.class_date,

        start_time:
          form.start_time,

        end_time:
          form.end_time,

        status:
          form.status,

      };


      console.log(
        "CREATING LIVE CLASS:",
        payload
      );


      const response =
        await createLiveClass(
          payload
        );


      console.log(
        "LIVE CLASS CREATED:",
        response
      );


      toast.success(
        "Zoom Meeting and Live Class Created Successfully"
      );


      // ======================================================
      // REFRESH TABLE
      // ======================================================

      if (
        typeof refresh === "function"
      ) {

        await refresh();

      }


      // ======================================================
      // CLOSE MODAL
      // ======================================================

      close();


    } catch (error) {

      console.error(
        "CREATE LIVE CLASS ERROR:",
        error
      );


      const message =
        error?.response?.data?.message ||
        "Failed to create Zoom meeting and live class.";


      toast.error(message);

    } finally {

      setLoading(false);

    }

  };


  // ============================================================
  // RENDER
  // ============================================================

  return (

    <div className="
      fixed
      inset-0
      z-50
      flex
      items-center
      justify-center
      bg-black/50
      backdrop-blur-sm
      p-6
    ">

      <div className="
        bg-white
        rounded-3xl
        shadow-2xl
        w-full
        max-w-4xl
        max-h-[95vh]
        overflow-y-auto
      ">


        {/* ====================================================
            HEADER
        ==================================================== */}

        <div className="
          flex
          items-center
          justify-between
          p-8
          border-b
          border-slate-200
        ">

          <div>

            <h2 className="
              text-3xl
              font-black
              text-slate-800
            ">

              Schedule Live Class

            </h2>


            <p className="
              text-slate-500
              mt-2
            ">

              Create a live class with an
              automatically generated Zoom meeting.

            </p>

          </div>


          <button

            type="button"

            onClick={close}

            disabled={loading}

            className="
              w-11
              h-11
              rounded-full
              bg-slate-100
              hover:bg-red-500
              hover:text-white
              transition
              flex
              items-center
              justify-center
              text-xl
              font-bold
            "

          >

            ×

          </button>

        </div>


        {/* ====================================================
            FORM
        ==================================================== */}

        <div className="p-8">

          <LiveClassForm

            form={form}

            handleChange={handleChange}

            handleSubmit={handleSubmit}

            loading={loading}

            buttonText="Schedule Class"

            close={close}

          />

        </div>

      </div>

    </div>

  );

}


export default AddLiveClassModal;