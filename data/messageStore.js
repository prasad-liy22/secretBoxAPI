let nextId = 3;

const messages = [
    {
        id: 1,
        message: "I secretly enjoy debugging at 2 AM",
        createdAt: "2026-10-06"
    },
    {
        id: 2,
        message: "Sometimes I pretend I understand CSS completely",
        createdAt: "2026-10-06"
    }
];

const getMessages = () => {
    return messages;
};

const getNextId = () => {
    const id = nextId;
    nextId++;
    return id;
};

module.exports = {
    messages,
    getMessages,
    getNextId
};