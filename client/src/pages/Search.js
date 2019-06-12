import React, { Component } from "react";
// import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
// import { List, ListItem } from "../components/List";
import SearchResults from "../components/SearchResults";
import SearchForm from "../components/SearchForm";
// import { Input, TextArea, FormBtn } from "../components/Form";

class Search extends Component {
  state = {
    books: [],
    title: "",
    error: ""
  };

  componentDidMount() {
    this.loadBooks();
    console.log(this.state.books);
  }

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data.items })
      )
      .catch(err => console.log(err));
  };


  // deleteBook = id => {
  //   API.deleteBook(id)
  //     .then(res => this.loadBooks())
  //     .catch(err => console.log(err));
  // };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    API.searchBooks(this.state.search)
    .then(res => {
      if (res.data.items === "error") {
        throw new Error(res.data.items);
      }
      else {
        let results = res.data.items;
        results = results.map(result => {
          //map each book data into new object 
          result = {
              key: result.id,
              id: result.id,
              title: result.volumeInfo.title,
              authors: result.volumeInfo.authors,
              description: result.volumeInfo.description,
              image: result.volumeInfo.imageLinks.thumbnail,
              link: result.volumeInfo.infoLink
          }
          return result;
      })
      this.setState({ books: results, error: "" });
    }
  })
    .catch(err => this.setState({ error: err.items }));
};


  handleSavedButton = event => {
    event.preventDefault();
    console.log(this.state.books)
    let savedBooks = this.state.books.filter(book => book.id === event.target.id)
    savedBooks = savedBooks[0];
    API.saveBook(savedBooks)
        .then(this.setState({ message: alert("Your book is saved") }))
        .catch(err => console.log(err))
}

  render() {
    return (
      <Container fluid>
        <Row>
            <Jumbotron>
              <h1>Book Search</h1>
            </Jumbotron>
            {/* <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />

              <FormBtn
                disabled={!(this.state.title)}
                onClick={this.handleFormSubmit}
              >
                Submit Book
              </FormBtn>
            </form> */}
            <Container>
              <Row>
                <Col size="12"> 
                <SearchForm

                />
                </Col>
              </Row>
            </Container>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Results</h1>
            </Jumbotron>
            {this.state.books.length ? (
            <SearchResults books={this.state.books} handleSavedButton={this.handleSavedButton}/>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Search;
