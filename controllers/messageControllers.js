let nextId = 3;

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

const getAllMessages = (req, res) => {
    res.json(messages);
};

const getMessageById = (req, res) => {
    const messageId = Number(req.params.id);

    const message = messages.find((msg) => msg.id === messageId);

    if (!message) {
        return res.status(404).json({
            message: "Message not found"
        });
    }

    res.json(message);
};

const createMessage = (req, res) => {
    const { message } = req.body;

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

    const newMessage = {
        id: nextId,
        message: message,
        createdAt: new Date().toISOString()
    };

    nextId++;

    messages.push(newMessage);

    res.status(201).json(newMessage);
};

const updateMessage = (req, res) => {
    const messageId = Number(req.params.id);

    const message = messages.find((msg) => msg.id === messageId);

    if (!message) {
        return res.status(404).json({
            message: "Message not found"
        });
    }

    const { message: newMessage } = req.body;

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

    message.message = newMessage;

    res.json({
        message: "Message updated successfully",
        updatedMessage: message
    });
};

const deleteMessage = (req, res) => {
    const messageId = Number(req.params.id);

    const messageIndex = messages.findIndex(
        (msg) => msg.id === messageId
    );

    if (messageIndex === -1) {
        return res.status(404).json({
            message: "Message not found"
        });
    }

    const deletedMessage = messages.splice(messageIndex, 1);

    res.json({
        message: "Message deleted successfully",
        deletedMessage: deletedMessage[0]
    });
};

module.exports = {
    getAllMessages,
    getMessageById,
    createMessage,
    updateMessage,
    deleteMessage
};