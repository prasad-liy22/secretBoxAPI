const express = require("express");

const app = express();

const PORT = 3000;

const message = [
    {
        id: 1,
        message: "I secretly enjoy debugging at 2 AM",
        createdAt: "2026-10-06"
    },
    {
        id: 2,
        message: "Sometimes I pretend I understand CSS completely",
        createdAt: "2026-10-06"
    }
];

app.get('/', (req, res) => {
    res.json({
        message: "secretBoxAPI is alive!",
        status: "sucess"
    }
    );
});

app.get('/api/message', (req, res) => {
    res.json(message);
});

app.listen(PORT, () => {
    console.log(`secretBoxAPI is running at ${PORT}`);
});