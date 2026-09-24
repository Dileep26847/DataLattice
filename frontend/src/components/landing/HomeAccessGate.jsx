import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
} from "framer-motion";
import {
  FaXmark,
  FaLock,
} from "react-icons/fa6";

import HeroSignupCard from "./HeroSignupCard";

/* =========================================================
   CONSTANTS
   ========================================================= */

const VERIFICATION_STORAGE_KEY =
  "datalattice_demo_verification";

const OPEN_GATE_EVENT =
  "datalattice:open-signup-gate";

const DEMO_VERIFIED_EVENT =
  "datalattice:demo-verified";

/* =========================================================
   CHECK DEMO VERIFICATION
   ========================================================= */

export function isDemoVerified() {
  try {
    const stored =
      sessionStorage.getItem(
        VERIFICATION_STORAGE_KEY
      );

    if (!stored) {
      return false;
    }

    const verification =
      JSON.parse(stored);

    return verification?.verified === true;
  } catch (error) {
    console.error(
      "DATALATTICE DEMO VERIFICATION CHECK ERROR:",
      error
    );

    return false;
  }
}

/* =========================================================
   OPEN HOME SIGNUP GATE
   ========================================================= */

export function openHomeSignupGate() {
  if (
    typeof window === "undefined"
  ) {
    return;
  }

  window.dispatchEvent(
    new CustomEvent(
      OPEN_GATE_EVENT
    )
  );
}

/* =========================================================
   PROTECT HOMEPAGE ACTION
   ========================================================= */

export function requireHomeDemoAccess(
  callback
) {
  return (event) => {
    if (event?.preventDefault) {
      event.preventDefault();
    }

    if (event?.stopPropagation) {
      event.stopPropagation();
    }

    if (isDemoVerified()) {
      if (
        typeof callback === "function"
      ) {
        callback(event);
      }

      return;
    }

    openHomeSignupGate();
  };
}

/* =========================================================
   HOME ACCESS GATE
   ========================================================= */

function HomeAccessGate({
  children,
}) {
  const [open, setOpen] =
    useState(false);

  /* =======================================================
     OPEN GATE EVENT
  ======================================================= */

  useEffect(() => {
    const handleOpenGate = () => {
      if (isDemoVerified()) {
        return;
      }

      setOpen(true);
    };

    window.addEventListener(
      OPEN_GATE_EVENT,
      handleOpenGate
    );

    return () => {
      window.removeEventListener(
        OPEN_GATE_EVENT,
        handleOpenGate
      );
    };
  }, []);

  /* =======================================================
     VERIFIED EVENT
  ======================================================= */

  useEffect(() => {
    const handleDemoVerified = () => {
      if (!isDemoVerified()) {
        return;
      }

      setOpen(false);
    };

    window.addEventListener(
      DEMO_VERIFIED_EVENT,
      handleDemoVerified
    );

    return () => {
      window.removeEventListener(
        DEMO_VERIFIED_EVENT,
        handleDemoVerified
      );
    };
  }, []);

  /* =======================================================
     BODY SCROLL LOCK
  ======================================================= */

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return undefined;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    const handleEscape = (
      event
    ) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [open]);

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <>
      {children}

      <AnimatePresence>
        {open && (
          <motion.div
            className="
              fixed
              inset-0
              z-[10000]
              flex
              items-start
              justify-center
              overflow-y-auto
              overscroll-contain
              bg-[#0B1B3A]/60
              px-3
              py-5
              backdrop-blur-md
              sm:items-center
              sm:px-6
              sm:py-8
            "
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.22,
              ease: "easeOut",
            }}
            onMouseDown={(event) => {
              if (
                event.target ===
                event.currentTarget
              ) {
                setOpen(false);
              }
            }}
          >
            <motion.div
              initial={{
                opacity: 0,
                y: 28,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 18,
                scale: 0.97,
              }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
              }}
              className="
                relative
                flex
                w-full
                max-w-[460px]
                shrink-0
                flex-col
                items-center
              "
              onMouseDown={(event) =>
                event.stopPropagation()
              }
            >
              {/* =================================================
                  CLOSE
              ================================================= */}

              <button
                type="button"
                aria-label="Close signup"
                onClick={() =>
                  setOpen(false)
                }
                className="
                  absolute
                  -right-1
                  -top-2
                  z-30
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/20
                  bg-[#0B1B3A]
                  text-white
                  shadow-lg
                  transition-all
                  duration-200
                  hover:scale-105
                  hover:bg-[#1463FF]
                  sm:-right-3
                  sm:-top-3
                "
              >
                <FaXmark size={14} />
              </button>

              {/* =================================================
                  LABEL
              ================================================= */}

              <div
                className="
                  mb-3
                  inline-flex
                  shrink-0
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-white/30
                  bg-white
                  px-3.5
                  py-2
                  shadow-[0_10px_30px_rgba(11,27,58,0.16)]
                "
              >
                <FaLock
                  size={10}
                  className="text-[#1463FF]"
                />

                <span
                  className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.12em]
                    text-[#0B1B3A]
                  "
                >
                  Free Demo Access
                </span>
              </div>

              {/* =================================================
                  SIGNUP CARD
              ================================================= */}

              <div className="w-full">
                <HeroSignupCard />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default HomeAccessGate;