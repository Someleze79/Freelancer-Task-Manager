// ======================================================
// PROJECT FORM
// ======================================================

import { useState } from "react";
import API from "../api/axios";

// ======================================================
// FRAMER MOTION
// ======================================================

import { motion } from "framer-motion";

// ======================================================
// ICONS
// ======================================================

import {
  FolderPlus,
  Plus
} from "lucide-react";

export default function ProjectForm({
  refreshProjects
}) {

  // ======================================================
  // STATE
  // ======================================================

  const [name, setName] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // ======================================================
  // CREATE PROJECT
  // ======================================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    // Prevent empty project names
    if (!name.trim()) return;

    try {

      setLoading(true);

      await API.post(
        "/projects",
        { name }
      );

      // RESET INPUT
      setName("");

      // REFRESH PROJECTS
      refreshProjects();

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  };

  // ======================================================
  // UI
  // ======================================================

  return (

    <motion.form

      // ======================================================
      // ENTRY ANIMATION
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
        mb-8
        flex
        flex-col
        sm:flex-row
        gap-4
      "
    >

      {/* ======================================================
          INPUT WRAPPER
      ====================================================== */}

      <div className="
        relative
        flex-1
      ">

        {/* ICON */}
        <FolderPlus
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

        {/* INPUT */}
        <input

          type="text"

          placeholder="Create a new project"

          value={name}

          onChange={(e) =>
            setName(e.target.value)
          }

          className="
            w-full
            bg-slate-900
            border
            border-slate-700
            focus:border-purple-500
            focus:ring-2
            focus:ring-purple-500/30
            transition-all
            duration-300
            p-4
            pl-12
            rounded-2xl
            outline-none
          "
        />

      </div>

      {/* ======================================================
          BUTTON
      ====================================================== */}

      <motion.button

        whileHover={{
          scale: 1.03
        }}

        whileTap={{
          scale: 0.97
        }}

        disabled={loading}

        className="
          bg-purple-600
          hover:bg-purple-700
          transition-all
          duration-300
          px-6
          py-4
          rounded-2xl
          font-semibold
          flex
          items-center
          justify-center
          gap-2
          shadow-lg
          shadow-purple-500/20
          min-w-[140px]
        "
      >

        {/* ICON */}
        <Plus className="w-5 h-5" />

        {/* TEXT */}
        {loading
          ? "Adding..."
          : "Add Project"
        }

      </motion.button>

    </motion.form>
  );
}