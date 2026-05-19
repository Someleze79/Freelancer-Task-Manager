// ======================================================
// 📌 TASK MODEL
// ======================================================

import mongoose from "mongoose";

// ======================================================
// 📎 ATTACHMENT SCHEMA
// ======================================================

const attachmentSchema = mongoose.Schema({
  fileUrl: String,
  fileName: String
});

// ======================================================
// 📌 TASK SCHEMA
// ======================================================

const taskSchema = mongoose.Schema(
  {
    // Task title
    title: {
      type: String,
      required: true
    },

    // Task description
    description: {
      type: String
    },

    // Task status
    status: {
      type: String,
      enum: [
        "Pending",
        "In Progress",
        "Done"
      ],
      default: "Pending"
    },

    // Task priority
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium"
    },

    // Due date
    dueDate: {
      type: Date
    },

    // ======================================================
    // 👤 ASSIGNED USER
    // ======================================================

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    // Parent project
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true
    },

    // Task creator
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // File attachments
    attachments: [attachmentSchema]
  },

  {
    timestamps: true
  }
);

const Task = mongoose.model(
  "Task",
  taskSchema
);

export default Task;