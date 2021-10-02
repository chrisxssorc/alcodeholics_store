const client = require('./client');
const bcrypt = require('bcrypt');

async function getAllUsers() {
    const { rows } = await client.query(
        `SELECT id, username, "isAdmin"
        FROM users;
        `
    );

    return rows;
}

async function getUserById(userId) {
    const { rows: [user] } = await client.query(
        `SELECT id, username, "isAdmin"
        FROM users
        WHERE id=$1;
        `, [userId]
    );

    if (!user) {
        return null;
    }

    return user;
}

async function registerUser(username, password, isAdmin) {
    const hashedPassword = bcrypt.hashSync(password, 10);

    const { rows: [user] } = await client.query(
        `INSERT INTO users(username, password, "isAdmin")
        VALUES($1, $2, $3)
        ON CONFLICT (username) DO NOTHING
        RETURNING *;
        `, [username, hashedPassword, isAdmin]
    );

    return user;
}

async function loginUser(username, password) {
    const { rows: [user] } = await client.query(
        `SELECT * FROM users
        WHERE username=$1;
        `, [username]
    );

    if (!user) {
        return null;
    }

    const passwordMatches = bcrypt.compareSync(password, user.password);

    if (!passwordMatches) {
        return null;
    }

    return user;
}

module.exports = {
    getAllUsers,
    getUserById,
    registerUser,
    loginUser
};