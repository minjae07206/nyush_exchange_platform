import express, { Request, Response } from 'express';
import pool from '../../db/postgres';
import { readFileSync } from 'fs'; // Importing the file system module
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    const userId = req.session.user?.userId;
    const MAX_LIMIT = 10;
    const limit = Math.min(parseInt(req.query.limit as string) || 10, MAX_LIMIT); // Enforce maximum limit
    const page = parseInt(req.query.page as string) || 1; // Default to 1 if not provided
    const offset = (page - 1) * limit; // Calculate offset

    let { search, postStatusOption, postCategoryOption, negotiabilityOption, orderOption, buySellOption } = req.query as {
        search?: string | null;
        postStatusOption?: string | null;
        postCategoryOption?: string | null;
        negotiabilityOption?: string | null;
        orderOption?: string | null;
        buySellOption?: string | null;
    };

    search = search?.trim() === "" ? null : search?.trim();
    postStatusOption = postStatusOption === "All post statuses" ? null : postStatusOption;
    postCategoryOption = postCategoryOption === "All categories" ? null : postCategoryOption;
    // no need to map postStatusOption
    // no need to map postCategoryOption

    // map buysellOption with switch
    switch (buySellOption) {
        case "All post types":
            buySellOption = null;
            break;
        case "Sell posts":
            buySellOption = 'Sell';
            break;
        case "Buy posts":
            buySellOption = 'Buy';
            break;
        default:
            buySellOption = null;
            break;
    }

    // map negotiability option with swtich
    switch (negotiabilityOption) {
        case "Select negotiability":
            negotiabilityOption = null;
            break;
        case "Open to negotiate":
            negotiabilityOption = 'true';
            break;
        case "Not open to negotiate":
            negotiabilityOption = 'false';
            break;
        default:
            negotiabilityOption = null;
            break;
    }

    let orderBy: string;

    // Handle the sorting logic using switch
    switch (orderOption) {
        case 'Latest first':
            orderBy = 'p.date_of_creation DESC';
            break;
        case 'Oldest first':
            orderBy = 'p.date_of_creation ASC';
            break;
        case 'Lowest price':
            orderBy = 'p.price ASC';
            break;
        case 'Highest price':
            orderBy = 'p.price DESC';
            break;
        case 'Most saved':
            orderBy = 'p.saved_count DESC';
            break;
        case 'Least saved':
            orderBy = 'p.saved_count ASC'
            break;
        case 'Earliest expiration':
            orderBy = 'p.date_of_expiration DESC';
            break;
        case 'Latest expiration':
            orderBy = 'p.date_of_expiration ASC';
            break;
        default:
            orderBy = 'p.date_of_creation DESC';  // Default case if no valid option
            break;
    }


    try {
        const baseQuery = readFileSync('./src/sql_queries/get_search_and_filtered_posts_thumbnail.sql', 'utf-8');
        const finalQuery = `${baseQuery} ORDER BY ${orderBy} LIMIT $7 OFFSET $8;`;
        //const search_and_filtered_posts_thumbnail = 
        // The user themselves won't be able to save their own post.
        // I wanted this check to be on the client side, but I think it has to be done on the server side because my cookie which contains the user info is http only for secuirty reasons.
        const queryResult = await pool.query(finalQuery, [userId, search, postStatusOption, postCategoryOption, negotiabilityOption, buySellOption, limit, offset]);
        const postsWithFirstImage = queryResult.rows.map(post => ({
            ...post,
            image: post.image_url || null // Store the first image URL, or null if none exists
        }));
        // Convert the array to JSON format
        const resultJson = JSON.stringify(postsWithFirstImage);
        console.log(resultJson)
        res.status(200).json(resultJson);
        return;
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "An error occured on the database with saving post." });
        return;
    }
})

export default router;