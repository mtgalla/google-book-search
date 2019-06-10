import axios from "axios";

export default {
  // Gets all books
  getBooks: function() {
    return axios.get("https://www.googleapis.com/books/v1/volumes?q=harrypotter");
  },
  // Gets the book with the given id
  searchBook: function(title) {
    const book = "harrypotter";
    title = book;
    return axios.post("https://www.googleapis.com/books/v1/volumes?q=" + title);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  }
};
