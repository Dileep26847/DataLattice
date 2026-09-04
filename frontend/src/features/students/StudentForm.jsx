import { useEffect, useState } from "react";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

import { getBatches } from "../../services/batchService";


// ============================================================
// STUDENT FORM
// ============================================================

function StudentForm({
  form,
  handleChange,
  handleSubmit,
  loading,
  buttonText,
  close,
  isEdit = false,
}) {

  const [batches, setBatches] = useState([]);

  const [batchLoading, setBatchLoading] =
    useState(true);

  const [batchError, setBatchError] =
    useState("");


  // ============================================================
  // LOAD BATCHES
  // ============================================================

  useEffect(() => {

    loadBatches();

  }, []);


  const loadBatches = async () => {

    try {

      setBatchLoading(true);

      setBatchError("");

      const data =
        await getBatches();

      setBatches(
        Array.isArray(data?.batches)
          ? data.batches
          : []
      );

    } catch (error) {

      console.error(
        "STUDENT FORM BATCH ERROR:",
        error
      );

      setBatches([]);

      setBatchError(
        error?.response?.data?.message ||
        "Unable to load batches."
      );

    } finally {

      setBatchLoading(false);

    }

  };


  // ============================================================
  // RENDER
  // ============================================================

  return (

    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >

      {/* ======================================================
          BASIC INFORMATION
      ====================================================== */}

      <div>

        <h3 className="text-lg font-bold text-slate-800">

          Basic Information

        </h3>

        <p className="text-sm text-slate-500 mt-1">

          Student account and contact details.

        </p>

      </div>


      {/* ======================================================
          FULL NAME
      ====================================================== */}

      <Input

        label="Full Name"

        name="full_name"

        value={
          form.full_name || ""
        }

        onChange={handleChange}

        placeholder="Enter Full Name"

        required

      />


      {/* ======================================================
          EMAIL
      ====================================================== */}

      <Input

        label="Email"

        type="email"

        name="email"

        value={
          form.email || ""
        }

        onChange={handleChange}

        placeholder="Enter Email"

        required

      />


      {/* ======================================================
          PASSWORD
      ====================================================== */}

      <Input

        label={
          isEdit
            ? "New Password (Optional)"
            : "Temporary Password"
        }

        type="password"

        name="password"

        value={
          form.password || ""
        }

        onChange={handleChange}

        placeholder={
          isEdit
            ? "Leave blank to keep current password"
            : "Enter Temporary Password"
        }

        required={!isEdit}

      />


      {/* ======================================================
          PHONE
      ====================================================== */}

      <Input

        label="Phone Number"

        name="phone"

        value={
          form.phone || ""
        }

        onChange={handleChange}

        placeholder="Enter Phone Number"

      />


      {/* ======================================================
          EDUCATION
      ====================================================== */}

      <Input

        label="Education"

        name="education"

        value={
          form.education || ""
        }

        onChange={handleChange}

        placeholder="B.Tech / MCA / Degree"

      />


      {/* ======================================================
          COLLEGE
      ====================================================== */}

      <Input

        label="College Name"

        name="college_name"

        value={
          form.college_name || ""
        }

        onChange={handleChange}

        placeholder="Enter College Name"

      />


      {/* ======================================================
          GRADUATION YEAR
      ====================================================== */}

      <Input

        label="Graduation Year"

        type="number"

        name="graduation_year"

        value={
          form.graduation_year || ""
        }

        onChange={handleChange}

        placeholder="2026"

        min="1900"

        max="2100"

      />


      {/* ======================================================
          BATCH
      ====================================================== */}

      <div>

        <label
          htmlFor="student-batch"
          className="block mb-2 font-semibold text-slate-700"
        >

          Batch

        </label>


        <select

          id="student-batch"

          name="batch_id"

          value={
            form.batch_id || ""
          }

          onChange={handleChange}

          className="
            w-full
            border
            border-gray-300
            rounded-xl
            px-4
            py-3
            outline-none
            focus:ring-2
            focus:ring-cyan-500
            bg-white
          "

        >

          <option value="">

            Select Batch

          </option>


          {batches.map(
            (batch) => (

              <option

                key={batch.id}

                value={batch.id}

              >

                {batch.batch_name}

              </option>

            )
          )}

        </select>


        {/* ====================================================
            BATCH LOADING
        ==================================================== */}

        {batchLoading && (

          <p className="text-xs text-slate-400 mt-2">

            Loading batches...

          </p>

        )}


        {/* ====================================================
            BATCH ERROR
        ==================================================== */}

        {!batchLoading &&
          batchError && (

            <p className="text-xs text-red-500 mt-2">

              {batchError}

            </p>

        )}


        {!batchLoading &&
          !batchError &&
          batches.length === 0 && (

            <p className="text-xs text-amber-600 mt-2">

              No batches are currently available.

            </p>

        )}

      </div>


      {/* ======================================================
          ADMISSION DATE
      ====================================================== */}

      <Input

        label="Admission Date"

        type="date"

        name="admission_date"

        value={
          form.admission_date || ""
        }

        onChange={handleChange}

      />


      {/* ======================================================
          ADDRESS
      ====================================================== */}

      <Input

        label="Address"

        name="address"

        value={
          form.address || ""
        }

        onChange={handleChange}

        placeholder="Enter Address"

      />


      {/* ======================================================
          CITY
      ====================================================== */}

      <Input

        label="City"

        name="city"

        value={
          form.city || ""
        }

        onChange={handleChange}

        placeholder="Enter City"

      />


      {/* ======================================================
          STATE
      ====================================================== */}

      <Input

        label="State"

        name="state"

        value={
          form.state || ""
        }

        onChange={handleChange}

        placeholder="Enter State"

      />


      {/* ======================================================
          COUNTRY
      ====================================================== */}

      <Input

        label="Country"

        name="country"

        value={
          form.country || ""
        }

        onChange={handleChange}

        placeholder="Enter Country"

      />


      {/* ======================================================
          SOCIAL / PROFESSIONAL INFORMATION
      ====================================================== */}

      <div className="pt-2">

        <h3 className="text-lg font-bold text-slate-800">

          Professional Profiles

        </h3>

        <p className="text-sm text-slate-500 mt-1">

          Optional professional profile information.

        </p>

      </div>


      {/* ======================================================
          LINKEDIN
      ====================================================== */}

      <Input

        label="LinkedIn URL"

        type="url"

        name="linkedin_url"

        value={
          form.linkedin_url || ""
        }

        onChange={handleChange}

        placeholder="https://linkedin.com/in/username"

      />


      {/* ======================================================
          GITHUB
      ====================================================== */}

      <Input

        label="GitHub URL"

        type="url"

        name="github_url"

        value={
          form.github_url || ""
        }

        onChange={handleChange}

        placeholder="https://github.com/username"

      />


      {/* ======================================================
          RESUME
      ====================================================== */}

      <Input

        label="Resume URL"

        type="url"

        name="resume_url"

        value={
          form.resume_url || ""
        }

        onChange={handleChange}

        placeholder="https://example.com/resume.pdf"

      />


      {/* ======================================================
          CERTIFICATE STATUS
      ====================================================== */}

      <div>

        <label
          htmlFor="certificate-status"
          className="block mb-2 font-semibold text-slate-700"
        >

          Certificate Status

        </label>


        <select

          id="certificate-status"

          name="certificate_status"

          value={
            form.certificate_status ||
            "Pending"
          }

          onChange={handleChange}

          className="
            w-full
            border
            border-gray-300
            rounded-xl
            px-4
            py-3
            outline-none
            focus:ring-2
            focus:ring-cyan-500
            bg-white
          "

        >

          <option value="Pending">

            Pending

          </option>

          <option value="Eligible">

            Eligible

          </option>

          <option value="Issued">

            Issued

          </option>

        </select>

      </div>


      {/* ======================================================
          PLACEMENT STATUS
      ====================================================== */}

      <div>

        <label
          htmlFor="placement-status"
          className="block mb-2 font-semibold text-slate-700"
        >

          Placement Status

        </label>


        <select

          id="placement-status"

          name="placement_status"

          value={
            form.placement_status ||
            "Training"
          }

          onChange={handleChange}

          className="
            w-full
            border
            border-gray-300
            rounded-xl
            px-4
            py-3
            outline-none
            focus:ring-2
            focus:ring-cyan-500
            bg-white
          "

        >

          <option value="Training">

            Training

          </option>

          <option value="Interview">

            Interview

          </option>

          <option value="Placed">

            Placed

          </option>

        </select>

      </div>


      {/* ======================================================
          ACTION BUTTONS
      ====================================================== */}

      <div
        className="
          flex
          justify-end
          gap-4
          pt-4
          border-t
          border-slate-100
        "
      >

        <Button

          type="button"

          variant="secondary"

          onClick={close}

          disabled={loading}

        >

          Cancel

        </Button>


        <Button

          type="submit"

          variant="primary"

          disabled={loading}

        >

          {loading
            ? "Saving..."
            : buttonText}

        </Button>

      </div>

    </form>

  );

}


export default StudentForm;