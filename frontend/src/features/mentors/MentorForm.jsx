import { useState } from "react";

function MentorForm({
  form,
  handleChange,
  handleSubmit,
  loading,
  buttonText,
  close,
}) {

  return (

    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >

      {/* Full Name */}

      <div>

        <label className="block mb-2 font-semibold">

          Full Name

        </label>

        <input
          type="text"
          name="full_name"
          value={form.full_name}
          onChange={handleChange}
          placeholder="Enter Mentor Name"
          className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-cyan-500"
          required
        />

      </div>

      {/* Email */}

      <div>

        <label className="block mb-2 font-semibold">

          Email

        </label>

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter Email"
          className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-cyan-500"
          required
        />

      </div>

      {/* Password */}

      <div>

        <label className="block mb-2 font-semibold">

          Temporary Password

        </label>

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter Password"
          className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-cyan-500"
        />

      </div>

      {/* Phone */}

      <div>

        <label className="block mb-2 font-semibold">

          Phone

        </label>

        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-cyan-500"
        />

      </div>

      {/* Designation */}

      <div>

        <label className="block mb-2 font-semibold">

          Designation

        </label>

        <input
          type="text"
          name="designation"
          value={form.designation}
          onChange={handleChange}
          placeholder="Senior Trainer"
          className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-cyan-500"
        />

      </div>

      {/* Specialization */}

      <div>

        <label className="block mb-2 font-semibold">

          Specialization

        </label>

        <input
          type="text"
          name="specialization"
          value={form.specialization}
          onChange={handleChange}
          placeholder="React, Node.js, AI"
          className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-cyan-500"
        />

      </div>

      {/* Experience */}

      <div>

        <label className="block mb-2 font-semibold">

          Experience (Years)

        </label>

        <input
          type="number"
          name="experience"
          value={form.experience}
          onChange={handleChange}
          placeholder="5"
          className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-cyan-500"
        />

      </div>

      {/* Buttons */}

      <div className="flex justify-end gap-4 pt-4">

        <button
          type="button"
          onClick={close}
          className="px-6 py-3 rounded-xl bg-gray-300 hover:bg-gray-400"
        >

          Cancel

        </button>

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white"
        >

          {loading ? "Saving..." : buttonText}

        </button>

      </div>

    </form>

  );

}

export default MentorForm;