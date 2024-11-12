import express, { Request, Response } from 'express';
import pool from '../../db/postgres';
import { readFileSync } from 'fs';

const router = express.Router();

router.patch('/', async (req: Request, res: Response) => {
    const userId = req.session.user?.userId;
    const { denyReason, requestId, requester_user_id } = req.body;

    const client = await pool.connect(); // Connect to the pool for transaction control

    try {
        await client.query('BEGIN'); // Start a transaction

        // Step 1: Delete the user update request from the `user_update_requests` table
        const deleteRequestQuery = readFileSync('./src/sql_queries/delete-user-update-request.sql', 'utf-8');
        await client.query(deleteRequestQuery, [requestId]);

        // Step 2: Update the user's information in the `users` table
        const update_user_deny_query = readFileSync('./src/sql_queries/update-user-deny.sql', 'utf-8');
        await client.query(update_user_deny_query, [
            denyReason,
            requester_user_id,
        ]);

        await client.query('COMMIT'); // Commit the transaction if both queries succeed

        res.status(200).json({ message: "User information updated successfully."});
    } catch (error) {
        await client.query('ROLLBACK'); // Rollback transaction if an error occurs
        console.error("Error updating user information:", error);
        res.status(500).json({ message: "An error occurred while processing the user update request." });
    } finally {
        client.release(); // Release the client back to the pool
    }
});

export default router;
