require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./router");
const ErrorHandler = require("./ErrorHandler");

const app = express();
const port = process.env.PORT || 8000;

const mongoURI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/ecom";

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("MongoDB connected",mongoURI);
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.use(
  cors({
    "Access-Control-Allow-Origin": "*",
  })
);

app.use(express.json());
app.use("/", router);

app.use(ErrorHandler);

app.listen(port, () => {
  console.log("Server is running on port ", port);
});
