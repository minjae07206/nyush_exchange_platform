import express, { Request, Response } from 'express';
import pool from '../../db/postgres';
import path from 'path';
import { readFileSync } from 'fs'; // Importing the file system module
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    const MAX_LIMIT = 10;
    const userId = req.session.user?.userId;
    const limit = Math.min(parseInt(req.query.limit as string) || 10, MAX_LIMIT); // Enforce maximum limit
    const page = parseInt(req.query.page as string) || 1; // Default to 1 if not provided
    const offset = (page - 1) * limit; // Calculate offset
    try {
        const filePath = path.join(__dirname, '..', '..', '..', 'src', 'sql_queries', 'get_my_available_posts_thumbnail.sql');
        const get_my_available_posts_thumbnail_query = readFileSync(filePath, 'utf-8');
        const queryResult = await pool.query(get_my_available_posts_thumbnail_query, [userId, "Pending", "Available", limit, offset]);
        // Convert the rows to an array (queryResult.rows is already an array of objects)

        // The images array will contain only the first image URL, if available
        const postsWithFirstImage = queryResult.rows.map(post => ({
            ...post,
            image: post.image_url || null // Store the first image URL, or null if none exists
        }));
        // Convert the array to JSON format
        const resultJson = JSON.stringify(postsWithFirstImage);
        res.status(200).json(resultJson);
        return;
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "An error occured on the database getting available posts." });
        return;
    }

})

export default router;