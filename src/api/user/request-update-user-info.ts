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
        const request_update_user_info_query = readFileSync('./src/sql_queries/check_username_exists.sql', 'utf-8'); // reading the check_email_exits.sql file
        const usernameExistsResult = await pool.query(request_update_user_info_query, [username, 2]);
        if (usernameExistsResult.rows.length > 1) { // we check that length is greater than 1 not 0 because the username already does exist, the current user is using it!
            // Username exists in the database
            res.status(400).json({ message: "Username already exists." });
            return;
        }
    } catch (error) {
        res.status(500).json({ message: "An error occured on the database with checking if username exists." });
        return;
    }


    // check if the username has been updated in the past year.
    try {
        const get_last_username_updated_query = readFileSync('./src/sql_queries/get_last_username_updated_query.sql', 'utf-8');
        const queryResult = await pool.query(get_last_username_updated_query, [userId]);
        const last_username_updated = queryResult.rows[0].last_username_updated;
        if (last_username_updated) {
            const last_username_update_date_object = new Date(last_username_updated);
            const currentDate = new Date();
            const timeDifference = currentDate.getTime() - last_username_update_date_object.getTime();
            const oneYearInMilliseconds = 365 * 24 * 60 * 60 * 1000;
            if (timeDifference < oneYearInMilliseconds) {
                res.status(400).json({ message: "It has still not been a year since previous username update." });
            return;
            } 

        } // if last_username_update is null, we can continue
    } catch (error) {
        res.status(500).json({ message: "An error occured on the database with checking if username was updated within the past year." });
        return;
    }

    // now, insert a row into the user_update_requests table

    try {
        const get_last_username_updated_query = readFileSync('./src/sql_queries/get_last_username_updated_query.sql', 'utf-8');
        const queryResult = await pool.query(get_last_username_updated_query, [userId]);
    }catch (error) {
        res.status(500).json({ message: "An error occured on the database with inserting to the user_update_requests table" });
        return;
    }

})

export default router;