const express = require('express');
const cors = require('cors');  // Import the CORS module
const jwt = require('jsonwebtoken');
const session = require('express-session');
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

// Use CORS middleware
app.use(cors());  // Enable CORS for all routes

app.use(express.json());

app.use("/customer", session({ secret: "fingerprint_customer", resave: true, saveUninitialized: true }));

app.use("/customer/auth/*", function auth(req, res, next) {
    // Write the authentication mechanism here
    next();
});

const PORT = 5000;
const HOST = "127.0.0.1"; // Ensures the server only listens on localhost

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT, HOST, () => console.log(`Server is running on http://${HOST}:${PORT}`));
