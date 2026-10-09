require('dotenv').config();

const express = require("express");

// Import application routes and middleware.
const messageRoutes = require("./routes/messageRoute");
const errorHandler = require("./middleware/errorHandler");
const notFound = require("./middleware/notFound");
const pool = require("./config/db");
const { Result } = require('pg');

const app = express();

const PORT = 3000;

// Parse incoming JSON request bodies.
app.use(express.json());

// Health-check endpoint.
app.get("/", (req, res) => {
    res.json({
        message: "SecretBox API is alive!",
        status: "success"
    });
});

// Verify the database connection when the server starts.
pool.query("SELECT NOW()")
    .then((result => {
        console.log("Database connected:", result.rows[0]);
    }))
    .catch((err) => {
        console.log("Database connection faild:", err);
    })

// Register API routes.
app.use("/api/messages", messageRoutes);

// Handle requests that do not match any route.
app.use(notFound);

// Handle application errors.
app.use(errorHandler);

// Start the HTTP server.
app.listen(PORT, () => {
    console.log(`SecretBox API is running on port ${PORT}`);
})