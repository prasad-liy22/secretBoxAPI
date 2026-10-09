const notFound = (req, res) => {
    // Return a 404 response when no matching route is found.
    res.status(404).json({
        message: "Route not found",
    });
}

module.exports = notFound;