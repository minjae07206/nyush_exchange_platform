import express, { Request, Response } from 'express';
import { redisClient } from '../../app';
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        // cookie parser library allows me to do req.cookie, otherwise I would need to get it from req.header.
        // 'connect.sid' is the key of the sessionId(cookie) that is passed on from the client to the server.
        const rawSessionId = req.cookies['connect.sid'];
        // We need to format the sessionId in this way so that it matches the way it is stored in the Redis database.
        // the nyush-exchange-platform-redis is because that is what is set as the prefix in initializing redisStore in app.ts file.
        const sessionId = "nyush-exchange-platform-redis" + rawSessionId.slice(2).split(".")[0];
        // We search the redis database if the sessionId exists.
        const replyFromRedis = await redisClient.get(sessionId);
        if (replyFromRedis) {
            console.log(replyFromRedis)
            res.status(200).json({ message: 'The session was found!' })
            return;
        } else {
            res.status(400).json({ message: 'The session does not exist.' });
            return;
        }
    } catch (error) {
        res.status(500).json({ message: 'No session exists or something went wrong with sessionDB.' });
        return;
    }

})

export default router;