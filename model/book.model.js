const mongoose = require("mongoose");
const {
  Schema
} = mongoose;

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  author: {
    type: String,
    required: true
  },
  language: {
    type: String,
    require: true
  },
  publishedAt: {
    type: String
  },
  publication: {
    type: String,
    required: true
  },
  pages: Number
});
module.exports = mongoose.model("Book", bookSchema, "books");