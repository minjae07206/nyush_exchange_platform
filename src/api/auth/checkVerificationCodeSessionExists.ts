import express, { Request, Response } from 'express';
import { redisClient } from '../../app';
const router = express.Router();

router.get('/', async (req, res) => {
    console.log(req.cookies['connect.sid'])
    const rawSessionId = req.cookies['connect.sid']
    console.log("nyush_exchange_platform_redis" + rawSessionId.slice(2));
    try {
        const rawSessionId = req.cookies['connect.sid'];

        let sessionId = "nyush_exchange_platform_redis" + rawSessionId.slice(2);
        sessionId = sessionId.split(".")[0]

        const replyFromRedis = await redisClient.get(sessionId);
        if (replyFromRedis) {
            console.log(replyFromRedis)
            res.status(200).json({ message: 'the session was found!' })
            return;
        } else {
            res.status(400).json({ message: 'the session does not exist.' });
            return;
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: 'the session does not exist11111.' });
        return;
    }

})

export default router;