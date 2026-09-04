import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Button from "../../components/common/Button";

import {
  getCourses,
} from "../../services/courseManagementService";

import {
  uploadLessonVideo,
  uploadLessonPDF,
} from "../../services/lessonManagementService";


function LessonForm({
  form,
  handleChange,
  handleSubmit,
  loading,
  buttonText,
  close,
}) {

  const [courses, setCourses] =
    useState([]);

  const [loadingCourses, setLoadingCourses] =
    useState(true);

  const [uploadingVideo, setUploadingVideo] =
    useState(false);

  const [uploadingPDF, setUploadingPDF] =
    useState(false);


  // ======================================
  // LOAD COURSES
  // ======================================

  useEffect(() => {

    loadCourses();

  }, []);


  const loadCourses = async () => {

    try {

      setLoadingCourses(true);

      const data =
        await getCourses();

      setCourses(
        data.courses || []
      );

    } catch (err) {

      console.error(
        "LOAD COURSES ERROR:",
        err
      );

      toast.error(
        "Failed to load courses"
      );

    } finally {

      setLoadingCourses(false);

    }

  };


  // ======================================
  // VIDEO UPLOAD
  // ======================================

  const handleVideoUpload =
    async (e) => {

      const file =
        e.target.files?.[0];

      if (!file) return;


      try {

        setUploadingVideo(true);

        const response =
          await uploadLessonVideo(
            file
          );


        handleChange({
          target: {
            name: "video_url",
            value: response.file,
          },
        });


        toast.success(
          "Video uploaded successfully"
        );

      } catch (err) {

        console.error(
          "VIDEO UPLOAD ERROR:",
          err
        );

        toast.error(
          err?.response?.data?.message ||
          "Video upload failed"
        );

      } finally {

        setUploadingVideo(false);

        e.target.value = "";

      }

    };


  // ======================================
  // PDF UPLOAD
  // ======================================

  const handlePDFUpload =
    async (e) => {

      const file =
        e.target.files?.[0];

      if (!file) return;


      try {

        setUploadingPDF(true);

        const response =
          await uploadLessonPDF(
            file
          );


        handleChange({
          target: {
            name: "pdf_url",
            value: response.file,
          },
        });


        toast.success(
          "PDF uploaded successfully"
        );

      } catch (err) {

        console.error(
          "PDF UPLOAD ERROR:",
          err
        );

        toast.error(
          err?.response?.data?.message ||
          "PDF upload failed"
        );

      } finally {

        setUploadingPDF(false);

        e.target.value = "";

      }

    };


  return (

    <form
      onSubmit={handleSubmit}
      className="space-y-7"
    >

      {/* ======================================
          COURSE
      ====================================== */}

      <div>

        <label className="block mb-2 font-semibold text-slate-700">
          Course
        </label>

        <select
          name="course_id"
          value={form.course_id}
          onChange={handleChange}
          required
          disabled={loadingCourses}
          className="
            w-full
            rounded-2xl
            border
            border-slate-300
            px-5
            py-4
            outline-none
            focus:ring-2
            focus:ring-cyan-500
            bg-white
          "
        >

          <option value="">
            {loadingCourses
              ? "Loading Courses..."
              : "Select Course"}
          </option>

          {courses.map(
            (course) => (

              <option
                key={course.id}
                value={course.id}
              >
                {course.title}
              </option>

            )
          )}

        </select>

      </div>


      {/* ======================================
          TITLE
      ====================================== */}

      <div>

        <label className="block mb-2 font-semibold text-slate-700">
          Lesson Title
        </label>

        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Introduction to React"
          required
          className="
            w-full
            rounded-2xl
            border
            border-slate-300
            px-5
            py-4
            outline-none
            focus:ring-2
            focus:ring-cyan-500
          "
        />

      </div>


      {/* ======================================
          DESCRIPTION
      ====================================== */}

      <div>

        <label className="block mb-2 font-semibold text-slate-700">
          Description
        </label>

        <textarea
          rows="5"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Explain what students will learn in this lesson..."
          className="
            w-full
            rounded-2xl
            border
            border-slate-300
            px-5
            py-4
            resize-none
            outline-none
            focus:ring-2
            focus:ring-cyan-500
          "
        />

      </div>


      {/* ======================================
          RESOURCES
      ====================================== */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* VIDEO */}

        <div>

          <label className="block mb-2 font-semibold text-slate-700">
            Lesson Video
          </label>

          <input
            type="file"
            accept="video/*,.mp4,.mov,.avi,.mkv"
            onChange={handleVideoUpload}
            disabled={
              uploadingVideo ||
              loading ||
              uploadingPDF
            }
            className="
              w-full
              rounded-2xl
              border
              border-dashed
              border-cyan-300
              bg-cyan-50/30
              p-5
              cursor-pointer
            "
          />

          {uploadingVideo && (

            <p className="mt-3 text-cyan-600 font-semibold">
              Uploading video...
            </p>

          )}

          {form.video_url &&
            !uploadingVideo && (

              <div className="mt-3 bg-green-50 border border-green-200 rounded-xl p-4">

                <p className="text-green-700 font-semibold">
                  ✓ Video uploaded
                </p>

                <p className="text-xs text-slate-500 break-all mt-1">
                  {form.video_url}
                </p>

              </div>

            )}

        </div>


        {/* PDF */}

        <div>

          <label className="block mb-2 font-semibold text-slate-700">
            Lesson PDF
          </label>

          <input
            type="file"
            accept=".pdf,application/pdf"
            onChange={handlePDFUpload}
            disabled={
              uploadingPDF ||
              loading ||
              uploadingVideo
            }
            className="
              w-full
              rounded-2xl
              border
              border-dashed
              border-red-300
              bg-red-50/30
              p-5
              cursor-pointer
            "
          />

          {uploadingPDF && (

            <p className="mt-3 text-red-600 font-semibold">
              Uploading PDF...
            </p>

          )}

          {form.pdf_url &&
            !uploadingPDF && (

              <div className="mt-3 bg-green-50 border border-green-200 rounded-xl p-4">

                <p className="text-green-700 font-semibold">
                  ✓ PDF uploaded
                </p>

                <p className="text-xs text-slate-500 break-all mt-1">
                  {form.pdf_url}
                </p>

              </div>

            )}

        </div>

      </div>


      {/* ======================================
          LESSON ORDER
      ====================================== */}

      <div>

        <label className="block mb-2 font-semibold text-slate-700">
          Lesson Order
        </label>

        <input
          type="number"
          name="lesson_order"
          value={form.lesson_order}
          onChange={handleChange}
          placeholder="1"
          min="1"
          required
          className="
            w-full
            rounded-2xl
            border
            border-slate-300
            px-5
            py-4
            outline-none
            focus:ring-2
            focus:ring-cyan-500
          "
        />

        <p className="text-xs text-slate-400 mt-2">
          Determines the order in which students see lessons.
        </p>

      </div>


      {/* ======================================
          BUTTONS
      ====================================== */}

      <div className="flex justify-end gap-4 pt-3">

        <Button
          type="button"
          variant="secondary"
          onClick={close}
          disabled={
            loading ||
            uploadingVideo ||
            uploadingPDF
          }
        >
          Cancel
        </Button>


        <Button
          type="submit"
          disabled={
            loading ||
            uploadingVideo ||
            uploadingPDF ||
            loadingCourses
          }
        >

          {loading
            ? "Saving..."
            : uploadingVideo
            ? "Uploading Video..."
            : uploadingPDF
            ? "Uploading PDF..."
            : buttonText}

        </Button>

      </div>

    </form>

  );

}

export default LessonForm;