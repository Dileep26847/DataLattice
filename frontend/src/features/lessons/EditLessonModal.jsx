import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Modal from "../../components/common/Modal";
import LessonForm from "./LessonForm";

import {
  updateLesson,
} from "../../services/lessonManagementService";

function EditLessonModal({
  lesson,
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


  useEffect(() => {

    if (!lesson) return;

    setForm({
      course_id:
        lesson.course_id || "",

      title:
        lesson.title || "",

      description:
        lesson.description || "",

      video_url:
        lesson.video_url || "",

      pdf_url:
        lesson.pdf_url || "",

      lesson_order:
        lesson.lesson_order || "",
    });

  }, [lesson]);


  const handleChange = (e) => {

    setForm((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));

  };


  const handleSubmit = async (e) => {

    e.preventDefault();


    if (!form.course_id) {
      return toast.error(
        "Please select a course."
      );
    }

    if (!form.title.trim()) {
      return toast.error(
        "Lesson title is required."
      );
    }

    if (!form.lesson_order) {
      return toast.error(
        "Lesson order is required."
      );
    }


    try {

      setLoading(true);

      await updateLesson(
        lesson.id,
        {
          ...form,

          course_id:
            Number(form.course_id),

          lesson_order:
            Number(form.lesson_order),
        }
      );


      toast.success(
        "Lesson Updated Successfully"
      );

      refresh();

      close();

    } catch (err) {

      console.error(
        "UPDATE LESSON ERROR:",
        err
      );

      toast.error(
        err?.response?.data?.message ||
        "Failed to update lesson"
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <Modal
      isOpen={true}
      onClose={close}
      title="Edit Lesson"
      subtitle="Update lesson information."
      maxWidth="max-w-4xl"
    >

      <LessonForm
        form={form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        loading={loading}
        buttonText="Update Lesson"
        close={close}
      />

    </Modal>

  );

}

export default EditLessonModal;