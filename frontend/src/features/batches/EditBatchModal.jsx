import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import BatchForm from "./BatchForm";
import { updateBatch } from "../../services/batchService";

function EditBatchModal({
  batch,
  close,
  refresh,
}) {

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({

    batch_name: "",

    course_id: "",

    mentor_name: "",

    start_date: "",

    end_date: "",

    status: "Upcoming",

  });

  useEffect(() => {

    if (batch) {

      setForm({

        batch_name: batch.batch_name,

        course_id: batch.course_id,

        mentor_name: batch.mentor_name,

        start_date: batch.start_date?.split("T")[0] || "",

        end_date: batch.end_date?.split("T")[0] || "",

        status: batch.status,

      });

    }

  }, [batch]);

  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value,

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      await updateBatch(

        batch.id,

        {

          ...form,

          course_id: Number(form.course_id),

        }

      );

      toast.success("Batch Updated");

      refresh();

      close();

    }

    catch (err) {

      console.log(err);

      toast.error("Update Failed");

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

              Edit Batch

            </h2>

            <p className="text-slate-500 mt-2">

              Update batch details.

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

          buttonText="Update Batch"

          close={close}

        />

      </div>

    </div>

  );

}

export default EditBatchModal;