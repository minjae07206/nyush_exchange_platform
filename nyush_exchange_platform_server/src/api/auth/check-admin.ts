import express, { Request, Response } from 'express';
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    const admin = req.session.user?.role;

    if (admin === "admin") {
        res.status(200).json({ message: 'is admin' });
    }
    else {
        // User is not logged in
        res.status(401).json({ message: 'not admin' });
    }
})

export default router;