import { Server, Socket } from "socket.io";
import express, { Application } from "express";
import http from "http";
import cors from "cors";
import mongoose, { Error } from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth-routes";
import userRoutes from "./routes/user-routes";
import messageRoutes from "./routes/message-routes";
import { MessageModel } from "./models/message-model";
import { UserModel } from "./models/user-model";

dotenv.config();

const PORT = process.env.PORT || 3005;
const MONGO_URL = process.env.MONGO_URL;

const app: Application = express();
const httpServer = http.createServer(app);

/** Parse the body of the request */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/** Middleware */
app.use(express.json());
app.use(cors());

/**Controller routes  */
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/message", messageRoutes);

/** Rules of our API */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }

  next();
});

/** Mongo DB Connection */
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("MONGO DB Connection Established");
  })
  .catch((e: Error) => console.error(e));

/** Socket IO */
const io = new Server(httpServer, {
  pingInterval: 250,
  pingTimeout: 250,
  cors: {
    origin: "*",
    credentials: true,
  },
});

io.on("connection", (socket: Socket) => {
  socket.on("send-msg", async (data) => {
    const { from, to, message } = data;
    try {
      const newMessage = await MessageModel.create({
        message: { text: message },
        users: [from, to],
        sender: from,
      });

      io.emit("msg-received", { ...data, createdAt: newMessage.createdAt });
    } catch (err) {
      console.error("Error saving message:", err);
    }
  });

  socket.on("add-user", async (data) => {
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

httpServer.listen(PORT, () => {
  console.log("CONNECTED HTTP", PORT);
});

io.listen(3003);
