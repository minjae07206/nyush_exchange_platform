import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
const saltRounds = 10;
const router = express.Router();
interface ReqBodyProps {
    email:string;
    username: string;
    password: string;
}
// New Learning: return type of the callback function.
// In express, the callback function does not expect a return value. Therefore, I set the return type to void.
// However, because I am not returning anything, the code inside the function runs even after I do res.json() or res.send().
// So, I add a single line only containing return; after each response I want to send to the client. 
// Even though then the return type of the function becomes undefined, it seems that Typescript does not raise an error because it considers void and undefined as the same thing.  
router.post('/', (req:Request, res:Response):void => {
    const { email, username, password }:ReqBodyProps = req.body;

        // check if email exists
        if (!email) {
            res.status(400).json({ message: 'Email is required.' });
            return;
        }

        // check if email is valid length
        const MAX_EMAIL_LENGTH:number = 254;
        if (email.length > MAX_EMAIL_LENGTH) {
            res.status(400).json({message: "Email is too long."});
            return;
        }

    // check email validity, maybe later send a two-factor authentication email. 
    // the email should end in @nyu, and // email should only contain alphabets, numbers and full stop(.) and should not start with a full stop.

    const allowedEmailPattern: RegExp = /^(?!\.)([a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*)@nyu$/;
    if (!allowedEmailPattern.test(email)) {
        res.status(200)
    }
    res.status(200).json({ message: 'success' })
});

export default router;