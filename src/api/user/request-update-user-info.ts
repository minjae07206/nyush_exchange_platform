import express, { Request, Response } from 'express';
import pool from '../../db/postgres';
import multer from 'multer';
import path from 'path';
import { readFileSync } from 'fs'; // Importing the file system module
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
const upload = multer({ storage: storage }).fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'wechatQRCodeImage', maxCount: 1 }
]);
const router = express.Router();

router.post('/', upload, async (req: Request, res: Response) => {
    const userId = req.session.user?.userId;
    const { username } = req.body

    // Ensure req.files is typed correctly as an object with field names
    const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;

    // Extract files (if available) with safety checks
    const profileImage = files?.profileImage ? files.profileImage[0] : null;
    const wechatQRCodeImage = files?.wechatQRCodeImage ? files.wechatQRCodeImage[0] : null;
    let profileImagePath: null | string = ""
    if (profileImage) {
        profileImagePath = profileImage.path;
    } else {
        profileImagePath = null
    }
    let wechatQRCodeImagePath: null | string = ""
    if (wechatQRCodeImage) {
        wechatQRCodeImagePath = wechatQRCodeImage.path;
    } else {
        wechatQRCodeImagePath = null
    }
    // First, check if the new username already exists in the database. I mean it does, but check if it exists elsewhere.

    try {
        // check if username exists in the database. Moved this to the last line as it contains DB querying.
        const request_update_user_info_query = readFileSync('./src/sql_queries/check_username_exists.sql', 'utf-8'); // reading the check_email_exits.sql file
        const usernameExistsResult = await pool.query(request_update_user_info_query, [username, 1]);
        if (usernameExistsResult.rows.length > 0) {
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
        const insert_user_update_requests_query = readFileSync('./src/sql_queries/insert_user_update_requests.sql', 'utf-8');
        await pool.query(insert_user_update_requests_query, [userId, username, profileImagePath, wechatQRCodeImagePath]);
        res.status(200).json({message: "User information update request successfully sent. The admin will soon apply the changes."})
    } catch (error) {
        res.status(500).json({ message: "An error occured on the database with inserting to the user_update_requests table" });
        return;
    }

})

export default router;