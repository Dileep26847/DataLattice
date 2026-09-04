import Button from "../../components/common/Button";

function SubmissionForm({
  form,
  handleChange,
  handleSubmit,
  loading,
  close,
}) {

  return (

    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >

      {/* Marks */}

      <div>

        <label className="block mb-2 font-semibold">

          Marks

        </label>

        <input
          type="number"
          name="marks"
          value={form.marks}
          onChange={handleChange}
          placeholder="95"
          className="w-full rounded-xl border border-slate-300 px-5 py-4 outline-none"
        />

      </div>

      {/* Feedback */}

      <div>

        <label className="block mb-2 font-semibold">

          Feedback

        </label>

        <textarea
          rows="5"
          name="feedback"
          value={form.feedback}
          onChange={handleChange}
          placeholder="Excellent work..."
          className="w-full rounded-xl border border-slate-300 px-5 py-4 resize-none outline-none"
        />

      </div>

      {/* Status */}

      <div>

        <label className="block mb-2 font-semibold">

          Status

        </label>

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-300 px-5 py-4 outline-none"
        >

          <option value="Pending">
            Pending
          </option>

          <option value="Reviewed">
            Reviewed
          </option>

          <option value="Rejected">
            Rejected
          </option>

        </select>

      </div>

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
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Review"}
        </Button>

      </div>

    </form>

  );

}

export default SubmissionForm;