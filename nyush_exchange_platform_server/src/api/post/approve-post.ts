import express, { Request, Response } from 'express';
import pool from '../../db/postgres';
import { readFileSync, unlink } from 'fs';
import path from 'path';
const router = express.Router();

router.patch('/', async (req: Request, res: Response) => {
    const { postId } = req.body;

    try {

        // Update the post status to approved
        const approve_post_query = readFileSync('./src/sql_queries/approve_post.sql', 'utf-8');
        await pool.query(approve_post_query, [postId]);

        res.status(200).json({ message: "Post approved successfully" });
    } catch (error) {
        res.status(500).json({ message: "An error occurred on the server with approving post." });
    }
});


export default router;