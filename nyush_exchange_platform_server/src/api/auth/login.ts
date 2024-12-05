import express, { Request, Response } from 'express';
import { readFileSync } from 'fs';
import pool from '../../db/postgres';
import bcrypt from 'bcryptjs';
import path from 'path';

interface LoginReqBodyProps {
    usernameOrEmail: string;
    password: string;
}
const router = express.Router();
router.post('/', async (req: Request, res: Response) => {
    const { usernameOrEmail, password }: LoginReqBodyProps = req.body;
    let username: string = "";
    let email: string = "";

    // check if usernameOrEmail exists
    if (!usernameOrEmail) {
        res.status(400).json({ message: 'Username or email is required.' });
        return;
    }
    // check if its the appropriate length.
    const MAX_USERNAMEOREMAIL_LENGTH: number = 254;
    if (usernameOrEmail.length > MAX_USERNAMEOREMAIL_LENGTH) {
        res.status(400).json({ message: "Username or email is too long." });
        return;
    }

    //const allowedEmailPattern: RegExp = /^[a-zA-Z0-9._%+-]+@nyu\.edu$/;
    const allowedEmailPattern: RegExp = /^(?=.*@)(?=.*\.).+$/;
    const allowedUsernamePattern: RegExp = /^[a-zA-Z0-9_]+$/;
    console.log(allowedEmailPattern.test(usernameOrEmail))
    console.log(allowedUsernamePattern.test(usernameOrEmail))
    if (!allowedEmailPattern.test(usernameOrEmail) && !allowedUsernamePattern.test(usernameOrEmail)) {
        // both the email pattern and the username pattern did not pass
        res.status(400).json({ message: "Username or email syntax is not right." });
    }
    if (allowedEmailPattern.test(usernameOrEmail)) {
        // if email didn't pass then it is a username.
        email = usernameOrEmail;
    } else {
        username = usernameOrEmail
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
    const allowedPasswordPattern: RegExp = /^[^<>"'`;&$()/{}]*$/;
    if (!allowedPasswordPattern.test(password)) {
        res.status(400).json({ message: "The password cannot contain <, >, \", ', `, ;, &, $, /, \\, (, ), {, }" });
        return;
    }
    console.log(email)
    console.log(username)

    if (email !== "") {
        try {
            const filePath = path.join(__dirname, '..', '..', '..', 'sql_queries', 'select_password_with_email.sql');
            const select_password_with_email_query = readFileSync(filePath, 'utf-8');
            const getPasswordQueryResult = await pool.query(select_password_with_email_query, [email]);
            if (getPasswordQueryResult.rows.length > 0) {
                const hashedPassword = getPasswordQueryResult.rows[0].password;
                const passwordsMatch = await bcrypt.compare(password, hashedPassword);
                if (passwordsMatch) {
                    // passwords match, so login the user by creating a session.
                    const userId = getPasswordQueryResult.rows[0].user_id;
                    const role = getPasswordQueryResult.rows[0].role;
                    // create user session
                    req.session.user = {
                        userId: userId,
                        role: role,
                    }
                    // setting the maxAge for this session's cookie
                    req.session.cookie.maxAge = 3000 * 60 * 1000;
                    const sessionExpirationTime = Date.now() + req.session.cookie.maxAge;
                    res.status(200).json({ message: 'Login successful! Redirecting to market page',
                        sessionExpirationTime,
                     });
                    return;
                } else {
                    res.status(400).json({ message: "Incorrect password!" })
                    return;
                }
            } else {
                res.status(400).json({ message: "Email does not exist. Try signing up instead." });
                return;
            }

        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "An error occured during database query. Please try again later." });
            return;
        }
    } else {
        // try with username
        try {
            const select_password_with_username_query = readFileSync('./src/sql_queries/select_password_with_username.sql', 'utf-8');
            const getPasswordQueryResult = await pool.query(select_password_with_username_query, [username]);
            if (getPasswordQueryResult.rows.length > 0) {
                const hashedPassword = getPasswordQueryResult.rows[0].password;
                console.log(hashedPassword)
                const passwordsMatch = await bcrypt.compare(password, hashedPassword);
                if (passwordsMatch) {
                    // passwords match, so login the user by creating a session.
                    const userId = getPasswordQueryResult.rows[0].user_id;
                    const role = getPasswordQueryResult.rows[0].role;
                    // create user session
                    req.session.user = {
                        userId: userId,
                        role: role,
                    }
                    // setting the maxAge for this session's cookie
                    req.session.cookie.maxAge = 30 * 60 * 1000;
                    const sessionExpirationTime = Date.now() + req.session.cookie.maxAge;
                    res.status(200).json({ message: 'Login successful! Redirecting to market page',
                        sessionExpirationTime,
                     });
                    return;
                } else {
                    res.status(400).json({ message: "Passwords do not match." })
                    return;
                }
            } else {
                res.status(400).json({ message: "Username does not exist. Try signing up instead." });
                return;
            }

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "An error occured during database query. Please try again later." });
            return;
        }
    }

});

export default router;