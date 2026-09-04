import { useState } from "react";
import toast from "react-hot-toast";

import Button from "../../common/Button";
import { uploadThumbnail } from "../../../services/courseManagementService";

function CourseForm({
  form,
  handleChange,
  handleSubmit,
  loading,
  buttonText,
  close,
}) {

  const [uploading, setUploading] = useState(false);

  const [preview, setPreview] = useState(
    form.thumbnail
      ? `http://localhost:5000/uploads/thumbnails/${form.thumbnail}`
      : ""
  );

  const handleThumbnailUpload = async (e) => {

    const file = e.target.files[0];

    if (!file) return;

    try {

      setUploading(true);

      const res = await uploadThumbnail(file);

      handleChange({
        target: {
          name: "thumbnail",
          value: res.file,
        },
      });

      setPreview(
        `http://localhost:5000/uploads/thumbnails/${res.file}`
      );

      toast.success("Thumbnail Uploaded Successfully");

    }

    catch (err) {

      console.log(err);

      toast.error("Upload Failed");

    }

    finally {

      setUploading(false);

    }

  };

  return (

    <form
      onSubmit={handleSubmit}
      className="space-y-8"
    >

      {/* Row 1 */}

      <div className="grid lg:grid-cols-2 gap-6">

        <div>

          <label className="block mb-2 font-semibold">

            Course Title

          </label>

          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="React Masterclass"
            className="w-full rounded-2xl border border-slate-300 px-5 py-4 outline-none focus:ring-2 focus:ring-cyan-500"
          />

        </div>

        <div>

          <label className="block mb-2 font-semibold">

            Instructor

          </label>

          <input
            type="text"
            name="instructor"
            value={form.instructor}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full rounded-2xl border border-slate-300 px-5 py-4 outline-none focus:ring-2 focus:ring-cyan-500"
          />

        </div>

      </div>

      {/* Description */}

      <div>

        <label className="block mb-2 font-semibold">

          Description

        </label>

        <textarea
          rows="6"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Course Description"
          className="w-full rounded-2xl border border-slate-300 px-5 py-4 resize-none outline-none focus:ring-2 focus:ring-cyan-500"
        />

      </div>

      {/* Category + Price */}

      <div className="grid lg:grid-cols-2 gap-6">

        <div>

          <label className="block mb-2 font-semibold">

            Category

          </label>

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-300 px-5 py-4 outline-none focus:ring-2 focus:ring-cyan-500"
          >

            <option value="">Select Category</option>
            <option>Web Development</option>
            <option>Artificial Intelligence</option>
            <option>Machine Learning</option>
            <option>UI/UX</option>
            <option>Cloud Computing</option>
            <option>DevOps</option>
            <option>Cyber Security</option>
            <option>Programming</option>

          </select>

        </div>

        <div>

          <label className="block mb-2 font-semibold">

            Price (₹)

          </label>

          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="999"
            className="w-full rounded-2xl border border-slate-300 px-5 py-4 outline-none focus:ring-2 focus:ring-cyan-500"
          />

        </div>

      </div>

      {/* Upload */}

      <div>

        <label className="block mb-2 font-semibold">

          Course Thumbnail

        </label>

        <input

          type="file"

          accept="image/*"

          onChange={handleThumbnailUpload}

          className="w-full rounded-2xl border border-dashed border-cyan-300 p-5"

        />

        {

          uploading && (

            <p className="mt-3 text-cyan-600 font-semibold">

              Uploading...

            </p>

          )

        }

      </div>

      {/* Preview */}

      {

        preview &&

        <div>

          <h3 className="font-bold mb-4">

            Thumbnail Preview

          </h3>

          <img

            src={preview}

            alt="Thumbnail"

            className="
              w-full
              h-72
              rounded-3xl
              object-cover
              border
              border-slate-200
              shadow-lg
            "

          />

        </div>

      }

      {/* Buttons */}

      <div className="flex justify-end gap-4">

        <Button

          type="button"

          variant="secondary"

          onClick={close}

        >

          Cancel

        </Button>

        <Button

          type="submit"

          disabled={loading || uploading}

        >

          {

            loading

              ? "Saving..."

              : buttonText

          }

        </Button>

      </div>

    </form>

  );

}

export default CourseForm;