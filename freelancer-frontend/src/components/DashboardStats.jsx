// ======================================================
// DASHBOARD STATISTICS
// ======================================================

// ======================================================
// ICONS
// ======================================================

import {
  FolderKanban,
  CheckCircle2,
  Clock3
} from "lucide-react";

// ======================================================
// FRAMER MOTION
// ======================================================

import { motion } from "framer-motion";

export default function DashboardStats({
  projects,
  tasks
}) {

  // ======================================================
  // COMPLETED TASKS
  // ======================================================

  const completedTasks =
    tasks.filter(
      (task) => task.status === "Done"
    ).length;

  // ======================================================
  // STATS DATA
  // ======================================================

  const stats = [

    {
      title: "Total Projects",

      value: projects.length,

      icon: FolderKanban,

      iconColor: "text-purple-400",

      glow: "shadow-purple-500/20",

      gradient:
        "from-purple-500/10 to-indigo-500/5"
    },

    {
      title: "Total Tasks",

      value: tasks.length,

      icon: Clock3,

      iconColor: "text-blue-400",

      glow: "shadow-blue-500/20",

      gradient:
        "from-blue-500/10 to-cyan-500/5"
    },

    {
      title: "Completed",

      value: completedTasks,

      icon: CheckCircle2,

      iconColor: "text-green-400",

      glow: "shadow-green-500/20",

      gradient:
        "from-green-500/10 to-emerald-500/5"
    }
  ];

  // ======================================================
  // UI
  // ======================================================

  return (

    <div className="
      grid
      grid-cols-1
      sm:grid-cols-2
      xl:grid-cols-3
      gap-6
      mb-8
    ">

      {stats.map((stat, index) => {

        const Icon = stat.icon;

        return (

          <motion.div

            key={stat.title}

            // ======================================================
            // ENTRY ANIMATION
            // ======================================================

            initial={{
              opacity: 0,
              y: 25
            }}

            animate={{
              opacity: 1,
              y: 0
            }}

            transition={{
              duration: 0.4,
              delay: index * 0.1
            }}

            // ======================================================
            // HOVER EFFECT
            // ======================================================

            whileHover={{
              scale: 1.03,
              y: -3
            }}

            className={`
              relative
              overflow-hidden
              bg-gradient-to-br
              ${stat.gradient}
              bg-slate-900/80
              backdrop-blur-xl
              border
              border-slate-700
              hover:border-purple-500
              transition-all
              duration-300
              rounded-3xl
              p-6
              md:p-7
              shadow-xl
              ${stat.glow}
            `}
          >

            {/* ======================================================
                BACKGROUND GLOW
            ====================================================== */}

            <div className="
              absolute
              top-0
              right-0
              w-32
              h-32
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
            ">

              {/* ======================================================
                  TEXT
              ====================================================== */}

              <div>

                <p className="
                  text-gray-400
                  text-sm
                  md:text-base
                  font-medium
                ">

                  {stat.title}

                </p>

                {/* NUMBER */}
                <motion.h2

                  animate={{
                    scale: [1, 1.03, 1]
                  }}

                  transition={{
                    repeat: Infinity,
                    duration: 3
                  }}

                  className="
                    text-4xl
                    md:text-5xl
                    font-bold
                    mt-4
                    tracking-tight
                  "
                >

                  {stat.value}

                </motion.h2>

              </div>

              {/* ======================================================
                  ICON
              ====================================================== */}

              <motion.div

                animate={{
                  y: [0, -5, 0]
                }}

                transition={{
                  repeat: Infinity,
                  duration: 3
                }}

                className="
                  p-4
                  rounded-2xl
                  bg-slate-800/70
                  border
                  border-slate-700
                "
              >

                <Icon
                  className={`
                    ${stat.iconColor}
                    w-8
                    h-8
                    md:w-10
                    md:h-10
                  `}
                />

              </motion.div>

            </div>

            {/* ======================================================
                FOOTER
            ====================================================== */}

            <div className="
              relative
              z-10
              mt-6
              flex
              items-center
              gap-2
              text-sm
              text-gray-400
            ">

              <div className="
                w-2
                h-2
                rounded-full
                bg-green-400
              " />

              Updated just now

            </div>

          </motion.div>

        );
      })}

    </div>
  );
}