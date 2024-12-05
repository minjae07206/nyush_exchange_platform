import express, { Request, Response } from 'express';
import pool from '../../db/postgres';
import path from 'path';
import { readFileSync } from 'fs'; // Importing the file system module
const router = express.Router();

router.post('/', async (req:Request, res: Response) => {
    const userId = req.session.user?.userId;
    const {postId} = req.body;
    
    try {
        const filePath = path.join(__dirname, '..', '..', '..', 'src', 'sql_queries', 'unsave_post.sql');
        const unsave_post_query = readFileSync(filePath, 'utf-8');
        // The user themselves won't be able to save their own post.
        // I wanted this check to be on the client side, but I think it has to be done on the server side because my cookie which contains the user info is http only for secuirty reasons.
        await pool.query(unsave_post_query, [postId, userId]);
        
        res.status(200).json({ message: 'Post successfully unsaved.' });
        return;
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "An error occured on the database with unsaving post." });
        return;
    }
})

export default router;