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

router.get("/", getAllMessages);

router.get("/:id", getMessageById);

router.post("/", validateMessage, createMessage);

router.patch("/:id", validateMessage, updateMessage);

router.delete("/:id", deleteMessage);

module.exports = router;