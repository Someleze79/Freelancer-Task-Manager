// ======================================================
// LOGIN PAGE
// ======================================================

import { useState } from "react";
import {
  useNavigate,
  Link
} from "react-router-dom";

import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

// ======================================================
// REACT HOT TOAST
// ======================================================

import toast from "react-hot-toast";

// ======================================================
// FRAMER MOTION
// ======================================================

import { motion } from "framer-motion";

// ======================================================
// ICONS
// ======================================================

import {
  Mail,
  LockKeyhole,
  CheckCircle2,
  ShieldCheck,
  BriefcaseBusiness,
  BellRing,
  ArrowRight,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";

export default function Login() {

  // ======================================================
  // STATE
  // ======================================================

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] =
    useState(false);

  const navigate = useNavigate();

  const { login } = useAuth();

  // ======================================================
  // HANDLE LOGIN
  // ======================================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const { data } =
        await API.post(
          "/auth/login",
          form
        );

      login(data);

      toast.success(
        "Login successful"
      );

      navigate("/dashboard");

    } catch (error) {

      toast.error(
        "Invalid email or password"
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
      title: "Project Management",
      text: "Create projects, assign tasks and track progress in real-time.",
      icon: BriefcaseBusiness,
      bg: "from-purple-600 to-indigo-600"
    },

    {
      title: "Task Tracking",
      text: "Stay organized and never miss a deadline again.",
      icon: CheckCircle2,
      bg: "from-blue-600 to-cyan-600"
    },

    {
      title: "Smart Notifications",
      text: "Get notified about updates, tasks and important activities.",
      icon: BellRing,
      bg: "from-green-600 to-emerald-600"
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
          BACKGROUND EFFECTS
      ====================================================== */}

      <div className="
        absolute
        inset-0
        bg-[radial-gradient(circle_at_top_left,_rgba(124,58,237,0.25),transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(37,99,235,0.2),transparent_30%)]
      " />

      {/* FLOATING DOTS */}

      <motion.div
        animate={{
          y: [0, -20, 0]
        }}

        transition={{
          repeat: Infinity,
          duration: 6
        }}

        className="
          absolute
          top-40
          left-1/3
          w-3
          h-3
          rounded-full
          bg-purple-500
          blur-[1px]
        "
      />

      <motion.div
        animate={{
          y: [0, 20, 0]
        }}

        transition={{
          repeat: Infinity,
          duration: 5
        }}

        className="
          absolute
          bottom-32
          right-1/4
          w-4
          h-4
          rounded-full
          bg-blue-500
          blur-[1px]
        "
      />

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
          relative
          z-10
          px-16
          py-10
          flex-col
          justify-between
          border-r
          border-white/10
          bg-gradient-to-b
          from-[#0f172a]
          via-[#050816]
          to-black
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

          transition={{
            delay: 0.2
          }}

          className="
            flex
            items-center
            gap-3
          "
        >

          <div className="
            w-11
            h-11
            rounded-xl
            bg-gradient-to-br
            from-purple-500
            to-blue-500
            flex
            items-center
            justify-center
            shadow-lg
            shadow-purple-500/30
          ">

            <ShieldCheck className="w-6 h-6" />

          </div>

          <h1 className="
            text-3xl
            font-bold
          ">
            Freelancer Pro
          </h1>

        </motion.div>

        {/* ======================================================
            HERO CONTENT
        ====================================================== */}

        <div>

          <motion.h1

            initial={{
              opacity: 0,
              y: 30
            }}

            animate={{
              opacity: 1,
              y: 0
            }}

            transition={{
              delay: 0.3
            }}

            className="
              text-6xl
              xl:text-7xl
              font-black
              leading-tight
              mb-8
            "
          >

            Manage Projects.
            <br />

            Track Tasks.
            <br />

            <span className="
              bg-gradient-to-r
              from-purple-400
              to-blue-400
              text-transparent
              bg-clip-text
            ">

              Get Things Done.

            </span>

          </motion.h1>

          <motion.p

            initial={{
              opacity: 0
            }}

            animate={{
              opacity: 1
            }}

            transition={{
              delay: 0.5
            }}

            className="
              text-gray-300
              text-xl
              leading-relaxed
              max-w-xl
              mb-12
            "
          >

            Freelancer Pro helps you organize your
            projects, collaborate with your team
            and boost productivity. All in one place.

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
                    x: -30
                  }}

                  animate={{
                    opacity: 1,
                    x: 0
                  }}

                  transition={{
                    delay: 0.7 + index * 0.2
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

                  {/* ICON */}

                  <div className={`
                    w-16
                    h-16
                    rounded-2xl
                    bg-gradient-to-br
                    ${feature.bg}
                    flex
                    items-center
                    justify-center
                    shadow-xl
                  `}>

                    <Icon className="w-8 h-8" />

                  </div>

                  {/* TEXT */}

                  <div>

                    <h3 className="
                      text-2xl
                      font-bold
                      mb-1
                    ">
                      {feature.title}
                    </h3>

                    <p className="
                      text-gray-400
                      max-w-sm
                      leading-relaxed
                    ">
                      {feature.text}
                    </p>

                  </div>

                </motion.div>
              );
            })}

          </div>

        </div>

        {/* ======================================================
            DASHBOARD ILLUSTRATION
        ====================================================== */}

        <motion.div

          animate={{
            y: [0, -12, 0]
          }}

          transition={{
            repeat: Infinity,
            duration: 5
          }}

          className="
            relative
            mt-10
            flex
            justify-center
          "
        >

          {/* GLOW */}

          <div className="
            absolute
            inset-0
            bg-purple-500/20
            blur-3xl
          " />

          {/* MAIN CARD */}

          <div className="
            relative
            w-[420px]
            h-[240px]
            rounded-[2rem]
            border
            border-purple-500/20
            bg-gradient-to-br
            from-slate-900
            to-slate-950
            backdrop-blur-xl
            shadow-2xl
            overflow-hidden
          ">

            {/* TOP BAR */}

            <div className="
              flex
              gap-2
              px-5
              py-4
            ">

              <div className="
                w-3
                h-3
                rounded-full
                bg-red-500
              " />

              <div className="
                w-3
                h-3
                rounded-full
                bg-yellow-500
              " />

              <div className="
                w-3
                h-3
                rounded-full
                bg-green-500
              " />

            </div>

            {/* CONTENT */}

            <div className="
              grid
              grid-cols-3
              gap-4
              p-5
            ">

              {/* SIDEBAR */}

              <div className="
                bg-slate-800/80
                rounded-2xl
                p-3
                space-y-3
              ">

                {[1, 2, 3, 4].map((item) => (

                  <div
                    key={item}
                    className="
                      h-3
                      rounded-full
                      bg-slate-700
                    "
                  />

                ))}

              </div>

              {/* CONTENT AREA */}

              <div className="
                col-span-2
                grid
                grid-cols-2
                gap-3
              ">

                <div className="
                  bg-slate-800/80
                  rounded-2xl
                  h-24
                " />

                <div className="
                  bg-gradient-to-br
                  from-purple-600/30
                  to-blue-600/30
                  rounded-2xl
                  h-24
                  flex
                  items-center
                  justify-center
                ">

                  <motion.div

                    animate={{
                      rotate: 360
                    }}

                    transition={{
                      repeat: Infinity,
                      duration: 10,
                      ease: "linear"
                    }}

                    className="
                      w-14
                      h-14
                      border-4
                      border-purple-400
                      border-t-transparent
                      rounded-full
                    "
                  />

                </div>

                <div className="
                  bg-slate-800/80
                  rounded-2xl
                  h-20
                " />

                <div className="
                  bg-slate-800/80
                  rounded-2xl
                  h-20
                " />

              </div>

            </div>

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

        {/* LOGIN CARD */}

        <motion.div

          initial={{
            opacity: 0,
            scale: 0.95,
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
            max-w-xl
            bg-white/[0.03]
            backdrop-blur-2xl
            border
            border-white/10
            rounded-[2rem]
            overflow-hidden
            shadow-[0_0_80px_rgba(139,92,246,0.15)]
          "
        >

          {/* TOP SECTION */}

          <div className="
            p-8
            md:p-10
          ">

            {/* LOCK ICON */}

            <motion.div

              animate={{
                y: [0, -8, 0]
              }}

              transition={{
                repeat: Infinity,
                duration: 3
              }}

              className="
                w-24
                h-24
                mx-auto
                rounded-full
                bg-gradient-to-br
                from-purple-600/30
                to-blue-600/20
                border
                border-purple-500/20
                flex
                items-center
                justify-center
                mb-8
              "
            >

              <LockKeyhole className="
                w-10
                h-10
                text-purple-300
              " />

            </motion.div>

            {/* TITLE */}

            <h2 className="
              text-5xl
              font-bold
              text-center
              mb-3
            ">
              Welcome Back!
            </h2>

            <p className="
              text-gray-400
              text-center
              text-lg
              mb-10
            ">
              Sign in to continue to your account
            </p>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              {/* EMAIL */}

              <div>

                <label className="
                  block
                  mb-3
                  text-sm
                  font-medium
                ">
                  Email Address
                </label>

                <div className="
                  flex
                  items-center
                  bg-white/[0.03]
                  border
                  border-white/10
                  focus-within:border-purple-500
                  rounded-2xl
                  px-5
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
                      p-5
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
                  mb-3
                  text-sm
                  font-medium
                ">
                  Password
                </label>

                <div className="
                  flex
                  items-center
                  bg-white/[0.03]
                  border
                  border-white/10
                  focus-within:border-purple-500
                  rounded-2xl
                  px-5
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
                      p-5
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

              {/* OPTIONS */}

              <div className="
                flex
                justify-between
                items-center
                text-sm
              ">

                <label className="
                  flex
                  items-center
                  gap-2
                  cursor-pointer
                ">

                  <input
                    type="checkbox"
                    className="accent-purple-500"
                  />

                  Remember me

                </label>

                <button
                  type="button"
                  className="
                    text-purple-400
                    hover:text-purple-300
                  "
                >
                  Forgot password?
                </button>

              </div>

              {/* LOGIN BUTTON */}

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
                  p-5
                  rounded-2xl
                  font-semibold
                  text-lg
                  shadow-lg
                  shadow-purple-500/20
                  flex
                  justify-center
                  items-center
                  gap-3
                "
              >

                {loading ? (

                  <div className="
                    w-6
                    h-6
                    border-2
                    border-white
                    border-t-transparent
                    rounded-full
                    animate-spin
                  " />

                ) : (

                  <>
                    <ArrowRight className="w-5 h-5" />
                    Login
                  </>

                )}

              </motion.button>

            </form>

            {/* DIVIDER */}

            <div className="
              flex
              items-center
              gap-4
              my-8
            ">

              <div className="
                flex-1
                h-px
                bg-white/10
              " />

              <span className="
                text-gray-400
              ">
                or continue with
              </span>

              <div className="
                flex-1
                h-px
                bg-white/10
              " />

            </div>

            {/* SOCIAL LOGIN */}

            <div className="
              grid
              grid-cols-2
              gap-4
            ">

              {/* GOOGLE */}

              <motion.button

                whileHover={{
                  scale: 1.02
                }}

                whileTap={{
                  scale: 0.97
                }}

                onClick={() =>
                  toast("Google login coming soon")
                }

                className="
                  bg-white/[0.03]
                  border
                  border-white/10
                  hover:border-purple-500
                  transition-all
                  rounded-2xl
                  p-4
                  flex
                  items-center
                  justify-center
                  gap-3
                "
              >

                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="w-6 h-6"
                />

                Google

              </motion.button>

              {/* GITHUB */}

              <motion.button

                whileHover={{
                  scale: 1.02
                }}

                whileTap={{
                  scale: 0.97
                }}

                onClick={() =>
                  toast("GitHub login coming soon")
                }

                className="
                  bg-white/[0.03]
                  border
                  border-white/10
                  hover:border-purple-500
                  transition-all
                  rounded-2xl
                  p-4
                  flex
                  items-center
                  justify-center
                  gap-3
                "
              >

                <FaGithub className="w-6 h-6" />

                GitHub

              </motion.button>

            </div>

          </div>

          {/* FOOTER */}

          <div className="
            border-t
            border-white/10
            py-6
            text-center
            text-gray-400
          ">

            Don't have an account?{" "}

            <Link
              to="/register"
              className="
                text-purple-400
                hover:text-purple-300
                font-semibold
              "
            >
              Sign up
            </Link>

          </div>

        </motion.div>

      </div>

    </div>
  );
}