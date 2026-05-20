// ======================================================
// FILE UPLOAD COMPONENT
// ======================================================

import { useState } from "react";

// ======================================================
// API
// ======================================================

import API from "../api/axios";

// ======================================================
// TOAST
// ======================================================

import toast from "react-hot-toast";

// ======================================================
// FRAMER MOTION
// ======================================================

import { motion } from "framer-motion";

// ======================================================
// ICONS
// ======================================================

import {
  Upload,
  File,
  Loader2
} from "lucide-react";

export default function FileUpload({
  taskId
}) {

  // ======================================================
  // STATE
  // ======================================================

  const [loading, setLoading] =
    useState(false);

  const [fileName, setFileName] =
    useState("");

  // ======================================================
  // HANDLE FILE UPLOAD
  // ======================================================

  const handleUpload = async (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setFileName(file.name);

    const formData = new FormData();

    formData.append("file", file);

    try {

      setLoading(true);

      await API.post(
        `/tasks/task/${taskId}/upload`,
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data"
          }
        }
      );

      toast.success(
        "File uploaded successfully"
      );

    } catch (error) {

      console.error(error);

      toast.error(
        "File upload failed"
      );

    } finally {

      setLoading(false);
    }
  };

  // ======================================================
  // UI
  // ======================================================

  return (

    <motion.div

      initial={{
        opacity: 0,
        y: 10
      }}

      animate={{
        opacity: 1,
        y: 0
      }}

      transition={{
        duration: 0.3
      }}

      className="
        bg-slate-900
        border
        border-slate-700
        hover:border-purple-500
        transition-all
        duration-300
        rounded-2xl
        p-4
      "
    >

      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="
        flex
        items-center
        gap-3
        mb-4
      ">

        <Upload className="
          text-purple-400
          w-5
          h-5
        " />

        <h3 className="
          font-semibold
          text-lg
        ">

          Upload File

        </h3>

      </div>

      {/* ======================================================
          FILE INPUT
      ====================================================== */}

      <label
        className="
          flex
          flex-col
          items-center
          justify-center
          border-2
          border-dashed
          border-slate-700
          hover:border-purple-500
          rounded-2xl
          p-6
          cursor-pointer
          transition-all
          duration-300
          text-center
        "
      >

        <input
          type="file"
          onChange={handleUpload}
          className="hidden"
        />

        {/* ======================================================
            LOADING
        ====================================================== */}

        {loading ? (

          <motion.div

            animate={{
              rotate: 360
            }}

            transition={{
              repeat: Infinity,
              duration: 1,
              ease: "linear"
            }}
          >

            <Loader2 className="
              w-10
              h-10
              text-purple-400
            " />

          </motion.div>

        ) : (

          <Upload className="
            w-10
            h-10
            text-purple-400
            mb-3
          " />

        )}

        <p className="
          text-gray-300
          font-medium
        ">

          {loading
            ? "Uploading..."
            : "Click to upload a file"}

        </p>

        <p className="
          text-sm
          text-gray-500
          mt-1
        ">

          PNG, JPG, PDF, DOCX, ZIP

        </p>

      </label>

      {/* ======================================================
          FILE NAME
      ====================================================== */}

      {fileName && !loading && (

        <motion.div

          initial={{
            opacity: 0
          }}

          animate={{
            opacity: 1
          }}

          className="
            flex
            items-center
            gap-2
            mt-4
            bg-slate-800
            rounded-xl
            p-3
          "
        >

          <File className="
            w-4
            h-4
            text-purple-400
          " />

          <span className="
            text-sm
            text-gray-300
            truncate
          ">

            {fileName}

          </span>

        </motion.div>

      )}

    </motion.div>
  );
}