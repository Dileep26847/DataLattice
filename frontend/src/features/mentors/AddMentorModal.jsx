import { useState } from "react";
import toast from "react-hot-toast";

import Modal from "../../components/ui/Modal";
import MentorForm from "./MentorForm";

import { createMentor } from "../../services/mentorService";

function AddMentorModal({ close, refresh }) {

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

      const response = await createMentor(form);

      toast.success(

        response.message || "Mentor Created Successfully"

      );

      refresh();

      close();

    }

    catch (err) {

      console.log(err);

      toast.error(

        err.response?.data?.message ||

        "Failed to Create Mentor"

      );

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <Modal

      title="Add New Mentor"

      onClose={close}

    >

      <MentorForm

        form={form}

        handleChange={handleChange}

        handleSubmit={handleSubmit}

        loading={loading}

        buttonText="Create Mentor"

        close={close}

      />

    </Modal>

  );

}

export default AddMentorModal;