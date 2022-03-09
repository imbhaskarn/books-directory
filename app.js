require("dotenv").config();
const express = require("express");
const app = express();

const mongoose = require("mongoose");
const Books = require("./model/book.model");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
const api = require("./api/books");
app.use("/api/books", api);
mongoose.connect(process.env.URI, (err) => {
  if (!err) {
    console.log("connected to database succefully");
  } else {
    console.log(err.message)
  }
});
app.use(function (req, res, next) {
  res.setHeader("Content-Type", "application/json");
  next();
});
app.listen(process.env.PORT || 4000, () => {
  console.log("Api ready!");
});