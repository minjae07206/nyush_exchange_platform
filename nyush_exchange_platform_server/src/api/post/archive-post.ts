import express, { Request, Response } from 'express';
import pool from '../../db/postgres';
import { readFileSync} from 'fs';
import path from 'path';
const router = express.Router();

router.patch('/', async (req: Request, res: Response) => {
    const { postId } = req.body;
    console.log(postId);
    try {
        const filePath = path.join(__dirname, '..', '..', '..', 'src', 'sql_queries', 'archive_post.sql');
        const archive_post_query = readFileSync(filePath, 'utf-8');
        console.log("archiving...")
        await pool.query(archive_post_query, [postId]);
        res.status(200).json({ message: 'Post successfully archived' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "An error occured on the database with creating new post." });
        return;
    }
});


export default router;