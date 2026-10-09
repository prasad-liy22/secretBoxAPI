const validateMessage = (req, res, next) => {
    const { message } = req.body;

    // Check that the message field was provided.
    if (message === undefined) {
        return res.status(400).json({
            message: "Message field is required"
        });
    }

    // Ensure the message value is a string.
    if (typeof message !== "string") {
        return res.status(400).json({
            message: "Message must be a string"
        });
    }

    // Reject messages containing only whitespace.
    if (message.trim() === "") {
        return res.status(400).json({
            message: "Message cannot be empty"
        });
    }

    next();
};

module.exports = validateMessage;