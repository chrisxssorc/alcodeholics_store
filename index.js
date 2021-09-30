// The web server
const express = require('express');
const server = express();

// Create logs for everything
const morgan = require('morgan');
server.use(morgan('dev'));

// Handle application/json requests
server.use(express.json());

// Static files
const path = require('path');
server.use(express.static(path.join(__dirname, 'build')));

// CORS
const cors = require('cors');
server.use(cors());

// API
server.use('./api', require('./routes'));

// By default, serve the react app if route is unrecognized
server.use((req, res, next) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Middleware for user authentication
const { verifyJWT } = require('./routes/user_utils');

const authMiddleware = (req, res, next) => {
    let authHeader = req.headers.authorization;

    if (authHeader) {
        authHeader = authHeader.slice(7);
        try {
            const decodedToken = verifyJWT(authHeader);

            req.user = decodedToken;
        } catch (error) {
            console.log('Invalid JWT')
        }
    }
    next();
}
server.use(authMiddleware);

// DB connection
const client = require('./db/client');

// Connect to server
const PORT = process.env.PORT || 5000;
server.listen(PORT, async () => {
    console.log(`Server is running on PORT ${PORT}!`);

    try {
        await client.connect();
        console.log("Database is open for business!");
    } catch (error) {
        console.error("Database is closed for repairs!\n", error)
    }
});