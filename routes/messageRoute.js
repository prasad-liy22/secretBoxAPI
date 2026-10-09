const express = require("express");

const {
    getAllMessages,
    getMessageById,
    createMessage,
    updateMessage,
    deleteMessage
} = require("../controllers/messageController");

const validateMessage = require("../middleware/validateMessage");

const router = express.Router();

// Retrieve all messages.
router.get("/", getAllMessages);

// Retrieve a message by its ID.
router.get("/:id", getMessageById);

// Validate and create a new message.
router.post("/", validateMessage, createMessage);

// Validate and update an existing message.
router.patch("/:id", validateMessage, updateMessage);

// Delete a message by its ID.
router.delete("/:id", deleteMessage);

module.exports = router;