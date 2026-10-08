const express = require("express");

const {
    getAllMessages,
    getMessageById,
    createMessage,
    updateMessage,
    deleteMessage
} = require("../controllers/messageController");

const router = express.Router();

router.get("/", getAllMessages);

router.get("/:id", getMessageById);

router.post("/", createMessage);

router.patch("/:id", updateMessage);

router.delete("/:id", deleteMessage);

module.exports = router;