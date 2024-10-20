require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const cors = require('cors');

// CORS options
const corsOptions = {
    origin: process.env.ALLOWED_CLIENTS.split(','),
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify allowed HTTP methods
    preflightContinue: false,
    optionsSuccessStatus: 204 // Provide a status code for successful options requests
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Connect to the database
const connectDB = require('./config/db');
connectDB();

// Middleware to parse JSON requests
app.use(express.json());

// Set view engine and views directory
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Define routes
app.use('/api/files', require('./routes/files'));
app.use('/files', require('./routes/show'));
app.use('/files/download', require('./routes/download'));

// Start the server
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}.`);
});
