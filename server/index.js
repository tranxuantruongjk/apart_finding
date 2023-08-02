const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = 5000;
const mongoose = require("mongoose");

const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");
const notificationRouter = require("./routes/notification");
const adminUserRouter = require("./routes/admin/user");
const adminPostRouter = require("./routes/admin/post");
const adminTypeRouter = require("./routes/admin/type");
const adminNotificationRouter = require("./routes/admin/notification");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connect to DB successfull!!");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

connectDB();

app.use(express.json({ limit: "50mb" }));
app.use(cors());

app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

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
