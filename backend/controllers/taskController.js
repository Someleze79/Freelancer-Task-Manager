// ======================================================
// 📌 TASK CONTROLLER (PREMIUM REAL-TIME VERSION)
// ======================================================

import Task from "../models/Task.js";
import Project from "../models/Project.js";
import Notification from "../models/Notification.js";
import mongoose from "mongoose";

// ======================================================
// ➕ CREATE TASK
// ======================================================

export const createTask = async (req, res) => {

  try {

    const {
      title,
      description,
      priority,
      dueDate
    } = req.body;

    const { projectId } = req.params;

    // ======================================================
    // ✅ VALIDATE PROJECT ID
    // ======================================================

    if (
      !mongoose.Types.ObjectId.isValid(
        projectId
      )
    ) {

      return res.status(400).json({
        message: "Invalid project ID"
      });
    }

    // ======================================================
    // 📁 FIND PROJECT
    // ======================================================

    const project =
      await Project.findById(projectId);

    if (!project) {

      return res.status(404).json({
        message: "Project not found"
      });
    }

    // ======================================================
    // 🔐 AUTHORIZE USER
    // ======================================================

    if (
      project.user.toString() !==
      req.user._id.toString()
    ) {

      return res.status(401).json({
        message: "Not authorized"
      });
    }

    // ======================================================
    // 🚀 CREATE TASK
    // ======================================================

    const task = await Task.create({

      title,
      description,
      priority,
      dueDate,

      project: projectId,
      user: req.user._id

    });

    // ======================================================
    // 🔔 CREATE NOTIFICATION
    // ======================================================

    const notification =
      await Notification.create({

        user: req.user._id,

        message:
          `Task "${title}" was created`

      });

    // ======================================================
    // 🔴 REAL-TIME EVENTS
    // ======================================================

    if (global.io) {

      global.io.emit(
        "newNotification",
        notification
      );

      global.io.emit(
        "taskCreated",
        task
      );
    }

    // ======================================================
    // ✅ RESPONSE
    // ======================================================

    res.status(201).json(task);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message
    });
  }
};

// ======================================================
// 📥 GET TASKS BY PROJECT
// ======================================================

export const getTasksByProject =
  async (req, res) => {

    try {

      const { projectId } = req.params;

      const {
        status,
        priority,
        search
      } = req.query;

      // ======================================================
      // ✅ VALIDATE PROJECT ID
      // ======================================================

      if (
        !mongoose.Types.ObjectId.isValid(
          projectId
        )
      ) {

        return res.status(400).json({
          message: "Invalid project ID"
        });
      }

      // ======================================================
      // 🔎 QUERY
      // ======================================================

      let query = {

        project: projectId,

        user: req.user._id

      };

      // ======================================================
      // 🔎 FILTERS
      // ======================================================

      if (status) {
        query.status = status;
      }

      if (priority) {
        query.priority = priority;
      }

      // ======================================================
      // 🔍 SEARCH
      // ======================================================

      if (search) {

        query.title = {

          $regex: search,
          $options: "i"

        };
      }

      // ======================================================
      // 📊 SORTING
      // ======================================================

      const sortBy =
        req.query.sortBy ||
        "createdAt";

      const order =
        req.query.order === "asc"
          ? 1
          : -1;

      // ======================================================
      // 📄 PAGINATION
      // ======================================================

      const page =
        parseInt(req.query.page) || 1;

      const limit =
        parseInt(req.query.limit) || 10;

      const skip =
        (page - 1) * limit;

      // ======================================================
      // 📊 TOTAL
      // ======================================================

      const total =
        await Task.countDocuments(query);

      // ======================================================
      // 📥 FETCH TASKS
      // ======================================================

      const tasks = await Task.find(query)

        .populate(
          "project",
          "name status"
        )

        .sort({
          [sortBy]: order
        })

        .skip(skip)

        .limit(limit);

      // ======================================================
      // ✅ RESPONSE
      // ======================================================

      res.json({

        total,
        page,

        pages:
          Math.ceil(total / limit),

        tasks

      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        message: error.message
      });
    }
  };

// ======================================================
// 📎 UPLOAD FILE TO TASK
// ======================================================

export const uploadTaskFile =
  async (req, res) => {

    try {

      const { id } = req.params;

      // ======================================================
      // ✅ VALIDATE TASK ID
      // ======================================================

      if (
        !mongoose.Types.ObjectId.isValid(id)
      ) {

        return res.status(400).json({
          message: "Invalid task ID"
        });
      }

      // ======================================================
      // ❌ CHECK FILE
      // ======================================================

      if (!req.file) {

        return res.status(400).json({
          message: "No file uploaded"
        });
      }

      // ======================================================
      // 📥 FIND TASK
      // ======================================================

      const task =
        await Task.findById(id);

      if (!task) {

        return res.status(404).json({
          message: "Task not found"
        });
      }

      // ======================================================
      // 🔐 AUTHORIZE USER
      // ======================================================

      if (
        task.user.toString() !==
        req.user._id.toString()
      ) {

        return res.status(401).json({
          message: "Not authorized"
        });
      }

      // ======================================================
      // 📎 ADD ATTACHMENT
      // ======================================================

      task.attachments.push({

        fileUrl:
          `/uploads/${req.file.filename}`,

        fileName:
          req.file.originalname

      });

      await task.save();

      // ======================================================
      // 🔔 NOTIFICATION
      // ======================================================

      const notification =
        await Notification.create({

          user: req.user._id,

          message:
            `File uploaded to task "${task.title}"`

        });

      // ======================================================
      // 🔴 REAL-TIME EVENTS
      // ======================================================

      if (global.io) {

        global.io.emit(
          "newNotification",
          notification
        );

        global.io.emit(
          "taskFileUploaded",
          task
        );
      }

      // ======================================================
      // ✅ RESPONSE
      // ======================================================

      res.json({

        message:
          "File uploaded successfully",

        task

      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        message: error.message
      });
    }
  };

// ======================================================
// ✏️ UPDATE TASK
// ======================================================

export const updateTask =
  async (req, res) => {

    try {

      const { id } = req.params;

      // ======================================================
      // ✅ VALIDATE TASK ID
      // ======================================================

      if (
        !mongoose.Types.ObjectId.isValid(id)
      ) {

        return res.status(400).json({
          message: "Invalid task ID"
        });
      }

      // ======================================================
      // 📥 FIND TASK
      // ======================================================

      const task =
        await Task.findById(id);

      if (!task) {

        return res.status(404).json({
          message: "Task not found"
        });
      }

      // ======================================================
      // 🔐 AUTHORIZE USER
      // ======================================================

      if (

        task.user.toString() !==
        req.user._id.toString()

        &&

        req.user.role !== "admin"

      ) {

        return res.status(401).json({
          message: "Not authorized"
        });
      }

      // ======================================================
      // 🚀 UPDATE TASK
      // ======================================================

      const updatedTask =
        await Task.findByIdAndUpdate(

          id,
          req.body,

          {
            new: true
          }

        );

      // ======================================================
      // 🔔 NOTIFICATION
      // ======================================================

      const notification =
        await Notification.create({

          user: req.user._id,

          message:
            `Task "${task.title}" was updated`

        });

      // ======================================================
      // 🔴 REAL-TIME EVENTS
      // ======================================================

      if (global.io) {

        global.io.emit(
          "newNotification",
          notification
        );

        global.io.emit(
          "taskUpdated",
          updatedTask
        );
      }

      // ======================================================
      // ✅ RESPONSE
      // ======================================================

      res.json(updatedTask);

    } catch (error) {

      console.error(error);

      res.status(500).json({
        message: error.message
      });
    }
  };

// ======================================================
// ❌ DELETE TASK
// ======================================================

export const deleteTask =
  async (req, res) => {

    try {

      const { id } = req.params;

      // ======================================================
      // ✅ VALIDATE TASK ID
      // ======================================================

      if (
        !mongoose.Types.ObjectId.isValid(id)
      ) {

        return res.status(400).json({
          message: "Invalid task ID"
        });
      }

      // ======================================================
      // 📥 FIND TASK
      // ======================================================

      const task =
        await Task.findById(id);

      if (!task) {

        return res.status(404).json({
          message: "Task not found"
        });
      }

      // ======================================================
      // 🔐 AUTHORIZE USER
      // ======================================================

      if (

        task.user.toString() !==
        req.user._id.toString()

        &&

        req.user.role !== "admin"

      ) {

        return res.status(401).json({
          message: "Not authorized"
        });
      }

      // ======================================================
      // ❌ DELETE TASK
      // ======================================================

      await task.deleteOne();

      // ======================================================
      // 🔔 NOTIFICATION
      // ======================================================

      const notification =
        await Notification.create({

          user: req.user._id,

          message:
            `Task "${task.title}" was deleted`

        });

      // ======================================================
      // 🔴 REAL-TIME EVENTS
      // ======================================================

      if (global.io) {

        global.io.emit(
          "newNotification",
          notification
        );

        global.io.emit(
          "taskDeleted",
          task._id
        );
      }

      // ======================================================
      // ✅ RESPONSE
      // ======================================================

      res.json({
        message: "Task deleted"
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        message: error.message
      });
    }
  };