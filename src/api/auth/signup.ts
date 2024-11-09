import express, { Request, Response } from 'express';
import { readFileSync } from 'fs';
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

router.post('/', async (req: Request, res: Response): Promise<void> => {
    const { email, username, password }: ReqBodyProps = req.body;

    // Validate request data
    if (!email || email.length < 5 || email.length > 254) {
        res.status(400).json({ message: 'Invalid email length.' });
        return;
    }
    if (!/^[a-zA-Z0-9._%+-]+@nyu\.edu$/.test(email)) {
        res.status(400).json({ message: 'Invalid email format. Must end in @nyu.edu.' });
        return;
    }
    if (!username || username.length < 1 || username.length > 30 || !/^[a-zA-Z0-9_]+$/.test(username)) {
        res.status(400).json({ message: 'Invalid username format.' });
        return;
    }
    if (forbiddenUsernames.includes(username.toLowerCase())) {
        res.status(400).json({ message: 'Username is forbidden.' });
        return;
    }
    if (!password || password.length < 8 || password.length > 128 || /[<>"'`;&$()/{}]/.test(password)) {
        res.status(400).json({ message: 'Invalid password format.' });
        return;
    }

    const client = await pool.connect();

    try {
        const checkEmailQuery = readFileSync('./src/sql_queries/check_email_exists.sql', 'utf-8');
        const checkUsernameQuery = readFileSync('./src/sql_queries/check_username_exists.sql', 'utf-8');

        await client.query('BEGIN');

        // Check if email exists
        const emailExists = await client.query(checkEmailQuery, [email]);
        if (emailExists.rows.length > 0) {
            await client.query('ROLLBACK');
            res.status(400).json({ message: 'Email already exists.' });
            return;
        }

        // Check if username exists
        const usernameExists = await client.query(checkUsernameQuery, [username]);
        if (usernameExists.rows.length > 0) {
            await client.query('ROLLBACK');
            res.status(400).json({ message: 'Username already exists.' });
            return;
        }

        await client.query('COMMIT');

        // Hash password and generate verification code
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        const verificationCode = generateRandomCode(6);

        // Send verification email
        await sendVerificationEmail(email, verificationCode);

        req.session.unverifiedUser = {
            username,
            email,
            hashedPassword,
            verificationCode,
        };

        res.status(200).json({ message: 'Verification email sent successfully! Redirecting to code input page.' });
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error:', error);
        res.status(500).json({ message: 'An error occurred during processing. Please try again later.' });
    } finally {
        client.release();
    }
});

export default router;
