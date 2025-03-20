const express = require('express');
const cors = require('cors');  // Import the CORS module
const jwt = require('jsonwebtoken');
const session = require('express-session');
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;
const { books, getBooksByAuthor, getBooksByTitle, getReviewsByBookId, getReviewsByTitle } = require('./router/booksdb'); // Import books module

const app = express();

// Use CORS middleware
app.use(cors());  // Enable CORS for all routes

app.use(express.json());

app.use("/customer", session({ secret: "fingerprint_customer", resave: true, saveUninitialized: true }));

app.use("/customer/auth/*", function auth(req, res, next) {
    // Write the authentication mechanism here
    next();
});

// New route to get books by author
app.get('/books/author/:name', (req, res) => {
    const authorName = req.params.name;
    const authorBooks = getBooksByAuthor(authorName);
    
    if (authorBooks.length > 0) {
        res.json(authorBooks);
    } else {
        res.status(404).json({ message: 'No books found for this author.' });
    }
});

// New route to get books by title
app.get('/books/title/:title', (req, res) => {
    const title = req.params.title;
    const titleBooks = getBooksByTitle(title);
    
    if (titleBooks.length > 0) {
        res.json(titleBooks);
    } else {
        res.status(404).json({ message: 'No books found with this title.' });
    }
});

// New route to get reviews by book ID
app.get('/books/reviews/:id', (req, res) => {
    const bookId = req.params.id;
    const reviews = getReviewsByBookId(bookId);
    
    if (reviews) {
        res.json(reviews);
    } else {
        res.status(404).json({ message: 'No reviews found for this book.' });
    }
});

// New route to get reviews by book title
app.get('/books/reviews/title/:title', (req, res) => {
    const title = req.params.title;
    const reviews = getReviewsByTitle(title);
    
    if (reviews) {
        res.json(reviews);
    } else {
        res.status(404).json({ message: 'No reviews found for this book title.' });
    }
});

const PORT = 5000;
const HOST = "127.0.0.1"; // Ensures the server only listens on localhost

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT, HOST, () => console.log(`Server is running on http://${HOST}:${PORT}`));
