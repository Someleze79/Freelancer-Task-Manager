// ======================================================
// RESPONSIVE SIDEBAR + MOBILE DRAWER
// ======================================================

import { useState } from "react";

// ======================================================
// ROUTER
// ======================================================

import { useNavigate } from "react-router-dom";

// ======================================================
// TOASTS
// ======================================================

import toast from "react-hot-toast";

// ======================================================
// ICONS
// ======================================================

import {
  LayoutDashboard,
  FolderKanban,
  Bell,
  LogOut,
  Sparkles,
  Menu,
  X,
  BrainCircuit
} from "lucide-react";

// ======================================================
// FRAMER MOTION
// ======================================================

import {
  motion,
  AnimatePresence
} from "framer-motion";

export default function Sidebar({
  logout,
  onNotificationsClick
}) {

  // ======================================================
  // STATE
  // ======================================================

  const [open, setOpen] =
    useState(false);

  const navigate = useNavigate();

  // ======================================================
  // SCROLL TO SECTION
  // ======================================================

  const scrollToSection = (id) => {

    const element =
      document.getElementById(id);

    if (element) {

      element.scrollIntoView({
        behavior: "smooth"
      });

      setOpen(false);

    } else {

      toast.error(
        "Section not found"
      );
    }
  };

  // ======================================================
  // AI SUGGESTIONS
  // ======================================================

  const handleAISuggestions = () => {

    toast.success(
      "AI Suggestions feature coming soon"
    );

    setOpen(false);
  };

  // ======================================================
  // LOGOUT
  // ======================================================

  const handleLogout = () => {

    logout();

    navigate("/");

    toast.success(
      "Logged out successfully"
    );

    setOpen(false);
  };

  // ======================================================
  // NAV BUTTON STYLE
  // ======================================================

  const navButton = `
    relative
    overflow-hidden

    flex
    items-center
    gap-4

    w-full

    px-5
    py-4

    rounded-2xl

    transition-all
    duration-300

    hover:bg-slate-800
    hover:shadow-lg
    hover:shadow-purple-500/10

    border
    border-transparent

    hover:border-purple-500/20
  `;

  // ======================================================
  // SIDEBAR CONTENT
  // ======================================================

  const SidebarContent = () => (

    <>
      {/* ======================================================
          BACKGROUND GLOW
      ====================================================== */}

      <div className="
        absolute
        top-0
        left-0
        w-full
        h-72
        bg-purple-500/10
        blur-3xl
        pointer-events-none
      " />

      {/* ======================================================
          TOP SECTION
      ====================================================== */}

      <div className="relative z-10">

        {/* ======================================================
            LOGO
        ====================================================== */}

        <motion.div

          initial={{
            opacity: 0,
            y: -10
          }}

          animate={{
            opacity: 1,
            y: 0
          }}

          transition={{
            delay: 0.2
          }}

          className="
            flex
            items-center
            gap-3
            mb-14
          "
        >

          <motion.div

            animate={{
              rotate: [0, 8, -8, 0]
            }}

            transition={{
              repeat: Infinity,
              duration: 4
            }}

            className="
              w-12
              h-12
              rounded-2xl

              bg-gradient-to-br
              from-purple-500
              to-pink-500

              flex
              items-center
              justify-center

              shadow-lg
              shadow-purple-500/30
            "
          >

            <Sparkles className="
              w-6
              h-6
              text-white
            " />

          </motion.div>

          <div>

            <h1 className="
              text-3xl
              font-black
              tracking-tight
            ">

              <span className="
                text-purple-500
              ">
                Freelancer
              </span>

              {" "}Pro

            </h1>

            <p className="
              text-sm
              text-gray-500
              mt-1
            ">

              Productivity Platform

            </p>

          </div>

        </motion.div>

        {/* ======================================================
            NAVIGATION
        ====================================================== */}

        <nav className="space-y-4">

          {/* DASHBOARD */}

          <motion.button

            onClick={() => {

              navigate("/dashboard");

              window.scrollTo({
                top: 0,
                behavior: "smooth"
              });

              setOpen(false);
            }}

            whileHover={{
              scale: 1.03,
              x: 4
            }}

            whileTap={{
              scale: 0.97
            }}

            className={`
              ${navButton}
              bg-slate-800
              border-purple-500/20
            `}
          >

            <div className="
              absolute
              inset-0
              bg-gradient-to-r
              from-purple-500/10
              to-pink-500/10
            " />

            <motion.div

              animate={{
                y: [0, -2, 0]
              }}

              transition={{
                repeat: Infinity,
                duration: 2
              }}

              className="relative z-10"
            >

              <LayoutDashboard className="
                text-purple-400
                w-5
                h-5
              " />

            </motion.div>

            <span className="
              relative
              z-10
              font-medium
            ">

              Dashboard

            </span>

          </motion.button>

          {/* PROJECTS */}

          <motion.button

            onClick={() =>
              scrollToSection(
                "projects-section"
              )
            }

            whileHover={{
              scale: 1.03,
              x: 4
            }}

            whileTap={{
              scale: 0.97
            }}

            className={navButton}
          >

            <FolderKanban className="
              text-blue-400
              w-5
              h-5
            " />

            <span className="
              font-medium
            ">

              Projects

            </span>

          </motion.button>

          {/* AI SUGGESTIONS */}

          <motion.button

            onClick={
              handleAISuggestions
            }

            whileHover={{
              scale: 1.03,
              x: 4
            }}

            whileTap={{
              scale: 0.97
            }}

            className={navButton}
          >

            <motion.div

              animate={{
                rotate: [0, 8, -8, 0]
              }}

              transition={{
                repeat: Infinity,
                duration: 3
              }}
            >

              <BrainCircuit className="
                text-cyan-400
                w-5
                h-5
              " />

            </motion.div>

            <span className="
              font-medium
            ">

              AI Suggestions

            </span>

          </motion.button>

          {/* NOTIFICATIONS */}

          <motion.button

            onClick={() => {

              if (
                onNotificationsClick
              ) {

                onNotificationsClick();
              }

              setOpen(false);
            }}

            whileHover={{
              scale: 1.03,
              x: 4
            }}

            whileTap={{
              scale: 0.97
            }}

            className={navButton}
          >

            <motion.div

              animate={{
                rotate: [0, 10, -10, 0]
              }}

              transition={{
                repeat: Infinity,
                duration: 2.5
              }}
            >

              <Bell className="
                text-yellow-400
                w-5
                h-5
              " />

            </motion.div>

            <span className="
              font-medium
            ">

              Notifications

            </span>

          </motion.button>

        </nav>

      </div>

      {/* LOGOUT */}

      <div className="relative z-10">

        <motion.button

          whileHover={{
            scale: 1.03,
            y: -2
          }}

          whileTap={{
            scale: 0.96
          }}

          onClick={handleLogout}

          className="
            flex
            items-center
            justify-center
            gap-3

            w-full

            bg-gradient-to-r
            from-red-500
            to-red-600

            hover:from-red-600
            hover:to-red-700

            transition-all
            duration-300

            shadow-lg
            hover:shadow-red-500/30

            px-5
            py-4

            rounded-2xl

            font-semibold
          "
        >

          <LogOut className="
            w-5
            h-5
          " />

          Logout

        </motion.button>

      </div>
    </>
  );

  // ======================================================
  // UI
  // ======================================================

  return (

    <>
      {/* MOBILE TOPBAR */}

      <div className="
        lg:hidden
        fixed
        top-0
        left-0
        right-0
        z-50

        flex
        items-center
        justify-between

        px-5
        py-4

        bg-slate-950/90
        backdrop-blur-xl

        border-b
        border-slate-800
      ">

        <div className="
          flex
          items-center
          gap-3
        ">

          <div className="
            w-10
            h-10
            rounded-2xl

            bg-gradient-to-br
            from-purple-500
            to-pink-500

            flex
            items-center
            justify-center
          ">

            <Sparkles className="
              w-5
              h-5
            " />

          </div>

          <h1 className="
            text-xl
            font-bold
          ">

            Freelancer Pro

          </h1>

        </div>

        <motion.button

          whileTap={{
            scale: 0.9
          }}

          onClick={() =>
            setOpen(true)
          }

          className="
            p-3
            rounded-2xl
            bg-slate-800
            border
            border-slate-700
          "
        >

          <Menu className="
            w-6
            h-6
          " />

        </motion.button>

      </div>

      {/* DESKTOP SIDEBAR */}

      <motion.aside

        initial={{
          x: -60,
          opacity: 0
        }}

        animate={{
          x: 0,
          opacity: 1
        }}

        transition={{
          duration: 0.5
        }}

        className="
          hidden
          lg:flex

          sticky
          top-0

          h-screen

          flex-col
          justify-between

          w-72

          bg-slate-950/95
          backdrop-blur-xl

          border-r
          border-slate-800

          p-6
          overflow-hidden
        "
      >

        <SidebarContent />

      </motion.aside>

      {/* MOBILE DRAWER */}

      <AnimatePresence>

        {open && (

          <>
            <motion.div

              initial={{
                opacity: 0
              }}

              animate={{
                opacity: 1
              }}

              exit={{
                opacity: 0
              }}

              onClick={() =>
                setOpen(false)
              }

              className="
                fixed
                inset-0
                bg-black/60
                backdrop-blur-sm
                z-50
                lg:hidden
              "
            />

            <motion.aside

              initial={{
                x: -320
              }}

              animate={{
                x: 0
              }}

              exit={{
                x: -320
              }}

              transition={{
                type: "spring",
                damping: 25
              }}

              className="
                fixed
                top-0
                left-0
                bottom-0

                z-[60]

                w-72

                bg-slate-950

                border-r
                border-slate-800

                p-6

                flex
                flex-col
                justify-between

                overflow-hidden

                lg:hidden
              "
            >

              <button

                onClick={() =>
                  setOpen(false)
                }

                className="
                  absolute
                  top-5
                  right-5

                  p-2

                  rounded-xl

                  bg-slate-800
                "
              >

                <X className="
                  w-5
                  h-5
                " />

              </button>

              <SidebarContent />

            </motion.aside>

          </>
        )}

      </AnimatePresence>
    </>
  );
}