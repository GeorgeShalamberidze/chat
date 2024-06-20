import express, { Application } from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";

const PORT = process.env.PORT || 3005;

const app: Application = express();
const httpServer = http.createServer(app);

// Middleware
app.use(express.json());
app.use(cors());

// Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: process.env.NODE_ENV === "production" ? false : "*",
  },
});

io.on("Connection", (socket: Socket) => {
  console.log("connected!!!!: ", socket);

  socket.on("join-room", (room: string) => {
    socket.join(room);
    console.log(`Client joined room: ${room}`);
  });

  socket.on("send-message", (message: string) => {
    io.to([...socket.rooms]).emit("receive-message", message);
    console.log(`Broadcasted message: ${message}`);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

httpServer.listen(PORT, () => {
  console.log("CONNECTED HTTP");
});
