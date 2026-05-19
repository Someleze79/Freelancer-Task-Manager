// ======================================================
// 🚀 ULTIMATE AI POWERED REAL-TIME DASHBOARD
// ======================================================

import {
  useEffect,
  useState,
  useMemo,
  useRef
} from "react";

import {
  motion,
  AnimatePresence
} from "framer-motion";

// ======================================================
// 🔌 API + AUTH
// ======================================================

import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

// ======================================================
// 🔌 SOCKET
// ======================================================

import socket from "../socket";

// ======================================================
// 🔥 TOASTS
// ======================================================

import toast, {
  Toaster
} from "react-hot-toast";

// ======================================================
// 🎨 ICONS
// ======================================================

import {
  Menu,
  X,
  Sparkles,
  Bell
} from "lucide-react";

// ======================================================
// 🧩 COMPONENTS
// ======================================================

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import DashboardStats from "../components/DashboardStats";

import ProjectList from "../components/ProjectList";

import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

import Notifications from "../components/Notifications";
import TaskAnalytics from "../components/TaskAnalytics";
import InviteMember from "../components/InviteMember";
import ProjectChat from "../components/ProjectChat";
import AIInsights from "../components/AIInsights";

export default function Dashboard() {

  // ======================================================
  // 🧠 STATE
  // ======================================================

  const [projects, setProjects] =
    useState([]);

  const [selectedProject,
    setSelectedProject] =
    useState(null);

  const [tasks, setTasks] =
    useState([]);

  const [mobileSidebarOpen,
    setMobileSidebarOpen] =
    useState(false);

  const [showNotifications,
    setShowNotifications] =
    useState(false);

  // ======================================================
  // 👤 PROFILE
  // ======================================================

  const [profile, setProfile] =
    useState(() => {

      const saved =
        localStorage.getItem(
          "freelancerProfile"
        );

      return saved
        ? JSON.parse(saved)
        : {
            name: "Freelancer",
            avatar: ""
          };
    });

  const fileInputRef =
    useRef(null);

  const { logout } = useAuth();

  // ======================================================
  // 💾 SAVE PROFILE
  // ======================================================

  useEffect(() => {

    localStorage.setItem(
      "freelancerProfile",
      JSON.stringify(profile)
    );

  }, [profile]);

  // ======================================================
  // 📥 FETCH PROJECTS
  // ======================================================

  const fetchProjects = async () => {

    try {

      const { data } =
        await API.get("/projects");

      setProjects(data);

    } catch (error) {

      console.error(error);
    }
  };

  // ======================================================
  // 📥 FETCH TASKS
  // ======================================================

  const fetchTasks = async (
    projectId
  ) => {

    try {

      const { data } =
        await API.get(
          `/tasks/${projectId}`
        );

      setTasks(
        data.tasks || data
      );

    } catch (error) {

      console.error(error);
    }
  };

  // ======================================================
  // 🚀 INITIAL LOAD
  // ======================================================

  useEffect(() => {

    fetchProjects();

  }, []);

  // ======================================================
  // 🔄 LOAD TASKS
  // ======================================================

  useEffect(() => {

    if (selectedProject) {

      fetchTasks(
        selectedProject._id
      );
    }

  }, [selectedProject]);

  // ======================================================
  // 🔌 JOIN PROJECT ROOM
  // ======================================================

  useEffect(() => {

    if (selectedProject) {

      socket.emit(
        "joinProject",
        selectedProject._id
      );
    }

  }, [selectedProject]);

  // ======================================================
  // ⚡ REAL-TIME TASK UPDATES
  // ======================================================

  useEffect(() => {

    socket.on(
      "taskUpdated",
      () => {

        if (selectedProject) {

          fetchTasks(
            selectedProject._id
          );
        }
      }
    );

    return () => {

      socket.off(
        "taskUpdated"
      );
    };

  }, [selectedProject]);

  // ======================================================
  // 📁 ADD PROJECT FROM DEVICE
  // ======================================================

  const handleAddProject =
    (event) => {

      const file =
        event.target.files[0];

      if (!file) return;

      const newProject = {

        _id: Date.now(),

        name:
          file.name.replace(
            /\.[^/.]+$/,
            ""
          ),

        localFile: true
      };

      setProjects(prev => [
        newProject,
        ...prev
      ]);

      toast.success(
        "Project added successfully"
      );
    };

  // ======================================================
  // 🤖 AI INSIGHTS
  // ======================================================

  const aiSuggestions = useMemo(() => {

    if (!tasks.length) {

      return [
        "Create tasks to unlock AI productivity insights."
      ];
    }

    const suggestions = [];

    const completed =
      tasks.filter(
        task =>
          task.status === "completed"
      ).length;

    const pending =
      tasks.filter(
        task =>
          task.status !== "completed"
      ).length;

    if (completed >= 5) {

      suggestions.push(
        "Excellent productivity detected."
      );
    }

    if (pending >= 10) {

      suggestions.push(
        "Large number of pending tasks detected."
      );
    }

    if (
      suggestions.length === 0
    ) {

      suggestions.push(
        "Project performance is stable and healthy."
      );
    }

    return suggestions;

  }, [tasks]);

  // ======================================================
  // 🎨 GLASS CARD
  // ======================================================

  const glassCard = `
    bg-slate-800/70
    backdrop-blur-xl
    border
    border-slate-700
    rounded-3xl
    shadow-lg
  `;

  // ======================================================
  // 🎨 UI
  // ======================================================

  return (

    <div className="
      relative
      overflow-hidden
      flex
      flex-col
      lg:flex-row
      min-h-screen
      bg-gradient-to-br
      from-slate-950
      via-slate-900
      to-black
      text-white
    ">

      <Toaster position="top-right" />

      {/* MOBILE MENU */}

      <button

        onClick={() =>
          setMobileSidebarOpen(true)
        }

        className="
          lg:hidden
          fixed
          top-4
          left-4
          z-50
          bg-slate-800
          border
          border-slate-700
          p-3
          rounded-2xl
        "
      >

        <Menu className="w-6 h-6" />

      </button>

      {/* SIDEBAR */}

      <div className="hidden lg:block">

        <Sidebar
          logout={logout}
          onNotificationsClick={() =>
            setShowNotifications(
              prev => !prev
            )
          }
        />

      </div>

      {/* MOBILE SIDEBAR */}

      <AnimatePresence>

        {mobileSidebarOpen && (

          <motion.div

            initial={{
              opacity: 0
            }}

            animate={{
              opacity: 1
            }}

            exit={{
              opacity: 0
            }}

            className="
              fixed
              inset-0
              z-50
              bg-black/60
            "
          >

            <motion.div

              initial={{
                x: -300
              }}

              animate={{
                x: 0
              }}

              exit={{
                x: -300
              }}

              className="
                w-[280px]
                h-full
                bg-slate-900
                p-4
              "
            >

              <button
                onClick={() =>
                  setMobileSidebarOpen(false)
                }
              >

                <X className="w-6 h-6" />

              </button>

              <Sidebar
                logout={logout}
                onNotificationsClick={() =>
                  setShowNotifications(
                    prev => !prev
                  )
                }
              />

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

      {/* MAIN */}

      <motion.div

        className="
          flex-1
          p-4
          md:p-8
          pt-20
          lg:pt-8
        "
      >

        {/* TOPBAR */}

        <Topbar
          profile={profile}
          setProfile={setProfile}
          onAddProject={() =>
            fileInputRef.current.click()
          }
          onNotificationsClick={() =>
            setShowNotifications(
              !showNotifications
            )
          }
        />

        {/* HIDDEN FILE INPUT */}

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleAddProject}
        />

        {/* NOTIFICATIONS */}

        <div id="notifications-section">

          <AnimatePresence>

            {showNotifications && (

              <motion.div

                initial={{
                  opacity: 0,
                  y: -20
                }}

                animate={{
                  opacity: 1,
                  y: 0
                }}

                exit={{
                  opacity: 0,
                  y: -20
                }}

                className={`
                  ${glassCard}
                  p-6
                  mb-8
                `}
              >

                <div className="
                  flex
                  items-center
                  gap-3
                  mb-4
                ">

                  <Bell className="
                    text-yellow-400
                  " />

                  <h2 className="
                    text-2xl
                    font-bold
                  ">

                    Notifications

                  </h2>

                </div>

                <Notifications />

              </motion.div>

            )}

          </AnimatePresence>

        </div>

        {/* STATS */}

        <DashboardStats
          projects={projects}
          tasks={tasks}
        />

        {/* ANALYTICS */}

        <div className="my-8">

          <TaskAnalytics
            tasks={tasks}
          />

        </div>

        {/* AI */}

        <div className={`
          ${glassCard}
          p-6
          mb-8
        `}>

          <div className="
            flex
            items-center
            gap-3
            mb-6
          ">

            <Sparkles className="
              text-purple-400
            " />

            <h2 className="
              text-2xl
              font-bold
            ">

              AI Insights

            </h2>

          </div>

          <AIInsights
            suggestions={
              aiSuggestions
            }
          />

        </div>

        {/* GRID */}

        <div className="
          grid
          grid-cols-1
          xl:grid-cols-3
          gap-6
        ">

          {/* PROJECTS */}

          <div
            id="projects-section"
            className={`
              ${glassCard}
              p-6
            `}
          >

            <div className="
              flex
              items-center
              justify-between
              mb-6
            ">

              <h2 className="
                text-2xl
                font-bold
              ">

                Projects

              </h2>

              <span className="
                px-3
                py-1
                rounded-full
                bg-purple-500/20
                text-purple-300
              ">

                {projects.length}

              </span>

            </div>

            <button

              onClick={() =>
                fileInputRef.current.click()
              }

              className="
                w-full
                mb-6
                py-4
                rounded-2xl
                bg-gradient-to-r
                from-purple-500
                to-pink-500
                font-semibold
              "
            >

              Add Project From Device

            </button>

            <ProjectList
              projects={projects}
              setSelectedProject={
                setSelectedProject
              }
            />

          </div>

          {/* TASK PANEL */}

          <div className={`
            ${glassCard}
            xl:col-span-2
            p-6
          `}>

            {selectedProject ? (

              <>

                <h2 className="
                  text-4xl
                  font-bold
                  mb-6
                ">

                  {selectedProject.name}

                </h2>

                <InviteMember
                  projectId={
                    selectedProject._id
                  }
                />

                <TaskForm
                  projectId={
                    selectedProject._id
                  }
                  refreshTasks={() =>
                    fetchTasks(
                      selectedProject._id
                    )
                  }
                />

                <TaskList
                  tasks={tasks}
                  refreshTasks={() =>
                    fetchTasks(
                      selectedProject._id
                    )
                  }
                />

                <ProjectChat
                  projectId={
                    selectedProject._id
                  }
                />

              </>

            ) : (

              <div className="
                text-center
                py-24
              ">

                <h3 className="
                  text-3xl
                  font-bold
                  mb-4
                ">

                  No Project Selected

                </h3>

                <p className="
                  text-gray-400
                ">

                  Select a project to begin.

                </p>

              </div>

            )}

          </div>

        </div>

      </motion.div>

    </div>
  );
}