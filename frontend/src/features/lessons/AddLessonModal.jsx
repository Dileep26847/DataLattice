import { useState } from "react";
import toast from "react-hot-toast";

import Modal from "../../components/common/Modal";
import LessonForm from "./LessonForm";

import { addLesson } from "../../services/lessonManagementService";

function AddLessonModal({
  close,
  refresh,
}) {

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    course_id: "",
    title: "",
    description: "",
    video_url: "",
    pdf_url: "",
    lesson_order: "",
  });


  const handleChange = (e) => {

    setForm((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!form.course_id) {
      return toast.error("Please select a course.");
    }

    if (!form.title.trim()) {
      return toast.error("Lesson title is required.");
    }

    if (!form.lesson_order) {
      return toast.error("Lesson order is required.");
    }


    try {

      setLoading(true);

      await addLesson({
        ...form,

        course_id: Number(form.course_id),

        lesson_order: Number(
          form.lesson_order
        ),
      });


      toast.success(
        "Lesson Added Successfully"
      );

      refresh();

      close();

    } catch (err) {

      console.error(
        "ADD LESSON ERROR:",
        err
      );

      toast.error(
        err?.response?.data?.message ||
        "Failed to add lesson"
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <Modal
      isOpen={true}
      onClose={close}
      title="Add New Lesson"
      subtitle="Create a lesson for your LMS course."
      maxWidth="max-w-4xl"
    >

      <LessonForm
        form={form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        loading={loading}
        buttonText="Add Lesson"
        close={close}
      />

    </Modal>

  );

}

export default AddLessonModal;