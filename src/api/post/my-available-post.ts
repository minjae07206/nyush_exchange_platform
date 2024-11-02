import express, { Request, Response } from 'express';
import pool from '../../db/postgres';
import { readFileSync } from 'fs'; // Importing the file system module
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    const userId = req.session.user?.userId;
    try {
        const get_my_available_posts_query = readFileSync('./src/sql_queries/get_my_available_posts.sql', 'utf-8');
        const queryResult = await pool.query(get_my_available_posts_query, [userId, "Pending", "Available"]);
        // Convert the rows to an array (queryResult.rows is already an array of objects)
        const resultArray = queryResult.rows;

        // Convert the array to JSON format
        const resultJson = JSON.stringify(resultArray);
        console.log(resultJson)
        res.status(200).json(resultJson);
        return;
    } catch (error) {
        res.status(500).json({ message: "An error occured on the database getting available posts." });
        return;
    }

})

export default router;