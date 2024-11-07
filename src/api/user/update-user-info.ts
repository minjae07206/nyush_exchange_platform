import express, { Request, Response } from 'express';
import pool from '../../db/postgres';
import { readFileSync } from 'fs'; // Importing the file system module
const router = express.Router();

router.patch('/', async (req: Request, res: Response) => {
    const userId = req.session.user?.userId;
    const {username} = req.body
    // First, check if the new username already exists in the database. I mean it does, but check if it exists elsewhere.

    try {
        // check if username exists in the database. Moved this to the last line as it contains DB querying.
        const update_user_info_query = readFileSync('./src/sql_queries/update_user_info.sql', 'utf-8'); // reading the check_email_exits.sql file
        const usernameExistsResult = await pool.query(update_user_info_query, [username]);
        if (usernameExistsResult.rows.length > 1) { // we check that length is greater than 1 not 0 because the username already does exist, the current user is using it!
            // Username exists in the database
            res.status(400).json({ message: "Username already exists." });
            return;
        }
    } catch (error) {
        res.status(500).json({ message: "An error occured on the database with checking if username exists." });
        return;
    }

    try {
        const get_user_info_query = readFileSync('./src/sql_queries/get-user-info.sql', 'utf-8');
        const queryResult = await pool.query(get_user_info_query, [userId]);
        const formattedQueryResult = queryResult.rows[0];
        const postDataJSON = JSON.stringify(formattedQueryResult);
        res.status(200).json(postDataJSON);
        return;
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "An error occured on the database decrementing saved_count." });
        return;
    }

})

export default router;