import express, { Request, Response } from 'express';
import pool from '../../db/postgres';
import { readFileSync } from 'fs'; // Importing the file system module
const router = express.Router();

router.patch('/', async (req: Request, res: Response) => {
    const userId = req.session.user?.userId;
    const {pending_state} = req.body;
    // First, check if the new username already exists in the database. I mean it does, but check if it exists elsewhere.

    try {
        // check if username exists in the database. Moved this to the last line as it contains DB querying.
        const update_user_pending_state_query = readFileSync('./src/sql_queries/update_user_pending_state.sql', 'utf-8'); // reading the check_email_exits.sql file
        await pool.query(update_user_pending_state_query, [pending_state, userId]);
        res.status(200).json({message: "User pending state has successfully been updated."})
    } catch (error) {
        res.status(500).json({ message: "An error occured on the database with updating user_pending state. This is bad, should still stop the user from sending further requests." });
        return;
    }
})

export default router;