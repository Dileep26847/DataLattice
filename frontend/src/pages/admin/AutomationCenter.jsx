import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  FaCheckCircle,
  FaClock,
  FaExclamationCircle,
  FaRedo,
  FaRobot,
  FaServer,
  FaSpinner,
  FaTasks,
  FaTimesCircle,
  FaUsers,
} from "react-icons/fa";

import api from "../../services/api";


// ============================================================
// HELPERS
// ============================================================

const getObjectFromResponse = (response) => {

  const data = response?.data;

  if (
    data?.data &&
    typeof data.data === "object"
  ) {
    return data.data;
  }

  return data || {};

};


const formatDateTime = (value) => {

  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

};


const formatStatus = (status) => {

  if (!status) {
    return "UNKNOWN";
  }

  return String(status)
    .replace(/_/g, " ")
    .toUpperCase();

};


const getStatusClasses = (status) => {

  const normalized =
    String(status || "")
      .toUpperCase();

  if (
    normalized === "SENT" ||
    normalized === "DELIVERED" ||
    normalized === "PROCESSED" ||
    normalized === "COMPLETED" ||
    normalized === "SUCCESS" ||
    normalized === "ENABLED"
  ) {

    return "bg-emerald-50 text-emerald-700 border-emerald-200";

  }


  if (
    normalized === "FAILED" ||
    normalized === "ERROR" ||
    normalized === "CANCELLED" ||
    normalized === "DISABLED"
  ) {

    return "bg-red-50 text-red-700 border-red-200";

  }


  if (
    normalized === "RUNNING" ||
    normalized === "PROCESSING"
  ) {

    return "bg-blue-50 text-blue-700 border-blue-200";

  }


  return "bg-amber-50 text-amber-700 border-amber-200";

};


const getChannelLabel = (channel) => {

  if (!channel) {
    return "—";
  }

  return String(channel)
    .replace(/_/g, " ");

};


const getChannels = (rule) => {

  if (
    Array.isArray(
      rule?.channels_json
    )
  ) {

    return rule.channels_json;

  }


  if (
    Array.isArray(
      rule?.channels
    )
  ) {

    return rule.channels;

  }


  if (
    typeof rule?.channels_json === "string"
  ) {

    try {

      const parsed =
        JSON.parse(
          rule.channels_json
        );

      return Array.isArray(parsed)
        ? parsed
        : [];

    } catch {

      return [];

    }

  }


  if (
    typeof rule?.channels === "string"
  ) {

    try {

      const parsed =
        JSON.parse(
          rule.channels
        );

      return Array.isArray(parsed)
        ? parsed
        : [rule.channels];

    } catch {

      return [
        rule.channels,
      ];

    }

  }


  return [];

};


const getStatusCount = (
  collection,
  status
) => {

  if (!Array.isArray(collection)) {
    return 0;
  }

  return collection.filter(
    item =>
      String(
        item?.status || ""
      ).toUpperCase() ===
      status
  ).length;

};


// ============================================================
// STAT CARD
// ============================================================

function StatCard({
  title,
  value,
  description,
  icon,
  loading,
}) {

  return (

    <div
      className="
        bg-white
        border
        border-slate-200
        rounded-2xl
        p-5
        shadow-sm
      "
    >

      <div
        className="
          flex
          items-start
          justify-between
          gap-4
        "
      >

        <div>

          <p
            className="
              text-sm
              font-medium
              text-slate-500
            "
          >
            {title}
          </p>


          <div
            className="
              mt-2
              text-3xl
              font-bold
              text-slate-900
            "
          >

            {loading ? (

              <FaSpinner
                className="
                  animate-spin
                  text-cyan-600
                "
              />

            ) : (

              value

            )}

          </div>


          <p
            className="
              mt-1
              text-xs
              text-slate-500
            "
          >
            {description}
          </p>

        </div>


        <div
          className="
            h-11
            w-11
            rounded-xl
            bg-cyan-50
            text-cyan-600
            flex
            items-center
            justify-center
            text-lg
            shrink-0
          "
        >

          {icon}

        </div>

      </div>

    </div>

  );

}


// ============================================================
// STATUS BADGE
// ============================================================

function StatusBadge({
  status,
}) {

  return (

    <span
      className={`
        inline-flex
        items-center
        rounded-full
        border
        px-2.5
        py-1
        text-xs
        font-semibold
        ${getStatusClasses(status)}
      `}
    >

      {formatStatus(status)}

    </span>

  );

}


// ============================================================
// RULE ROW
// ============================================================

function RuleRow({
  rule,
}) {

  const enabled =
    Number(
      rule?.enabled ??
      rule?.is_enabled ??
      0
    ) === 1 ||
    rule?.enabled === true ||
    rule?.is_enabled === true;


  const channels =
    getChannels(rule);


  return (

    <div
      className="
        border
        border-slate-200
        rounded-2xl
        p-5
        flex
        flex-col
        lg:flex-row
        lg:items-center
        lg:justify-between
        gap-4
        hover:border-slate-300
        transition
      "
    >

      <div
        className="
          min-w-0
        "
      >

        <div
          className="
            flex
            flex-wrap
            items-center
            gap-2
          "
        >

          <h3
            className="
              font-semibold
              text-slate-900
            "
          >
            {rule.name ||
              rule.automation_key ||
              "Unnamed automation"
            }
          </h3>


          <StatusBadge
            status={
              enabled
                ? "ENABLED"
                : "DISABLED"
            }
          />

        </div>


        <p
          className="
            text-xs
            text-slate-500
            mt-1
          "
        >
          {rule.description ||
            rule.automation_key ||
            "No description"
          }
        </p>


        <div
          className="
            flex
            flex-wrap
            gap-x-5
            gap-y-2
            mt-3
            text-xs
            text-slate-500
          "
        >

          <span>
            Trigger:{" "}
            <strong
              className="
                text-slate-700
              "
            >
              {rule.event_name ||
                rule.schedule_expression ||
                rule.trigger_type ||
                "—"
              }
            </strong>
          </span>


          <span>
            Recipient:{" "}
            <strong
              className="
                text-slate-700
              "
            >
              {rule.recipient_type ||
                "—"
              }
            </strong>
          </span>


          <span>
            Template:{" "}
            <strong
              className="
                text-slate-700
              "
            >
              {rule.template_key ||
                "—"
              }
            </strong>
          </span>

        </div>

      </div>


      <div
        className="
          flex
          flex-wrap
          gap-2
          shrink-0
        "
      >

        {channels.length > 0
          ? channels.map(
              channel => (

                <span
                  key={channel}
                  className="
                    rounded-full
                    bg-slate-100
                    px-3
                    py-1.5
                    text-xs
                    font-medium
                    text-slate-600
                  "
                >
                  {getChannelLabel(
                    channel
                  )}
                </span>

              )
            )
          : (

            <span
              className="
                text-xs
                text-slate-400
              "
            >
              No channels
            </span>

          )
        }

      </div>

    </div>

  );

}


// ============================================================
// EMPTY STATE
// ============================================================

function EmptyState({
  icon,
  title,
  description,
}) {

  return (

    <div
      className="
        rounded-2xl
        border
        border-dashed
        border-slate-300
        bg-slate-50
        p-10
        text-center
      "
    >

      <div
        className="
          mx-auto
          h-12
          w-12
          rounded-xl
          bg-white
          border
          border-slate-200
          text-slate-400
          flex
          items-center
          justify-center
          text-lg
        "
      >

        {icon}

      </div>


      <h3
        className="
          mt-4
          font-semibold
          text-slate-800
        "
      >
        {title}
      </h3>


      <p
        className="
          mt-1
          text-sm
          text-slate-500
          max-w-md
          mx-auto
        "
      >
        {description}
      </p>

    </div>

  );

}


// ============================================================
// AUTOMATION CENTER
// ============================================================

function AutomationCenter() {

  const [rules, setRules] =
    useState([]);

  const [events, setEvents] =
    useState([]);

  const [runs, setRuns] =
    useState([]);

  const [jobs, setJobs] =
    useState([]);

  const [counts, setCounts] =
    useState({
      queue: [],
      dueJobs: 0,
      events: [],
      runs: [],
    });

  const [health, setHealth] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [error, setError] =
    useState("");

  const [
    activeTab,
    setActiveTab,
  ] = useState("overview");


  // ==========================================================
  // LOAD AUTOMATION OVERVIEW
  // ==========================================================

  const loadAutomationData =
    useCallback(
      async (
        showFullLoader = false
      ) => {

        try {

          if (
            showFullLoader
          ) {

            setLoading(true);

          } else {

            setRefreshing(true);

          }


          setError("");


          /*
           * The backend provides one consolidated endpoint for
           * the Automation Center.
           *
           * This avoids making multiple independent requests
           * for rules, events, runs and jobs.
           */

          const response =
            await api.get(
              "/communication/automation/overview",
              {
                params: {
                  limit: 50,
                },
              }
            );


          const data =
            getObjectFromResponse(
              response
            );


          setRules(
            Array.isArray(
              data.rules
            )
              ? data.rules
              : []
          );


          setEvents(
            Array.isArray(
              data.events
            )
              ? data.events
              : []
          );


          setRuns(
            Array.isArray(
              data.runs
            )
              ? data.runs
              : []
          );


          setJobs(
            Array.isArray(
              data.jobs
            )
              ? data.jobs
              : []
          );


          setCounts(
            data.counts || {
              queue: [],
              dueJobs: 0,
              events: [],
              runs: [],
            }
          );


          /*
           * Health is deliberately retrieved separately because
           * it represents live runtime/provider state rather than
           * historical automation data.
           */

          const healthResponse =
            await api.get(
              "/communication/health"
            );


          const healthData =
            getObjectFromResponse(
              healthResponse
            );


          setHealth(
            healthData
          );

        } catch (
          requestError
        ) {

          console.error(
            "Automation Center load error:",
            requestError
          );


          setError(
            requestError
              ?.response
              ?.data
              ?.message ||
            requestError?.message ||
            "Unable to load Automation Center data."
          );

        } finally {

          setLoading(false);
          setRefreshing(false);

        }

      },
      []
    );


  // ==========================================================
  // INITIAL LOAD
  // ==========================================================

  useEffect(
    () => {

      loadAutomationData(
        true
      );

    },
    [
      loadAutomationData,
    ]
  );


  // ==========================================================
  // DERIVED METRICS
  // ==========================================================

  const metrics =
    useMemo(
      () => {

        const enabledRules =
          rules.filter(
            rule =>
              Number(
                rule?.enabled ??
                rule?.is_enabled ??
                0
              ) === 1 ||
              rule?.enabled === true ||
              rule?.is_enabled === true
          ).length;


        const failedJobs =
          getStatusCount(
            jobs,
            "FAILED"
          );


        const queuedJobs =
          getStatusCount(
            jobs,
            "QUEUED"
          );


        const processingJobs =
          getStatusCount(
            jobs,
            "PROCESSING"
          );


        const processedEvents =
          getStatusCount(
            events,
            "PROCESSED"
          );


        const failedEvents =
          getStatusCount(
            events,
            "FAILED"
          );


        const failedRuns =
          getStatusCount(
            runs,
            "FAILED"
          );


        return {

          totalRules:
            rules.length,

          enabledRules,

          failedJobs,

          queuedJobs,

          processingJobs,

          processedEvents,

          failedEvents,

          failedRuns,

        };

      },
      [
        rules,
        events,
        runs,
        jobs,
      ]
    );


  // ==========================================================
  // QUEUE SUMMARY
  // ==========================================================

  const queueSummary =
    useMemo(
      () => {

        if (
          !Array.isArray(
            counts.queue
          )
        ) {

          return {};

        }


        return counts.queue.reduce(
          (
            result,
            item
          ) => {

            const status =
              String(
                item?.status ||
                ""
              ).toUpperCase();

            result[status] =
              Number(
                item?.count || 0
              );

            return result;

          },
          {}
        );

      },
      [
        counts.queue,
      ]
    );


  // ==========================================================
  // TABS
  // ==========================================================

  const tabs = [

    {
      id: "overview",
      label: "Overview",
    },

    {
      id: "rules",
      label: "Automation Rules",
    },

    {
      id: "runs",
      label: "Runs",
    },

    {
      id: "events",
      label: "Events",
    },

    {
      id: "jobs",
      label: "Communication Jobs",
    },

  ];


  // ==========================================================
  // RENDER
  // ==========================================================

  return (

    <div
      className="
        space-y-6
      "
    >


      {/* ======================================================
          PAGE HEADER
      ====================================================== */}

      <div
        className="
          flex
          flex-col
          lg:flex-row
          lg:items-center
          lg:justify-between
          gap-4
        "
      >

        <div>

          <div
            className="
              flex
              items-center
              gap-3
            "
          >

            <div
              className="
                h-12
                w-12
                rounded-2xl
                bg-cyan-600
                text-white
                flex
                items-center
                justify-center
                text-xl
                shadow-lg
              "
            >

              <FaRobot />

            </div>


            <div>

              <h1
                className="
                  text-2xl
                  md:text-3xl
                  font-bold
                  text-slate-900
                "
              >
                Automation Center
              </h1>


              <p
                className="
                  text-sm
                  text-slate-500
                  mt-1
                "
              >
                Monitor DataLattice automations,
                communication jobs, events, runs
                and runtime health.
              </p>

            </div>

          </div>

        </div>


        <button
          type="button"
          onClick={() =>
            loadAutomationData(
              false
            )
          }
          disabled={refreshing}
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-slate-900
            px-5
            py-3
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-slate-800
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >

          <FaRedo
            className={
              refreshing
                ? "animate-spin"
                : ""
            }
          />

          {refreshing
            ? "Refreshing..."
            : "Refresh"
          }

        </button>

      </div>


      {/* ======================================================
          ERROR
      ====================================================== */}

      {error && (

        <div
          className="
            rounded-2xl
            border
            border-red-200
            bg-red-50
            p-4
            text-sm
            text-red-700
            flex
            items-start
            gap-3
          "
        >

          <FaExclamationCircle
            className="
              mt-0.5
              shrink-0
            "
          />


          <div>

            <p
              className="
                font-semibold
              "
            >
              Automation Center could not
              load completely.
            </p>


            <p
              className="
                mt-1
              "
            >
              {error}
            </p>

          </div>

        </div>

      )}


      {/* ======================================================
          SUMMARY CARDS
      ====================================================== */}

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-5
          gap-4
        "
      >

        <StatCard
          title="Automation Rules"
          value={
            metrics.totalRules
          }
          description={`
            ${metrics.enabledRules}
            currently enabled
          `}
          icon={
            <FaRobot />
          }
          loading={loading}
        />


        <StatCard
          title="Queued Jobs"
          value={
            queueSummary.QUEUED ??
            metrics.queuedJobs
          }
          description="
            Waiting for worker processing
          "
          icon={
            <FaClock />
          }
          loading={loading}
        />


        <StatCard
          title="Failed Jobs"
          value={
            queueSummary.FAILED ??
            metrics.failedJobs
          }
          description="
            Jobs requiring attention
          "
          icon={
            <FaTimesCircle />
          }
          loading={loading}
        />


        <StatCard
          title="Processed Events"
          value={
            metrics.processedEvents
          }
          description="
            Successfully processed events
          "
          icon={
            <FaCheckCircle />
          }
          loading={loading}
        />


        <StatCard
          title="System"
          value={
            health?.runtime?.running
              ? "RUNNING"
              : health?.runtime?.status
                ? formatStatus(
                    health.runtime.status
                  )
                : "—"
          }
          description="
            Communication runtime health
          "
          icon={
            <FaServer />
          }
          loading={loading}
        />

      </div>


      {/* ======================================================
          SECONDARY METRICS
      ====================================================== */}

      {!loading && (

        <div
          className="
            grid
            grid-cols-2
            md:grid-cols-4
            gap-4
          "
        >

          <div
            className="
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-4
              shadow-sm
            "
          >

            <p
              className="
                text-xs
                font-medium
                text-slate-500
              "
            >
              Processing Jobs
            </p>


            <p
              className="
                mt-2
                text-xl
                font-bold
                text-slate-900
              "
            >
              {queueSummary.PROCESSING ??
                metrics.processingJobs
              }
            </p>

          </div>


          <div
            className="
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-4
              shadow-sm
            "
          >

            <p
              className="
                text-xs
                font-medium
                text-slate-500
              "
            >
              Failed Runs
            </p>


            <p
              className="
                mt-2
                text-xl
                font-bold
                text-slate-900
              "
            >
              {metrics.failedRuns}
            </p>

          </div>


          <div
            className="
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-4
              shadow-sm
            "
          >

            <p
              className="
                text-xs
                font-medium
                text-slate-500
              "
            >
              Failed Events
            </p>


            <p
              className="
                mt-2
                text-xl
                font-bold
                text-slate-900
              "
            >
              {metrics.failedEvents}
            </p>

          </div>


          <div
            className="
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-4
              shadow-sm
            "
          >

            <p
              className="
                text-xs
                font-medium
                text-slate-500
              "
            >
              Due Jobs
            </p>


            <p
              className="
                mt-2
                text-xl
                font-bold
                text-slate-900
              "
            >
              {counts.dueJobs ??
                0
              }
            </p>

          </div>

        </div>

      )}


      {/* ======================================================
          TABS
      ====================================================== */}

      <div
        className="
          bg-white
          border
          border-slate-200
          rounded-2xl
          shadow-sm
          overflow-hidden
        "
      >

        <div
          className="
            border-b
            border-slate-200
            px-4
            md:px-6
            overflow-x-auto
          "
        >

          <div
            className="
              flex
              min-w-max
              gap-6
            "
          >

            {tabs.map(
              tab => (

                <button
                  key={tab.id}
                  type="button"
                  onClick={() =>
                    setActiveTab(
                      tab.id
                    )
                  }
                  className={`
                    relative
                    py-4
                    text-sm
                    font-semibold
                    transition
                    ${
                      activeTab ===
                      tab.id
                        ? "text-cyan-600"
                        : "text-slate-500 hover:text-slate-900"
                    }
                  `}
                >

                  {tab.label}


                  {activeTab ===
                    tab.id && (

                    <span
                      className="
                        absolute
                        left-0
                        right-0
                        bottom-0
                        h-0.5
                        bg-cyan-600
                        rounded-full
                      "
                    />

                  )}

                </button>

              )
            )}

          </div>

        </div>


        {/* ====================================================
            OVERVIEW
        ==================================================== */}

        {activeTab ===
          "overview" && (

          <div
            className="
              p-6
              space-y-6
            "
          >


            {/* ================================================
                SYSTEM STATUS
            ================================================= */}

            <div>

              <h2
                className="
                  text-lg
                  font-bold
                  text-slate-900
                "
              >
                System Status
              </h2>


              <p
                className="
                  text-sm
                  text-slate-500
                  mt-1
                "
              >
                Current communication
                infrastructure state.
              </p>

            </div>


            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-3
                gap-4
              "
            >

              <div
                className="
                  rounded-2xl
                  border
                  border-slate-200
                  p-5
                "
              >

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-3
                  "
                >

                  <span
                    className="
                      text-sm
                      font-semibold
                      text-slate-700
                    "
                  >
                    Runtime
                  </span>


                  <StatusBadge
                    status={
                      health?.runtime?.running
                        ? "RUNNING"
                        : "UNKNOWN"
                    }
                  />

                </div>


                <p
                  className="
                    text-xs
                    text-slate-500
                    mt-3
                  "
                >
                  Event processor,
                  worker and schedulers.
                </p>

              </div>


              <div
                className="
                  rounded-2xl
                  border
                  border-slate-200
                  p-5
                "
              >

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-3
                  "
                >

                  <span
                    className="
                      text-sm
                      font-semibold
                      text-slate-700
                    "
                  >
                    Queue
                  </span>


                  <span
                    className="
                      text-lg
                      font-bold
                      text-slate-900
                    "
                  >
                    {queueSummary.QUEUED ??
                      0
                    }
                  </span>

                </div>


                <p
                  className="
                    text-xs
                    text-slate-500
                    mt-3
                  "
                >
                  Jobs waiting for
                  communication processing.
                </p>

              </div>


              <div
                className="
                  rounded-2xl
                  border
                  border-slate-200
                  p-5
                "
              >

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-3
                  "
                >

                  <span
                    className="
                      text-sm
                      font-semibold
                      text-slate-700
                    "
                  >
                    Providers
                  </span>


                  <span
                    className="
                      text-lg
                      font-bold
                      text-slate-900
                    "
                  >

                    {health?.providers
                      ? "Configured"
                      : "—"
                    }

                  </span>

                </div>


                <p
                  className="
                    text-xs
                    text-slate-500
                    mt-3
                  "
                >
                  Current communication
                  provider state.
                </p>

              </div>

            </div>


            {/* ================================================
                ACTIVE AUTOMATIONS
            ================================================= */}

            <div>

              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-4
                  mb-4
                "
              >

                <div>

                  <h2
                    className="
                      text-lg
                      font-bold
                      text-slate-900
                    "
                  >
                    Active Automations
                  </h2>


                  <p
                    className="
                      text-sm
                      text-slate-500
                      mt-1
                    "
                  >
                    Rules currently configured
                    in DataLattice.
                  </p>

                </div>

              </div>


              {rules.length ===
                0 ? (

                <EmptyState
                  icon={
                    <FaRobot />
                  }
                  title="
                    No automation rules found
                  "
                  description="
                    The backend has not returned
                    any configured automation rules.
                  "
                />

              ) : (

                <div
                  className="
                    space-y-3
                  "
                >

                  {rules.map(
                    rule => (

                      <RuleRow
                        key={
                          rule.id ||
                          rule.automation_key
                        }
                        rule={rule}
                      />

                    )
                  )}

                </div>

              )}

            </div>

          </div>

        )}


        {/* ====================================================
            RULES
        ==================================================== */}

        {activeTab ===
          "rules" && (

          <div
            className="
              p-6
            "
          >

            <div
              className="
                mb-5
              "
            >

              <h2
                className="
                  text-lg
                  font-bold
                  text-slate-900
                "
              >
                Automation Rules
              </h2>


              <p
                className="
                  text-sm
                  text-slate-500
                  mt-1
                "
              >
                Event-driven and scheduled
                communication rules.
              </p>

            </div>


            {rules.length ===
              0 ? (

              <EmptyState
                icon={
                  <FaRobot />
                }
                title="
                  No rules available
                "
                description="
                  No automation rules were
                  returned by the backend.
                "
              />

            ) : (

              <div
                className="
                  overflow-x-auto
                  border
                  border-slate-200
                  rounded-2xl
                "
              >

                <table
                  className="
                    min-w-full
                    text-sm
                  "
                >

                  <thead
                    className="
                      bg-slate-50
                      border-b
                      border-slate-200
                    "
                  >

                    <tr>

                      <th
                        className="
                          px-5
                          py-4
                          text-left
                          font-semibold
                          text-slate-600
                        "
                      >
                        Automation
                      </th>


                      <th
                        className="
                          px-5
                          py-4
                          text-left
                          font-semibold
                          text-slate-600
                        "
                      >
                        Trigger
                      </th>


                      <th
                        className="
                          px-5
                          py-4
                          text-left
                          font-semibold
                          text-slate-600
                        "
                      >
                        Recipient
                      </th>


                      <th
                        className="
                          px-5
                          py-4
                          text-left
                          font-semibold
                          text-slate-600
                        "
                      >
                        Channels
                      </th>


                      <th
                        className="
                          px-5
                          py-4
                          text-left
                          font-semibold
                          text-slate-600
                        "
                      >
                        Status
                      </th>

                    </tr>

                  </thead>


                  <tbody
                    className="
                      divide-y
                      divide-slate-100
                    "
                  >

                    {rules.map(
                      rule => {

                        const channels =
                          getChannels(
                            rule
                          );


                        const enabled =
                          Number(
                            rule?.enabled ??
                            rule?.is_enabled ??
                            0
                          ) === 1 ||
                          rule?.enabled === true ||
                          rule?.is_enabled === true;


                        return (

                          <tr
                            key={
                              rule.id ||
                              rule.automation_key
                            }
                            className="
                              hover:bg-slate-50
                            "
                          >

                            <td
                              className="
                                px-5
                                py-4
                              "
                            >

                              <p
                                className="
                                  font-semibold
                                  text-slate-900
                                "
                              >
                                {rule.name ||
                                  rule.automation_key ||
                                  "Unnamed automation"
                                }
                              </p>


                              <p
                                className="
                                  text-xs
                                  text-slate-500
                                  mt-1
                                "
                              >
                                {rule.automation_key ||
                                  "—"
                                }
                              </p>

                            </td>


                            <td
                              className="
                                px-5
                                py-4
                              "
                            >

                              <p
                                className="
                                  font-medium
                                  text-slate-700
                                "
                              >
                                {rule.trigger_type ||
                                  "—"
                                }
                              </p>


                              <p
                                className="
                                  text-xs
                                  text-slate-500
                                  mt-1
                                "
                              >
                                {rule.event_name ||
                                  rule.schedule_expression ||
                                  "—"
                                }
                              </p>

                            </td>


                            <td
                              className="
                                px-5
                                py-4
                                text-slate-700
                              "
                            >
                              {rule.recipient_type ||
                                "—"
                              }
                            </td>


                            <td
                              className="
                                px-5
                                py-4
                              "
                            >

                              <div
                                className="
                                  flex
                                  flex-wrap
                                  gap-2
                                "
                              >

                                {channels.length >
                                0
                                  ? channels.map(
                                      channel => (

                                        <span
                                          key={
                                            channel
                                          }
                                          className="
                                            rounded-full
                                            bg-slate-100
                                            px-2.5
                                            py-1
                                            text-xs
                                            font-medium
                                            text-slate-600
                                          "
                                        >
                                          {getChannelLabel(
                                            channel
                                          )}
                                        </span>

                                      )
                                    )
                                  : (

                                    <span
                                      className="
                                        text-slate-400
                                      "
                                    >
                                      —
                                    </span>

                                  )
                                }

                              </div>

                            </td>


                            <td
                              className="
                                px-5
                                py-4
                              "
                            >

                              <StatusBadge
                                status={
                                  enabled
                                    ? "ENABLED"
                                    : "DISABLED"
                                }
                              />

                            </td>

                          </tr>

                        );

                      }
                    )}

                  </tbody>

                </table>

              </div>

            )}

          </div>

        )}


        {/* ====================================================
            RUNS
        ==================================================== */}

        {activeTab ===
          "runs" && (

          <div
            className="
              p-6
            "
          >

            <div
              className="
                mb-5
              "
            >

              <h2
                className="
                  text-lg
                  font-bold
                  text-slate-900
                "
              >
                Automation Runs
              </h2>


              <p
                className="
                  text-sm
                  text-slate-500
                  mt-1
                "
              >
                Recent automation execution
                history.
              </p>

            </div>


            {runs.length ===
              0 ? (

              <EmptyState
                icon={
                  <FaTasks />
                }
                title="
                  No automation runs available
                "
                description="
                  No automation execution history
                  has been returned.
                "
              />

            ) : (

              <div
                className="
                  space-y-3
                "
              >

                {runs.map(
                  run => (

                    <div
                      key={
                        run.id ||
                        run.run_key
                      }
                      className="
                        border
                        border-slate-200
                        rounded-2xl
                        p-5
                        flex
                        flex-col
                        lg:flex-row
                        lg:items-center
                        lg:justify-between
                        gap-4
                      "
                    >

                      <div>

                        <div
                          className="
                            flex
                            flex-wrap
                            items-center
                            gap-2
                          "
                        >

                          <p
                            className="
                              font-semibold
                              text-slate-900
                            "
                          >
                            Run #
                            {run.id ||
                              "—"
                            }
                          </p>


                          <StatusBadge
                            status={
                              run.status ||
                              "UNKNOWN"
                            }
                          />

                        </div>


                        <p
                          className="
                            text-xs
                            text-slate-500
                            mt-1
                          "
                        >
                          {run.run_key ||
                            "No run key"
                          }
                        </p>


                        <div
                          className="
                            flex
                            flex-wrap
                            gap-x-5
                            gap-y-2
                            mt-3
                            text-xs
                            text-slate-500
                          "
                        >

                          <span>
                            Scheduled:{" "}
                            {formatDateTime(
                              run.scheduled_at
                            )}
                          </span>


                          <span>
                            Started:{" "}
                            {formatDateTime(
                              run.started_at
                            )}
                          </span>


                          <span>
                            Finished:{" "}
                            {formatDateTime(
                              run.finished_at
                            )}
                          </span>

                        </div>

                      </div>


                      <div
                        className="
                          grid
                          grid-cols-4
                          gap-2
                          text-center
                        "
                      >

                        <div>

                          <p
                            className="
                              text-lg
                              font-bold
                              text-slate-900
                            "
                          >
                            {run.total_jobs ??
                              0
                            }
                          </p>


                          <p
                            className="
                              text-[10px]
                              text-slate-500
                            "
                          >
                            Total
                          </p>

                        </div>


                        <div>

                          <p
                            className="
                              text-lg
                              font-bold
                              text-slate-900
                            "
                          >
                            {run.queued_jobs ??
                              0
                            }
                          </p>


                          <p
                            className="
                              text-[10px]
                              text-slate-500
                            "
                          >
                            Queued
                          </p>

                        </div>


                        <div>

                          <p
                            className="
                              text-lg
                              font-bold
                              text-slate-900
                            "
                          >
                            {run.successful_jobs ??
                              0
                            }
                          </p>


                          <p
                            className="
                              text-[10px]
                              text-slate-500
                            "
                          >
                            Success
                          </p>

                        </div>


                        <div>

                          <p
                            className="
                              text-lg
                              font-bold
                              text-slate-900
                            "
                          >
                            {run.skipped_jobs ??
                              0
                            }
                          </p>


                          <p
                            className="
                              text-[10px]
                              text-slate-500
                            "
                          >
                            Skipped
                          </p>

                        </div>

                      </div>

                    </div>

                  )
                )}

              </div>

            )}

          </div>

        )}


        {/* ====================================================
            EVENTS
        ==================================================== */}

        {activeTab ===
          "events" && (

          <div
            className="
              p-6
            "
          >

            <div
              className="
                mb-5
              "
            >

              <h2
                className="
                  text-lg
                  font-bold
                  text-slate-900
                "
              >
                Automation Events
              </h2>


              <p
                className="
                  text-sm
                  text-slate-500
                  mt-1
                "
              >
                Durable automation events and
                processing state.
              </p>

            </div>


            {events.length ===
              0 ? (

              <EmptyState
                icon={
                  <FaTasks />
                }
                title="
                  No automation events available
                "
                description="
                  No automation events have been
                  returned by the backend.
                "
              />

            ) : (

              <div
                className="
                  overflow-x-auto
                  border
                  border-slate-200
                  rounded-2xl
                "
              >

                <table
                  className="
                    min-w-full
                    text-sm
                  "
                >

                  <thead
                    className="
                      bg-slate-50
                      border-b
                      border-slate-200
                    "
                  >

                    <tr>

                      <th
                        className="
                          px-5
                          py-4
                          text-left
                          font-semibold
                          text-slate-600
                        "
                      >
                        Event
                      </th>


                      <th
                        className="
                          px-5
                          py-4
                          text-left
                          font-semibold
                          text-slate-600
                        "
                      >
                        Type
                      </th>


                      <th
                        className="
                          px-5
                          py-4
                          text-left
                          font-semibold
                          text-slate-600
                        "
                      >
                        Aggregate
                      </th>


                      <th
                        className="
                          px-5
                          py-4
                          text-left
                          font-semibold
                          text-slate-600
                        "
                      >
                        Status
                      </th>


                      <th
                        className="
                          px-5
                          py-4
                          text-left
                          font-semibold
                          text-slate-600
                        "
                      >
                        Attempts
                      </th>


                      <th
                        className="
                          px-5
                          py-4
                          text-left
                          font-semibold
                          text-slate-600
                        "
                      >
                        Created
                      </th>

                    </tr>

                  </thead>


                  <tbody
                    className="
                      divide-y
                      divide-slate-100
                    "
                  >

                    {events.map(
                      event => (

                        <tr
                          key={
                            event.id ||
                            event.event_key
                          }
                          className="
                            hover:bg-slate-50
                          "
                        >

                          <td
                            className="
                              px-5
                              py-4
                            "
                          >

                            <p
                              className="
                                font-semibold
                                text-slate-900
                              "
                            >
                              {event.event_key ||
                                `Event #${event.id}`
                              }
                            </p>

                          </td>


                          <td
                            className="
                              px-5
                              py-4
                              text-slate-700
                            "
                          >
                            {event.event_type ||
                              "—"
                            }
                          </td>


                          <td
                            className="
                              px-5
                              py-4
                            "
                          >

                            <p
                              className="
                                text-slate-700
                              "
                            >
                              {event.aggregate_type ||
                                "—"
                              }
                            </p>


                            {event.aggregate_id && (

                              <p
                                className="
                                  text-xs
                                  text-slate-500
                                  mt-1
                                "
                              >
                                ID:{" "}
                                {
                                  event.aggregate_id
                                }
                              </p>

                            )}

                          </td>


                          <td
                            className="
                              px-5
                              py-4
                            "
                          >

                            <StatusBadge
                              status={
                                event.status ||
                                "UNKNOWN"
                              }
                            />

                          </td>


                          <td
                            className="
                              px-5
                              py-4
                              text-slate-700
                            "
                          >
                            {event.attempts ??
                              0
                            }
                          </td>


                          <td
                            className="
                              px-5
                              py-4
                              text-xs
                              text-slate-500
                            "
                          >
                            {formatDateTime(
                              event.created_at
                            )}
                          </td>

                        </tr>

                      )
                    )}

                  </tbody>

                </table>

              </div>

            )}

          </div>

        )}


        {/* ====================================================
            COMMUNICATION JOBS
        ==================================================== */}

        {activeTab ===
          "jobs" && (

          <div
            className="
              p-6
            "
          >

            <div
              className="
                mb-5
              "
            >

              <h2
                className="
                  text-lg
                  font-bold
                  text-slate-900
                "
              >
                Communication Jobs
              </h2>


              <p
                className="
                  text-sm
                  text-slate-500
                  mt-1
                "
              >
                Communication delivery queue
                and execution status.
              </p>

            </div>


            {jobs.length ===
              0 ? (

              <EmptyState
                icon={
                  <FaTasks />
                }
                title="
                  No communication jobs available
                "
                description="
                  No communication jobs have been
                  returned by the backend.
                "
              />

            ) : (

              <div
                className="
                  overflow-x-auto
                  border
                  border-slate-200
                  rounded-2xl
                "
              >

                <table
                  className="
                    min-w-full
                    text-sm
                  "
                >

                  <thead
                    className="
                      bg-slate-50
                      border-b
                      border-slate-200
                    "
                  >

                    <tr>

                      <th
                        className="
                          px-5
                          py-4
                          text-left
                          font-semibold
                          text-slate-600
                        "
                      >
                        Job
                      </th>


                      <th
                        className="
                          px-5
                          py-4
                          text-left
                          font-semibold
                          text-slate-600
                        "
                      >
                        Channel
                      </th>


                      <th
                        className="
                          px-5
                          py-4
                          text-left
                          font-semibold
                          text-slate-600
                        "
                      >
                        Recipient
                      </th>


                      <th
                        className="
                          px-5
                          py-4
                          text-left
                          font-semibold
                          text-slate-600
                        "
                      >
                        Status
                      </th>


                      <th
                        className="
                          px-5
                          py-4
                          text-left
                          font-semibold
                          text-slate-600
                        "
                      >
                        Attempts
                      </th>


                      <th
                        className="
                          px-5
                          py-4
                          text-left
                          font-semibold
                          text-slate-600
                        "
                      >
                        Updated
                      </th>

                    </tr>

                  </thead>


                  <tbody
                    className="
                      divide-y
                      divide-slate-100
                    "
                  >

                    {jobs.map(
                      job => (

                        <tr
                          key={
                            job.id ||
                            job.idempotency_key
                          }
                          className="
                            hover:bg-slate-50
                          "
                        >

                          <td
                            className="
                              px-5
                              py-4
                            "
                          >

                            <p
                              className="
                                font-semibold
                                text-slate-900
                              "
                            >
                              #
                              {job.id ||
                                "—"
                              }
                            </p>


                            <p
                              className="
                                text-xs
                                text-slate-500
                                mt-1
                                max-w-xs
                                truncate
                              "
                            >
                              {job.idempotency_key ||
                                "—"
                              }
                            </p>

                          </td>


                          <td
                            className="
                              px-5
                              py-4
                            "
                          >

                            <span
                              className="
                                rounded-full
                                bg-slate-100
                                px-2.5
                                py-1
                                text-xs
                                font-semibold
                                text-slate-700
                              "
                            >
                              {getChannelLabel(
                                job.channel
                              )}
                            </span>

                          </td>


                          <td
                            className="
                              px-5
                              py-4
                            "
                          >

                            <p
                              className="
                                font-medium
                                text-slate-700
                              "
                            >
                              {job.recipient_name ||
                                "Unknown recipient"
                              }
                            </p>


                            <p
                              className="
                                text-xs
                                text-slate-500
                                mt-1
                              "
                            >
                              {job.recipient_address ||
                                "—"
                              }
                            </p>

                          </td>


                          <td
                            className="
                              px-5
                              py-4
                            "
                          >

                            <StatusBadge
                              status={
                                job.status ||
                                "UNKNOWN"
                              }
                            />

                          </td>


                          <td
                            className="
                              px-5
                              py-4
                              text-slate-700
                              font-medium
                            "
                          >
                            {job.attempt_count ??
                              0
                            }
                            {" / "}
                            {job.max_attempts ??
                              0
                            }
                          </td>


                          <td
                            className="
                              px-5
                              py-4
                              text-xs
                              text-slate-500
                            "
                          >
                            {formatDateTime(
                              job.updated_at ||
                              job.completed_at ||
                              job.created_at
                            )}
                          </td>

                        </tr>

                      )
                    )}

                  </tbody>

                </table>

              </div>

            )}

          </div>

        )}

      </div>


      {/* ======================================================
          INFORMATION PANELS
      ====================================================== */}

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-4
        "
      >

        <div
          className="
            rounded-2xl
            border
            border-cyan-200
            bg-cyan-50
            p-5
          "
        >

          <div
            className="
              flex
              items-start
              gap-3
            "
          >

            <FaUsers
              className="
                text-cyan-600
                mt-1
                shrink-0
              "
            />


            <div>

              <h3
                className="
                  font-semibold
                  text-cyan-900
                "
              >
                Real recipient resolution
              </h3>


              <p
                className="
                  text-sm
                  text-cyan-800
                  mt-1
                  leading-6
                "
              >
                Live-class automations resolve
                eligible students from the batch
                and respect transactional
                communication consent before
                creating jobs.
              </p>

            </div>

          </div>

        </div>


        <div
          className="
            rounded-2xl
            border
            border-amber-200
            bg-amber-50
            p-5
          "
        >

          <div
            className="
              flex
              items-start
              gap-3
            "
          >

            <FaExclamationCircle
              className="
                text-amber-600
                mt-1
                shrink-0
              "
            />


            <div>

              <h3
                className="
                  font-semibold
                  text-amber-900
                "
              >
                Provider configuration
              </h3>


              <p
                className="
                  text-sm
                  text-amber-800
                  mt-1
                  leading-6
                "
              >
                Communication jobs are queued
                and retried independently from
                provider delivery. Configure Email
                or WhatsApp credentials before
                production sending.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}


// ============================================================
// EXPORT
// ============================================================

export default AutomationCenter;