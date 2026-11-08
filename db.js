const mongoose = require("mongoose");

// Define the MongoDB connection URL
const mongoUrl = "mongodb://127.0.0.1:27017/hotels";

// Setup MongoDB connection
mongoose.connect(mongoUrl);

// Get the default connection
const db = mongoose.connection;

// Define event listeners for database connection

db.on("connected", () => {
    console.log("Connected to MongoDB server");
});

db.on("error", (err) => {
    console.log("MongoDB connection error:", err);
});

db.on("disconnected", () => {
    console.log("MongoDB disconnected");
});

module.exports = db;