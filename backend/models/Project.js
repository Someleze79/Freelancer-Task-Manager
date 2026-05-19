// ======================================================
// 📁 PROJECT MODEL
// ======================================================

import mongoose from "mongoose";

// ======================================================
// 📁 PROJECT SCHEMA
// ======================================================

const projectSchema = mongoose.Schema(
  {
    // Project name
    name: {
      type: String,
      required: true
    },

    // Project description
    description: {
      type: String
    },

    // Project owner
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // ======================================================
    // 👥 PROJECT MEMBERS
    // ======================================================

    members: [
      {
        // User reference
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        },

        // Role in project
        role: {
          type: String,
          enum: ["Owner", "Admin", "Member"],
          default: "Member"
        }
      }
    ]
  },

  {
    timestamps: true
  }
);

const Project = mongoose.model(
  "Project",
  projectSchema
);

export default Project;