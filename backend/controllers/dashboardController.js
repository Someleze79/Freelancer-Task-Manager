import Task from "../models/Task.js";
import Project from "../models/Project.js";

export const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user._id;

    const totalProjects = await Project.countDocuments({ user: userId });
    const totalTasks = await Task.countDocuments({ user: userId });
    const completedTasks = await Task.countDocuments({
      user: userId,
      status: "Done"
    });

    const pendingTasks = await Task.countDocuments({
      user: userId,
      status: { $ne: "Done" }
    });

    res.json({
      totalProjects,
      totalTasks,
      completedTasks,
      pendingTasks
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};