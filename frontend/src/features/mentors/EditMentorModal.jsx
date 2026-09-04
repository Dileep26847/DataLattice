import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Modal from "../../components/ui/Modal";
import MentorForm from "./MentorForm";

import { updateMentor } from "../../services/mentorService";

function EditMentorModal({
  mentor,
  close,
  refresh,
}) {

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    phone: "",
    designation: "",
    specialization: "",
    experience: "",
  });

  useEffect(() => {

    if (mentor) {

      setForm({

        full_name: mentor.full_name || "",

        email: mentor.email || "",

        password: "",

        phone: mentor.phone || "",

        designation: mentor.designation || "",

        specialization: mentor.specialization || "",

        experience: mentor.experience || "",

      });

    }

  }, [mentor]);

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

      const response = await updateMentor(
        mentor.id,
        form
      );

      toast.success(
        response.message || "Mentor Updated Successfully"
      );

      refresh();

      close();

    }

    catch (err) {

      console.log(err);

      toast.error(

        err.response?.data?.message ||

        "Failed to Update Mentor"

      );

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <Modal

      title="Edit Mentor"

      onClose={close}

    >

      <MentorForm

        form={form}

        handleChange={handleChange}

        handleSubmit={handleSubmit}

        loading={loading}

        buttonText="Update Mentor"

        close={close}

      />

    </Modal>

  );

}

export default EditMentorModal;