const {
    getAllMessages: findAllMessages,
    getMessageById: findMessageById,
    createMessage: insertMessage,
    updateMessageById,
    deleteMessageById

} = require("../data/messageRepository");

const getAllMessages = async (req, res, next) => {
    try{
        // Retrieve and return all messages.
        const message = await findAllMessages();
        res.json(message);
    } catch(err) {
        next(err);
    }
};

const getMessageById = async (req, res, next) => {
    try{
        // Convert the route parameter to a numeric message ID.
        const messageId = Number(req.params.id);
        const message = await findMessageById(messageId);

        // Return a not-found response when the message does not exist.
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

const createMessage = async (req, res, next) => {
    try{
        // Create a message from the request body.
        const { message } = req.body;

        const newMessage = await insertMessage(message);

        res.status(201).json(newMessage);
    } catch(err) {
        next(err);
    }
};

const updateMessage = async (req, res, next) => {
    try{
        // Update the message identified by the route parameter.
        const messageId = Number(req.params.id);
        const newMessage = req.body;

        const updateMessage = await updateMessageById(
            messageId,
            newMessage
        );

        if (!updateMessage) {
            return res.status(404).json({
                message: "Message not found"
            });
        }

        res.json({
            message: "message updated successfully",
            updateMessage: updateMessage
        });
    } catch (err) {
        next(err);
    }
};

const deleteMessage = async (req, res, next) => {
    try {
        // Delete the message identified by the route parameter.
        const messageId = Number(req.params.id);

        const deletedMessage = await deleteMessageById(messageId);

        // Return a not-found response when no message was deleted.
        if (!deletedMessage) {
            return res.status(404).json({
                message: "Message not found"
            });
        }

        res.json({
            message: "Message deleted successfully",
            deletedMessage: deletedMessage
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllMessages,
    getMessageById,
    createMessage,
    updateMessage,
    deleteMessage
};