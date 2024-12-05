import pg from 'pg';
import dotenv from 'dotenv';
if (process.env.NODE_ENV === 'production') {
    dotenv.config({ path: '/home/ml6722/.env' });  // Path for production
} else {
    dotenv.config({ path: '../.env' });  // Default, loads from the root .env file for development
}// Load environment variables from .env file
const { Pool } = pg;
console.log(process.env.POSTGRES_HOST)


const pool = new Pool(
    {
        host: process.env.NODE_ENV === 'production'? process.env.POSTGRES_HOST : "localhost",
        user: process.env.POSTGRES_USER,
        database: process.env.POSTGRES_DATABASE,
        password: process.env.POSTGRES_PASSWORD,
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
    }
);

export default pool;