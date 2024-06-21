import { Server, Socket } from "socket.io";
import express, { Application } from "express";
import http from "http";
import cors from "cors";
import mongoose, { Error } from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth-routes";
import userRoutes from "./routes/user-routes";

dotenv.config();

const PORT = process.env.PORT || 3005;
const MONGO_URL = process.env.MONGO_URL;

const app: Application = express();
const httpServer = http.createServer(app);

// Middleware
app.use(express.json());
app.use(cors());

// Controller routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

// Mongo DB Connection
mongoose
  .connect(MONGO_URL, {})
  .then(() => {
    console.log("MONGO DB Connection Established");
  })
  .catch((e: Error) => console.error(e));

// Socket IO
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("Connection", (socket: Socket) => {
  console.log("connected!!!!: ", socket.id);

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
  console.log("CONNECTED HTTP", PORT);
});
