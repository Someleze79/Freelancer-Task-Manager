// ======================================================
// 📋 PREMIUM ANIMATED TASK LIST
// ======================================================

// ======================================================
// 📡 API
// ======================================================

import API from "../api/axios";

// ======================================================
// 🎞️ FRAMER MOTION
// ======================================================

import { motion } from "framer-motion";

// ======================================================
// 🎨 ICONS
// ======================================================

import {
  Trash2,
  CheckCircle2,
  CalendarDays
} from "lucide-react";

export default function TaskList({
  tasks,
  refreshTasks
}) {

  // ======================================================
  // ❌ DELETE TASK
  // ======================================================

  const deleteTask = async (id) => {

    try {

      await API.delete(
        `/tasks/task/${id}`
      );

      refreshTasks();

    } catch (error) {

      console.error(error);
    }
  };

  // ======================================================
  // ✅ MARK TASK AS DONE
  // ======================================================

  const markDone = async (id) => {

    try {

      await API.put(
        `/tasks/task/${id}`,
        {
          status: "Done"
        }
      );

      refreshTasks();

    } catch (error) {

      console.error(error);
    }
  };

  // ======================================================
  // 🎨 PRIORITY COLORS
  // ======================================================

  const priorityColor = (
    priority
  ) => {

    switch (priority) {

      case "High":
        return `
          bg-red-500/20
          text-red-400
          border
          border-red-500/30
        `;

      case "Medium":
        return `
          bg-yellow-500/20
          text-yellow-400
          border
          border-yellow-500/30
        `;

      default:
        return `
          bg-green-500/20
          text-green-400
          border
          border-green-500/30
        `;
    }
  };

  // ======================================================
  // 🎨 STATUS COLORS
  // ======================================================

  const statusColor = (
    status
  ) => {

    switch (status) {

      case "Done":
        return `
          bg-green-500/20
          text-green-400
          border
          border-green-500/30
        `;

      case "In Progress":
        return `
          bg-blue-500/20
          text-blue-400
          border
          border-blue-500/30
        `;

      default:
        return `
          bg-yellow-500/20
          text-yellow-400
          border
          border-yellow-500/30
        `;
    }
  };

  // ======================================================
  // 📭 EMPTY STATE
  // ======================================================

  if (tasks.length === 0) {

    return (

      <motion.div

        initial={{
          opacity: 0
        }}

        animate={{
          opacity: 1
        }}

        className="
          text-center
          text-gray-400
          py-20
          bg-slate-900
          rounded-3xl
          border
          border-slate-800
          shadow-lg
        "
      >

        <motion.div

          animate={{
            y: [0, -8, 0]
          }}

          transition={{
            repeat: Infinity,
            duration: 3
          }}
        >

          <CheckCircle2
            className="
              w-16
              h-16
              mx-auto
              mb-6
              text-purple-500
            "
          />

        </motion.div>

        <h3 className="
          text-3xl
          font-bold
          mb-3
        ">
          No Tasks Yet
        </h3>

        <p className="
          text-gray-500
          max-w-md
          mx-auto
        ">
          Create your first task and start
          managing your workflow like a pro.
        </p>

      </motion.div>
    );
  }

  // ======================================================
  // 🎨 UI
  // ======================================================

  return (

    <div className="space-y-6">

      {tasks.map((task, index) => (

        <motion.div

          layout

          key={task._id}

          // ======================================================
          // 🎞️ ENTRY ANIMATION
          // ======================================================

          initial={{
            opacity: 0,
            y: 20
          }}

          animate={{
            opacity: 1,
            y: [0, -2, 0]
          }}

          transition={{
            duration: 0.35,
            delay: index * 0.05
          }}

          // ======================================================
          // ✨ HOVER EFFECT
          // ======================================================

          whileHover={{
            scale: 1.01,
            y: -3
          }}

          className={`
            relative
            overflow-hidden
            bg-slate-900
            border
            border-slate-700
            hover:border-purple-500
            transition-all
            duration-300
            p-5
            md:p-6
            rounded-3xl
            shadow-xl

            ${task.status === "Done"
              ? "opacity-70"
              : ""}
          `}
        >

          {/* ======================================================
              🌈 PREMIUM HOVER GLOW
          ====================================================== */}

          <div className="
            absolute
            inset-0
            opacity-0
            hover:opacity-100
            transition-opacity
            duration-500
            bg-gradient-to-r
            from-purple-500/10
            to-pink-500/10
            pointer-events-none
          " />

          {/* ======================================================
              📌 HEADER
          ====================================================== */}

          <div className="
            relative
            flex
            flex-col
            lg:flex-row
            justify-between
            gap-5
            mb-6
          ">

            {/* ======================================================
                📄 TASK INFO
            ====================================================== */}

            <div className="flex-1">

              <h3 className="
                text-xl
                md:text-2xl
                font-bold
                mb-3
                break-words
              ">

                {task.title}

              </h3>

              <p className="
                text-gray-400
                leading-relaxed
                break-words
              ">

                {task.description}

              </p>

            </div>

            {/* ======================================================
                🚨 PRIORITY BADGE
            ====================================================== */}

            <div>

              <span
                className={`
                  ${priorityColor(task.priority)}

                  px-4
                  py-2
                  rounded-full
                  text-sm
                  font-semibold
                  shadow
                  whitespace-nowrap
                `}
              >

                {task.priority}

              </span>

            </div>

          </div>

          {/* ======================================================
              📌 FOOTER
          ====================================================== */}

          <div className="
            relative
            flex
            flex-col
            xl:flex-row
            justify-between
            items-start
            xl:items-center
            gap-5
          ">

            {/* ======================================================
                📅 STATUS + DATE
            ====================================================== */}

            <div className="
              flex
              flex-wrap
              gap-3
            ">

              {/* STATUS */}
              <span
                className={`
                  ${statusColor(task.status)}

                  px-4
                  py-2
                  rounded-full
                  text-sm
                  font-medium
                `}
              >

                {task.status}

              </span>

              {/* DUE DATE */}
              {task.dueDate && (

                <span className="
                  flex
                  items-center
                  gap-2
                  bg-slate-800
                  border
                  border-slate-700
                  px-4
                  py-2
                  rounded-full
                  text-sm
                ">

                  <CalendarDays
                    className="
                      w-4
                      h-4
                      text-purple-400
                    "
                  />

                  {new Date(
                    task.dueDate
                  ).toLocaleDateString()}

                </span>
              )}

            </div>

            {/* ======================================================
                🎯 ACTION BUTTONS
            ====================================================== */}

            <div className="
              flex
              flex-col
              sm:flex-row
              gap-3
              w-full
              xl:w-auto
            ">

              {/* ======================================================
                  ✅ DONE BUTTON
              ====================================================== */}

              <motion.button

                whileHover={{
                  scale: 1.05,
                  y: -2
                }}

                whileTap={{
                  scale: 0.95
                }}

                onClick={() =>
                  markDone(task._id)
                }

                className="
                  flex
                  items-center
                  justify-center
                  gap-2

                  flex-1
                  xl:flex-none

                  bg-green-600
                  hover:bg-green-700

                  transition
                  duration-300

                  px-5
                  py-3

                  rounded-2xl
                  font-semibold
                  shadow-lg
                "
              >

                <CheckCircle2
                  className="
                    w-5
                    h-5
                  "
                />

                Done

              </motion.button>

              {/* ======================================================
                  ❌ DELETE BUTTON
              ====================================================== */}

              <motion.button

                whileHover={{
                  scale: 1.05,
                  y: -2
                }}

                whileTap={{
                  scale: 0.95
                }}

                onClick={() =>
                  deleteTask(task._id)
                }

                className="
                  flex
                  items-center
                  justify-center
                  gap-2

                  flex-1
                  xl:flex-none

                  bg-red-600
                  hover:bg-red-700

                  transition
                  duration-300

                  px-5
                  py-3

                  rounded-2xl
                  font-semibold
                  shadow-lg
                "
              >

                <Trash2
                  className="
                    w-5
                    h-5
                  "
                />

                Delete

              </motion.button>

            </div>

          </div>

        </motion.div>

      ))}

    </div>
  );
}