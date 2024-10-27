import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file
const { Pool } = pg;

const pool = new Pool(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
    }
);

export default pool;