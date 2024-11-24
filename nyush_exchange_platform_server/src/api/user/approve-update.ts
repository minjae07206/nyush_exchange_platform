import express, { Request, Response } from 'express';
import pool from '../../db/postgres';
import { readFileSync, unlink} from 'fs';
import path from 'path';

const router = express.Router();

router.patch('/', async (req: Request, res: Response) => {
    const userId = req.session.user?.userId;
    const { newUsername, newWechatQRCodeImage, newProfileImage, requestId, requester_user_id } = req.body;
    console.log(newWechatQRCodeImage, newProfileImage)
    const client = await pool.connect(); // Connect to the pool for transaction control

    try {
        await client.query('BEGIN'); // Start a transaction

        //Step 1: Get user update request and check if the image is default or null or something new.
        const get_specific_user_update_request_query = readFileSync('./src/sql_queries/get_specific_user_update_request.sql', 'utf-8');
        const getUserUpdateQuery = await client.query(get_specific_user_update_request_query, [requestId]);

        // Step 2: Delete the user update request from the `user_update_requests` table
        const deleteRequestQuery = readFileSync('./src/sql_queries/delete-user-update-request.sql', 'utf-8');
        await client.query(deleteRequestQuery, [requestId]);
        // Step 3: check if the username is the same as the old one, if not we also need to change the last_username_updated date.
        // also delete the original images.
        const get_user_info_query = readFileSync('./src/sql_queries/get-user-info.sql', 'utf-8');
        const queryResult = await client.query(get_user_info_query, [requester_user_id]);
        // checking if the username is the same as the old one is directly done in the update-user-approve.sql query.
        const wechatQRCodeImageToDelete = queryResult.rows[0].wechat_qr_code_image;
        const profileImageToDelete = queryResult.rows[0].profile_image;
        console.log(wechatQRCodeImageToDelete);
        console.log(profileImageToDelete);
        console.log(queryResult.rows[0])
        if ((wechatQRCodeImageToDelete && newWechatQRCodeImage !== "default") || (wechatQRCodeImageToDelete && newWechatQRCodeImage === null)) {
            const wechatQRCodeImageToDeletePath = path.resolve(__dirname, '../../../', wechatQRCodeImageToDelete); // Adjust path based on storage
                unlink(wechatQRCodeImageToDeletePath, (err) => {
                    if (err) {
                        console.error("Failed to delete image file:", err);
                    } else {
                        console.log("Image file deleted successfully:", wechatQRCodeImageToDeletePath);
                    }
                });
        }

        if ((profileImageToDelete &&  newProfileImage !== "default") || (profileImageToDelete && newProfileImage === null)) {
            const profileImageToDeletePath = path.resolve(__dirname, '../../../', profileImageToDelete); // Adjust path based on storage
                unlink(profileImageToDeletePath, (err) => {
                    if (err) {
                        console.error("Failed to delete image file:", err);
                    } else {
                        console.log("Image file deleted successfully:", profileImageToDeletePath);
                    }
                });
        }

        // Step 4: Update the user's information in the `users` table
        let wechatQRCodeImage;
        let profileImage;
        if (newProfileImage === 'default') {
            profileImage = profileImageToDelete;
        } else {
            profileImage = newProfileImage;
        }
        if (newWechatQRCodeImage === 'default') {
            wechatQRCodeImage = wechatQRCodeImageToDelete;
        } else {
            wechatQRCodeImage = newWechatQRCodeImage;
        }
        const update_user_approve_query = readFileSync('./src/sql_queries/update-user-approve.sql', 'utf-8');
        await client.query(update_user_approve_query, [
            newUsername,
            profileImage,
            wechatQRCodeImage,
            newUsername,
            requester_user_id,
        ]);

        await client.query('COMMIT'); // Commit the transaction if both queries succeed

        res.status(200).json({ message: "User information updated successfully."});
    } catch (error) {
        await client.query('ROLLBACK'); // Rollback transaction if an error occurs
        console.error("Error updating user information:", error);
        res.status(500).json({ message: "An error occurred while processing the user update request." });
    } finally {
        client.release(); // Release the client back to the pool
    }
});

export default router;
