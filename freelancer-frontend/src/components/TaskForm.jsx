// ======================================================
// ➕ PREMIUM RESPONSIVE TASK FORM
// ======================================================

import { useState } from "react";
import API from "../api/axios";

// ======================================================
// 🎞️ FRAMER MOTION
// ======================================================

import { motion } from "framer-motion";

// ======================================================
// 🎨 ICONS
// ======================================================

import {
  ClipboardList,
  CalendarDays,
  Flag
} from "lucide-react";

export default function TaskForm({
  projectId,
  refreshTasks
}) {

  // ======================================================
  // 🧠 STATE
  // ======================================================

  const [form, setForm] = useState({

    title: "",

    description: "",

    priority: "Medium",

    dueDate: ""
  });

  const [loading, setLoading] =
    useState(false);

  // ======================================================
  // 📤 CREATE TASK
  // ======================================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      await API.post(
        `/tasks/${projectId}`,
        form
      );

      // RESET FORM
      setForm({

        title: "",

        description: "",

        priority: "Medium",

        dueDate: ""
      });

      refreshTasks();

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  };

  // ======================================================
  // 🎨 UI
  // ======================================================

  return (

    <motion.form

      // ======================================================
      // 🎞️ ENTRY ANIMATION
      // ======================================================

      initial={{
        opacity: 0,
        y: 20
      }}

      animate={{
        opacity: 1,
        y: 0
      }}

      transition={{
        duration: 0.4
      }}

      onSubmit={handleSubmit}

      className="
        bg-slate-900
        border
        border-slate-700
        hover:border-purple-500
        transition-all
        duration-300
        p-4
        md:p-6
        rounded-3xl
        mb-8
        space-y-5
        shadow-xl
      "
    >

      {/* ======================================================
          🏷️ HEADER
      ====================================================== */}

      <div className="
        flex
        items-center
        gap-3
      ">

        <motion.div

          animate={{
            rotate: [0, 10, -10, 0]
          }}

          transition={{
            repeat: Infinity,
            duration: 3
          }}
        >

          <ClipboardList
            className="
              text-purple-400
              w-7
              h-7
            "
          />

        </motion.div>

        <h3 className="
          text-2xl
          md:text-3xl
          font-bold
        ">

          Create New Task

        </h3>

      </div>

      {/* ======================================================
          📝 TITLE INPUT
      ====================================================== */}

      <input

        type="text"

        placeholder="Task title"

        value={form.title}

        onChange={(e) =>
          setForm({
            ...form,
            title: e.target.value
          })
        }

        className="
          w-full
          bg-slate-800
          border
          border-slate-700
          focus:border-purple-500
          focus:ring-2
          focus:ring-purple-500/30
          p-4
          rounded-2xl
          outline-none
          transition-all
        "
      />

      {/* ======================================================
          📄 DESCRIPTION
      ====================================================== */}

      <textarea

        placeholder="Task description"

        value={form.description}

        onChange={(e) =>
          setForm({
            ...form,
            description: e.target.value
          })
        }

        className="
          w-full
          bg-slate-800
          border
          border-slate-700
          focus:border-purple-500
          focus:ring-2
          focus:ring-purple-500/30
          p-4
          rounded-2xl
          outline-none
          h-32
          resize-none
          transition-all
        "
      />

      {/* ======================================================
          ⚡ PRIORITY + DATE
      ====================================================== */}

      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-4
      ">

        {/* ======================================================
            🚩 PRIORITY
        ====================================================== */}

        <div className="relative">

          <Flag
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-gray-400
              w-5
              h-5
            "
          />

          <select

            value={form.priority}

            onChange={(e) =>
              setForm({
                ...form,
                priority: e.target.value
              })
            }

            className="
              w-full
              bg-slate-800
              border
              border-slate-700
              focus:border-purple-500
              focus:ring-2
              focus:ring-purple-500/30
              pl-12
              p-4
              rounded-2xl
              outline-none
              transition-all
            "
          >

            <option>
              Low
            </option>

            <option>
              Medium
            </option>

            <option>
              High
            </option>

          </select>

        </div>

        {/* ======================================================
            📅 DATE
        ====================================================== */}

        <div className="relative">

          <CalendarDays
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-gray-400
              w-5
              h-5
            "
          />

          <input

            type="date"

            value={form.dueDate}

            onChange={(e) =>
              setForm({
                ...form,
                dueDate: e.target.value
              })
            }

            className="
              w-full
              bg-slate-800
              border
              border-slate-700
              focus:border-purple-500
              focus:ring-2
              focus:ring-purple-500/30
              pl-12
              p-4
              rounded-2xl
              outline-none
              transition-all
            "
          />

        </div>

      </div>

      {/* ======================================================
          🚀 SUBMIT BUTTON
      ====================================================== */}

      <motion.button

        whileHover={{
          scale: 1.02
        }}

        whileTap={{
          scale: 0.98
        }}

        disabled={loading}

        className="
          w-full
          bg-purple-600
          hover:bg-purple-700
          transition-all
          duration-300
          p-4
          rounded-2xl
          font-semibold
          shadow-lg
          shadow-purple-500/20
        "
      >

        {loading
          ? "Creating..."
          : "Create Task"
        }

      </motion.button>

    </motion.form>
  );
}