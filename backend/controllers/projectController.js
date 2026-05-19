// ======================================================
// 📁 PROJECT CONTROLLER
// ======================================================

import Project from "../models/Project.js";
import User from "../models/User.js";
import mongoose from "mongoose";

// ======================================================
// ➕ CREATE PROJECT
// ======================================================

export const createProject = async (
  req,
  res
) => {

  try {

    const {
      name,
      description,
      deadline
    } = req.body;

    // ======================================================
    // 📁 CREATE PROJECT
    // ======================================================

    const project = await Project.create({

      // Project owner
      user: req.user._id,

      // Basic fields
      name,
      description,
      deadline,

      // ======================================================
      // 👥 ADD OWNER AS MEMBER
      // ======================================================

      members: [
        {
          user: req.user._id,
          role: "Owner"
        }
      ]
    });

    res.status(201).json(project);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

// ======================================================
// 📥 GET USER PROJECTS
// ======================================================

export const getProjects = async (
  req,
  res
) => {

  try {

    // ======================================================
    // 🔍 FIND PROJECTS USER BELONGS TO
    // ======================================================

    const projects =
      await Project.find({

        // User must exist in members
        "members.user": req.user._id

      })

      // Populate member info
      .populate(
        "members.user",
        "name email role"
      );

    res.json(projects);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

// ======================================================
// ✏️ UPDATE PROJECT
// ======================================================

export const updateProject = async (
  req,
  res
) => {

  try {

    const { id } = req.params;

    // ======================================================
    // ✅ VALIDATE ID
    // ======================================================

    if (
      !mongoose.Types.ObjectId.isValid(id)
    ) {

      return res.status(400).json({
        message: "Invalid project ID"
      });
    }

    // ======================================================
    // 🔍 FIND PROJECT
    // ======================================================

    const project =
      await Project.findById(id);

    if (!project) {

      return res.status(404).json({
        message: "Project not found"
      });
    }

    // ======================================================
    // 🔐 OWNER / ADMIN CHECK
    // ======================================================

    const member =
      project.members.find(
        (m) =>
          m.user.toString() ===
          req.user._id.toString()
      );

    if (
      !member ||
      (
        member.role !== "Owner" &&
        member.role !== "Admin"
      )
    ) {

      return res.status(401).json({
        message: "Not authorized"
      });
    }

    // ======================================================
    // ✏️ UPDATE PROJECT
    // ======================================================

    const updatedProject =
      await Project.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
      );

    res.json(updatedProject);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

// ======================================================
// ❌ DELETE PROJECT
// ======================================================

export const deleteProject = async (
  req,
  res
) => {

  try {

    const { id } = req.params;

    // ======================================================
    // ✅ VALIDATE ID
    // ======================================================

    if (
      !mongoose.Types.ObjectId.isValid(id)
    ) {

      return res.status(400).json({
        message: "Invalid project ID"
      });
    }

    // ======================================================
    // 🔍 FIND PROJECT
    // ======================================================

    const project =
      await Project.findById(id);

    if (!project) {

      return res.status(404).json({
        message: "Project not found"
      });
    }

    // ======================================================
    // 🔐 ONLY OWNER CAN DELETE
    // ======================================================

    const owner =
      project.members.find(
        (m) =>
          m.user.toString() ===
          req.user._id.toString() &&
          m.role === "Owner"
      );

    if (!owner) {

      return res.status(401).json({
        message:
          "Only project owner can delete"
      });
    }

    // ======================================================
    // ❌ DELETE PROJECT
    // ======================================================

    await project.deleteOne();

    res.json({
      message: "Project removed"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

// ======================================================
// 👥 INVITE MEMBER TO PROJECT
// ======================================================

export const inviteMember = async (
  req,
  res
) => {

  try {

    const { id } = req.params;

    const {
      email,
      role
    } = req.body;

    // ======================================================
    // 🔍 FIND PROJECT
    // ======================================================

    const project =
      await Project.findById(id);

    if (!project) {

      return res.status(404).json({
        message: "Project not found"
      });
    }

    // ======================================================
    // 🔐 ONLY OWNER / ADMIN
    // ======================================================

    const member =
      project.members.find(
        (m) =>
          m.user.toString() ===
          req.user._id.toString()
      );

    if (
      !member ||
      (
        member.role !== "Owner" &&
        member.role !== "Admin"
      )
    ) {

      return res.status(401).json({
        message: "Not authorized"
      });
    }

    // ======================================================
    // 🔍 FIND USER BY EMAIL
    // ======================================================

    const user =
      await User.findOne({ email });

    if (!user) {

      return res.status(404).json({
        message: "User not found"
      });
    }

    // ======================================================
    // 🚫 PREVENT DUPLICATES
    // ======================================================

    const alreadyMember =
      project.members.find(
        (m) =>
          m.user.toString() ===
          user._id.toString()
      );

    if (alreadyMember) {

      return res.status(400).json({
        message:
          "User already in project"
      });
    }

    // ======================================================
    // 👥 ADD MEMBER
    // ======================================================

    project.members.push({

      user: user._id,

      role: role || "Member"

    });

    await project.save();

    res.json({

      message: "Member invited",

      project

    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};