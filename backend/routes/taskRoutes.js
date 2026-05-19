import express from "express";
import {
  createTask,
  getTasksByProject,
  updateTask,
  deleteTask,
  uploadTaskFile
} from "../controllers/taskController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js"; // 👈 NEW
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// ======================================================
// 📁 Tasks under a specific project (USER)
// ======================================================
router.route("/:projectId")
  .post(protect, createTask)
  .get(protect, getTasksByProject);

// ======================================================
// 📎 Upload file (USER)
// ======================================================
router.post(
  "/task/:id/upload",
  protect,
  upload.single("file"),
  uploadTaskFile
);

// ======================================================
// 📌 Task operations (USER owns task)
// ======================================================
router.route("/task/:id")
  .put(protect, updateTask)
  .delete(protect, deleteTask);

// ======================================================
// 👑 ADMIN: Delete ANY task (GLOBAL CONTROL)
// ======================================================
router.delete(
  "/admin/:id",
  protect,
  authorizeRoles("admin"),
  deleteTask
);

export default router;