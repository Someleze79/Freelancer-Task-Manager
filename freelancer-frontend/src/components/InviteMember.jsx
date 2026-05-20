// ======================================================
// INVITE MEMBER COMPONENT
// ======================================================

// ======================================================
// REACT
// ======================================================

import { useState } from "react";

// ======================================================
// API
// ======================================================

import API from "../api/axios";

// ======================================================
// FRAMER MOTION
// ======================================================

import { motion } from "framer-motion";

// ======================================================
// ICONS
// ======================================================

import {
  Mail,
  ShieldCheck,
  UserPlus
} from "lucide-react";

export default function InviteMember({
  projectId
}) {

  // ======================================================
  // STATE
  // ======================================================

  const [email, setEmail] =
    useState("");

  const [role, setRole] =
    useState("Member");

  const [loading, setLoading] =
    useState(false);

  // ======================================================
  // INVITE MEMBER
  // ======================================================

  const handleInvite = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      await API.post(
        `/projects/${projectId}/invite`,
        {
          email,
          role
        }
      );

      alert("Member invited successfully");

      setEmail("");

      setRole("Member");

    } catch (error) {

      console.error(error);

      alert("Failed to invite member");

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

      onSubmit={handleInvite}

      className="
        bg-slate-900/80
        backdrop-blur-xl
        border
        border-slate-700
        hover:border-purple-500
        transition-all
        duration-300
        p-5
        md:p-6
        rounded-3xl
        mb-8
        shadow-xl
      "
    >

      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="
        flex
        items-center
        gap-3
        mb-6
      ">

        {/* ICON */}
        <motion.div

          animate={{
            rotate: [0, 8, -8, 0]
          }}

          transition={{
            repeat: Infinity,
            duration: 2
          }}
        >

          <UserPlus
            className="
              text-purple-400
              w-7
              h-7
            "
          />

        </motion.div>

        <div>

          <h3 className="
            text-2xl
            font-bold
          ">

            Invite Team Member

          </h3>

          <p className="
            text-gray-400
            text-sm
            mt-1
          ">

            Collaborate with freelancers and clients

          </p>

        </div>

      </div>

      {/* ======================================================
          EMAIL INPUT
      ====================================================== */}

      <div className="mb-5">

        <label className="
          text-sm
          text-gray-400
          mb-2
          block
        ">

          Team Member Email

        </label>

        <div className="
          flex
          items-center
          gap-3
          bg-slate-800
          border
          border-slate-700
          focus-within:border-purple-500
          transition-all
          rounded-2xl
          px-4
        ">

          <Mail
            className="
              text-gray-400
              w-5
              h-5
            "
          />

          <input
            type="email"
            placeholder="Enter member email"

            value={email}

            onChange={(e) =>
              setEmail(e.target.value)
            }

            className="
              w-full
              bg-transparent
              p-4
              outline-none
              text-white
            "
          />

        </div>

      </div>

      {/* ======================================================
          ROLE SELECT
      ====================================================== */}

      <div className="mb-6">

        <label className="
          text-sm
          text-gray-400
          mb-2
          block
        ">

          Member Role

        </label>

        <div className="
          flex
          items-center
          gap-3
          bg-slate-800
          border
          border-slate-700
          focus-within:border-purple-500
          transition-all
          rounded-2xl
          px-4
        ">

          <ShieldCheck
            className="
              text-gray-400
              w-5
              h-5
            "
          />

          <select

            value={role}

            onChange={(e) =>
              setRole(e.target.value)
            }

            className="
              w-full
              bg-transparent
              p-4
              outline-none
              text-white
            "
          >

            <option className="bg-slate-900">
              Member
            </option>

            <option className="bg-slate-900">
              Admin
            </option>

          </select>

        </div>

      </div>

      {/* ======================================================
          BUTTON
      ====================================================== */}

      <motion.button

        whileHover={{
          scale: 1.02
        }}

        whileTap={{
          scale: 0.97
        }}

        disabled={loading}

        className="
          w-full
          bg-gradient-to-r
          from-purple-600
          to-indigo-600
          hover:from-purple-700
          hover:to-indigo-700
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
          ? "Inviting Member..."
          : "Invite Member"}

      </motion.button>

    </motion.form>
  );
}