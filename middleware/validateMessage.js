const validateMessage = (req, res, next) => {
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

    next();
};

module.exports = validateMessage;