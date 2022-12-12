const express = require("express");
const cors = require("cors");
require('dotenv').config();
const app = express();
const port = 5000;
const mongoose = require("mongoose");

const authRouter = require('./routes/auth');

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

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use('/api/auth', authRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
