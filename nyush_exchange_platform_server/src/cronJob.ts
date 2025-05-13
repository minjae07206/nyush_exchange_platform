import cron from 'node-cron';
import pool from './db/postgres';
import { readFileSync } from 'fs';
import { join } from 'path';

async function deleteExpiredPosts () {
    try {
        const delete_expired_posts_query = readFileSync(
            join(__dirname, 'sql_queries', 'delete_expired_posts.sql'),
            'utf-8'
        );
        const queryResult = await pool.query(delete_expired_posts_query);
    } catch (error) {
        console.log(error)
    }
    
}

cron.schedule('0 0 * * *', () => {
    console.log('Running cron job to delete expired posts...');
    deleteExpiredPosts();
  });

  export default cron; 