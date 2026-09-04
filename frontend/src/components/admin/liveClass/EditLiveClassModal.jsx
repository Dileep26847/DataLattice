import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import LiveClassForm from "./LiveClassForm";
import { updateLiveClass } from "../../../services/liveClassService";

function EditLiveClassModal({
  liveClass,
  close,
  refresh,
}) {

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    batch_id: "",
    title: "",
    description: "",
    zoom_link: "",
    meeting_id: "",
    meeting_password: "",
    recording_link: "",
    class_date: "",
    start_time: "",
    end_time: "",
    status: "Upcoming",
  });

  useEffect(() => {

    if (!liveClass) return;

    setForm({
      batch_id: liveClass.batch_id || "",
      title: liveClass.title || "",
      description: liveClass.description || "",
      zoom_link: liveClass.zoom_link || "",
      meeting_id: liveClass.meeting_id || "",
      meeting_password: liveClass.meeting_password || "",
      recording_link: liveClass.recording_link || "",
      class_date: liveClass.class_date
        ? String(liveClass.class_date).slice(0, 10)
        : "",
      start_time: liveClass.start_time
        ? String(liveClass.start_time).slice(0, 5)
        : "",
      end_time: liveClass.end_time
        ? String(liveClass.end_time).slice(0, 5)
        : "",
      status: liveClass.status || "Upcoming",
    });

  }, [liveClass]);


  const handleChange = (e) => {

    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    if (
      !form.batch_id ||
      !form.title.trim() ||
      !form.zoom_link.trim() ||
      !form.class_date ||
      !form.start_time
    ) {

      toast.error(
        "Batch, Title, Zoom Link, Date and Start Time are required."
      );

      return;
    }

    try {

      setLoading(true);

      await updateLiveClass(
        liveClass.id,
        {
          ...form,
          batch_id: Number(form.batch_id),
        }
      );

      toast.success(
        "Live Class Updated Successfully"
      );

      await refresh();

      close();

    } catch (error) {

      console.error(
        "UPDATE LIVE CLASS ERROR:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
        "Failed to update live class"
      );

    } finally {

      setLoading(false);

    }

  };


  if (!liveClass) return null;


  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-6">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-y-auto">

        {/* Header */}

        <div className="flex items-center justify-between p-8 border-b border-slate-200">

          <div>

            <h2 className="text-3xl font-black text-slate-800">
              Edit Live Class
            </h2>

            <p className="text-slate-500 mt-2">
              Update the live class schedule and meeting details.
            </p>

          </div>

          <button
            type="button"
            onClick={close}
            disabled={loading}
            className="w-11 h-11 rounded-full bg-slate-100 hover:bg-red-500 hover:text-white transition flex items-center justify-center text-xl font-bold"
          >
            ✕
          </button>

        </div>


        {/* Form */}

        <div className="p-8">

          <LiveClassForm
            form={form}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            loading={loading}
            buttonText="Update Class"
            close={close}
          />

        </div>

      </div>

    </div>

  );

}

export default EditLiveClassModal;