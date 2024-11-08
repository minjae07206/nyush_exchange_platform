import express, { Request, Response } from 'express';
import { redisClient } from '../../app';
import pool from '../../db/postgres';
import { readFileSync } from 'fs'; // Importing the file system module
const router = express.Router();
router.post('/', async (req: Request, res: Response) => {
    try {
        // cookie parser library allows me to do req.cookie, otherwise I would need to get it from req.header.
        // 'connect.sid' is the key of the sessionId(cookie) that is passed on from the client to the server.
        const rawSessionId = req.cookies['connect.sid'];
        // We need to format the sessionId in this way so that it matches the way it is stored in the Redis database.
        // the nyush_exchange_platform_redis is because that is what is set as the prefix in initializing redisStore in app.ts file.
        const sessionId = "nyush_exchange_platform_redis" + rawSessionId.slice(2).split(".")[0];
        // We search the redis database if the sessionId exists.
        const replyFromRedis = await redisClient.get(sessionId);
        if (replyFromRedis) {
            const sessionData = JSON.parse(replyFromRedis);
            const username = sessionData.unverifiedUser.username;
            const hashedPassword = sessionData.unverifiedUser.hashedPassword;
            const email = sessionData.unverifiedUser.email;
            const role = 'user'
            if (sessionData.unverifiedUser.verificationCode == req.body.verificationCode) {
                // user verfied
                // send success and send success message, add user to user table. redirect them to the login page.

                try {
                    const insert_new_user_query = readFileSync('./src/sql_queries/insert_new_user.sql', 'utf-8');
                    await pool.query(insert_new_user_query, [username, email, hashedPassword, role]);
                    // The session will only be deleted if the insert query was succesful.
                    await redisClient.del(sessionId);
                    // Clear the session cookie on the client
                    res.clearCookie('connect.sid');
                } catch (error) {
                    res.status(500).json({ message: "An error occured on the database with creating new user." });
                    return;
                }

                res.status(200).json({ message: 'Account successfully created! Redirecting to login page' });
                return;

            } else {
                res.status(400).json({ message: "The verification code does not match." })
                return;
            }
        } else {
            res.status(400).json({ message: 'The session does not exist.' });
            return;
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Something went wrong with sessionDB.' });
        return;
    }
});

export default router;