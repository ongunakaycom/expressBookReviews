let books = {
    1: {
        "author": "Chinua Achebe",
        "title": "Things Fall Apart",
        "reviews": {
            "review1": "A powerful story about the impact of colonialism.",
            "review2": "A must-read for anyone interested in African literature."
        }
    },
    2: {
        "author": "Hans Christian Andersen",
        "title": "Fairy tales",
        "reviews": {
            "review1": "Timeless tales that capture the imagination.",
            "review2": "Beautifully written stories for all ages."
        }
    },
    3: {
        "author": "Dante Alighieri",
        "title": "The Divine Comedy",
        "reviews": {
            "review1": "A profound exploration of the afterlife.",
            "review2": "A masterpiece of world literature."
        }
    },
    4: {
        "author": "Unknown",
        "title": "The Epic Of Gilgamesh",
        "reviews": {
            "review1": "One of the oldest stories in human history.",
            "review2": "A fascinating look at ancient Mesopotamian culture."
        }
    },
    5: {
        "author": "Unknown",
        "title": "The Book Of Job",
        "reviews": {
            "review1": "A deep philosophical inquiry into suffering.",
            "review2": "A classic text that resonates through the ages."
        }
    },
    6: {
        "author": "Unknown",
        "title": "One Thousand and One Nights",
        "reviews": {
            "review1": "A rich tapestry of stories and adventures.",
            "review2": "Captivating tales that have stood the test of time."
        }
    },
    7: {
        "author": "Unknown",
        "title": "Njál's Saga",
        "reviews": {
            "review1": "A gripping tale of revenge and honor.",
            "review2": "An essential read for fans of Norse literature."
        }
    },
    8: {
        "author": "Jane Austen",
        "title": "Pride and Prejudice",
        "reviews": {
            "review1": "A witty commentary on society and relationships.",
            "review2": "A timeless romance that remains popular today.",
            "review3": "A brilliant exploration of class and gender."
        }
    },
    9: {
        "author": "Honoré de Balzac",
        "title": "Le Père Goriot",
        "reviews": {
            "review1": "A deep dive into the complexities of human nature.",
            "review2": "A classic portrayal of Parisian society."
        }
    },
    10: {
        "author": "Samuel Beckett",
        "title": "Molloy, Malone Dies, The Unnamable, the trilogy",
        "reviews": {
            "review1": "A challenging but rewarding read.",
            "review2": "Beckett's unique style is captivating."
        }
    }
};

// Function to get books by title
function getBooksByTitle(title) {
    return Object.values(books).filter(book => book.title.toLowerCase().includes(title.toLowerCase()));
}

// Function to get reviews for a specific book by ID
function getReviewsByBookId(bookId) {
    const book = books[bookId];
    console.log('Book:', book); // Debugging line
    return book ? book.reviews : null;
}

// New function to get reviews by book title
function getReviewsByTitle(title) {
    const foundBooks = getBooksByTitle(title);
    if (foundBooks.length > 0) {
        return foundBooks.map(book => ({
            title: book.title,
            reviews: book.reviews
        }));
    }
    return null; // Return null if no books found
}

module.exports = { books, getBooksByTitle, getReviewsByBookId, getReviewsByTitle };
