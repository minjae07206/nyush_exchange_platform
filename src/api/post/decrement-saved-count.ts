import express, { Request, Response } from 'express';
import pool from '../../db/postgres';
import { readFileSync } from 'fs'; // Importing the file system module
const router = express.Router();

router.patch('/', async (req: Request, res: Response) => {
    const postId = req.body.postId
    try {
        const patch_decrement_saved_count_query = readFileSync('./src/sql_queries/patch_decrement_saved_count.sql', 'utf-8');
        await pool.query(patch_decrement_saved_count_query, [postId]);
        res.status(200).json("Decrementing saved_count successful.");
        return;
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "An error occured on the database decrementing saved_count." });
        return;
    }

})

export default router;