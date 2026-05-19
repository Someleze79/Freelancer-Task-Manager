// ======================================================
// 📈 PREMIUM TASK ANALYTICS
// ======================================================

// ======================================================
// 📊 RECHARTS
// ======================================================

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

// ======================================================
// 🎞️ FRAMER MOTION
// ======================================================

import { motion } from "framer-motion";

// ======================================================
// 🎨 ICONS
// ======================================================

import {
  CheckCircle2,
  Clock3,
  TrendingUp
} from "lucide-react";

export default function TaskAnalytics({
  tasks
}) {

  // ======================================================
  // 📊 TASK COUNTS
  // ======================================================

  const completed =
    tasks.filter(
      (task) => task.status === "Done"
    ).length;

  const pending =
    tasks.filter(
      (task) => task.status !== "Done"
    ).length;

  const total = tasks.length;

  // ======================================================
  // 📈 COMPLETION %
  // ======================================================

  const completionRate =
    total === 0
      ? 0
      : Math.round(
          (completed / total) * 100
        );

  // ======================================================
  // 📊 CHART DATA
  // ======================================================

  const data = [
    {
      name: "Completed",
      value: completed
    },
    {
      name: "Pending",
      value: pending
    }
  ];

  // ======================================================
  // 🎨 COLORS
  // ======================================================

  const COLORS = [
    "#22c55e",
    "#ef4444"
  ];

  // ======================================================
  // 📭 EMPTY STATE
  // ======================================================

  if (tasks.length === 0) {

    return (

      <motion.div

        initial={{
          opacity: 0,
          y: 20
        }}

        animate={{
          opacity: 1,
          y: 0
        }}

        className="
          relative
          overflow-hidden

          bg-slate-800

          p-8

          rounded-3xl

          border
          border-slate-700

          shadow-xl

          text-center
        "
      >

        {/* GLOW */}
        <div className="
          absolute
          inset-0
          bg-gradient-to-r
          from-purple-500/10
          to-pink-500/10
          pointer-events-none
        " />

        <motion.div

          animate={{
            y: [0, -8, 0]
          }}

          transition={{
            repeat: Infinity,
            duration: 3
          }}
        >

          <TrendingUp
            className="
              w-16
              h-16
              mx-auto
              mb-6
              text-purple-500
            "
          />

        </motion.div>

        <h2 className="
          text-3xl
          font-bold
          mb-3
        ">

          No Analytics Yet

        </h2>

        <p className="
          text-gray-400
          max-w-md
          mx-auto
        ">

          Create tasks to start tracking
          productivity and project progress.

        </p>

      </motion.div>
    );
  }

  // ======================================================
  // 🎨 UI
  // ======================================================

  return (

    <motion.div

      initial={{
        opacity: 0,
        y: 20
      }}

      animate={{
        opacity: 1,
        y: 0
      }}

      transition={{
        duration: 0.5
      }}

      whileHover={{
        scale: 1.01
      }}

      className="
        relative
        overflow-hidden

        bg-slate-800

        p-6
        md:p-8

        rounded-3xl

        shadow-xl

        border
        border-slate-700

        hover:border-purple-500

        transition-all
        duration-300
      "
    >

      {/* ======================================================
          🌈 BACKGROUND GLOW
      ====================================================== */}

      <div className="
        absolute
        inset-0
        opacity-50

        bg-gradient-to-r
        from-purple-500/10
        to-pink-500/10

        pointer-events-none
      " />

      {/* ======================================================
          🏷️ HEADER
      ====================================================== */}

      <div className="
        relative
        flex
        flex-col
        md:flex-row
        justify-between
        items-start
        md:items-center
        gap-4
        mb-8
      ">

        {/* TITLE */}
        <div>

          <motion.h2

            initial={{
              opacity: 0,
              x: -10
            }}

            animate={{
              opacity: 1,
              x: 0
            }}

            transition={{
              delay: 0.2
            }}

            className="
              text-3xl
              font-bold
            "
          >

            Task Analytics

          </motion.h2>

          <p className="
            text-gray-400
            mt-2
          ">

            Track productivity and progress

          </p>

        </div>

        {/* COMPLETION RATE */}
        <motion.div

          whileHover={{
            scale: 1.05
          }}

          className="
            bg-slate-900

            border
            border-slate-700

            px-5
            py-4

            rounded-2xl

            shadow-lg
          "
        >

          <p className="
            text-gray-400
            text-sm
            mb-1
          ">
            Completion Rate
          </p>

          <h3 className="
            text-3xl
            font-black
            text-purple-400
          ">

            {completionRate}%

          </h3>

        </motion.div>

      </div>

      {/* ======================================================
          📊 STATS
      ====================================================== */}

      <div className="
        relative
        grid
        grid-cols-1
        sm:grid-cols-2
        gap-4
        mb-8
      ">

        {/* ======================================================
            ✅ COMPLETED
        ====================================================== */}

        <motion.div

          whileHover={{
            scale: 1.02,
            y: -2
          }}

          className="
            bg-slate-900

            border
            border-slate-700

            rounded-2xl

            p-5

            shadow-lg
          "
        >

          <div className="
            flex
            items-center
            justify-between
          ">

            <div>

              <p className="
                text-gray-400
                text-sm
                mb-2
              ">
                Completed
              </p>

              <h3 className="
                text-4xl
                font-black
                text-green-400
              ">

                {completed}

              </h3>

            </div>

            <motion.div

              animate={{
                scale: [1, 1.1, 1]
              }}

              transition={{
                repeat: Infinity,
                duration: 2
              }}
            >

              <CheckCircle2
                className="
                  w-10
                  h-10
                  text-green-400
                "
              />

            </motion.div>

          </div>

        </motion.div>

        {/* ======================================================
            ⏳ PENDING
        ====================================================== */}

        <motion.div

          whileHover={{
            scale: 1.02,
            y: -2
          }}

          className="
            bg-slate-900

            border
            border-slate-700

            rounded-2xl

            p-5

            shadow-lg
          "
        >

          <div className="
            flex
            items-center
            justify-between
          ">

            <div>

              <p className="
                text-gray-400
                text-sm
                mb-2
              ">
                Pending
              </p>

              <h3 className="
                text-4xl
                font-black
                text-red-400
              ">

                {pending}

              </h3>

            </div>

            <motion.div

              animate={{
                rotate: [0, 5, -5, 0]
              }}

              transition={{
                repeat: Infinity,
                duration: 3
              }}
            >

              <Clock3
                className="
                  w-10
                  h-10
                  text-red-400
                "
              />

            </motion.div>

          </div>

        </motion.div>

      </div>

      {/* ======================================================
          📈 CHART
      ====================================================== */}

      <motion.div

        initial={{
          opacity: 0,
          scale: 0.95
        }}

        animate={{
          opacity: 1,
          scale: 1
        }}

        transition={{
          delay: 0.3,
          duration: 0.5
        }}

        className="
          relative
          h-72
          md:h-96
        "
      >

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              outerRadius={130}
              innerRadius={70}
              paddingAngle={5}
              label
            >

              {data.map(
                (entry, index) => (

                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />

                )
              )}

            </Pie>

            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #334155",
                borderRadius: "16px",
                color: "#fff"
              }}
            />

          </PieChart>

        </ResponsiveContainer>

      </motion.div>

    </motion.div>
  );
}