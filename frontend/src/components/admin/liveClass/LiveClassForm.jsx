import { useEffect, useState } from "react";

import Button from "../../common/Button";

import { getBatches } from "../../../services/batchService";


// ============================================================
// TIME HELPERS
// ============================================================

const convert24To12 = (time) => {

  if (!time) {

    return {
      hour: "",
      minute: "00",
      period: "AM",
    };

  }

  const parts =
    String(time)
      .slice(0, 5)
      .split(":");

  const hour24 =
    Number(parts[0]);

  const minute =
    parts[1] || "00";


  if (!Number.isFinite(hour24)) {

    return {
      hour: "",
      minute: "00",
      period: "AM",
    };

  }


  const period =
    hour24 >= 12
      ? "PM"
      : "AM";


  let hour12 =
    hour24 % 12;

  if (hour12 === 0) {
    hour12 = 12;
  }


  return {
    hour: String(hour12),
    minute,
    period,
  };

};


// ============================================================
// CONVERT 12 HOUR → 24 HOUR
// ============================================================

const convert12To24 = (
  hour,
  minute,
  period
) => {

  if (
    !hour ||
    !minute ||
    !period
  ) {

    return "";

  }


  let hour24 =
    Number(hour);


  if (!Number.isFinite(hour24)) {

    return "";

  }


  if (period === "AM") {

    if (hour24 === 12) {
      hour24 = 0;
    }

  } else {

    if (hour24 !== 12) {
      hour24 += 12;
    }

  }


  return `${String(hour24).padStart(2, "0")}:${String(
    minute
  ).padStart(2, "0")}`;

};


// ============================================================
// TIME SELECTOR
// ============================================================

function TimeSelector({
  name,
  value,
  onChange,
  required = false,
}) {

  const initial =
    convert24To12(value);


  const [hour, setHour] =
    useState(initial.hour);

  const [minute, setMinute] =
    useState(initial.minute);

  const [period, setPeriod] =
    useState(initial.period);


  // ==========================================================
  // SYNC WHEN FORM VALUE CHANGES
  // ==========================================================

  useEffect(() => {

    const converted =
      convert24To12(value);

    setHour(converted.hour);
    setMinute(converted.minute);
    setPeriod(converted.period);

  }, [value]);


  // ==========================================================
  // UPDATE PARENT FORM
  // ==========================================================

  const updateTime = (
    newHour,
    newMinute,
    newPeriod
  ) => {

    const time24 =
      convert12To24(
        newHour,
        newMinute,
        newPeriod
      );


    onChange({
      target: {
        name,
        value: time24,
      },
    });

  };


  // ==========================================================
  // HOUR CHANGE
  // ==========================================================

  const handleHourChange = (
    event
  ) => {

    const newHour =
      event.target.value;

    setHour(newHour);

    updateTime(
      newHour,
      minute,
      period
    );

  };


  // ==========================================================
  // MINUTE CHANGE
  // ==========================================================

  const handleMinuteChange = (
    event
  ) => {

    const newMinute =
      event.target.value;

    setMinute(newMinute);

    updateTime(
      hour,
      newMinute,
      period
    );

  };


  // ==========================================================
  // AM / PM CHANGE
  // ==========================================================

  const handlePeriodChange = (
    event
  ) => {

    const newPeriod =
      event.target.value;

    setPeriod(newPeriod);

    updateTime(
      hour,
      minute,
      newPeriod
    );

  };


  return (

    <div>

      <div className="
        flex
        gap-2
        items-center
      ">

        {/* ====================================================
            HOUR
        ==================================================== */}

        <select
          value={hour}
          onChange={handleHourChange}
          required={required}
          className="
            flex-1
            rounded-xl
            border
            border-slate-300
            bg-white
            px-4
            py-4
            text-slate-800
            outline-none
            transition
            focus:border-cyan-500
            focus:ring-2
            focus:ring-cyan-100
          "
        >

          <option value="">
            Hour
          </option>

          {Array.from(
            { length: 12 },
            (_, index) => index + 1
          ).map((item) => (

            <option
              key={item}
              value={String(item)}
            >
              {item}
            </option>

          ))}

        </select>


        <span className="
          text-xl
          font-bold
          text-slate-400
        ">
          :
        </span>


        {/* ====================================================
            MINUTE
        ==================================================== */}

        <select
          value={minute}
          onChange={handleMinuteChange}
          required={required}
          className="
            flex-1
            rounded-xl
            border
            border-slate-300
            bg-white
            px-4
            py-4
            text-slate-800
            outline-none
            transition
            focus:border-cyan-500
            focus:ring-2
            focus:ring-cyan-100
          "
        >

          <option value="">
            Min
          </option>

          {Array.from(
            { length: 60 },
            (_, index) =>
              String(index).padStart(2, "0")
          ).map((item) => (

            <option
              key={item}
              value={item}
            >
              {item}
            </option>

          ))}

        </select>


        {/* ====================================================
            AM / PM
        ==================================================== */}

        <select
          value={period}
          onChange={handlePeriodChange}
          required={required}
          className="
            w-24
            rounded-xl
            border
            border-slate-300
            bg-white
            px-4
            py-4
            text-slate-800
            font-semibold
            outline-none
            transition
            focus:border-cyan-500
            focus:ring-2
            focus:ring-cyan-100
          "
        >

          <option value="AM">
            AM
          </option>

          <option value="PM">
            PM
          </option>

        </select>

      </div>


      {/* ======================================================
          DISPLAY SELECTED TIME
      ====================================================== */}

      {hour &&
        minute &&
        period && (

          <p className="
            mt-2
            text-xs
            text-cyan-600
            font-semibold
          ">

            Selected time:{" "}

            {hour}:{minute} {period}

          </p>

        )}

    </div>

  );

}


// ============================================================
// LIVE CLASS FORM
// ============================================================

function LiveClassForm({
  form,
  handleChange,
  handleSubmit,
  loading,
  buttonText = "Save Live Class",
  close,
}) {

  const [batches, setBatches] =
    useState([]);

  const [batchesLoading, setBatchesLoading] =
    useState(true);


  // ============================================================
  // LOAD BATCHES
  // ============================================================

  useEffect(() => {

    loadBatches();

  }, []);


  const loadBatches = async () => {

    try {

      setBatchesLoading(true);

      const data =
        await getBatches();

      setBatches(
        Array.isArray(data?.batches)
          ? data.batches
          : []
      );

    } catch (error) {

      console.error(
        "LOAD BATCHES ERROR:",
        error
      );

      setBatches([]);

    } finally {

      setBatchesLoading(false);

    }

  };


  // ============================================================
  // HANDLE CHANGE
  // ============================================================

  const onChange = (event) => {

    if (
      typeof handleChange === "function"
    ) {

      handleChange(event);

    }

  };


  // ============================================================
  // HANDLE SUBMIT
  // ============================================================

  const onSubmit = (event) => {

    event.preventDefault();

    if (
      typeof handleSubmit === "function"
    ) {

      handleSubmit(event);

    }

  };


  // ============================================================
  // RENDER
  // ============================================================

  return (

    <form
      onSubmit={onSubmit}
      className="space-y-6"
    >

      {/* ======================================================
          BATCH
      ====================================================== */}

      <div>

        <label
          htmlFor="batch_id"
          className="
            block
            mb-2
            font-semibold
            text-slate-700
          "
        >
          Batch
        </label>


        <select
          id="batch_id"
          name="batch_id"
          value={
            form?.batch_id || ""
          }
          onChange={onChange}
          required
          disabled={batchesLoading}
          className="
            w-full
            rounded-xl
            border
            border-slate-300
            bg-white
            px-5
            py-4
            text-slate-800
            outline-none
            transition
            focus:border-cyan-500
            focus:ring-2
            focus:ring-cyan-100
            disabled:bg-slate-100
            disabled:cursor-not-allowed
          "
        >

          <option value="">

            {batchesLoading
              ? "Loading batches..."
              : "Select Batch"
            }

          </option>


          {!batchesLoading &&
            batches.map((batch) => (

              <option
                key={batch.id}
                value={batch.id}
              >

                {batch.batch_name}

              </option>

            ))
          }

        </select>


        {!batchesLoading &&
          batches.length === 0 && (

            <p className="
              mt-2
              text-sm
              text-red-500
            ">

              No batches available.
              Please create a batch first.

            </p>

          )
        }

      </div>


      {/* ======================================================
          CLASS TITLE
      ====================================================== */}

      <div>

        <label
          htmlFor="title"
          className="
            block
            mb-2
            font-semibold
            text-slate-700
          "
        >
          Class Title
        </label>


        <input
          id="title"
          type="text"
          name="title"
          value={
            form?.title || ""
          }
          onChange={onChange}
          required
          maxLength={200}
          placeholder="Enter live class title"
          className="
            w-full
            rounded-xl
            border
            border-slate-300
            bg-white
            px-5
            py-4
            text-slate-800
            outline-none
            transition
            placeholder:text-slate-400
            focus:border-cyan-500
            focus:ring-2
            focus:ring-cyan-100
          "
        />

      </div>


      {/* ======================================================
          DESCRIPTION
      ====================================================== */}

      <div>

        <label
          htmlFor="description"
          className="
            block
            mb-2
            font-semibold
            text-slate-700
          "
        >
          Class Description
        </label>


        <textarea
          id="description"
          name="description"
          rows="4"
          value={
            form?.description || ""
          }
          onChange={onChange}
          placeholder="Describe what will be covered in this live class..."
          className="
            w-full
            rounded-xl
            border
            border-slate-300
            bg-white
            px-5
            py-4
            text-slate-800
            outline-none
            transition
            resize-none
            placeholder:text-slate-400
            focus:border-cyan-500
            focus:ring-2
            focus:ring-cyan-100
          "
        />

      </div>


      {/* ======================================================
          ZOOM INFORMATION
      ====================================================== */}

      <div className="
        rounded-2xl
        border
        border-blue-100
        bg-blue-50
        p-5
      ">

        <div className="
          flex
          items-start
          gap-3
        ">

          <div className="
            w-10
            h-10
            rounded-xl
            bg-blue-600
            text-white
            flex
            items-center
            justify-center
            shrink-0
          ">

            🎥

          </div>


          <div>

            <h3 className="
              font-bold
              text-blue-900
            ">

              Zoom Meeting

            </h3>


            <p className="
              mt-1
              text-sm
              text-blue-700
              leading-relaxed
            ">

              A Zoom meeting will be created
              automatically when you schedule this
              class. The meeting link, Meeting ID and
              password will be generated by Zoom.

            </p>

          </div>

        </div>

      </div>


      {/* ======================================================
          RECORDING LINK
      ====================================================== */}

      <div>

        <label
          htmlFor="recording_link"
          className="
            block
            mb-2
            font-semibold
            text-slate-700
          "
        >
          Recording Link
        </label>


        <input
          id="recording_link"
          type="url"
          name="recording_link"
          value={
            form?.recording_link || ""
          }
          onChange={onChange}
          placeholder="https://..."
          className="
            w-full
            rounded-xl
            border
            border-slate-300
            bg-white
            px-5
            py-4
            text-slate-800
            outline-none
            transition
            placeholder:text-slate-400
            focus:border-cyan-500
            focus:ring-2
            focus:ring-cyan-100
          "
        />


        <p className="
          mt-2
          text-xs
          text-slate-500
        ">

          Optional. Add the recording after
          the class has been completed.

        </p>

      </div>


      {/* ======================================================
          DATE + START TIME
      ====================================================== */}

      <div className="
        grid
        grid-cols-1
        lg:grid-cols-2
        gap-6
      ">

        {/* ====================================================
            DATE
        ==================================================== */}

        <div>

          <label
            htmlFor="class_date"
            className="
              block
              mb-2
              font-semibold
              text-slate-700
            "
          >
            Class Date
          </label>


          <input
            id="class_date"
            type="date"
            name="class_date"
            value={
              form?.class_date || ""
            }
            onChange={onChange}
            required
            className="
              w-full
              rounded-xl
              border
              border-slate-300
              bg-white
              px-5
              py-4
              text-slate-800
              outline-none
              transition
              focus:border-cyan-500
              focus:ring-2
              focus:ring-cyan-100
            "
          />

        </div>


        {/* ====================================================
            START TIME
        ==================================================== */}

        <div>

          <label
            htmlFor="start_time"
            className="
              block
              mb-2
              font-semibold
              text-slate-700
            "
          >
            Start Time
          </label>


          <TimeSelector
            name="start_time"
            value={
              form?.start_time || ""
            }
            onChange={onChange}
            required
          />

        </div>

      </div>


      {/* ======================================================
          END TIME
      ====================================================== */}

      <div>

        <label
          htmlFor="end_time"
          className="
            block
            mb-2
            font-semibold
            text-slate-700
          "
        >
          End Time
        </label>


        <TimeSelector
          name="end_time"
          value={
            form?.end_time || ""
          }
          onChange={onChange}
        />

      </div>


      {/* ======================================================
          STATUS
      ====================================================== */}

      <div>

        <label
          htmlFor="status"
          className="
            block
            mb-2
            font-semibold
            text-slate-700
          "
        >
          Status
        </label>


        <select
          id="status"
          name="status"
          value={
            form?.status || "Upcoming"
          }
          onChange={onChange}
          className="
            w-full
            rounded-xl
            border
            border-slate-300
            bg-white
            px-5
            py-4
            text-slate-800
            outline-none
            transition
            focus:border-cyan-500
            focus:ring-2
            focus:ring-cyan-100
          "
        >

          <option value="Upcoming">
            Upcoming
          </option>

          <option value="Live">
            Live
          </option>

          <option value="Completed">
            Completed
          </option>

          <option value="Cancelled">
            Cancelled
          </option>

        </select>

      </div>


      {/* ======================================================
          ACTION BUTTONS
      ====================================================== */}

      <div className="
        flex
        flex-col-reverse
        sm:flex-row
        justify-end
        gap-4
        pt-5
        border-t
        border-slate-200
      ">

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
          disabled={
            loading ||
            batchesLoading ||
            batches.length === 0
          }
        >

          {loading
            ? "Creating Zoom Meeting..."
            : buttonText
          }

        </Button>

      </div>

    </form>

  );

}


export default LiveClassForm;