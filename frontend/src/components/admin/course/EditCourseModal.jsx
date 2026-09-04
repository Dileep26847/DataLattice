import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { updateCourse } from "../../../services/courseManagementService";

import Modal from "../../common/Modal";

import CourseForm from "./CourseForm";

function EditCourseModal({
  course,
  close,
  refresh,
}) {

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({

    title: "",

    description: "",

    instructor: "",

    category: "",

    price: "",

    thumbnail: "",

  });

  useEffect(() => {

    if (!course) return;

    setForm({

      title: course.title || "",

      description: course.description || "",

      instructor: course.instructor || "",

      category: course.category || "",

      price: course.price || "",

      thumbnail: course.thumbnail || "",

    });

  }, [course]);

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

      await updateCourse(course.id, {

        ...form,

        price: Number(form.price),

      });

      toast.success("Course Updated Successfully");

      refresh();

      close();

    }

    catch (err) {

      console.log(err);

      toast.error("Failed to Update Course");

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <Modal

      isOpen={true}

      onClose={close}

      title="Edit Course"

      subtitle="Update course information"

      maxWidth="max-w-4xl"

    >

      <CourseForm

        form={form}

        handleChange={handleChange}

        handleSubmit={handleSubmit}

        loading={loading}

        buttonText="Update Course"

        close={close}

      />

    </Modal>

  );

}

export default EditCourseModal;