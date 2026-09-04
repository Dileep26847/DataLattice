import { useState } from "react";
import toast from "react-hot-toast";

import { addCourse } from "../../../services/courseManagementService";

import Modal from "../../common/Modal";

import CourseForm from "./CourseForm";

function AddCourseModal({ close, refresh }) {

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({

    title: "",

    description: "",

    instructor: "",

    category: "",

    price: "",

    thumbnail: "",

  });

  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value,

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (

      !form.title ||

      !form.description ||

      !form.instructor ||

      !form.category ||

      !form.price

    ) {

      return toast.error("Please fill all required fields");

    }

    try {

      setLoading(true);

      await addCourse({

        ...form,

        price: Number(form.price),

      });

      toast.success("Course Added Successfully");

      refresh();

      close();

    }

    catch (err) {

      console.log(err);

      toast.error("Failed to Add Course");

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <Modal

      isOpen={true}

      onClose={close}

      title="Add New Course"

      subtitle="Create a new course for your LMS"

      maxWidth="max-w-4xl"

    >

      <CourseForm

        form={form}

        handleChange={handleChange}

        handleSubmit={handleSubmit}

        loading={loading}

        buttonText="Add Course"

        close={close}

      />

    </Modal>

  );

}

export default AddCourseModal;