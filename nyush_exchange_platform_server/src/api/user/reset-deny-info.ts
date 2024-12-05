import express, { Request, Response } from 'express';
import pool from '../../db/postgres';
import path from 'path';
import { readFileSync } from 'fs'; // Importing the file system module
const router = express.Router();

router.patch('/', async (req: Request, res: Response) => {
    const userId = req.session.user?.userId;
    try {
        const filePath = path.join(__dirname, '..', '..', '..', 'src', 'sql_queries', 'reset_deny_info.sql');
        const reset_deny_info_query = readFileSync(filePath, 'utf-8');
         await pool.query(reset_deny_info_query, [userId]); // Pass userId if needed in query
        // Send the query result's rows directly as JSON
        res.status(200).json({message: "Deny information resetted succesfully"});  // No need to stringify manually, express does it for you
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred while resetting deny information" });
        return;
    }
});

export default router;