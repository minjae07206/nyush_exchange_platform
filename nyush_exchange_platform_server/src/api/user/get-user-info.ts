import express, { Request, Response } from 'express';
import pool from '../../db/postgres';
import path from 'path';
import { readFileSync } from 'fs'; // Importing the file system module
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    const userId = req.session.user?.userId;
    const role = req.session.user?.role;
    try {
        const filePath = path.join(__dirname, '..', '..', '..', 'src', 'sql_queries', 'get-user-info.sql');
        const get_user_info_query = readFileSync(filePath, 'utf-8');
        const queryResult = await pool.query(get_user_info_query, [userId]);
        const formattedQueryResult = queryResult.rows[0];
        const responseData = {
            ...formattedQueryResult,
            role: role ?? null // Include role, with fallback to null if undefined
        };
        const postDataJSON = JSON.stringify(responseData);
        res.status(200).json(postDataJSON);
        return;
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "An error occured on the database decrementing saved_count." });
        return;
    }

})

export default router;