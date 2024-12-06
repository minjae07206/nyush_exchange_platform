import express, { Request, Response } from 'express';
import pool from '../../db/postgres';
import multer from 'multer';
import path from 'path';
import { readFileSync } from 'fs';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = '/nyush_exchange_platform_server/var/www/uploads';
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + extension);
    }
});
const upload = multer({ storage: storage }).fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'wechatQRCodeImage', maxCount: 1 }
]);

const router = express.Router();

router.post('/', upload, async (req: Request, res: Response) => {
    const userId = req.session.user?.userId;
    const { username, defaultProfileImageExists, defaultWechatQRCodeExists } = req.body;
    let originalProfileImageExists: string | null;
    if (defaultProfileImageExists === 'true') {
        originalProfileImageExists = "default";
    } else {
        originalProfileImageExists = null;
    }

    let originalWechatImageExists: string | null;
    if (defaultWechatQRCodeExists === 'true') {
        originalWechatImageExists = "default";
    } else {
        originalWechatImageExists = null;
    }

    const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
    const profileImage = files?.profileImage ? files.profileImage[0] : null;
    const wechatQRCodeImage = files?.wechatQRCodeImage ? files.wechatQRCodeImage[0] : null;
    const profileImagePath = profileImage ? profileImage.path : originalProfileImageExists;
    const wechatQRCodeImagePath = wechatQRCodeImage ? wechatQRCodeImage.path : null;


    let client;
    try {
        client = await pool.connect();
        await client.query('BEGIN'); // Start transaction

        // Check if username already exists
        const filePath = path.join(__dirname, '..', '..', '..', 'src', 'sql_queries', 'check_username_exists.sql');
        const checkUsernameQuery = readFileSync(filePath, 'utf-8');
        const usernameExistsResult = await client.query(checkUsernameQuery, [username, 2]);
        if (usernameExistsResult.rows.length > 1) {
            res.status(400).json({ message: "Username already exists." });
            await client.query('ROLLBACK'); // Rollback transaction if username exists
            return;
        }

        // Check if the username was updated in the past year
        const filePath2 = path.join(__dirname, '..', '..', '..', 'src', 'sql_queries', 'get_last_username_updated_query.sql');
        const lastUpdateQuery = readFileSync(filePath2, 'utf-8');
        const lastUpdateResult = await client.query(lastUpdateQuery, [userId]);
        const lastUsernameUpdated = lastUpdateResult.rows[0]?.last_username_updated;

        if (lastUsernameUpdated) {
            const lastUpdateDate = new Date(lastUsernameUpdated);
            const currentDate = new Date();
            const oneYearInMs = 365 * 24 * 60 * 60 * 1000;
            if (currentDate.getTime() - lastUpdateDate.getTime() < oneYearInMs) {
                res.status(400).json({ message: "It has still not been a year since the previous username update." });
                await client.query('ROLLBACK'); // Rollback transaction if less than a year since last update
                return;
            }
        }

        // Insert request into user_update_requests table
        const filePath3 = path.join(__dirname, '..', '..', '..', 'src', 'sql_queries', 'insert_user_update_requests.sql');
        const insertRequestQuery = readFileSync(filePath3, 'utf-8');
        await client.query(insertRequestQuery, [userId, username, profileImagePath, wechatQRCodeImagePath]);

        await client.query('COMMIT'); // Commit transaction if all queries are successful
        res.status(200).json({ message: "User information update request successfully sent. The admin will soon apply the changes." });
    } catch (error) {
        console.log(error)
        if (client) await client.query('ROLLBACK'); // Rollback if an error occurs
        res.status(500).json({ message: "An error occurred while processing your request." });
    } finally {
        if (client) client.release();
    }
});

export default router;
