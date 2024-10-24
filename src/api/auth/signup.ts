import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
const saltRounds = 10;
const router = express.Router();
router.post('/', (req:Request, res:Response) => {
    console.log(req.body)
    
    res.status(200).json({ message: 'success' })
});

export default router;