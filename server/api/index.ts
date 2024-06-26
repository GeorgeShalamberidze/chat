import { Server, Socket } from "socket.io";
import express, { Application } from "express";
import { MessageModel } from "../src/models/message-model";
import { UserModel } from "../src/models/user-model";
import { connectToDatabase } from "../src/mongo/mongodb";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "../src/routes/auth-routes";
import userRoutes from "../src/routes/user-routes";
import messageRoutes from "../src/routes/message-routes";

dotenv.config();

const PORT = process.env || 3005;

const app: Application = express();
const httpServer = http.createServer(app);

/** Middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["https://chat-frontend-ashy-five.vercel.app/login"],
    methods: ["GET", "POST"],
  })
);

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://chat-frontend-ashy-five.vercel.app/login"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Origin, Content-Type, Accept, Authorization"
  );

  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200).json({ msg: "ITS THIS ONE " });
  }

  next();
});

/** UPLOAD FILE */
// app.use("/file", express.static(path.join(__dirname, "./public")));

// const upload = multer({
//   dest: "./file",
// });

// app.post("/upload/file", upload.single("file"), async (req, res) => {
//   console.log(req.file);
//   const { originalname: filename, destination: path } = req.file; // Get file details

//   const newFile = await FileModel.create({
//     filename,
//     path,
//   });

//   newFile.save();

//   res.json({ message: "File uploaded successfully!", url: `/${filename}` });
// });

/** UPLOAD FILE */

/** Rules of API */

/**Controller routes  */
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/message", messageRoutes);
// app.use("/upload", uploadRoutes);

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

httpServer.listen(PORT, async () => {
  await connectToDatabase();
});

io.listen(3003);

export default app;
