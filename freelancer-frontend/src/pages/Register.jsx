// ======================================================
// REGISTER PAGE
// ======================================================

import { useState } from "react";

import {
  useNavigate,
  Link
} from "react-router-dom";

import API from "../api/axios";

// ======================================================
// REACT HOT TOAST
// ======================================================

import toast from "react-hot-toast";

// ======================================================
// 🎞️ FRAMER MOTION
// ======================================================

import { motion } from "framer-motion";

// ======================================================
// ICONS
// ======================================================

import {
  User,
  Mail,
  LockKeyhole,
  CheckCircle2,
  FolderKanban,
  BellRing,
  CheckSquare
} from "lucide-react";

export default function Register() {

  // ======================================================
  // STATE
  // ======================================================

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] =
    useState(false);

  const navigate = useNavigate();

  // ======================================================
  // HANDLE REGISTER
  // ======================================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      await API.post(
        "/auth/register",
        form
      );

      // ======================================================
      // SUCCESS TOAST
      // ======================================================

      toast.success(
        "Account created successfully!"
      );

      navigate("/");

    } catch (error) {

      // ======================================================
      // ERROR TOAST
      // ======================================================

      toast.error(
        error?.response?.data?.message ||
        "Registration failed"
      );

    } finally {

      setLoading(false);
    }
  };

  // ======================================================
  // FEATURES
  // ======================================================

  const features = [
    {
      title: "Project Collaboration",
      description:
        "Work together with your team in real-time.",
      icon: FolderKanban,
      color: "from-purple-500 to-indigo-500"
    },

    {
      title: "Advanced Task Tracking",
      description:
        "Manage deadlines and priorities easily.",
      icon: CheckSquare,
      color: "from-blue-500 to-cyan-500"
    },

    {
      title: "Smart Notifications",
      description:
        "Stay updated with instant alerts.",
      icon: BellRing,
      color: "from-green-500 to-emerald-500"
    }
  ];

  // ======================================================
  // UI
  // ======================================================

  return (

    <div className="
      min-h-screen
      bg-black
      text-white
      flex
      overflow-hidden
      relative
    ">

      {/* ======================================================
          BACKGROUND GLOW
      ====================================================== */}

      <div className="
        absolute
        top-[-200px]
        left-[-150px]
        w-[500px]
        h-[500px]
        bg-purple-600/20
        blur-[120px]
        rounded-full
      " />

      <div className="
        absolute
        bottom-[-200px]
        right-[-150px]
        w-[500px]
        h-[500px]
        bg-blue-600/20
        blur-[120px]
        rounded-full
      " />

      {/* ======================================================
          FLOATING PARTICLES
      ====================================================== */}

      <div className="
        absolute
        inset-0
        overflow-hidden
        pointer-events-none
      ">

        {[...Array(15)].map((_, i) => (

          <motion.div
            key={i}

            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2]
            }}

            transition={{
              duration: 4 + i,
              repeat: Infinity
            }}

            className="
              absolute
              w-2
              h-2
              bg-purple-500
              rounded-full
            "

            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />

        ))}

      </div>

      {/* ======================================================
          LEFT SIDE
      ====================================================== */}

      <motion.div

        initial={{
          opacity: 0,
          x: -40
        }}

        animate={{
          opacity: 1,
          x: 0
        }}

        transition={{
          duration: 0.7
        }}

        className="
          hidden
          lg:flex
          w-1/2
          bg-gradient-to-b
          from-purple-950
          to-black
          p-16
          flex-col
          relative
          z-10
          overflow-hidden
        "
      >

        {/* ======================================================
            LOGO
        ====================================================== */}

        <motion.div

          initial={{
            opacity: 0,
            y: -20
          }}

          animate={{
            opacity: 1,
            y: 0
          }}

          className="
            flex
            items-center
            gap-3
            mb-16
          "
        >

          <div className="
            w-12
            h-12
            rounded-2xl
            bg-gradient-to-br
            from-purple-500
            to-blue-500
            flex
            items-center
            justify-center
            shadow-lg
            shadow-purple-500/30
          ">

            <CheckCircle2 />

          </div>

          <h1 className="
            text-3xl
            font-bold
          ">

            Freelancer Pro

          </h1>

        </motion.div>

        {/* ======================================================
            TITLE
        ====================================================== */}

        <motion.h1

          initial={{
            opacity: 0,
            y: 20
          }}

          animate={{
            opacity: 1,
            y: 0
          }}

          transition={{
            delay: 0.2
          }}

          className="
            text-6xl
            xl:text-7xl
            font-bold
            leading-tight
            mb-8
          "
        >

          Build Better.
          <br />

          Work Faster.
          <br />

          <span className="
            text-transparent
            bg-clip-text
            bg-gradient-to-r
            from-purple-400
            to-blue-400
          ">

            Collaborate Smarter.

          </span>

        </motion.h1>

        {/* DESCRIPTION */}
        <motion.p

          initial={{
            opacity: 0
          }}

          animate={{
            opacity: 1
          }}

          transition={{
            delay: 0.4
          }}

          className="
            text-gray-300
            text-lg
            leading-relaxed
            max-w-lg
            mb-12
          "
        >

          Create projects, manage tasks,
          collaborate with teams,
          upload files,
          and boost productivity.

        </motion.p>

        {/* ======================================================
            FEATURES
        ====================================================== */}

        <div className="space-y-8">

          {features.map((feature, index) => {

            const Icon = feature.icon;

            return (

              <motion.div

                key={feature.title}

                initial={{
                  opacity: 0,
                  x: -20
                }}

                animate={{
                  opacity: 1,
                  x: 0
                }}

                transition={{
                  delay: 0.5 + index * 0.2
                }}

                whileHover={{
                  x: 8
                }}

                className="
                  flex
                  items-start
                  gap-5
                "
              >

                <div className={`
                  w-16
                  h-16
                  rounded-2xl
                  bg-gradient-to-br
                  ${feature.color}
                  flex
                  items-center
                  justify-center
                  shadow-lg
                `}>

                  <Icon className="
                    w-7
                    h-7
                  " />

                </div>

                <div>

                  <h3 className="
                    text-xl
                    font-semibold
                    mb-1
                  ">

                    {feature.title}

                  </h3>

                  <p className="
                    text-gray-400
                    max-w-sm
                  ">

                    {feature.description}

                  </p>

                </div>

              </motion.div>

            );
          })}

        </div>

        {/* ======================================================
            DASHBOARD MOCKUP
        ====================================================== */}

        <motion.div

          animate={{
            y: [0, -10, 0]
          }}

          transition={{
            repeat: Infinity,
            duration: 4
          }}

          className="
            absolute
            bottom-10
            left-10
            right-10
            h-64
            rounded-[2rem]
            border
            border-purple-500/20
            bg-gradient-to-br
            from-purple-900/20
            to-blue-900/10
            backdrop-blur-xl
            overflow-hidden
          "
        >

          <div className="
            h-14
            border-b
            border-slate-700
            flex
            items-center
            gap-3
            px-6
          ">

            <div className="
              w-3
              h-3
              rounded-full
              bg-red-400
            " />

            <div className="
              w-3
              h-3
              rounded-full
              bg-yellow-400
            " />

            <div className="
              w-3
              h-3
              rounded-full
              bg-green-400
            " />

          </div>

          <div className="
            grid
            grid-cols-2
            gap-4
            p-6
          ">

            {[1, 2, 3, 4].map((card) => (

              <motion.div
                key={card}

                animate={{
                  opacity: [0.6, 1, 0.6]
                }}

                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: card * 0.3
                }}

                className="
                  h-20
                  rounded-2xl
                  bg-slate-800/60
                  border
                  border-slate-700
                "
              />

            ))}

          </div>

        </motion.div>

      </motion.div>

      {/* ======================================================
          RIGHT SIDE
      ====================================================== */}

      <div className="
        flex-1
        flex
        justify-center
        items-center
        p-6
        md:p-10
        relative
        z-10
      ">

        {/* ======================================================
            REGISTER CARD
        ====================================================== */}

        <motion.div

          initial={{
            opacity: 0,
            scale: 0.9,
            y: 20
          }}

          animate={{
            opacity: 1,
            scale: 1,
            y: 0
          }}

          transition={{
            duration: 0.5
          }}

          className="
            w-full
            max-w-md
            bg-slate-900/80
            backdrop-blur-xl
            border
            border-slate-700
            rounded-[2rem]
            p-8
            md:p-10
            shadow-2xl
          "
        >

          {/* TITLE */}
          <motion.h2

            initial={{
              opacity: 0,
              y: 10
            }}

            animate={{
              opacity: 1,
              y: 0
            }}

            transition={{
              delay: 0.2
            }}

            className="
              text-4xl
              font-bold
              mb-2
            "
          >

            Create Account

          </motion.h2>

          <p className="
            text-gray-400
            mb-8
          ">

            Start managing your workflow

          </p>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* NAME */}
            <div>

              <label className="
                block
                mb-2
                text-sm
              ">
                Full Name
              </label>

              <div className="
                flex
                items-center
                bg-slate-800
                border
                border-slate-700
                focus-within:border-purple-500
                rounded-2xl
                px-4
                transition-all
              ">

                <User className="
                  text-gray-400
                  w-5
                " />

                <input
                  type="text"
                  placeholder="Enter your name"
                  className="
                    w-full
                    bg-transparent
                    p-4
                    outline-none
                  "
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value
                    })
                  }
                />

              </div>

            </div>

            {/* EMAIL */}
            <div>

              <label className="
                block
                mb-2
                text-sm
              ">
                Email
              </label>

              <div className="
                flex
                items-center
                bg-slate-800
                border
                border-slate-700
                focus-within:border-purple-500
                rounded-2xl
                px-4
                transition-all
              ">

                <Mail className="
                  text-gray-400
                  w-5
                " />

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="
                    w-full
                    bg-transparent
                    p-4
                    outline-none
                  "
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value
                    })
                  }
                />

              </div>

            </div>

            {/* PASSWORD */}
            <div>

              <label className="
                block
                mb-2
                text-sm
              ">
                Password
              </label>

              <div className="
                flex
                items-center
                bg-slate-800
                border
                border-slate-700
                focus-within:border-purple-500
                rounded-2xl
                px-4
                transition-all
              ">

                <LockKeyhole className="
                  text-gray-400
                  w-5
                " />

                <input
                  type="password"
                  placeholder="Enter your password"
                  className="
                    w-full
                    bg-transparent
                    p-4
                    outline-none
                  "
                  onChange={(e) =>
                    setForm({
                      ...form,
                      password: e.target.value
                    })
                  }
                />

              </div>

            </div>

            {/* BUTTON */}
            <motion.button

              whileHover={{
                scale: 1.02
              }}

              whileTap={{
                scale: 0.97
              }}

              disabled={loading}

              className="
                w-full
                bg-gradient-to-r
                from-purple-600
                to-blue-600
                hover:from-purple-700
                hover:to-blue-700
                transition-all
                duration-300
                p-4
                rounded-2xl
                font-semibold
                shadow-lg
                shadow-purple-500/20
              "
            >

              {loading ? (

                <div className="
                  flex
                  justify-center
                  items-center
                  gap-3
                ">

                  <div className="
                    w-5
                    h-5
                    border-2
                    border-white
                    border-t-transparent
                    rounded-full
                    animate-spin
                  " />

                  Creating Account...

                </div>

              ) : (

                "Sign Up"

              )}

            </motion.button>

          </form>

          {/* LOGIN LINK */}
          <p className="
            text-center
            text-gray-400
            mt-8
          ">

            Already have an account?{" "}

            <Link
              to="/"
              className="
                text-purple-400
                hover:text-purple-300
                font-semibold
              "
            >

              Login

            </Link>

          </p>

        </motion.div>

      </div>

    </div>
  );
}