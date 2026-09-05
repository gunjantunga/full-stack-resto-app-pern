import { Pool } from "pg";

const pool = new Pool({
    host: process.env.HOST,
    database: process.env.DATABASE,
    user: process.env._USER,
    password: process.env.PASSWORD,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
    maxLifetimeSeconds: 60,
    ssl: {
        rejectUnauthorize: false
    }
});

export default pool;