import express, { Request, Response } from 'express';
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    console.log("Request:", req)
    console.log(req.session.user);
    // It turns out I don't need to check the redis sessionDB, req.session.user is already checking the db for me.
    if (req.session.user) {
        res.status(200).json({message:'session-alive'});
    } else {
        // User is not logged in
        res.status(401).json({message:'session-error'});
    }
})

export default router;