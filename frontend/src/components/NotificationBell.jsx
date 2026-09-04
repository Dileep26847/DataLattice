import {
  useEffect,
  useState,
} from "react";

import {
  FaBell,
} from "react-icons/fa";

import {
  getUnreadNotificationCount,
} from "../services/notificationService";

import NotificationPanel from "./NotificationPanel";


// ==========================================
// NOTIFICATION BELL
// ==========================================

function NotificationBell() {

  // ==========================================
  // STATE
  // ==========================================

  const [isOpen, setIsOpen] =
    useState(false);

  const [unreadCount, setUnreadCount] =
    useState(0);


  // ==========================================
  // LOAD UNREAD COUNT
  // ==========================================

  const loadUnreadCount =
    async () => {

      try {

        const data =
          await getUnreadNotificationCount();


        const count =
          Number(
            data?.unreadCount || 0
          );


        setUnreadCount(
          Math.max(
            0,
            count
          )
        );

      } catch (error) {

        console.error(
          "NOTIFICATION COUNT ERROR:",
          error
        );

      }

    };


  // ==========================================
  // INITIAL LOAD
  // ==========================================

  useEffect(() => {

    loadUnreadCount();


    // Refresh unread count
    // every 30 seconds

    const interval =
      setInterval(() => {

        loadUnreadCount();

      }, 30000);


    // Cleanup

    return () => {

      clearInterval(interval);

    };

  }, []);


  // ==========================================
  // TOGGLE NOTIFICATION PANEL
  // ==========================================

  const handleToggle = () => {

    setIsOpen(
      (previous) =>
        !previous
    );

  };


  // ==========================================
  // CLOSE NOTIFICATION PANEL
  // ==========================================

  const handleClose = () => {

    setIsOpen(false);

  };


  // ==========================================
  // UPDATE UNREAD COUNT
  // ==========================================

  const handleNotificationUpdate =
    (value) => {

      // ========================================
      // CALLBACK UPDATE
      // ========================================

      if (
        typeof value === "function"
      ) {

        setUnreadCount(
          (previous) =>
            Math.max(
              0,
              Number(
                value(previous)
              ) || 0
            )
        );

        return;

      }


      // ========================================
      // DIRECT VALUE UPDATE
      // ========================================

      setUnreadCount(
        Math.max(
          0,
          Number(value) || 0
        )
      );

    };


  // ==========================================
  // RENDER
  // ==========================================

  return (

    <div
      className="
        relative
        inline-flex
        shrink-0
      "
      style={{
        zIndex: 999999,
      }}
    >

      {/* ======================================
          NOTIFICATION BUTTON
      ====================================== */}

      <button
        type="button"
        onClick={handleToggle}
        aria-label="Notifications"
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="
          relative
          w-14
          h-14
          rounded-2xl
          bg-slate-100
          hover:bg-slate-200
          text-slate-600
          hover:text-cyan-600
          transition
          duration-200
          flex
          items-center
          justify-center
          cursor-pointer
          border
          border-slate-200
          focus:outline-none
          focus:ring-2
          focus:ring-cyan-500
          focus:ring-offset-2
        "
      >

        {/* ====================================
            BELL ICON
        ==================================== */}

        <FaBell
          className="
            text-xl
          "
        />


        {/* ====================================
            UNREAD BADGE
        ==================================== */}

        {unreadCount > 0 && (

          <span
            className="
              absolute
              -top-1
              -right-1
              min-w-6
              h-6
              px-1
              rounded-full
              bg-red-500
              text-white
              text-xs
              font-bold
              flex
              items-center
              justify-center
              border-2
              border-white
            "
          >

            {unreadCount > 99
              ? "99+"
              : unreadCount}

          </span>

        )}

      </button>


      {/* ======================================
          NOTIFICATION PANEL
      ====================================== */}

      <NotificationPanel

        isOpen={isOpen}

        onClose={handleClose}

        onNotificationUpdate={
          handleNotificationUpdate
        }

      />

    </div>

  );

}


// ==========================================
// EXPORT
// ==========================================

export default NotificationBell;