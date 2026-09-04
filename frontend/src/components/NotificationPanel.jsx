import { useEffect, useState } from "react";

import {
  FaBell,
  FaCheck,
  FaTrash,
  FaClock,
  FaTimes,
} from "react-icons/fa";

import toast from "react-hot-toast";

import {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
} from "../services/notificationService";


// ==========================================
// NOTIFICATION PANEL
// ==========================================

function NotificationPanel({
  isOpen,
  onClose,
  onNotificationUpdate,
}) {

  // ==========================================
  // STATE
  // ==========================================

  const [notifications, setNotifications] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [processingId, setProcessingId] =
    useState(null);


  // ==========================================
  // LOAD WHEN OPENED
  // ==========================================

  useEffect(() => {

    if (!isOpen) {
      return;
    }

    loadNotifications();

  }, [isOpen]);


  // ==========================================
  // LOAD NOTIFICATIONS
  // ==========================================

  const loadNotifications = async () => {

    try {

      setLoading(true);

      const data =
        await getNotifications();

      setNotifications(
        data?.notifications || []
      );

      if (onNotificationUpdate) {

        onNotificationUpdate(
          Number(
            data?.unreadCount || 0
          )
        );

      }

    } catch (error) {

      console.error(
        "NOTIFICATION LOAD ERROR:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
        "Failed to load notifications."
      );

    } finally {

      setLoading(false);

    }

  };


  // ==========================================
  // MARK ONE AS READ
  // ==========================================

  const handleMarkAsRead = async (
    notification
  ) => {

    if (notification.is_read) {
      return;
    }

    try {

      setProcessingId(
        notification.id
      );

      await markNotificationAsRead(
        notification.id
      );

      setNotifications(
        (previous) =>
          previous.map(
            (item) =>
              item.id === notification.id
                ? {
                    ...item,
                    is_read: 1,
                  }
                : item
          )
      );

      if (onNotificationUpdate) {

        onNotificationUpdate(
          (previous) =>
            Math.max(
              0,
              Number(previous) - 1
            )
        );

      }

    } catch (error) {

      console.error(
        "MARK NOTIFICATION ERROR:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
        "Failed to mark notification as read."
      );

    } finally {

      setProcessingId(null);

    }

  };


  // ==========================================
  // MARK ALL AS READ
  // ==========================================

  const handleMarkAllAsRead =
    async () => {

      try {

        setProcessingId("all");

        await markAllNotificationsAsRead();

        setNotifications(
          (previous) =>
            previous.map(
              (item) => ({
                ...item,
                is_read: 1,
              })
            )
        );

        if (onNotificationUpdate) {

          onNotificationUpdate(0);

        }

        toast.success(
          "All notifications marked as read."
        );

      } catch (error) {

        console.error(
          "MARK ALL READ ERROR:",
          error
        );

        toast.error(
          error?.response?.data?.message ||
          "Failed to mark notifications as read."
        );

      } finally {

        setProcessingId(null);

      }

    };


  // ==========================================
  // DELETE NOTIFICATION
  // ==========================================

  const handleDelete = async (
    notificationId
  ) => {

    try {

      setProcessingId(
        notificationId
      );

      const notification =
        notifications.find(
          (item) =>
            item.id === notificationId
        );

      await deleteNotification(
        notificationId
      );

      setNotifications(
        (previous) =>
          previous.filter(
            (item) =>
              item.id !== notificationId
          )
      );

      if (
        notification &&
        !notification.is_read &&
        onNotificationUpdate
      ) {

        onNotificationUpdate(
          (previous) =>
            Math.max(
              0,
              Number(previous) - 1
            )
        );

      }

      toast.success(
        "Notification deleted."
      );

    } catch (error) {

      console.error(
        "DELETE NOTIFICATION ERROR:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
        "Failed to delete notification."
      );

    } finally {

      setProcessingId(null);

    }

  };


  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatDate = (
    date
  ) => {

    if (!date) {
      return "";
    }

    const notificationDate =
      new Date(date);

    if (
      Number.isNaN(
        notificationDate.getTime()
      )
    ) {

      return "";

    }

    return notificationDate.toLocaleString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      }
    );

  };


  // ==========================================
  // TYPE STYLE
  // ==========================================

  const getTypeStyle = (
    type
  ) => {

    switch (type) {

      case "assignment":
        return "bg-purple-100 text-purple-600";

      case "live_class":
        return "bg-red-100 text-red-600";

      case "course":
        return "bg-blue-100 text-blue-600";

      case "certificate":
        return "bg-green-100 text-green-600";

      case "support":
        return "bg-orange-100 text-orange-600";

      default:
        return "bg-cyan-100 text-cyan-600";

    }

  };


  // ==========================================
  // DON'T RENDER WHEN CLOSED
  // ==========================================

  if (!isOpen) {

    return null;

  }


  // ==========================================
  // RENDER
  // ==========================================

  return (

    <div
      className="
        absolute
        right-0
        top-[calc(100%+12px)]
        z-[9999]
        w-[calc(100vw-2rem)]
        max-w-[430px]
        sm:w-[430px]
      "
    >

      {/* ======================================
          PANEL
      ====================================== */}

      <div
        className="
          bg-white
          rounded-2xl
          shadow-2xl
          border
          border-slate-200
          overflow-hidden
        "
      >

        {/* ======================================
            HEADER
        ====================================== */}

        <div
          className="
            flex
            items-center
            justify-between
            px-5
            py-4
            border-b
            border-slate-200
          "
        >

          <div
            className="
              flex
              items-center
              gap-3
            "
          >

            <div
              className="
                w-10
                h-10
                rounded-xl
                bg-cyan-100
                text-cyan-600
                flex
                items-center
                justify-center
              "
            >

              <FaBell />

            </div>

            <div>

              <h2
                className="
                  font-bold
                  text-slate-800
                "
              >
                Notifications
              </h2>

              <p
                className="
                  text-xs
                  text-slate-400
                "
              >
                Stay updated with Data Lattice
              </p>

            </div>

          </div>


          {/* ====================================
              HEADER ACTIONS
          ==================================== */}

          <div
            className="
              flex
              items-center
              gap-2
            "
          >

            {notifications.some(
              (item) =>
                !item.is_read
            ) && (

              <button
                type="button"
                onClick={
                  handleMarkAllAsRead
                }
                disabled={
                  processingId === "all"
                }
                className="
                  hidden
                  sm:block
                  text-xs
                  font-semibold
                  text-cyan-600
                  hover:text-cyan-700
                  disabled:opacity-50
                "
              >

                {processingId === "all"
                  ? "Updating..."
                  : "Mark all read"}

              </button>

            )}


            <button
              type="button"
              onClick={onClose}
              aria-label="Close notifications"
              className="
                w-9
                h-9
                rounded-xl
                flex
                items-center
                justify-center
                text-slate-400
                hover:bg-slate-100
                hover:text-slate-700
                transition
              "
            >

              <FaTimes />

            </button>

          </div>

        </div>


        {/* ======================================
            MOBILE MARK ALL
        ====================================== */}

        {notifications.some(
          (item) =>
            !item.is_read
        ) && (

          <div
            className="
              sm:hidden
              px-5
              py-3
              border-b
              border-slate-100
              bg-slate-50
            "
          >

            <button
              type="button"
              onClick={
                handleMarkAllAsRead
              }
              disabled={
                processingId === "all"
              }
              className="
                text-sm
                font-semibold
                text-cyan-600
                disabled:opacity-50
              "
            >

              {processingId === "all"
                ? "Updating..."
                : "Mark all as read"}

            </button>

          </div>

        )}


        {/* ======================================
            CONTENT
        ====================================== */}

        <div
          className="
            max-h-[520px]
            overflow-y-auto
          "
        >

          {/* ====================================
              LOADING
          ==================================== */}

          {loading ? (

            <div
              className="
                py-16
                flex
                flex-col
                items-center
                justify-center
              "
            >

              <div
                className="
                  w-8
                  h-8
                  border-4
                  border-slate-200
                  border-t-cyan-500
                  rounded-full
                  animate-spin
                "
              />

              <p
                className="
                  text-sm
                  text-slate-400
                  mt-4
                "
              >
                Loading notifications...
              </p>

            </div>

          ) : notifications.length === 0 ? (

            /* ==================================
               EMPTY
            ================================== */

            <div
              className="
                py-16
                px-6
                text-center
              "
            >

              <div
                className="
                  w-16
                  h-16
                  mx-auto
                  rounded-2xl
                  bg-slate-100
                  text-slate-400
                  flex
                  items-center
                  justify-center
                "
              >

                <FaBell
                  className="text-2xl"
                />

              </div>

              <h3
                className="
                  mt-5
                  font-bold
                  text-slate-700
                "
              >
                No notifications
              </h3>

              <p
                className="
                  text-sm
                  text-slate-400
                  mt-2
                "
              >
                You're all caught up.
              </p>

            </div>

          ) : (

            /* ==================================
               NOTIFICATION LIST
            ================================== */

            <div>

              {notifications.map(
                (notification) => (

                  <div
                    key={
                      notification.id
                    }
                    className={`
                      group
                      relative
                      px-5
                      py-4
                      border-b
                      border-slate-100
                      transition
                      hover:bg-slate-50
                      ${
                        notification.is_read
                          ? "bg-white"
                          : "bg-cyan-50/50"
                      }
                    `}
                  >

                    <div
                      className="
                        flex
                        gap-3
                      "
                    >

                      {/* =================================
                          TYPE ICON
                      ================================= */}

                      <div
                        className={`
                          w-10
                          h-10
                          shrink-0
                          rounded-xl
                          flex
                          items-center
                          justify-center
                          ${getTypeStyle(
                            notification.type
                          )}
                        `}
                      >

                        <FaBell />

                      </div>


                      {/* =================================
                          NOTIFICATION CONTENT
                      ================================= */}

                      <div
                        className="
                          min-w-0
                          flex-1
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

                          <h3
                            className={`
                              text-sm
                              leading-5
                              ${
                                notification.is_read
                                  ? "font-semibold text-slate-700"
                                  : "font-bold text-slate-900"
                              }
                            `}
                          >

                            {notification.title}

                          </h3>


                          {!notification.is_read && (

                            <span
                              className="
                                w-2
                                h-2
                                mt-1.5
                                shrink-0
                                rounded-full
                                bg-cyan-500
                              "
                            />

                          )}

                        </div>


                        <p
                          className="
                            text-sm
                            text-slate-500
                            leading-5
                            mt-1
                            break-words
                          "
                        >

                          {notification.message}

                        </p>


                        {/* =============================
                            FOOTER
                        ============================= */}

                        <div
                          className="
                            flex
                            items-center
                            justify-between
                            gap-3
                            mt-3
                          "
                        >

                          <span
                            className="
                              flex
                              items-center
                              gap-1.5
                              text-xs
                              text-slate-400
                            "
                          >

                            <FaClock />

                            {formatDate(
                              notification.created_at
                            )}

                          </span>


                          {/* ============================
                              ACTIONS
                          ============================ */}

                          <div
                            className="
                              flex
                              items-center
                              gap-2
                            "
                          >

                            {!notification.is_read && (

                              <button
                                type="button"
                                onClick={() =>
                                  handleMarkAsRead(
                                    notification
                                  )
                                }
                                disabled={
                                  processingId ===
                                  notification.id
                                }
                                title="Mark as read"
                                className="
                                  w-8
                                  h-8
                                  rounded-lg
                                  flex
                                  items-center
                                  justify-center
                                  text-cyan-600
                                  hover:bg-cyan-100
                                  disabled:opacity-50
                                  transition
                                "
                              >

                                <FaCheck />

                              </button>

                            )}


                            <button
                              type="button"
                              onClick={() =>
                                handleDelete(
                                  notification.id
                                )
                              }
                              disabled={
                                processingId ===
                                notification.id
                              }
                              title="Delete notification"
                              className="
                                w-8
                                h-8
                                rounded-lg
                                flex
                                items-center
                                justify-center
                                text-red-500
                                hover:bg-red-100
                                disabled:opacity-50
                                transition
                              "
                            >

                              <FaTrash />

                            </button>

                          </div>

                        </div>

                      </div>

                    </div>

                  </div>

                )
              )}

            </div>

          )}

        </div>

      </div>

    </div>

  );

}


// ==========================================
// EXPORT
// ==========================================

export default NotificationPanel;