import { Server, Socket } from "socket.io";
import express, { Application } from "express";
import { MessageModel } from "./models/message-model";
import { UserModel } from "./models/user-model";
import { connectToDatabase } from "./mongo/mongodb";
import http from "http";
import dotenv from "dotenv";
import authRoutes from "./routes/auth-routes";
import userRoutes from "./routes/user-routes";
import messageRoutes from "./routes/message-routes";
import uploadRoutes from "./routes/upload-routes";
import cors from "cors";
import path from "path";

dotenv.config();

const PORT = process.env.PORT || 3005;

const app: Application = express();
const httpServer = http.createServer(app);

/** Middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/file", express.static(path.join(__dirname, "./public")));

/**Controller routes  */
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/message", messageRoutes);
app.use("/upload", uploadRoutes);

/** Socket IO */
const io = new Server(httpServer, {
  pingInterval: 250,
  pingTimeout: 250,
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket: Socket) => {
  socket.on("send-msg", async (data) => {
    const { from, to, message, uploadUrl } = data;
    try {
      const newMessage = await MessageModel.create({
        message: { text: message, uploadUrl },
        users: [from, to],
        sender: from,
      });

      io.emit("msg-received", { ...data, createdAt: newMessage.createdAt });
    } catch (err) {
      console.error("Error saving message:", err);
    }
  });

  socket.on("add-user", async () => {
    try {
      /** exclude our ID from the collection */
      const users = await UserModel.find({}).select(["username", "_id"]);

      io.emit("user-added", users);
    } catch (error) {
      console.error(error);
    }
  });

  socket.on("disconnect", (data) => {
    console.log("disconnected. reason: ", data);
  });
});

httpServer.listen(PORT, async () => {
  connectToDatabase();
});

io.listen(3003);
