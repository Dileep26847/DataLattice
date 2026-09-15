import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaBookOpen,
  FaCalendarCheck,
  FaChartLine,
  FaCheckCircle,
  FaClock,
  FaPlay,
  FaTasks,
  FaVideo,
  FaWifi,
} from "react-icons/fa";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  getDashboardStats,
  getMyCourses,
} from "../services/studentDashboardService";

import {
  getLiveClasses,
} from "../services/liveClassService";


const REFRESH_MS = 60_000;


const readUser = () => {
  try {
    return JSON.parse(
      localStorage.getItem("user")
    ) || null;
  } catch {
    return null;
  }
};


const formatTime = (value) => {

  if (!value) {
    return "Time unavailable";
  }

  const [rawHour, minute] =
    String(value).split(":");

  const hour = Number(rawHour);

  if (Number.isNaN(hour)) {
    return value;
  }

  return `${hour % 12 || 12}:${minute || "00"} ${
    hour >= 12 ? "PM" : "AM"
  }`;
};


const formatDate = (value) => {

  if (!value) {
    return "Date unavailable";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return date.toLocaleDateString(
    "en-IN",
    {
      weekday: "short",
      day: "numeric",
      month: "short",
    }
  );
};


const getClassDateTime = (item) => {

  const date =
    item?.class_date ||
    "1970-01-01";

  const time = String(
    item?.start_time ||
    "00:00:00"
  ).slice(0, 8);

  return new Date(
    `${date}T${time}`
  );
};


const getClassStatus = (item) => {

  const status =
    String(
      item?.status || ""
    ).toLowerCase();

  if (
    status === "ongoing" ||
    status === "live"
  ) {
    return "live";
  }

  if (status === "upcoming") {
    return "upcoming";
  }

  const start =
    getClassDateTime(item);

  const end = item?.end_time
    ? new Date(
        `${item.class_date}T${String(
          item.end_time
        ).slice(0, 8)}`
      )
    : new Date(
        start.getTime() +
          60 * 60 * 1000
      );

  const now = new Date();

  if (
    now >= start &&
    now <= end
  ) {
    return "live";
  }

  if (start > now) {
    return "upcoming";
  }

  return "past";
};


function SectionTitle({
  eyebrow,
  title,
  action,
}) {

  return (
    <div
      className="
        mb-3
        flex
        items-end
        justify-between
        gap-4
      "
    >

      <div>

        <p
          className="
            text-[11px]
            font-bold
            uppercase
            tracking-[0.14em]
            text-[#1463FF]
          "
        >
          {eyebrow}
        </p>

        <h2
          className="
            mt-1
            text-lg
            font-extrabold
            tracking-[-0.02em]
            text-[#0B1B3A]
            sm:text-xl
          "
        >
          {title}
        </h2>

      </div>

      {action}

    </div>
  );
}


function Metric({
  icon,
  label,
  value,
  detail,
}) {

  return (
    <motion.div
      whileHover={{
        y: -2,
      }}
      className="
        rounded-2xl
        border
        border-[#E6EDF7]
        bg-white
        p-4
        shadow-[0_5px_22px_rgba(11,27,58,0.05)]
      "
    >

      <div
        className="
          flex
          items-start
          justify-between
          gap-3
        "
      >

        <div>

          <p
            className="
              text-[11px]
              font-semibold
              text-[#64748B]
            "
          >
            {label}
          </p>

          <p
            className="
              mt-1
              text-2xl
              font-black
              tracking-tight
              text-[#0B1B3A]
            "
          >
            {value}
          </p>

          <p
            className="
              mt-1
              text-[11px]
              text-[#64748B]
            "
          >
            {detail}
          </p>

        </div>

        <div
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-[#EAF2FF]
            text-[#1463FF]
          "
        >
          {icon}
        </div>

      </div>

    </motion.div>
  );
}


function LoadingBlock({
  className = "h-24",
}) {

  return (
    <div
      className={`
        animate-pulse
        rounded-2xl
        bg-white
        ${className}
      `}
    />
  );
}


function StudentDashboard() {

  const navigate = useNavigate();

  const user = readUser();

  const studentId =
    user?.id;


  const [stats, setStats] =
    useState(null);

  const [courses, setCourses] =
    useState([]);

  const [liveClasses, setLiveClasses] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [error, setError] =
    useState("");


  const loadDashboard =
    useCallback(
      async (silent = false) => {

        if (!studentId) {

          setLoading(false);

          setError(
            "Student session could not be found. Please sign in again."
          );

          return;
        }


        if (silent) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }


        try {

          setError("");


          const [
            statsResponse,
            coursesResponse,
            classesResponse,
          ] = await Promise.all([
            getDashboardStats(
              studentId
            ),
            getMyCourses(
              studentId
            ),
            getLiveClasses(),
          ]);


          setStats(
            statsResponse?.stats || {}
          );


          setCourses(
            Array.isArray(
              coursesResponse?.courses
            )
              ? coursesResponse.courses
              : []
          );


          setLiveClasses(
            Array.isArray(
              classesResponse?.liveClasses
            )
              ? classesResponse.liveClasses
              : []
          );

        } catch (err) {

          console.error(
            "Student dashboard load error:",
            err
          );

          setError(
            err?.response?.data?.message ||
              "Unable to load the latest dashboard data."
          );

        } finally {

          setLoading(false);
          setRefreshing(false);

        }

      },
      [studentId]
    );


  useEffect(() => {

    loadDashboard();

    const timer =
      window.setInterval(
        () => loadDashboard(true),
        REFRESH_MS
      );

    return () =>
      window.clearInterval(timer);

  }, [loadDashboard]);


  const progress =
    Math.min(
      100,
      Math.max(
        0,
        Number(
          stats?.overallProgress || 0
        )
      )
    );


  const pendingAssignments =
    Math.max(
      0,
      Number(
        stats?.totalAssignments || 0
      ) -
        Number(
          stats?.submittedAssignments || 0
        )
    );


  const courseChart =
    useMemo(
      () =>
        courses
          .slice(0, 6)
          .map((course) => ({
            name: String(
              course.title ||
                "Course"
            ).slice(0, 15),

            progress:
              Math.min(
                100,
                Math.max(
                  0,
                  Number(
                    course.progress || 0
                  )
                )
              ),
          })),
      [courses]
    );


  const activeCourse =
    useMemo(() => {

      const active =
        courses.filter(
          (course) =>
            Number(
              course.progress || 0
            ) < 100
        );


      return [
        ...(active.length
          ? active
          : courses),
      ].sort(
        (a, b) =>
          Number(
            b.progress || 0
          ) -
          Number(
            a.progress || 0
          )
      )[0] || null;

    }, [courses]);


  const nextClasses =
    useMemo(() => {

      return [...liveClasses]
        .filter(
          (item) =>
            getClassStatus(item) !==
            "past"
        )
        .sort(
          (a, b) =>
            getClassDateTime(a) -
            getClassDateTime(b)
        )
        .slice(0, 3);

    }, [liveClasses]);


  const recentActivity =
    useMemo(() => {

      const items = [];


      courses
        .slice(0, 4)
        .forEach((course) => {

          const completed =
            Number(
              course.completedLessons ||
                0
            );


          if (completed > 0) {

            items.push({
              icon: (
                <FaCheckCircle />
              ),
              title: `${completed} lesson${
                completed === 1
                  ? ""
                  : "s"
              } completed`,
              detail:
                course.title ||
                "Course",
            });

          }


          if (course.enrolled_at) {

            items.push({
              icon: (
                <FaBookOpen />
              ),
              title:
                "Course enrolled",
              detail:
                course.title ||
                "Course",
            });

          }

        });


      return items.slice(0, 5);

    }, [courses]);


  if (!studentId) {

    return (
      <main
        className="
          min-h-full
          bg-[#F5F9FF]
          p-5
        "
      >

        <div
          className="
            mx-auto
            max-w-3xl
            rounded-2xl
            border
            border-[#E6EDF7]
            bg-white
            p-8
            text-center
          "
        >

          <h1
            className="
              text-xl
              font-black
              text-[#0B1B3A]
            "
          >
            Student session required
          </h1>

          <p
            className="
              mt-2
              text-sm
              text-[#64748B]
            "
          >
            Please sign in to access
            your learning dashboard.
          </p>

          <button
            onClick={() =>
              navigate("/login")
            }
            className="
              mt-5
              rounded-xl
              bg-[#1463FF]
              px-5
              py-2.5
              text-sm
              font-bold
              text-white
            "
          >
            Sign in
          </button>

        </div>

      </main>
    );
  }


  return (
    <main
      className="
        min-h-full
        bg-[#F5F9FF]
      "
    >

      <div
        className="
          mx-auto
          w-full
          max-w-[1440px]
          px-3
          pb-8
          pt-4
          sm:px-5
          lg:px-6
          lg:pb-10
        "
      >

        {/* ==================================================
            DASHBOARD CONTROLS
        ================================================== */}

        <div
          className="
            mb-4
            flex
            flex-col
            justify-between
            gap-3
            sm:flex-row
            sm:items-center
          "
        >

          <div>

            <p
              className="
                text-xs
                font-semibold
                text-[#64748B]
              "
            >
              Student workspace
            </p>

          </div>


          <div
            className="
              flex
              items-center
              gap-2
            "
          >

            <span
              className="
                inline-flex
                items-center
                gap-1.5
                rounded-full
                border
                border-[#E6EDF7]
                bg-white
                px-3
                py-1.5
                text-[11px]
                font-semibold
                text-[#64748B]
              "
            >

              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-emerald-500
                "
              />

              {refreshing
                ? "Refreshing"
                : "Live data"}

            </span>


            <button
              onClick={() =>
                loadDashboard(true)
              }
              className="
                rounded-xl
                border
                border-[#E6EDF7]
                bg-white
                px-3
                py-1.5
                text-[11px]
                font-bold
                text-[#0B1B3A]
                hover:border-[#1463FF]
                hover:text-[#1463FF]
              "
            >
              Refresh
            </button>

          </div>

        </div>


        {/* ==================================================
            ERROR
        ================================================== */}

        {error && (

          <div
            className="
              mb-4
              rounded-xl
              border
              border-amber-200
              bg-amber-50
              px-4
              py-3
              text-xs
              font-medium
              text-amber-800
            "
          >
            {error}
          </div>

        )}


        {/* ==================================================
            METRICS
        ================================================== */}

        <div
          className="
            grid
            grid-cols-2
            gap-3
            lg:grid-cols-4
          "
        >

          {loading ? (

            [1, 2, 3, 4].map(
              (item) => (
                <LoadingBlock
                  key={item}
                  className="h-[122px]"
                />
              )
            )

          ) : (

            <>

              <Metric
                icon={
                  <FaBookOpen
                    size={14}
                  />
                }
                label="Courses enrolled"
                value={
                  stats?.totalCourses ||
                  0
                }
                detail="Active learning paths"
              />


              <Metric
                icon={
                  <FaCheckCircle
                    size={14}
                  />
                }
                label="Lessons completed"
                value={
                  stats?.completedLessons ||
                  0
                }
                detail={`${stats?.totalLessons || 0} lessons assigned`}
              />


              <Metric
                icon={
                  <FaTasks
                    size={14}
                  />
                }
                label="Pending assignments"
                value={
                  pendingAssignments
                }
                detail={`${stats?.submittedAssignments || 0} submitted`}
              />


              <Metric
                icon={
                  <FaChartLine
                    size={14}
                  />
                }
                label="Overall progress"
                value={`${progress}%`}
                detail="Across enrolled courses"
              />

            </>

          )}

        </div>


        {/* ==================================================
            ANALYTICS + CONTINUE LEARNING
        ================================================== */}

        <div
          className="
            mt-4
            grid
            gap-4
            xl:grid-cols-[minmax(0,1.55fr)_minmax(330px,0.85fr)]
          "
        >

          <section>

            <SectionTitle
              eyebrow="Learning analytics"
              title="Course progress"
              action={
                <button
                  onClick={() =>
                    navigate(
                      "/student/my-courses"
                    )
                  }
                  className="
                    inline-flex
                    items-center
                    gap-1.5
                    text-[11px]
                    font-bold
                    text-[#1463FF]
                  "
                >
                  View courses
                  <FaArrowRight
                    size={9}
                  />
                </button>
              }
            />


            <div
              className="
                rounded-2xl
                border
                border-[#E6EDF7]
                bg-white
                p-4
                shadow-[0_5px_22px_rgba(11,27,58,0.05)]
              "
            >

              {loading ? (

                <LoadingBlock
                  className="h-[250px]"
                />

              ) : courseChart.length ? (

                <div
                  className="
                    h-[250px]
                    w-full
                  "
                >

                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >

                    <BarChart
                      data={
                        courseChart
                      }
                      margin={{
                        top: 8,
                        right: 8,
                        left: -22,
                        bottom: 0,
                      }}
                    >

                      <CartesianGrid
                        stroke="#E6EDF7"
                        vertical={false}
                      />

                      <XAxis
                        dataKey="name"
                        tick={{
                          fontSize: 10,
                          fill: "#64748B",
                        }}
                        axisLine={false}
                        tickLine={false}
                      />

                      <YAxis
                        domain={[
                          0,
                          100,
                        ]}
                        tick={{
                          fontSize: 10,
                          fill: "#64748B",
                        }}
                        axisLine={false}
                        tickLine={false}
                      />

                      <Tooltip
                        formatter={(
                          value
                        ) => [
                          `${value}%`,
                          "Progress",
                        ]}
                        contentStyle={{
                          borderRadius: 12,
                          border:
                            "1px solid #E6EDF7",
                          fontSize: 11,
                        }}
                      />

                      <Bar
                        dataKey="progress"
                        fill="#1463FF"
                        radius={[
                          6,
                          6,
                          0,
                          0,
                        ]}
                        barSize={28}
                      />

                    </BarChart>

                  </ResponsiveContainer>

                </div>

              ) : (

                <div
                  className="
                    flex
                    h-[250px]
                    items-center
                    justify-center
                    text-center
                  "
                >

                  <div>

                    <FaBookOpen
                      className="
                        mx-auto
                        text-[#CBD5E1]
                      "
                      size={25}
                    />

                    <p
                      className="
                        mt-2
                        text-sm
                        font-bold
                        text-[#0B1B3A]
                      "
                    >
                      No enrolled courses yet
                    </p>

                    <p
                      className="
                        mt-1
                        text-xs
                        text-[#64748B]
                      "
                    >
                      Your course analytics
                      will appear here after
                      enrollment.
                    </p>

                  </div>

                </div>

              )}

            </div>

          </section>


          <section>

            <SectionTitle
              eyebrow="Continue learning"
              title="Pick up where you left off"
            />


            <div
              className="
                rounded-2xl
                border
                border-[#E6EDF7]
                bg-[#0B1B3A]
                p-4
                text-white
                shadow-[0_8px_26px_rgba(11,27,58,0.10)]
              "
            >

              {loading ? (

                <div
                  className="
                    h-[250px]
                    animate-pulse
                    rounded-xl
                    bg-white/10
                  "
                />

              ) : activeCourse ? (

                <div
                  className="
                    flex
                    min-h-[250px]
                    flex-col
                    justify-between
                  "
                >

                  <div>

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
                          rounded-full
                          bg-white/10
                          px-2.5
                          py-1
                          text-[10px]
                          font-bold
                          uppercase
                          tracking-wider
                          text-[#8EDCF0]
                        "
                      >
                        Current path
                      </span>

                      <span
                        className="
                          text-sm
                          font-black
                        "
                      >
                        {Number(
                          activeCourse.progress ||
                            0
                        )}
                        %
                      </span>

                    </div>


                    <h3
                      className="
                        mt-5
                        text-xl
                        font-black
                        leading-tight
                      "
                    >
                      {activeCourse.title}
                    </h3>


                    <p
                      className="
                        mt-2
                        text-xs
                        leading-5
                        text-slate-300
                      "
                    >
                      {activeCourse.completedLessons ||
                        0}{" "}
                      of{" "}
                      {activeCourse.totalLessons ||
                        0}{" "}
                      lessons completed.
                    </p>


                    <div
                      className="
                        mt-5
                        h-1.5
                        overflow-hidden
                        rounded-full
                        bg-white/10
                      "
                    >

                      <div
                        className="
                          h-full
                          rounded-full
                          bg-[#06B6D4]
                        "
                        style={{
                          width: `${Math.min(
                            100,
                            Math.max(
                              0,
                              Number(
                                activeCourse.progress ||
                                  0
                              )
                            )
                          )}%`,
                        }}
                      />

                    </div>

                  </div>


                  <button
                    onClick={() =>
                      navigate(
                        `/student/learn/${activeCourse.course_id}`
                      )
                    }
                    className="
                      mt-6
                      inline-flex
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      bg-white
                      px-4
                      py-2.5
                      text-xs
                      font-extrabold
                      text-[#0B1B3A]
                      hover:bg-[#EAF2FF]
                    "
                  >
                    <FaPlay size={9} />
                    Resume learning
                  </button>

                </div>

              ) : (

                <div
                  className="
                    flex
                    min-h-[250px]
                    items-center
                    justify-center
                    text-center
                  "
                >

                  <div>

                    <FaBookOpen
                      className="
                        mx-auto
                        text-white/30
                      "
                      size={25}
                    />

                    <p
                      className="
                        mt-2
                        text-sm
                        font-bold
                      "
                    >
                      Nothing to resume
                    </p>

                    <p
                      className="
                        mt-1
                        text-xs
                        text-slate-400
                      "
                    >
                      Enroll in a program
                      to start learning.
                    </p>

                  </div>

                </div>

              )}

            </div>

          </section>

        </div>


        {/* ==================================================
            LIVE CLASSES + ATTENDANCE
        ================================================== */}

        <div
          className="
            mt-5
            grid
            gap-4
            lg:grid-cols-[minmax(0,1.25fr)_minmax(330px,0.75fr)]
          "
        >

          <section>

            <SectionTitle
              eyebrow="Live learning"
              title="Resume live classes"
              action={
                <button
                  onClick={() =>
                    navigate(
                      "/student/live-classes"
                    )
                  }
                  className="
                    inline-flex
                    items-center
                    gap-1.5
                    text-[11px]
                    font-bold
                    text-[#1463FF]
                  "
                >
                  All classes
                  <FaArrowRight
                    size={9}
                  />
                </button>
              }
            />


            <div
              className="
                overflow-hidden
                rounded-2xl
                border
                border-[#E6EDF7]
                bg-white
                shadow-[0_5px_22px_rgba(11,27,58,0.05)]
              "
            >

              {loading ? (

                [1, 2, 3].map(
                  (item) => (
                    <LoadingBlock
                      key={item}
                      className="
                        m-3
                        h-16
                      "
                    />
                  )
                )

              ) : nextClasses.length ? (

                nextClasses.map(
                  (item) => {

                    const status =
                      getClassStatus(
                        item
                      );


                    return (
                      <div
                        key={item.id}
                        className="
                          flex
                          flex-col
                          gap-3
                          border-b
                          border-[#E6EDF7]
                          p-4
                          last:border-b-0
                          sm:flex-row
                          sm:items-center
                          sm:justify-between
                        "
                      >

                        <div
                          className="
                            flex
                            min-w-0
                            items-center
                            gap-3
                          "
                        >

                          <div
                            className={`
                              flex
                              h-9
                              w-9
                              shrink-0
                              items-center
                              justify-center
                              rounded-xl
                              ${
                                status ===
                                "live"
                                  ? "bg-red-50 text-red-500"
                                  : "bg-[#EAF2FF] text-[#1463FF]"
                              }
                            `}
                          >
                            <FaVideo
                              size={13}
                            />
                          </div>


                          <div
                            className="
                              min-w-0
                            "
                          >

                            <div
                              className="
                                flex
                                items-center
                                gap-2
                              "
                            >

                              <h3
                                className="
                                  truncate
                                  text-sm
                                  font-bold
                                  text-[#0B1B3A]
                                "
                              >
                                {item.title ||
                                  "Live class"}
                              </h3>


                              {status ===
                                "live" && (

                                <span
                                  className="
                                    rounded-full
                                    bg-red-50
                                    px-1.5
                                    py-0.5
                                    text-[9px]
                                    font-bold
                                    uppercase
                                    text-red-500
                                  "
                                >
                                  Live
                                </span>

                              )}

                            </div>


                            <p
                              className="
                                mt-1
                                text-[11px]
                                text-[#64748B]
                              "
                            >
                              {formatDate(
                                item.class_date
                              )}{" "}
                              ·{" "}
                              {formatTime(
                                item.start_time
                              )}{" "}
                              ·{" "}
                              {item.batch_name ||
                                "Your batch"}
                            </p>

                          </div>

                        </div>


                        <button
                          onClick={() =>
                            item.zoom_link &&
                            window.open(
                              item.zoom_link,
                              "_blank",
                              "noopener,noreferrer"
                            )
                          }
                          disabled={
                            !item.zoom_link
                          }
                          className="
                            inline-flex
                            shrink-0
                            items-center
                            justify-center
                            gap-2
                            rounded-lg
                            border
                            border-[#E6EDF7]
                            px-3
                            py-2
                            text-[11px]
                            font-bold
                            text-[#0B1B3A]
                            hover:border-[#1463FF]
                            hover:text-[#1463FF]
                            disabled:cursor-not-allowed
                            disabled:opacity-40
                          "
                        >

                          {status ===
                          "live" ? (
                            <FaWifi
                              size={10}
                            />
                          ) : (
                            <FaClock
                              size={10}
                            />
                          )}

                          {status ===
                          "live"
                            ? "Join now"
                            : "Open class"}

                        </button>

                      </div>
                    );

                  }
                )

              ) : (

                <div
                  className="
                    px-5
                    py-10
                    text-center
                  "
                >

                  <FaVideo
                    className="
                      mx-auto
                      text-[#CBD5E1]
                    "
                    size={23}
                  />

                  <p
                    className="
                      mt-2
                      text-sm
                      font-bold
                      text-[#0B1B3A]
                    "
                  >
                    No scheduled live classes
                  </p>

                  <p
                    className="
                      mt-1
                      text-xs
                      text-[#64748B]
                    "
                  >
                    When your batch has a
                    class, it will appear here
                    automatically.
                  </p>

                </div>

              )}

            </div>

          </section>


          <section>

            <SectionTitle
              eyebrow="Attendance"
              title="Attendance overview"
            />


            <div
              className="
                rounded-2xl
                border
                border-[#E6EDF7]
                bg-white
                p-4
                shadow-[0_5px_22px_rgba(11,27,58,0.05)]
              "
            >

              <div
                className="
                  flex
                  items-start
                  gap-3
                "
              >

                <div
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#EAF2FF]
                    text-[#1463FF]
                  "
                >
                  <FaCalendarCheck
                    size={14}
                  />
                </div>


                <div>

                  <p
                    className="
                      text-sm
                      font-bold
                      text-[#0B1B3A]
                    "
                  >
                    Attendance records
                  </p>

                  <p
                    className="
                      mt-1
                      text-xs
                      leading-5
                      text-[#64748B]
                    "
                  >
                    Attendance is not yet
                    exposed by the current
                    backend API, so no
                    percentage or session
                    count is fabricated here.
                  </p>

                </div>

              </div>


              <div
                className="
                  mt-4
                  rounded-xl
                  border
                  border-dashed
                  border-[#D9E2EF]
                  bg-[#F8FBFF]
                  px-3
                  py-2.5
                  text-[11px]
                  font-semibold
                  text-[#64748B]
                "
              >
                Ready for real attendance
                integration once session
                attendance data is available.
              </div>

            </div>

          </section>

        </div>


        {/* ==================================================
            ACTIVITY + QUICK ACTIONS
        ================================================== */}

        <div
          className="
            mt-5
            grid
            gap-4
            lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.7fr)]
          "
        >

          <section>

            <SectionTitle
              eyebrow="Activity"
              title="Recent learning activity"
            />


            <div
              className="
                rounded-2xl
                border
                border-[#E6EDF7]
                bg-white
                shadow-[0_5px_22px_rgba(11,27,58,0.05)]
              "
            >

              {recentActivity.length
                ? recentActivity.map(
                    (
                      activity,
                      index
                    ) => (

                      <div
                        key={`${activity.title}-${index}`}
                        className="
                          flex
                          items-center
                          gap-3
                          border-b
                          border-[#E6EDF7]
                          px-4
                          py-3
                          last:border-b-0
                        "
                      >

                        <div
                          className="
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-lg
                            bg-[#EAF2FF]
                            text-[#1463FF]
                          "
                        >
                          {activity.icon}
                        </div>


                        <div
                          className="
                            min-w-0
                          "
                        >

                          <p
                            className="
                              text-xs
                              font-bold
                              text-[#0B1B3A]
                            "
                          >
                            {activity.title}
                          </p>

                          <p
                            className="
                              mt-0.5
                              truncate
                              text-[11px]
                              text-[#64748B]
                            "
                          >
                            {activity.detail}
                          </p>

                        </div>

                      </div>

                    )
                  )
                : (

                  <div
                    className="
                      px-4
                      py-9
                      text-center
                      text-xs
                      text-[#64748B]
                    "
                  >
                    Your learning activity
                    will appear here as you
                    progress.
                  </div>

                )}

            </div>

          </section>


          <section>

            <SectionTitle
              eyebrow="Workspace"
              title="Quick actions"
            />


            <div
              className="
                grid
                grid-cols-2
                gap-2
              "
            >

              {[
                {
                  label: "My Courses",
                  icon: (
                    <FaBookOpen />
                  ),
                  path:
                    "/student/my-courses",
                },
                {
                  label: "Assignments",
                  icon: (
                    <FaTasks />
                  ),
                  path:
                    "/student/assignments",
                },
                {
                  label: "Live Classes",
                  icon: (
                    <FaVideo />
                  ),
                  path:
                    "/student/live-classes",
                },
                {
                  label: "Calendar",
                  icon: (
                    <FaCalendarCheck />
                  ),
                  path:
                    "/student/calendar",
                },
              ].map((item) => (

                <button
                  key={item.label}
                  onClick={() =>
                    navigate(
                      item.path
                    )
                  }
                  className="
                    group
                    rounded-2xl
                    border
                    border-[#E6EDF7]
                    bg-white
                    p-4
                    text-left
                    shadow-[0_5px_22px_rgba(11,27,58,0.04)]
                    transition
                    hover:-translate-y-0.5
                    hover:border-[#BFD3F7]
                  "
                >

                  <span
                    className="
                      text-[#1463FF]
                    "
                  >
                    {item.icon}
                  </span>

                  <span
                    className="
                      mt-3
                      block
                      text-xs
                      font-extrabold
                      text-[#0B1B3A]
                    "
                  >
                    {item.label}
                  </span>

                  <span
                    className="
                      mt-1
                      inline-flex
                      items-center
                      gap-1
                      text-[10px]
                      font-semibold
                      text-[#64748B]
                      group-hover:text-[#1463FF]
                    "
                  >
                    Open
                    <FaArrowRight
                      size={8}
                    />
                  </span>

                </button>

              ))}

            </div>

          </section>

        </div>

      </div>

    </main>
  );
}


export default StudentDashboard;