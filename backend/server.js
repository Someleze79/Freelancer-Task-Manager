// ======================================================
// 🚀 SERVER CONFIGURATION
// ======================================================

// Core Packages
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import http from "http";

// ======================================================
// 🔌 SOCKET.IO
// ======================================================

import { initSocket } from "./socket/socket.js";

// ======================================================
// 📦 ROUTES
// ======================================================

import authRoutes
from "./routes/authRoutes.js";

import testRoutes
from "./routes/testRoutes.js";

import projectRoutes
from "./routes/projectRoutes.js";

import taskRoutes
from "./routes/taskRoutes.js";

import dashboardRoutes
from "./routes/dashboardRoutes.js";

import notificationRoutes
from "./routes/notificationRoutes.js";

// ======================================================
// ⚙️ CONFIG
// ======================================================

dotenv.config();

// ======================================================
// 🚀 INITIALIZE EXPRESS
// ======================================================

const app = express();

// ======================================================
// 🌐 CREATE HTTP SERVER
// ======================================================

const server =
  http.createServer(app);

// ======================================================
// 🔌 INITIALIZE SOCKET.IO
// ======================================================

initSocket(server);

// ======================================================
// 🛡️ MIDDLEWARE
// ======================================================

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
  extended: true
}));

// ======================================================
// 📂 STATIC FILES
// ======================================================

app.use(
  "/uploads",
  express.static(
    path.resolve("uploads")
  )
);

// ======================================================
// 🛣️ API ROUTES
// ======================================================

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/test",
  testRoutes
);

app.use(
  "/api/projects",
  projectRoutes
);

app.use(
  "/api/tasks",
  taskRoutes
);

app.use(
  "/api/dashboard",
  dashboardRoutes
);

app.use(
  "/api/notifications",
  notificationRoutes
);

// ======================================================
// 🧪 TEST ROUTE
// ======================================================

app.get("/", (req, res) => {

  res.send("🚀 API is running...");

});

// ======================================================
// 🗄️ CONNECT TO MONGODB
// ======================================================

mongoose.connect(
  process.env.MONGO_URI
)

.then(() => {

  console.log(
    "✅ MongoDB Connected"
  );

})

.catch((error) => {

  console.error(
    "❌ MongoDB Connection Error:",
    error
  );

});

// ======================================================
// 🚀 START SERVER
// ======================================================

const PORT =
  process.env.PORT || 5000;

server.listen(PORT, () => {

  console.log(
    `🚀 Server running on port ${PORT}`
  );

});