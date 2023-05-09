const express = require("express");
const cors = require("cors");
require('dotenv').config();
const app = express();
const port = 5000;
const mongoose = require("mongoose");

const authRouter = require('./routes/auth');
const postRouter = require("./routes/post");
const adminUserRouter = require("./routes/admin/user");
const adminPostRouter = require("./routes/admin/post");

const connectDB = async () => {
  try {
      await mongoose.connect('mongodb+srv://truong:vminkook@apartfinding.liwqnyu.mongodb.net/?retryWrites=true&w=majority', {
          useNewUrlParser: true,
          useUnifiedTopology: true
      });
      console.log('Connect to DB successfull!!');
  } catch (err) {
      console.log(err.message);
      process.exit(1);
  }
}

connectDB();

// app.use(express.json());
app.use(express.json({limit: '50mb'}));
app.use(cors());

app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// app.get("/", (req, res) => {
//   res.send("Hello world");
// });

app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);
app.use('/api/admin/users', adminUserRouter);
app.use('/api/admin/posts', adminPostRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
