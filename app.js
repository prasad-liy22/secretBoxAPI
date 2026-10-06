const express = require("express");

const app = express();

app.use(express.json());

const PORT = 3000;

const messages = [
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

app.get('/api/messages', (req, res) => {
    res.json(messages);
});

app.post('/api/messages', (req, res) => {
    const newMessage = {
        id: messages.length + 1,
        message: req.body.message,
        createdAt: new Date().toISOString(),
    }

    messages.push(newMessage);
    res.status(201).json(newMessage);
});

app.listen(PORT, () => {
    console.log(`secretBoxAPI is running at ${PORT}`);
});