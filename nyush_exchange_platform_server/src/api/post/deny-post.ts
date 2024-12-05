import express, { Request, Response } from 'express';
import pool from '../../db/postgres';
import { readFileSync} from 'fs';
import path from 'path';
const router = express.Router();

router.patch('/', async (req: Request, res: Response) => {
    const { denyReason, postId } = req.body;

    try {

        // Update the post status to approved
        const filePath = path.join(__dirname, '..', '..', '..', 'src', 'sql_queries', 'deny_post.sql');
        const deny_post_query = readFileSync(filePath, 'utf-8');
        await pool.query(deny_post_query, [denyReason, postId]);

        res.status(200).json({ message: "Post denied successfully" });
    } catch (error) {
        res.status(500).json({ message: "An error occurred on the server with denying post." });
    }
});


export default router;