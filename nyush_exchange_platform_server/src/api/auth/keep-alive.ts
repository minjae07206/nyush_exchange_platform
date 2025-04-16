import express, { Request, Response } from 'express';
const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    if (req.session.user) {
        // User is logged in, refresh the session
        console.log(req.session.cookie.maxAge)
        req.session.touch(); // Refreshes the session expiration time
        console.log(req.session.cookie.maxAge)
        const sessionExpirationTime = Date.now() + (req.session.cookie.maxAge ?? 0);
        res.status(200).json({message:'session-renewed', 
            sessionExpirationTime,
            serverNow: Date.now(),
        });
    } else {
        // User is not logged in
        res.status(401).json({message:'session-error'});
    }
})

export default router;