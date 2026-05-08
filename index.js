const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const http = require('http');
const server = http.createServer(app);

// Middleware 
app.use(cors());
app.use(express.json());

// Main Route para sa Browser 
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Server Status</title>
            <style>
                body {
                    font-family: 'Inter', sans-serif;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                    background-color: #fff;
                }
                h1 {
                    font-size: 1rem;
                    font-weight: 400;
                    text-transform: uppercase;
                    letter-spacing: 5px;
                    border: 1px solid #000;
                    padding: 20px 40px;
                }
            </style>
        </head>
        <body>
            <h1>Server Active</h1>
        </body>
        </html>
    `);
});

// Database Connection
const mongoURI = "mongodb://thewesaann:thewesaann@ac-1quvtsu-shard-00-00.s4a9grh.mongodb.net:27017,ac-1quvtsu-shard-00-01.s4a9grh.mongodb.net:27017,ac-1quvtsu-shard-00-02.s4a9grh.mongodb.net:27017/?ssl=true&replicaSet=atlas-wnt9ux-shard-0&authSource=admin&appName=SoftwareDesignDB";

mongoose.connect(mongoURI)
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

const submitFlowerform = require('./API/submit'); 
app.use('/submit', submitFlowerform);

// Start the server for Render
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});