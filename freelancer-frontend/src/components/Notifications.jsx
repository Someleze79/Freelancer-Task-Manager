// ======================================================
// 🔔 PREMIUM REAL-TIME NOTIFICATIONS PANEL
// ======================================================

import {
  useEffect,
  useState
} from "react";

// ======================================================
// 🌐 API + SOCKET
// ======================================================

import API from "../api/axios";
import socket from "../socket";

// ======================================================
// 🎞️ FRAMER MOTION
// ======================================================

import {
  motion,
  AnimatePresence
} from "framer-motion";

// ======================================================
// 🎨 ICONS
// ======================================================

import {
  Bell,
  Clock3,
  CheckCircle2,
  Trash2
} from "lucide-react";

// ======================================================
// 🍞 TOAST
// ======================================================

import toast from "react-hot-toast";

export default function Notifications() {

  // ======================================================
  // 🧠 STATE
  // ======================================================

  const [notifications, setNotifications] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // ======================================================
  // 📥 FETCH NOTIFICATIONS
  // ======================================================

  const fetchNotifications =
    async () => {

      try {

        const { data } =
          await API.get(
            "/notifications"
          );

        setNotifications(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);
      }
    };

  // ======================================================
  // 🚀 INITIAL LOAD
  // ======================================================

  useEffect(() => {

    fetchNotifications();

  }, []);

  // ======================================================
  // 🔴 REAL-TIME SOCKET EVENTS
  // ======================================================

  useEffect(() => {

    socket.on(
      "newNotification",
      (notification) => {

        setNotifications(
          (prev) => [
            notification,
            ...prev
          ]
        );

        toast.success(
          notification.message
        );
      }
    );

    return () => {

      socket.off(
        "newNotification"
      );
    };

  }, []);

  // ======================================================
  // ✅ MARK AS READ
  // ======================================================

  const markAsRead =
    async (id) => {

      try {

        await API.put(
          `/notifications/${id}`
        );

        setNotifications(
          notifications.map(
            (note) =>

              note._id === id

                ? {
                    ...note,
                    read: true
                  }

                : note
          )
        );

      } catch (error) {

        console.error(error);
      }
    };

  // ======================================================
  // ❌ DELETE NOTIFICATION
  // ======================================================

  const deleteNotification =
    async (id) => {

      try {

        await API.delete(
          `/notifications/${id}`
        );

        setNotifications(
          notifications.filter(
            (note) =>
              note._id !== id
          )
        );

        toast.success(
          "Notification deleted"
        );

      } catch (error) {

        console.error(error);

        toast.error(
          "Failed to delete"
        );
      }
    };

  // ======================================================
  // 📊 UNREAD COUNT
  // ======================================================

  const unreadCount =
    notifications.filter(
      (note) => !note.read
    ).length;

  // ======================================================
  // 🎨 UI
  // ======================================================

  return (

    <motion.div

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
    >

      {/* ======================================================
          🏷️ HEADER
      ====================================================== */}

      <div className="
        flex
        flex-col
        sm:flex-row
        sm:items-center
        sm:justify-between
        gap-4
        mb-6
      ">

        {/* LEFT */}
        <div className="
          flex
          items-center
          gap-4
        ">

          <motion.div

            animate={{
              rotate: [0, 10, -10, 0]
            }}

            transition={{
              repeat: Infinity,
              duration: 2
            }}
          >

            <Bell
              className="
                text-purple-400
                w-8
                h-8
              "
            />

          </motion.div>

          <div>

            <h2 className="
              text-3xl
              font-bold
            ">

              Notifications

            </h2>

            <p className="
              text-gray-400
            ">

              Live project activity

            </p>

          </div>

        </div>

        {/* UNREAD COUNT */}
        <motion.div

          animate={{
            scale:
              unreadCount > 0
                ? [1, 1.1, 1]
                : 1
          }}

          transition={{
            repeat: Infinity,
            duration: 2
          }}

          className="
            bg-purple-500/20
            text-purple-300
            px-4
            py-2
            rounded-full
            text-sm
            font-semibold
            w-fit
          "
        >

          {unreadCount} Unread

        </motion.div>

      </div>

      {/* ======================================================
          📭 LOADING
      ====================================================== */}

      {loading ? (

        <div className="
          text-gray-400
          py-10
        ">

          Loading notifications...

        </div>

      ) : (

        <div className="space-y-4">

          <AnimatePresence>

            {notifications.length > 0 ? (

              notifications.map(
                (note, index) => (

                  <motion.div

                    key={note._id}

                    initial={{
                      opacity: 0,
                      x: 20
                    }}

                    animate={{
                      opacity: 1,
                      x: 0
                    }}

                    exit={{
                      opacity: 0,
                      x: -20
                    }}

                    transition={{
                      duration: 0.3,
                      delay:
                        index * 0.05
                    }}

                    whileHover={{
                      scale: 1.01,
                      x: 4
                    }}

                    className={`
                      bg-slate-900
                      border
                      rounded-3xl
                      p-5
                      transition-all
                      duration-300
                      shadow-lg
                      flex
                      flex-col
                      md:flex-row
                      md:items-center
                      md:justify-between
                      gap-5

                      ${
                        note.read

                          ? "border-slate-700"

                          : "border-purple-500"
                      }
                    `}
                  >

                    {/* ======================================================
                        LEFT
                    ====================================================== */}

                    <div className="
                      flex
                      gap-4
                    ">

                      <motion.div

                        animate={{
                          scale:
                            note.read

                              ? 1

                              : [1, 1.1, 1]
                        }}

                        transition={{
                          repeat: Infinity,
                          duration: 2
                        }}
                      >

                        <CheckCircle2
                          className="
                            text-green-400
                            w-6
                            h-6
                            mt-1
                          "
                        />

                      </motion.div>

                      <div>

                        <p className="
                          text-white
                          font-medium
                          leading-relaxed
                        ">

                          {note.message}

                        </p>

                        <div className="
                          flex
                          items-center
                          gap-2
                          mt-2
                          text-sm
                          text-gray-400
                        ">

                          <Clock3
                            className="
                              w-4
                              h-4
                            "
                          />

                          {new Date(
                            note.createdAt
                          ).toLocaleString()}

                        </div>

                      </div>

                    </div>

                    {/* ======================================================
                        ACTIONS
                    ====================================================== */}

                    <div className="
                      flex
                      items-center
                      gap-3
                    ">

                      {!note.read && (

                        <motion.button

                          whileHover={{
                            scale: 1.05
                          }}

                          whileTap={{
                            scale: 0.95
                          }}

                          onClick={() =>
                            markAsRead(
                              note._id
                            )
                          }

                          className="
                            bg-purple-600
                            hover:bg-purple-700
                            px-4
                            py-2
                            rounded-xl
                            text-sm
                            font-medium
                            transition
                          "
                        >

                          Mark Read

                        </motion.button>

                      )}

                      {/* DELETE */}
                      <motion.button

                        whileHover={{
                          scale: 1.05
                        }}

                        whileTap={{
                          scale: 0.95
                        }}

                        onClick={() =>
                          deleteNotification(
                            note._id
                          )
                        }

                        className="
                          bg-red-500/20
                          hover:bg-red-500
                          text-red-400
                          hover:text-white
                          p-3
                          rounded-xl
                          transition
                        "
                      >

                        <Trash2
                          className="
                            w-5
                            h-5
                          "
                        />

                      </motion.button>

                    </div>

                  </motion.div>

                )
              )

            ) : (

              // ======================================================
              // 📭 EMPTY STATE
              // ======================================================

              <motion.div

                initial={{
                  opacity: 0
                }}

                animate={{
                  opacity: 1
                }}

                className="
                  bg-slate-900
                  border
                  border-slate-700
                  rounded-3xl
                  p-12
                  text-center
                "
              >

                <Bell
                  className="
                    mx-auto
                    text-gray-500
                    w-14
                    h-14
                    mb-4
                  "
                />

                <h3 className="
                  text-2xl
                  font-bold
                  mb-2
                ">

                  No Notifications

                </h3>

                <p className="
                  text-gray-400
                ">

                  You're all caught up.

                </p>

              </motion.div>

            )}

          </AnimatePresence>

        </div>

      )}

    </motion.div>
  );
}