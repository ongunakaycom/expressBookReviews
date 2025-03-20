const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;
const { books, getBooksByAuthor, getBooksByTitle, getReviewsByBookId, getReviewsByTitle } = require('./router/booksdb');

const app = express();

// Use CORS middleware
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Session middleware for customer routes
app.use("/customer", session({
    secret: "fingerprint_customer",
    resave: false,
    saveUninitialized: true
}));

// Authentication middleware for protected routes
app.use("/customer/auth/*", (req, res, next) => {
    if (!req.session || !req.session.user) {
        return res.status(401).json({ message: "Unauthorized. Please log in." });
    }
    next();
});

// ✅ GET books by author
app.get('/books/author/:name', (req, res) => {
    const authorName = req.params.name;
    const authorBooks = getBooksByAuthor(authorName);

    if (authorBooks.length > 0) {
        res.json(authorBooks);
    } else {
        res.status(404).json({ message: 'No books found for this author.' });
    }
});

// ✅ GET books by title
app.get('/books/title/:title', (req, res) => {
    const title = req.params.title;
    const titleBooks = getBooksByTitle(title);

    if (titleBooks.length > 0) {
        res.json(titleBooks);
    } else {
        res.status(404).json({ message: 'No books found with this title.' });
    }
});

// ✅ GET reviews by book ID
app.get('/books/reviews/:id', (req, res) => {
    const bookId = req.params.id;
    const reviews = getReviewsByBookId(bookId);

    if (reviews) {
        res.json(reviews);
    } else {
        res.status(404).json({ message: 'No reviews found for this book.' });
    }
});

// ✅ GET reviews by book title
app.get('/books/reviews/title/:title', (req, res) => {
    const title = req.params.title;
    const reviews = getReviewsByTitle(title);

    if (reviews) {
        res.json(reviews);
    } else {
        res.status(404).json({ message: 'No reviews found for this book title.' });
    }
});

// ✅ PUT Add or Edit Review (Anyone can modify reviews)
app.put('/books/review/:id', (req, res) => {
    const bookId = req.params.id;
    const { reviewId, reviewContent } = req.body; // Expecting reviewId and reviewContent in the request body

    if (!books[bookId]) {
        return res.status(404).json({ message: 'Book not found.' });
    }

    if (!reviewId || !reviewContent) {
        return res.status(400).json({ message: 'Review ID and content are required.' });
    }

    // Add or update the review
    books[bookId].reviews[reviewId] = reviewContent;
    res.json({ message: 'Review added/updated successfully.', reviews: books[bookId].reviews });
});

// Register customer and general routes
app.use("/customer", customer_routes);
app.use("/", genl_routes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal server error" });
});

// Start the server
const PORT = 5000;
const HOST = "127.0.0.1";

app.listen(PORT, HOST, () => console.log(`🚀 Server is running on http://${HOST}:${PORT}`));
