import express, { Request, Response } from 'express';
import multer from 'multer';  // allows for accessing FormData
import path from 'path';
import pool from '../../db/postgres';
import { v4 as uuidv4 } from 'uuid';
import { readFileSync, unlink } from 'fs'; // Importing the file system module

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const extension = path.extname(file.originalname); // Get original extension
      cb(null, file.fieldname + '-' + uniqueSuffix + extension); // Save with extension
    }
});
const upload = multer({ storage: storage });
const router = express.Router();

router.patch('/', upload.array('images', 10), async (req: Request, res: Response) => {
    const sessionId = req.session.user;
    if (!sessionId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    const userId = sessionId.userId;
    const {
        title,
        description,
        price,
        currency,
        quantity,
        sellBuyByDate,
        postStatus,
        totalOrPerItem,
        postType,
        openToNegotiate,
    } = req.body;

    const images = req.files as Express.Multer.File[];
    let realPostType = postType === 'true' ? 'Sell' : 'Buy';

    if (postStatus === "Post to market" && (price === "" || description === "")) {
        res.status(400).json({ message: "If you want to post to the market, price and description cannot be empty." });
        return;
    }

    const updateDraftPostQuery = readFileSync('./src/sql_queries/edit_draft_post.sql', 'utf-8');
    const getImageUrlsQuery = readFileSync('./src/sql_queries/get_image_urls.sql', 'utf-8');
    const insertNewImageQuery = readFileSync('./src/sql_queries/insert_new_image.sql', 'utf-8');
    const post_id = uuidv4();

    let client;
    try {
        client = await pool.connect();
        await client.query('BEGIN');

        // Update the post
        await client.query(updateDraftPostQuery, [
            post_id,
            userId,
            realPostType,
            postStatus,
            title,
            price,
            currency,
            quantity,
            totalOrPerItem,
            description,
            openToNegotiate,
            sellBuyByDate
        ]);

        // Delete original images
        const result = await client.query(getImageUrlsQuery, [post_id]);
        if (result.rows.length > 0) {
            const imageUrls = result.rows.map((row: any) => row.image_url);
            for (const imageURL of imageUrls) {
                const imagePath = path.join(__dirname, '../../uploads', imageURL);
                unlink(imagePath, (err) => {
                    if (err) console.error("Failed to delete image file:", err);
                    else console.log("Image file deleted successfully:", imageURL);
                });
            }
        }

        // Insert new images
        if (images) {
            for (let image of images) {
                await client.query(insertNewImageQuery, [
                    uuidv4(),
                    post_id,
                    image.path
                ]);
            }
        }

        await client.query('COMMIT');
        if (postStatus === "Pending") {
            res.status(200).json({ message: 'Post successfully created! currently pending for approval from admin.' });
            return;
        } else if (postStatus === "Draft") {
            res.status(200).json({ message: 'Post successfully updated in draft.' });
            return;
        }
        
    } catch (error) {
        if (client) await client.query('ROLLBACK');
        console.error(error);
        res.status(500).json({ message: "An error occurred on the database while creating a new post." });
    } finally {
        if (client) client.release();
    }
});

export default router;
