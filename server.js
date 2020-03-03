const express = require("express");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

dotenv.config({ path: "./config/config.env" });

// connect database
connectDB();

// routes
const auth = require("./routes/auth");
const posts = require("./routes/posts");

const app = express();

// Body parser
app.use(express.json());

app.use("/api/auth", auth);
app.use("/api/posts", posts);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
