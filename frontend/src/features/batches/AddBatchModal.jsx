import { useState } from "react";
import toast from "react-hot-toast";

import BatchForm from "./BatchForm";
import { createBatch } from "../../services/batchService";

function AddBatchModal({ close, refresh }) {

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({

    batch_name: "",
    course_id: "",
    mentor_name: "",
    start_date: "",
    end_date: "",
    status: "Upcoming",

  });

  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value,

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!form.batch_name || !form.course_id) {

      return toast.error(
        "Batch Name and Course are required."
      );

    }

    try {

      setLoading(true);

      await createBatch({

        ...form,

        course_id: Number(form.course_id),

      });

      toast.success("Batch Created Successfully");

      refresh();

      close();

    }

    catch (err) {

      console.log(err);

      toast.error("Failed to create batch");

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-6">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl p-8 max-h-[95vh] overflow-auto">

        <div className="flex justify-between items-center mb-8">

          <div>

            <h2 className="text-3xl font-black">

              Create Batch

            </h2>

            <p className="text-slate-500 mt-2">

              Create a new training batch.

            </p>

          </div>

          <button
            onClick={close}
            className="text-3xl hover:text-red-500"
          >

            ✕

          </button>

        </div>

        <BatchForm

          form={form}

          handleChange={handleChange}

          handleSubmit={handleSubmit}

          loading={loading}

          buttonText="Create Batch"

          close={close}

        />

      </div>

    </div>

  );

}

export default AddBatchModal;