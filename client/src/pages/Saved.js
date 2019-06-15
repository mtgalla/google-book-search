import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import SavedBooks from "../components/SavedBooks"
import { Container } from "../components/Grid";

class Save extends Component {
  state = {
    savedBooks: []

  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ savedBooks: res.data }),
        console.log("looking for savedBooks here: ", this.state.savedBooks)
             )
      .catch(err => console.log(err));
  };

//   savedBooks = event => {
//     event.preventDefault();
//     console.log(this.state.books)
//     console.log(this.state.books[0].id)
//     let savedBooks = this.state.books.filter(book => book.id === event.target.id)
//     savedBooks = savedBooks[0];
//     console.log(savedBooks);
//     API.saveBook({
//       title: this.state.title,
//       authors: this.state.authors
//     })
//         .then(
//           res => this.loadBooks(),
//           this.setState({ message: alert("Your book is saved") })
//           )
//         .catch(err => console.log(err))
// }



  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  render() {
    return (
        <Container fluid className="container">
            <Jumbotron />
            <Container>
                <SavedBooks savedBooks={this.state.savedBooks} deleteBook={this.deleteBook} />
            </Container>
        </Container>
    )
}
}

export default Save;
