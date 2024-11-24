import express, { Request, Response } from 'express';
import pool from '../../db/postgres';
import { readFileSync } from 'fs';

const router = express.Router();

router.patch('/', async (req: Request, res: Response) => {
    const userId = req.session.user?.userId;
    const { username } = req.body;

    let client;
    try {
        client = await pool.connect();
        await client.query('BEGIN'); // Start transaction

        // Check if username already exists in the database, excluding the current user
        const checkUsernameQuery = readFileSync('./src/sql_queries/update_user_info.sql', 'utf-8');
        const usernameExistsResult = await client.query(checkUsernameQuery, [username]);
        if (usernameExistsResult.rows.length > 1) { // Length > 1 means another user has this username
            res.status(400).json({ message: "Username already exists." });
            await client.query('ROLLBACK'); // Rollback if username already exists
            return;
        }

        // Fetch user information
        const getUserInfoQuery = readFileSync('./src/sql_queries/get-user-info.sql', 'utf-8');
        const userInfoResult = await client.query(getUserInfoQuery, [userId]);
        const formattedQueryResult = userInfoResult.rows[0];

        await client.query('COMMIT'); // Commit transaction if successful
        res.status(200).json(JSON.stringify(formattedQueryResult));
    } catch (error) {
        if (client) await client.query('ROLLBACK'); // Rollback in case of any error
        console.error(error);
        res.status(500).json({ message: "An error occurred while processing the request." });
    } finally {
        if (client) client.release();
    }
});

export default router;
