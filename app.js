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

let nextId = messages.at(-1).id;

// Testing the respond
app.get('/', (req, res) => {
    res.json({
        message: "secretBoxAPI is alive!",
        status: "sucess"
    }
    );
});

// Read all messages
app.get('/api/messages', (req, res) => {
    res.json(messages);
});

// Read message by Id
app.get("/api/messages/:id", (req, res) => {

    const messageId = Number((req.params.id));
    const message = messages.find((msg) => (msg.id == messageId));

    if (!message) {
        return res.status(404).json({
            message: "message not found"
        });
    }
    
    res.status(200).json(message);
});

// Create a message
app.post('/api/messages', (req, res) => {
    const newMessage = {
        id: nextId,
        message: req.body.message,
        createdAt: new Date().toISOString(),
    }

    if (message === undefined) {
        return res.status(400).json({
            message: "Message field is required"
        });
    }

    if (typeof message !== "string") {
        return res.status(400).json({
            message: "Message must be a string"
        });
    }

    if (message.trim() === "") {
        return res.status(400).json({
            message: "Message cannot be empty"
        });
    }

    nextId++;

    messages.push(newMessage);

    res.status(201).json(newMessage);
});

// Delete a meesage
app.delete("/api/messages/:id", (req, res) => {
    
    const messageId = Number(req.params.id);

    const messageIdx = messages.findIndex((message) => message.id === messageId);

    if (messageIdx === -1) {
        return res.status(404).json({
            message: "message not found"
        });
    }

    const deletedMessage = messages.splice(messageIdx, 1);

    res.json({
        message: "Message deleted successfully",
        deletedMessage: deletedMessage
    });
});

// Update a message
app.patch("/api/messages/:id", (req, res) => {
    
    const messageId = Number(req.params.id);
    const message = messages.find((message) => messageId === message.id);

    if (!message) {
        return res.status(404).json({
            message: "message not found"
        });
    }

    if (newMessage === undefined) {
        return res.status(400).json({
            message: "Message field is required"
        });
    }

    if (typeof newMessage !== "string") {
        return res.status(400).json({
            message: "Message must be a string"
        });
    }

    if (newMessage.trim() === "") {
        return res.status(400).json({
            message: "Message cannot be empty"
        });
    }
    
    if (req.body.newMessage !== undefined) {
        message.message = req.body.newMessage;
    }

    res.json({
        message: "Message sucessfully updated",
        updatedMessage: message
    });
});

app.listen(PORT, () => {
    console.log(`secretBoxAPI is running at ${PORT}`);
});