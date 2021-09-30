const client = require('./client');

const addToCart = async (userId, alcoholId) => {
    const { rows } = await client.query(
        `INSERT INTO cart("userId", "alcoholId")
        VALUES($1, $2)
        RETURNING *;
        `, [userId, alcoholId]
    );

    return rows;
}

const removeFromCart = async (userId, alcoholId) => {
    const { rows } = await client.query(
        `DELETE FROM cart
        WHERE "userId"=$1 AND id=$2
        RETURNING *;
        `, [userId, alcoholId]
    );

    return rows;
}

const getPendingItemsByUser = async (userId) => {
    const { rows } = await client.query(
        `SELECT * FROM alcohols
        JOIN cart ON alcohols.id=cart."alcoholId"
        WHERE cart."isPending"=true AND cart."userId"=$1;
        `, [userId]
    );

    return rows;
}

const getCompletedItemsByUser = async (userId) => {
    const { rows } = await client.query(
        `SELECT * FROM alcohols
        JOIN cart ON alcohols.id=cart."alcoholId"
        WHERE cart."isPending"=false AND cart."userId"=$1;
        `, [userId]
    );

    return rows;
}

const checkout = async (userId) => {
    const { rows } = await client.query(
        `UPDATE cart
        SET "isPending"=false
        WHERE "userId"=$1
        RETURNING *;
        `, [userId]
    );

    return rows;
}

const changeQuantity = async (cartId, quantity) => {
    const { rows } = await client.query(
        `UPDATE cart
        SET quantity=$2
        WHERE id=$1
        RETURNING *;
        `, [cartId, quantity]
    );

    return rows;
}

module.exports = {
    addToCart,
    removeFromCart,
    getPendingItemsByUser,
    getCompletedItemsByUser,
    checkout,
    changeQuantity
};