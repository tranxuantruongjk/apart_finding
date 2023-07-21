const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = 5000;
const mongoose = require("mongoose");
const { Server } = require("socket.io");

const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");
const notificationRouter = require("./routes/notification");
const adminUserRouter = require("./routes/admin/user");
const adminPostRouter = require("./routes/admin/post");
const adminTypeRouter = require("./routes/admin/type");
const adminNotificationRouter = require("./routes/admin/notification");

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@apartfinding.liwqnyu.mongodb.net/?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connect to DB successfull!!");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

connectDB();

// app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(cors());

app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// app.get("/", (req, res) => {
//   res.send("Hello world");
// });

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/notifications", notificationRouter);
app.use("/api/admin/users", adminUserRouter);
app.use("/api/admin/posts", adminPostRouter);
app.use("/api/admin/types", adminTypeRouter);
app.use("/api/admin/notifications", adminNotificationRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const io = new Server({
  cors: {
    origin: "http://localhost:3000",
  },
});

let onlineUsers = [];

const addNewUser = (userId, socketId) => {
  !onlineUsers.some((user) => user.userId === userId) &&
    onlineUsers.push({ userId, socketId });
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return onlineUsers.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  // when connect
  console.log("someone has connected");
  //
  socket.on("addUser", (userId) => {
    addNewUser(userId, socket.id);
    console.log(onlineUsers);
    console.log("someone has logined");
  });
  //
  socket.on("sendNotification", (notification) => {
    console.log(notification);
    const user = getUser(notification.receiverId);
    console.log(user);
    user && io.to(user.socketId).emit("getNotification", notification);
  });

  socket.on("disconnect", () => {
    console.log("someone has left");

    removeUser(socket.id);
  });
});

io.listen(5001);
