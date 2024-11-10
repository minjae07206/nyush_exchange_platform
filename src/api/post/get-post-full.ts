import express, { Request, Response } from 'express';
import pool from '../../db/postgres';
import { readFileSync } from 'fs'; // Importing the file system module
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    const userId = req.session.user?.userId;
    const role = req.session.user?.role;
    const { postId } = req.query; // Extract postId from query parameters
    try {
        const get_post_full_query = readFileSync('./src/sql_queries/get_post_full.sql', 'utf-8');
        const queryResult = await pool.query(get_post_full_query, [postId]);
        let isAuthor:boolean = false;
        if( queryResult.rows[0].author_id === userId) {
            isAuthor = true
        }
        let isAdmin:boolean = false;
        if (role === "admin") {
            isAdmin = true;
        }
        const postData = {
            ...queryResult.rows[0], // Get the first row for the post details
            // if the userId equals the authorId, add another field to the postData called isAuthor boolean
            isAuthor: isAuthor,
            // if the userId is the admin, add another field.
            isAdmin: isAdmin,
            images: queryResult.rows.map(row => row.image_url).filter(url => url) // Collect all image URLs
        };
 
        const postDataJSON = JSON.stringify(postData);
        res.status(200).json(postDataJSON);
        return;
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "An error occured on the database decrementing saved_count." });
        return;
    }

})

export default router;