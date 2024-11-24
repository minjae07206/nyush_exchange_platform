import express, { Request, Response } from 'express';
import path from 'path';
import pool from '../../db/postgres';
import { readFileSync } from 'fs'; // Importing the file system module


const router = express.Router();

router.patch('/', async (req: Request, res: Response) => {
    // It turns out I don't need to check the redis sessionDB, req.session.user is already checking the db for me.
    const sessionId = req.session.user;
    const { postId } = req.query;
    const currentDate = new Date().toISOString().split('T')[0]; // Format as 'YYYY-MM-DD'
    if (!sessionId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    const {
        price,
        currency,
        quantity,
        sellBuyByDate,
        totalOrPerItem,
        postType,
        openToNegotiate,
        category,
        postStatus,
    } = req.body;
    console.log(postType)
    let realPostType;
    if (postType === true || postType === 'true') {
        realPostType = 'Sell';
    } else if (postType === 'false' || postType === false) {
        realPostType = "Buy";
    }
    console.log(req.body);
    console.log(postId)
    if (!postId || price === undefined || currency === undefined || quantity === undefined || 
        sellBuyByDate === undefined || totalOrPerItem === undefined || 
        postType === undefined || openToNegotiate === undefined) {
        res.status(400).json({ message: 'All fields are required' });
        return;
    }

    try {
        const edit_post_query = readFileSync('./src/sql_queries/edit_post.sql', 'utf-8');
        await pool.query(edit_post_query, [postId, price, currency, quantity, sellBuyByDate, totalOrPerItem, realPostType, openToNegotiate, category, postStatus]);
        res.status(200).json({message: "Post editted successfully."})
        return;
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Something wrong happend on the database with editting post."});
        return;
    }


}

)

export default router;