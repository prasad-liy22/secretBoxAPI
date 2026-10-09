require('dotenv').config();

const express = require("express");

const messageRoutes = require("./routes/messageRoute");
const errorHandler = require("./middleware/errorHandler");
const notFound = require("./middleware/notFound");
const pool = require("./config/db");
const { Result } = require('pg');

const app = express();

const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "SecretBox API is alive!",
        status: "success"
    });
});

pool.query("SELECT NOW()")
    .then((result => {
        console.log("Database connected:", result.rows[0]);
    }))
    .catch((err) => {
        console.log("Database connection faild:", err);
    })

app.use("/api/messages", messageRoutes);

app.use(notFound);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`SecretBox API is running on port ${PORT}`);
});