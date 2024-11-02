import express, { Request, Response } from 'express';
const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    if (req.session.user) {
        // User is logged in, refresh the session
        req.session.touch(); // Refreshes the session expiration time
        const sessionExpirationTime = Date.now() + (req.session.cookie.maxAge ?? 0);
        res.status(200).json({message:'session-renewed', 
            sessionExpirationTime
        });
    } else {
        // User is not logged in
        res.status(401).json({message:'session-error'});
    }
})

export default router;