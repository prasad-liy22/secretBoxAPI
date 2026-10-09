const errorHandler = (err, req, res, next) => {
    // Log the error for server-side debugging.
    console.log(err);

    // Send a generic response to avoid exposing internal error details.
    res.status(500).json({
        message: "Something went wrong on the server"
    });
}

module.exports = errorHandler;