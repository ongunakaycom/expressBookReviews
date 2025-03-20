const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Route to Get the book list available in the shop
public_users.get('/', function (req, res) {
  const bookList = Object.values(books);  // Convert the book object to an array of books
  res.json(bookList);  // Send the list of books as a JSON response
});

// Route to Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const { isbn } = req.params;
  const book = books[isbn];  // Find the book by ISBN

  if (book) {
    res.json(book);  // Return the book if found
  } else {
    res.status(404).json({ message: "Book not found" });  // Return error if book not found
  }
});

// Route to Get books based on author
public_users.get('/author/:author', function (req, res) {
  const { author } = req.params;
  const booksByAuthor = Object.values(books).filter(b => b.author.toLowerCase() === author.toLowerCase());

  if (booksByAuthor.length > 0) {
    res.json(booksByAuthor);  // Return books by the author if found
  } else {
    res.status(404).json({ message: "No books found by this author" });
  }
});

// Route to Get books by title
public_users.get('/title/:title', function (req, res) {
  const { title } = req.params;
  const booksByTitle = Object.values(books).filter(b => b.title.toLowerCase().includes(title.toLowerCase()));

  if (booksByTitle.length > 0) {
    res.json(booksByTitle);  // Return books that match the title
  } else {
    res.status(404).json({ message: "No books found with this title" });
  }
});

// Route to Get book reviews based on ISBN
public_users.get('/review/:isbn', function (req, res) {
  const { isbn } = req.params;
  const book = books[isbn];

  if (book) {
    res.json(book.reviews);  // Return the reviews for the book
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

// Route to Register (future implementation)
public_users.post("/register", (req, res) => {
  // Placeholder for the registration code
  return res.status(300).json({ message: "Yet to be implemented" });
});

module.exports.general = public_users;
