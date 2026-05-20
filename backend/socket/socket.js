// ======================================================
// 🔌 SOCKET.IO SERVER
// ======================================================

import { Server }
from "socket.io";

let io;

// ======================================================
// 🚀 INITIALIZE SOCKET SERVER
// ======================================================

export const initSocket = (server) => {

  io = new Server(server, {

    cors: {

      origin: [

        "http://localhost:5173",

        "https://freelancer-task-manager-pro.onrender.com"
      ],

      methods: [

        "GET",

        "POST",

        "PUT",

        "DELETE"
      ],

      credentials: true
    }

  });

  // ======================================================
  // 👤 USER CONNECTION
  // ======================================================

  io.on("connection", (socket) => {

    console.log(

      "⚡ User connected:",

      socket.id
    );

    // ======================================================
    // 📁 JOIN PROJECT ROOM
    // ======================================================

    socket.on(

      "joinProject",

      (projectId) => {

        socket.join(projectId);

        console.log(

          `📁 User joined project room: ${projectId}`
        );
      }
    );

    // ======================================================
    // 💬 CHAT MESSAGE
    // ======================================================

    socket.on(

      "sendMessage",

      (messageData) => {

        io.to(messageData.projectId)

          .emit(

            "receiveMessage",

            messageData
          );
      }
    );

    // ======================================================
    // ⌨️ TYPING INDICATOR
    // ======================================================

    socket.on(

      "typing",

      (data) => {

        socket.to(data.projectId)

          .emit(

            "userTyping",

            data
          );
      }
    );

    // ======================================================
    // ❌ DISCONNECT
    // ======================================================

    socket.on("disconnect", () => {

      console.log(

        "❌ User disconnected:",

        socket.id
      );
    });

  });

};

// ======================================================
// 📡 EXPORT SOCKET INSTANCE
// ======================================================

export const getIO = () => io;