// ======================================================
// 🔝 PREMIUM FULLY FUNCTIONAL RESPONSIVE TOPBAR
// ======================================================

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ======================================================
// 🎨 ICONS
// ======================================================

import {
  Sparkles,
  Bell,
  Plus,
  Camera,
  Pencil,
  X
} from "lucide-react";

export default function Topbar({
  onNotificationsClick,
  onAddProject
}) {

  // ======================================================
  // 👤 PROFILE STATE
  // ======================================================

  const [profile, setProfile] = useState(() => {

    const saved =
      localStorage.getItem("profile");

    return saved
      ? JSON.parse(saved)
      : {
          name: "Freelancer",
          avatar: ""
        };
  });

  const [showProfileMenu, setShowProfileMenu] =
    useState(false);

  const [showEditModal, setShowEditModal] =
    useState(false);

  const [newName, setNewName] =
    useState(profile.name);

  // ======================================================
  // 💾 SAVE PROFILE
  // ======================================================

  useEffect(() => {

    localStorage.setItem(
      "profile",
      JSON.stringify(profile)
    );

  }, [profile]);

  // ======================================================
  // 👋 GREETING
  // ======================================================

  const hour = new Date().getHours();

  let greeting = "Welcome";

  if (hour < 12) {

    greeting = "Good Morning";

  } else if (hour < 18) {

    greeting = "Good Afternoon";

  } else {

    greeting = "Good Evening";
  }

  // ======================================================
  // 🖼️ CHANGE PROFILE PICTURE
  // ======================================================

  const handleAvatarChange = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {

      setProfile(prev => ({
        ...prev,
        avatar: reader.result
      }));
    };

    reader.readAsDataURL(file);
  };

  // ======================================================
  // ✏️ SAVE NAME
  // ======================================================

  const handleSaveName = () => {

    if (!newName.trim()) return;

    setProfile(prev => ({
      ...prev,
      name: newName
    }));

    setShowEditModal(false);
  };

  // ======================================================
  // 🎨 UI
  // ======================================================

  return (

    <>
      <motion.div

        initial={{
          opacity: 0,
          y: -20
        }}

        animate={{
          opacity: 1,
          y: 0
        }}

        transition={{
          duration: 0.4
        }}

        className="
          flex
          flex-col
          xl:flex-row
          justify-between
          items-start
          xl:items-center
          gap-6
          mb-8
        "
      >

        {/* ======================================================
            🏷️ LEFT SIDE
        ====================================================== */}

        <div>

          <div className="
            flex
            items-center
            gap-2
            text-purple-400
            mb-3
          ">

            <Sparkles className="w-5 h-5" />

            <span className="
              text-sm
              md:text-base
              font-medium
            ">

              {greeting}

            </span>

          </div>

          <h1 className="
            text-3xl
            md:text-5xl
            font-bold
            leading-tight
          ">

            Dashboard

          </h1>

          <p className="
            text-gray-400
            mt-3
            text-sm
            md:text-base
          ">

            Manage your freelance workflow efficiently

          </p>

        </div>

        {/* ======================================================
            👤 RIGHT SIDE
        ====================================================== */}

        <div className="
          flex
          flex-wrap
          items-center
          gap-4
          w-full
          xl:w-auto
        ">

          {/* ======================================================
              ➕ ADD PROJECT
          ====================================================== */}

          <motion.button

            type="button"

            whileHover={{
              scale: 1.05
            }}

            whileTap={{
              scale: 0.95
            }}

            onClick={onAddProject}

            className="
              flex
              items-center
              gap-2

              bg-gradient-to-r
              from-purple-500
              to-pink-500

              px-5
              py-4

              rounded-2xl

              font-semibold
              shadow-lg
            "
          >

            <Plus className="w-5 h-5" />

            Add Project

          </motion.button>

          {/* ======================================================
              🔔 NOTIFICATIONS
          ====================================================== */}

          <motion.button

            type="button"

            whileHover={{
              scale: 1.05
            }}

            whileTap={{
              scale: 0.95
            }}

            onClick={onNotificationsClick}

            className="
              relative
              bg-slate-900/70
              border
              border-slate-700
              p-4
              rounded-2xl
            "
          >

            <Bell className="
              text-white
              w-5
              h-5
            " />

            <motion.div

              animate={{
                scale: [1, 1.3, 1]
              }}

              transition={{
                repeat: Infinity,
                duration: 1.5
              }}

              className="
                absolute
                top-2
                right-2
                w-2.5
                h-2.5
                rounded-full
                bg-purple-500
              "
            />

          </motion.button>

          {/* ======================================================
              👤 PROFILE CARD
          ====================================================== */}

          <div className="relative">

            <motion.button

              type="button"

              whileHover={{
                scale: 1.02
              }}

              onClick={() =>
                setShowProfileMenu(
                  !showProfileMenu
                )
              }

              className="
                flex
                items-center
                gap-4

                bg-slate-900/70

                border
                border-slate-700

                px-5
                py-3

                rounded-3xl
                shadow-xl
              "
            >

              <div className="text-left">

                <p className="
                  font-semibold
                  text-base
                  md:text-lg
                ">

                  {profile.name}

                </p>

                <p className="
                  text-gray-400
                  text-sm
                ">

                  Freelancer Admin

                </p>

              </div>

              <div className="
                overflow-hidden
                w-12
                h-12
                rounded-full
                bg-gradient-to-br
                from-purple-500
                to-indigo-600

                flex
                items-center
                justify-center
              ">

                {profile.avatar ? (

                  <img
                    src={profile.avatar}
                    alt="profile"
                    className="
                      w-full
                      h-full
                      object-cover
                    "
                  />

                ) : (

                  <span className="
                    text-lg
                    font-bold
                  ">

                    {profile.name.charAt(0)}

                  </span>
                )}

              </div>

            </motion.button>

            {/* ======================================================
                📋 DROPDOWN
            ====================================================== */}

            <AnimatePresence>

              {showProfileMenu && (

                <motion.div

                  initial={{
                    opacity: 0,
                    y: -10
                  }}

                  animate={{
                    opacity: 1,
                    y: 0
                  }}

                  exit={{
                    opacity: 0,
                    y: -10
                  }}

                  className="
                    absolute
                    right-0
                    mt-3
                    w-72

                    bg-slate-900
                    border
                    border-slate-700

                    rounded-2xl
                    p-4

                    shadow-2xl
                    z-50
                  "
                >

                  <label className="
                    flex
                    items-center
                    gap-3

                    cursor-pointer

                    p-3
                    rounded-xl

                    hover:bg-slate-800
                  ">

                    <Camera className="
                      w-5
                      h-5
                      text-purple-400
                    " />

                    Change Profile Picture

                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={
                        handleAvatarChange
                      }
                    />

                  </label>

                  <button

                    type="button"

                    onClick={() => {

                      setShowEditModal(true);

                      setShowProfileMenu(false);
                    }}

                    className="
                      flex
                      items-center
                      gap-3

                      w-full

                      p-3
                      rounded-xl

                      hover:bg-slate-800
                    "
                  >

                    <Pencil className="
                      w-5
                      h-5
                      text-cyan-400
                    " />

                    Edit Profile Name

                  </button>

                </motion.div>
              )}

            </AnimatePresence>

          </div>

        </div>

      </motion.div>

      {/* ======================================================
          ✏️ EDIT NAME MODAL
      ====================================================== */}

      <AnimatePresence>

        {showEditModal && (

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
              bg-black/60
              backdrop-blur-sm

              flex
              items-center
              justify-center

              z-[100]
            "
          >

            <motion.div

              initial={{
                scale: 0.9,
                opacity: 0
              }}

              animate={{
                scale: 1,
                opacity: 1
              }}

              exit={{
                scale: 0.9,
                opacity: 0
              }}

              className="
                bg-slate-900
                border
                border-slate-700

                rounded-3xl

                p-8

                w-[90%]
                max-w-md

                shadow-2xl
              "
            >

              {/* HEADER */}

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

                  Edit Profile Name

                </h2>

                <button

                  type="button"

                  onClick={() =>
                    setShowEditModal(false)
                  }
                >

                  <X className="
                    w-5
                    h-5
                  " />

                </button>

              </div>

              {/* INPUT */}

              <input

                type="text"

                value={newName}

                onChange={(e) =>
                  setNewName(
                    e.target.value
                  )
                }

                className="
                  w-full

                  bg-slate-800
                  border
                  border-slate-700

                  rounded-2xl

                  px-5
                  py-4

                  outline-none

                  focus:border-purple-500
                "
              />

              {/* BUTTONS */}

              <div className="
                flex
                justify-end
                gap-3
                mt-6
              ">

                <button

                  type="button"

                  onClick={() =>
                    setShowEditModal(false)
                  }

                  className="
                    px-5
                    py-3

                    rounded-2xl

                    bg-slate-700
                  "
                >

                  Cancel

                </button>

                <button

                  type="button"

                  onClick={handleSaveName}

                  className="
                    px-5
                    py-3

                    rounded-2xl

                    bg-gradient-to-r
                    from-purple-500
                    to-pink-500

                    font-semibold
                  "
                >

                  Save

                </button>

              </div>

            </motion.div>

          </motion.div>
        )}

      </AnimatePresence>

    </>
  );
}