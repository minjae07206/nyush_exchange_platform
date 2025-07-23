import express, { Request, Response } from 'express';
import axios from 'axios';

import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

const REDIRECT_URI: string = process.env.REDIRECT_URI || '';
const CLIENT_ID: string = process.env.CLIENT_ID || '';

router.get('/oauth', async (req:Request, res: Response) => {
    const code = req.query.code as string;

    if (!code) {
        res.status(400).send('Missing code in request');
        return;
    }

    try {
        const tokenRes = await axios.post(
            'https://qa.auth.it.nyu.edu/oauth2/token',
            new URLSearchParams({
                grant_type: 'authorization_code',
                code,
                redirect_uri: REDIRECT_URI,
                client_id: CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET || ''
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );

        const tokens = tokenRes.data;
        // Example: tokens.id_token, tokens.access_token, etc.

        res.json(tokens);
        return;
    } catch (err) {
        console.error(err);
        res.status(500).send('Token exchange failed');
        return;
    }
});

