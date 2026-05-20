// ======================================================
// SOCKET.IO CLIENT
// ======================================================

import { io }
from "socket.io-client";

// ======================================================
// SOCKET CONNECTION
// ======================================================

const socket = io(

  import.meta.env.VITE_SOCKET_URL ||

  "http://localhost:5000",

  {
    transports: ["websocket"]
  }
);

export default socket;