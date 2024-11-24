import express, { Request, Response } from 'express';
import pool from '../../db/postgres';
import { readFileSync } from 'fs'; // Importing the file system module
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const get_user_updates_query = readFileSync('./src/sql_queries/get_user_updates.sql', 'utf-8');
        const queryResult = await pool.query(get_user_updates_query); // Pass userId if needed in query
        console.log(queryResult.rows);
        // Send the query result's rows directly as JSON
        res.status(200).json(queryResult.rows);  // No need to stringify manually, express does it for you
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred while fetching user updates." });
        return;
    }
});

export default router;
