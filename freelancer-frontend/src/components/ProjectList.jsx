// ======================================================
// PROJECT LIST
// ======================================================

// ======================================================
// FRAMER MOTION
// ======================================================

import { motion } from "framer-motion";

// ======================================================
// ICONS
// ======================================================

import {
  FolderKanban,
  ArrowRight
} from "lucide-react";

export default function ProjectList({
  projects,
  setSelectedProject,
  selectedProject
}) {

  // ======================================================
  // EMPTY STATE
  // ======================================================

  if (projects.length === 0) {

    return (

      <motion.div

        initial={{
          opacity: 0
        }}

        animate={{
          opacity: 1
        }}

        className="
          bg-slate-900
          border
          border-slate-700
          rounded-3xl
          p-8
          text-center
        "
      >

        <FolderKanban
          className="
            mx-auto
            text-gray-500
            w-12
            h-12
            mb-4
          "
        />

        <p className="
          text-gray-400
        ">

          No projects yet

        </p>

      </motion.div>

    );
  }

  // ======================================================
  // UI
  // ======================================================

  return (

    <div className="
      space-y-4
      mt-6
    ">

      {projects.map((project, index) => {

        // ======================================================
        // ACTIVE PROJECT
        // ======================================================

        const isActive =
          selectedProject?._id === project._id;

        return (

          <motion.button

            key={project._id}

            // ======================================================
            // ENTRY ANIMATION
            // ======================================================

            initial={{
              opacity: 0,
              y: 15
            }}

            animate={{
              opacity: 1,
              y: 0
            }}

            transition={{
              duration: 0.3,
              delay: index * 0.05
            }}

            // ======================================================
            // INTERACTIONS
            // ======================================================

            whileHover={{
              scale: 1.02,
              x: 3
            }}

            whileTap={{
              scale: 0.98
            }}

            onClick={() =>
              setSelectedProject(project)
            }

            className={`
              relative
              overflow-hidden
              w-full
              text-left
              p-5
              rounded-3xl
              transition-all
              duration-300
              border
              backdrop-blur-xl

              ${
                isActive
                  ? `
                    bg-gradient-to-r
                    from-purple-600/20
                    to-indigo-600/10
                    border-purple-500
                    shadow-lg
                    shadow-purple-500/20
                  `
                  : `
                    bg-slate-900/80
                    border-slate-700
                    hover:border-purple-500
                    hover:bg-slate-800
                  `
              }
            `}
          >

            {/* ======================================================
                BACKGROUND GLOW
            ====================================================== */}

            <div className="
              absolute
              top-0
              right-0
              w-24
              h-24
              bg-white/5
              rounded-full
              blur-3xl
            " />

            {/* ======================================================
                CONTENT
            ====================================================== */}

            <div className="
              relative
              z-10
              flex
              justify-between
              items-start
              gap-4
            ">

              {/* ======================================================
                  LEFT SIDE
              ====================================================== */}

              <div className="
                flex
                items-start
                gap-4
                min-w-0
              ">

                {/* ICON */}
                <motion.div

                  animate={{
                    y: [0, -4, 0]
                  }}

                  transition={{
                    repeat: Infinity,
                    duration: 3
                  }}

                  className={`
                    p-3
                    rounded-2xl
                    border

                    ${
                      isActive
                        ? `
                          bg-purple-500/20
                          border-purple-500/30
                        `
                        : `
                          bg-slate-800
                          border-slate-700
                        `
                    }
                  `}
                >

                  <FolderKanban
                    className={`
                      w-6
                      h-6

                      ${
                        isActive
                          ? "text-purple-300"
                          : "text-purple-400"
                      }
                    `}
                  />

                </motion.div>

                {/* TEXT */}
                <div className="min-w-0">

                  <h3 className="
                    font-semibold
                    text-lg
                    truncate
                  ">

                    {project.name}

                  </h3>

                  <p className="
                    text-gray-400
                    text-sm
                    mt-2
                  ">

                    Click to manage tasks

                  </p>

                  {/* STATUS */}
                  <div className="
                    flex
                    items-center
                    gap-2
                    mt-3
                  ">

                    <div className="
                      w-2
                      h-2
                      rounded-full
                      bg-green-400
                    " />

                    <span className="
                      text-xs
                      text-gray-400
                    ">

                      Active Project

                    </span>

                  </div>

                </div>

              </div>

              {/* ======================================================
                  RIGHT ICON
              ====================================================== */}

              <motion.div

                animate={{
                  x: [0, 4, 0]
                }}

                transition={{
                  repeat: Infinity,
                  duration: 2
                }}
              >

                <ArrowRight
                  className="
                    text-gray-500
                    w-5
                    h-5
                    mt-1
                  "
                />

              </motion.div>

            </div>

          </motion.button>

        );
      })}

    </div>
  );
}