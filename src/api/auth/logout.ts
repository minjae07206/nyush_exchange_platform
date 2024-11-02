import express, { Request, Response } from 'express';
const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    // Destroy the session
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Logout failed' });
        }
        // Clear the session cookie
        res.clearCookie('connect.sid'); // Clear the cookie associated with the session
        res.status(200).json({ message: 'Successfully logged out' }); // Respond to the client
    });
})

export default router;