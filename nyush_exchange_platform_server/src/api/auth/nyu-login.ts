// import express, { Request, Response } from 'express';
// import dotenv from 'dotenv';

// dotenv.config();

// const router = express.Router();

// const REDIRECT_URI: string = process.env.REDIRECT_URI || '';
// const CLIENT_ID: string = process.env.CLIENT_ID || '';

// router.get('/', (req: Request, res: Response) => {
//     if (!CLIENT_ID || !REDIRECT_URI) {
//         res.status(500).json({ error: 'Missing CLIENT_ID or REDIRECT_URI in environment variables' });
//         return;
//     }

//     const redirectUrl: string =
//         `https://qa.auth.it.nyu.edu/oauth2/authorize?` +
//         `client_id=${CLIENT_ID}` +
//         `&response_type=code` +
//         `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
//         `&scope=openid%20email%20profile` +
//         `&state=randomxyz`;

//     res.redirect(redirectUrl);
//     return;
// });

// export default router;
