import pool from "./pg.js";
import bcrypt from "bcrypt";



export async function findUser(email) {

    let client;
    try {
        client = await pool.connect();
        const response = await client.query('select id,email,password_hash,role from users where email = $1', [email]);
        return response.rows;
    } finally {
        if (client) {
            client.release();
        }
    }
}


export async function createUser({
    name,
    email,
    password_hash,
    phone,
    address,
    role
}) {
    let client;
    try {
        client = await pool.connect();
        let hashPassword = await bcrypt.hash(password_hash, 10);
        const response = await client.query('insert into users (name,email,password_hash,phone,address,role) values ($1,$2,$3,$4,$5,$6)', [name, email, hashPassword, phone, address, role]);
        return response.rows;
    } finally {
        if (client) {
            client.release();
        }
    }
}