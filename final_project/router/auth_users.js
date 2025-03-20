const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

// Function to check if the username is valid
const isValid = (username) => {
    // Check if the username is already taken
    return !users.some(user => user.username === username);
};

// Function to authenticate user
const authenticatedUser = (username, password) => {
    // Check if username and password match the one we have in records
    return users.some(user => user.username === username && user.password === password);
};

// User registration route
regd_users.post("/register", (req, res) => {
    const { username, password } = req.body;

    // Check if the username is valid
    if (!isValid(username)) {
        return res.status(400).json({ message: 'User already exists.' });
    }

    // Create a new user
    const newUser = { username, password }; // In a real application, hash the password
    users.push(newUser);
    res.status(201).json({ message: 'User registered successfully.' });
});

// User login route
regd_users.post("/login", (req, res) => {
    const { username, password } = req.body;

    // Authenticate user
    if (authenticatedUser(username, password)) {
        // Generate a token (optional)
        const token = jwt.sign({ username }, 'your_jwt_secret', { expiresIn: '1h' });
        return res.status(200).json({ message: "Login successful", token });
    } else {
        return res.status(401).json({ message: "Invalid username or password" });
    }
});

// Add a book review (placeholder)
regd_users.put("/auth/review/:isbn", (req, res) => {
    // Write your code here
    return res.status(300).json({ message: "Yet to be implemented" });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
