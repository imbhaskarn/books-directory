require("dotenv").config();
const express = require("express");
const app = express();

const api = require("./api/api.routes");
app.use("/api/books", api);

require("pretty-error").start();

const mongoose = require("mongoose");
const Book = require("./model/book.model");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
mongoose.connect(process.env.URI, (err) => {
  if (!err) {
    console.log("connected to database succefully");
  } else {
    throw err;
  }
});
app.use(function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  next();
});

app.listen(process.env.PORT, () => {
  console.log("server listening...");
});