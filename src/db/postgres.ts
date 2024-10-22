import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
    // enter database information here.
});

export default pool;