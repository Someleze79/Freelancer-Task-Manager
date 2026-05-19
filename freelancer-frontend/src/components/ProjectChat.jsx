// ======================================================
// 💬 REAL-TIME PROJECT CHAT
// ======================================================

import {
  useState,
  useEffect,
  useRef
} from "react";

import { motion }
from "framer-motion";

import socket
from "../socket";

export default function ProjectChat({
  selectedProject
}) {

  // ======================================================
  // 🧠 STATE
  // ======================================================

  const [message, setMessage] =
    useState("");

  const [messages, setMessages] =
    useState([]);

  const [typing, setTyping] =
    useState("");

  const messagesEndRef =
    useRef(null);

  // ======================================================
  // 📩 RECEIVE MESSAGES
  // ======================================================

  useEffect(() => {

    socket.on(
      "receiveMessage",
      (data) => {

        setMessages((prev) => [
          ...prev,
          data
        ]);

      }
    );

    socket.on(
      "userTyping",
      (data) => {

        setTyping(
          `${data.user} is typing...`
        );

        setTimeout(() => {
          setTyping("");
        }, 2000);

      }
    );

    return () => {

      socket.off(
        "receiveMessage"
      );

      socket.off(
        "userTyping"
      );

    };

  }, []);

  // ======================================================
  // 🔽 AUTO SCROLL
  // ======================================================

  useEffect(() => {

    messagesEndRef.current
      ?.scrollIntoView({
        behavior: "smooth"
      });

  }, [messages]);

  // ======================================================
  // 📤 SEND MESSAGE
  // ======================================================

  const sendMessage = () => {

    if (!message.trim()) return;

    const data = {

      projectId:
        selectedProject._id,

      text: message,

      user: "Freelancer",

      createdAt:
        new Date()

    };

    socket.emit(
      "sendMessage",
      data
    );

    setMessage("");

  };

  // ======================================================
  // ⌨️ TYPING
  // ======================================================

  const handleTyping = () => {

    socket.emit(
      "typing",
      {
        projectId:
          selectedProject._id,

        user: "Freelancer"
      }
    );

  };

  // ======================================================
  // 🎨 UI
  // ======================================================

  return (

    <div className="
      bg-slate-900
      border
      border-slate-700
      rounded-3xl
      p-6
      mt-8
    ">

      {/* TITLE */}
      <h2 className="
        text-2xl
        font-bold
        mb-6
      ">
        Team Chat
      </h2>

      {/* MESSAGES */}
      <div className="
        h-[400px]
        overflow-y-auto
        space-y-4
        mb-4
        pr-2
      ">

        {messages.map(
          (msg, index) => (

            <motion.div

              key={index}

              initial={{
                opacity: 0,
                y: 10
              }}

              animate={{
                opacity: 1,
                y: 0
              }}

              className="
                bg-slate-800
                p-4
                rounded-2xl
              "
            >

              <div className="
                flex
                justify-between
                mb-2
              ">

                <p className="
                  font-semibold
                  text-purple-400
                ">
                  {msg.user}
                </p>

                <span className="
                  text-xs
                  text-gray-400
                ">

                  {new Date(
                    msg.createdAt
                  ).toLocaleTimeString()}

                </span>

              </div>

              <p>
                {msg.text}
              </p>

            </motion.div>

          )
        )}

        <div ref={messagesEndRef} />

      </div>

      {/* TYPING */}
      {typing && (

        <p className="
          text-sm
          text-gray-400
          mb-3
        ">
          {typing}
        </p>

      )}

      {/* INPUT */}
      <div className="
        flex
        gap-3
      ">

        <input
          type="text"
          value={message}
          onChange={(e) => {

            setMessage(
              e.target.value
            );

            handleTyping();

          }}

          placeholder="Type a message..."

          className="
            flex-1
            bg-slate-800
            p-4
            rounded-2xl
            outline-none
          "
        />

        <button

          onClick={sendMessage}

          className="
            bg-purple-600
            hover:bg-purple-700
            px-6
            rounded-2xl
          "
        >

          Send

        </button>

      </div>

    </div>
  );
}