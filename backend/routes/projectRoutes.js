// ======================================================
// 📁 PROJECT ROUTES
// ======================================================

import express from "express";

// ======================================================
// 📦 CONTROLLERS
// ======================================================

import {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
  inviteMember
} from "../controllers/projectController.js";

// ======================================================
// 🔐 AUTH MIDDLEWARE
// ======================================================

import { protect } from "../middleware/authMiddleware.js";

// ======================================================
// 🚀 ROUTER
// ======================================================

const router = express.Router();

// ======================================================
// 📁 PROJECT ROUTES
// ======================================================

router.route("/")

  // ➕ Create Project
  .post(protect, createProject)

  // 📥 Get Projects
  .get(protect, getProjects);

// ======================================================
// ✏️ UPDATE / DELETE PROJECT
// ======================================================

router.route("/:id")

  // ✏️ Update Project
  .put(protect, updateProject)

  // ❌ Delete Project
  .delete(protect, deleteProject);

// ======================================================
// 👥 INVITE MEMBER TO PROJECT
// ======================================================

router.post(
  "/:id/invite",
  protect,
  inviteMember
);

// ======================================================
// 🚀 EXPORT
// ======================================================

export default router;