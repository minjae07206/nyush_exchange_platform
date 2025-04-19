import express, { Request, Response } from 'express';
import pool from '../../db/postgres';
import { readFileSync, unlink } from 'fs';
import path from 'path';
const router = express.Router();

router.delete('/', async (req: Request, res: Response) => {
    const { postId } = req.body;

    try {
        // Begin transaction
        await pool.query('BEGIN');

        // Retrieve the image URL first
        const imageFilePath = path.join(__dirname, '..', '..', '..', 'src', 'sql_queries', 'get_image_urls.sql');
        const get_image_urls_query = readFileSync(imageFilePath, 'utf-8');
        const result = await pool.query(get_image_urls_query, [postId]);
        if (result.rows.length > 0) {
            const imageUrls = result.rows.map((row: any) => row.image_url);
            imageUrls.forEach((imageURL) => {
                const imagePath = path.resolve('/nyush_exchange_platform_server/var/www/uploads', path.basename(imageURL)); // Adjust path based on storage
                unlink(imagePath, (err) => {
                    if (err) {
                        console.error("Failed to delete image file:", err);
                    } else {
                        console.log("Image file deleted successfully:", imageURL);
                    }
                });
            });


        }
        // Extract image URLs and remove associated files

        // Delete the post from the database
        const filePath = path.join(__dirname, '..', '..', '..', 'src', 'sql_queries', 'delete_post.sql');
        const delete_post_query = readFileSync(filePath, 'utf-8');
        await pool.query(delete_post_query, [postId]);

        await pool.query('COMMIT');



        res.status(200).json({ message: "Post and image deleted successfully" });
    } catch (error) {
        await pool.query('ROLLBACK'); // Rollback transaction on error
        console.error("Error:", error);
        res.status(500).json({ message: "An error occurred on the server with deleting post." });
    }
});


export default router;