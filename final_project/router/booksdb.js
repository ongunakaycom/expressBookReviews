let books = {
    1: { "author": "Chinua Achebe", "title": "Things Fall Apart", "reviews": {} },
    2: { "author": "Hans Christian Andersen", "title": "Fairy Tales and Other Stories", "reviews": {} },
    3: { "author": "Dante Alighieri", "title": "The Divine Comedy", "reviews": {} },
    4: { "author": "Unknown", "title": "The Epic Of Gilgamesh", "reviews": {} },
    5: { "author": "Unknown", "title": "The Book Of Job", "reviews": {} },
    6: { "author": "Unknown", "title": "One Thousand and One Nights", "reviews": {} },
    7: { "author": "Unknown", "title": "Njál's Saga", "reviews": {} },
    8: { "author": "Jane Austen", "title": "Pride and Prejudice", "reviews": {} },
    9: { "author": "Honoré de Balzac", "title": "Le Père Goriot", "reviews": {} },
    10: { "author": "Samuel Beckett", "title": "Molloy, Malone Dies, The Unnamable, the trilogy", "reviews": {} }
};

// Function to get books by title
function getBooksByTitle(title) {
    return Object.values(books).filter(book => 
        book.title.toLowerCase().includes(title.toLowerCase())
    );
}

// Function to get books by author
function getBooksByAuthor(authorName) {
    return Object.values(books).filter(book => 
        book.author.toLowerCase().includes(authorName.toLowerCase())
    );
}

// Function to get reviews for a specific book by ID
function getReviewsByBookId(bookId) {
    const book = books[bookId];
    return book ? book.reviews : null;
}

// Function to get reviews by book title
function getReviewsByTitle(title) {
    const foundBooks = getBooksByTitle(title);
    return foundBooks.length > 0
        ? foundBooks.map(book => ({
            title: book.title,
            reviews: book.reviews
        }))
        : null;
}

module.exports = { books, getBooksByTitle, getBooksByAuthor, getReviewsByBookId, getReviewsByTitle };
