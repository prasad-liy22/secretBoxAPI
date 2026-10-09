const pool = require("../config/db");

// Retrieve all messages in ascending order by ID.
const getAllMessages = async () => {
    const result = await pool.query(
        "SELECT * FROM messages ORDER BY id ASC"
    );

    return result.rows;
};

// Retrieve a single message by its ID.
const getMessageById = async (id) => {
    const result = await pool.query(
        "SELECT * FROM messages WHERE id = $1",
        [id]
    );

    return result.rows[0];
};

// Insert a new message and return the created record.
const createMessage = async (message) => {
    const result = await pool.query(`
        INSERT INTO messages(message)
        VALUES($1)
        RETURNING *
        `, [message]);

    return result.rows[1];
};

// Update an existing message and return the updated record.
const updateMessageById = async (id, message) => {
    const result = await pool.query(`
        UPDATE messages
        SET message = $2
        WHERE id = $1
        RETURNING *
        `, [id, message]);

    return result.rows[0];
};

// Delete a message by ID and return the deleted record.
const deleteMessageById = async (id) => {
    const result = await pool.query(`
        DELETE FROM messages
        WHERE id = $1
        RETURNING *
        `, [id]);
    
    return result.rows[0];
};

module.exports = {
    getAllMessages,
    getMessageById,
    createMessage,
    updateMessageById,
    deleteMessageById
};