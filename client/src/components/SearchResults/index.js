import React from "react";
// import "./style.css";

function SearchResults(props) {
  return (
    <ul className="list-group search-results">
        {props.books.map(books => (
        <li key={books} className="list-group-item">
          <img alt="Book" src={books} className="img-fluid" />
        </li>
      ))}
    </ul>
  );
}
export default SearchResults;
