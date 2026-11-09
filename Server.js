
const express = require('express');
const app = express();

const db = require('./db');
require('dotenv').config();
const Port = process.env.Port ||3000;


// Middleware
app.use(express.json());

// Person Routes
const personRoutes = require('./routes/personRoutes');
const menuRoutes=  require('./routes/menuRoutes');
app.use('/person', personRoutes);
app.use('/menu',menuRoutes);

// Home API
app.get('/', (req, res) => {
    res.send("Welcome to our Hotel");
});




// Start Server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

