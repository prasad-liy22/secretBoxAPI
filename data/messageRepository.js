const pool = require("../config/db");

const getAllMessages = async () => {
    const result = await pool.query(
        "SELECT * FROM messages ORDER BY id ASC"
    );

    return result.rows;
};

const getMessageById = async (id) => {
    const result = await pool.query(
        "SELECT * FROM messages WHERE id = $1",
        [id]
    );

    return result.rows[0];
};

module.exports = {
    getAllMessages,
    getMessageById
};