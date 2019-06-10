const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: String,
  authors: String,
  description: String,
  link: {type: String },
  image: {type: String}
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
