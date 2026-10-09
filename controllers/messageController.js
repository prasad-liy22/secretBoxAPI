const {
    getAllMessages: findAllMessages,
    getMessageById: findMessageById
} = require("../data/messageRepositroy");

const getAllMessages = async (req, res, next) => {
    try{
        const message = await findAllMessages();
        res.json(message);
    } catch(err) {
        next(err);
    }
};

const getMessageById = async (req, res, next) => {
    try{
        const messageId = Number(req.params.id);
        const message = await findMessageById(messageId);

        if (!message) {
                return res.status(404).json({
                    message: "Message not found"
                });
            }
        
        res.json(message);
    } catch(err) {
        next(err);
    }

};

const createMessage = (req, res) => {
    const { message } = req.body;


    const newMessage = {
        id: getNextId(),
        message: message,
        createdAt: new Date().toISOString()
    };

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