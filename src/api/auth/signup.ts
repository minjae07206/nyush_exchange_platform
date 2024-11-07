import express, { Request, Response } from 'express';
import { readFileSync } from 'fs'; // Importing the file system module
import bcrypt from 'bcrypt';
import pool from '../../db/postgres';
import forbiddenUsernames from '../../utils/forbiddenUsernames';
import generateRandomCode from '../../utils/generateRandomCode';
import { sendVerificationEmail } from '../../utils/sendEmail';
const saltRounds = 10;
const router = express.Router();
interface ReqBodyProps {
    email: string;
    username: string;
    password: string;
}
// New Learning: return type of the callback function.
// In express, the callback function does not expect a return value. Therefore, I set the return type to void.
// However, because I am not returning anything, the code inside the function runs even after I do res.json() or res.send().
// So, I add a single line only containing return; after each response I want to send to the client. 
// Even though then the return type of the function becomes undefined, it seems that Typescript does not raise an error because it considers void and undefined as the same thing.  
// Because the function is now async, its return type has to be Promise, but we use Promise<void>, it means the promise will resolve but won't have any return value.
router.post('/', async (req: Request, res: Response): Promise<void> => {
    const { email, username, password }: ReqBodyProps = req.body;

    // check if email exists
    if (!email) {
        res.status(400).json({ message: 'Email is required.' });
        return;
    }

    // check if email is valid length
    const MAX_EMAIL_LENGTH: number = 254;
    if (email.length > MAX_EMAIL_LENGTH) {
        res.status(400).json({ message: "Email is too long." });
        return;
    }

    const MIN_EMAIL_LENGTH: number = 5;
    if (email.length < MIN_EMAIL_LENGTH) {
        res.status(400).json({ message: "Email is too short." });
        return;
    }

    // check email validity,  later send a two-factor authentication email. 
    // the email should end in @nyu, and // email should only contain alphabets, numbers and full stop(.) and should not start with a full stop.

    const allowedEmailPattern: RegExp = /^[a-zA-Z0-9._%+-]+@nyu\.edu$/;
    if (!allowedEmailPattern.test(email)) {
        res.status(400).json({ message: "The email should end in @nyu, and the email should only contain alphabets, numbers and full stop(.) and should not start with a full stop." });
        return;
    }

    // check if username exists
    if (!username) {
        res.status(400).json({ message: 'Username is required.' });
        return;
    }
    // check if username is valid length
    const MAX_USERNAME_LENGTH: number = 30;
    if (username.length > MAX_USERNAME_LENGTH) {
        res.status(400).json({ message: "Username is too long." });
        return;
    }

    const MIN_USERNAME_LENGTH: number = 1;
    if (username.length < MIN_USERNAME_LENGTH) {
        res.status(400).json({ message: "Username is too short." });
        return;
    }
    // check if username is a valid email, meeting the syntax requirements.
    const allowedUsernamePattern: RegExp = /^[a-zA-Z0-9_]+$/;
    if (!allowedUsernamePattern.test(username)) {
        res.status(400).json({ message: "Username should only contain alphanumerical values and underscores." });
        return;
    }


    // check if username is not forbidden
    if (forbiddenUsernames.includes(username.toLowerCase())) {
        res.status(400).json({ message: "You are restricted from using the username you selected" });
        return;
    }
    // check if password exists
    if (!password) {
        res.status(400).json({ message: 'Password is required.' });
        return;
    }
    // check if password is valid length
    const MAX_PASSWORD_LENGTH: number = 128;
    if (password.length > MAX_PASSWORD_LENGTH) {
        res.status(400).json({ message: "Password is too long." });
        return;
    }

    const MIN_PASSWORD_LENGTH: number = 8;
    if (password.length < MIN_PASSWORD_LENGTH) {
        res.status(400).json({ message: "Password is too short." });
        return;
    }
    // check if password syntax is valid.
    const allowedPasswordPattern: RegExp = /^[^<>"'`;&$()/{}]*$/;
    if (!allowedPasswordPattern.test(password)) {
        res.status(400).json({ message: "The password cannot contain <, >, \", ', `, ;, &, $, /, \\, (, ), {, }" });
        return;
    }
    try {
        // check if email exists in the database
        const check_email_exists_query = readFileSync('./src/sql_queries/check_email_exists.sql', 'utf-8'); // reading the check_email_exits.sql file
        const emailExistsResult = await pool.query(check_email_exists_query, [email]);
        if (emailExistsResult.rows.length > 0) {
            // Email exists in the database
            res.status(400).json({ message: "Email already exists." });
            return;
        }
    } catch (error) {
        res.status(500).json({ message: "An error occured on the database with checking if email exists." });
        return;
    }

    try {
        // check if username exists in the database. Moved this to the last line as it contains DB querying.
        const check_username_exists_query = readFileSync('./src/sql_queries/check_username_exists.sql', 'utf-8'); // reading the check_email_exits.sql file
        const usernameExistsResult = await pool.query(check_username_exists_query, [username, 1]);
        if (usernameExistsResult.rows.length > 0) {
            // Username exists in the database
            res.status(400).json({ message: "Username already exists." });
            return;
        }
    } catch (error) {
        res.status(500).json({ message: "An error occured on the database with checking if username exists." });
        return;
    }
    // hash the password
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Todo: should send verification email.
    const verificationCode: string = generateRandomCode(6);

    try {
        await sendVerificationEmail(email, verificationCode);
    } catch (error) {
        res.status(500).json({ message: "An error occured during sending verification code email. Please try again later." });
        return;
    }

    try {
        req.session.unverifiedUser = {
            username: username,
            email: email,
            hashedPassword: hashedPassword,
            verificationCode: verificationCode,
        };
        res.status(200).json({ message: 'Verification email sent successfully! Redirecting to code input page' });
        return;
    } catch (error) {
        res.status(500).json({ message: "An error occured during creating session. Please try again later." });
        return;
    }
});

export default router;