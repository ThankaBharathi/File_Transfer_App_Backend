require('dotenv').config();
const mongoose = require('mongoose');

function connectDB() {
    // Database connection 🥳
    mongoose.connect(process.env.MONGO_CONNECTION_URL, {
        // No need for deprecated options
    });

    const connection = mongoose.connection;
    connection.once('open', () => {
        console.log('Database connected 🥳🥳🥳🥳');
    }).on('error', err => {
        console.log('Connection failed ☹️☹️☹️☹️', err);
    });
}

module.exports = connectDB;
