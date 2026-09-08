import pool from "./pg.js";

export async function findOwner(search = "") {
    let client;

    try {
        client = await pool.connect();

        const searchValue = `%${search.trim()}%`;

        const response = await client.query(
            `
            SELECT id, name, email, phone
            FROM users
            WHERE role = 'restaurant'
              AND (
                  name ILIKE $1
                  OR email ILIKE $1
              )
            ORDER BY name
            LIMIT 20;
            `,
            [searchValue]
        );

        return response.rows;

    } finally {
        if (client) {
            client.release();
        }
    }
}

export async function createRestaurant({
    owner_id,
    name,
    address,
    image_url

}) {
    let client;
    try {
        client = await pool.connect();
        const response = await client.query('INSERT INTO restaurants (owner_id, name, address, image_url) values ($1,$2,$3,$4) RETURNING *;', [owner_id, name, address, image_url]);
        return response.rows;
    } finally {
        if (client) {
            client.release();
        }
    }
}