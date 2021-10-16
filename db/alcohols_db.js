const client = require('./client');

const createAlcohol = async ({
    type, 
    name, 
    price, 
    description, 
    inStock, 
    image}
    ) => {
        const { rows } = await client.query(
            `INSERT INTO alcohols(type, name, price, description, "inStock", image)
            VALUES($1, $2, $3, $4, $5, $6)
            RETURNING *;
            `, [type, name, price, description, inStock, image]
        );

        return rows;
}

const getAllAlcohols = async () => {
    const { rows } = await client.query(
        `SELECT *
        FROM alcohols;
        `
    );

    return rows;
}

const getAlcoholById = async (id) => {
    const { rows: [alchohol] } = await client.query(
        `SELECT * FROM alcohols
        WHERE id=$1;
        `, [id]
    );

    return alchohol;
}

module.exports = {
    createAlcohol,
    getAllAlcohols,
    getAlcoholById
}