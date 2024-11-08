import express, { Application, Request, Response } from 'express';
import session, {Session} from "express-session";
import { createClient } from 'redis';
import RedisStore from 'connect-redis';


import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file
import cookieParser from 'cookie-parser';
import path from 'path';
import loginApi from './api/auth/login';
import signupApi from './api/auth/signup';
import verfiyUserApi from './api/auth/verifyUser';
import checkVerificationCodeSessionApi from './api/auth/checkVerificationCodeSessionExists';
import checkLoginApi from './api/auth/check-login';
import keepAliveApi from './api/auth/keep-alive';
import logoutApi from './api/auth/logout';
import createPostApi from './api/post/create-post';
import myAvailablePostApi from './api/post/my-available-post';
import myDraftPostApi from './api/post/my-draft-post';
import myArchivedPostApi from './api/post/my-archived-post';
import mySavedPostApi from './api/post/my-saved-post';
import marketPostApi from './api/post/market_post';
import savePostApi from './api/post/save-post';
import unsavePostApi from './api/post/unsave-post';
import incrementSavedCountApi from './api/post/increment-saved-count';
import decrementSavedCountApi from './api/post/decrement-saved-count';
import getPostFullApi from './api/post/get-post-full';
import getUserInfoApi from './api/user/get-user-info';
import requestUpdateUserInfoApi from './api/user/request-update-user-info';
import updateUserPendingStateApi from './api/user/update-user-pending-state';
const redisClient = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT as string, 10),
    }
});

redisClient.connect().catch(console.error);
redisClient.on('connect', () => {
    console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
    console.error('Redis connection error:', err);
});
export {redisClient};
// Initialize redis store
const redisStore = new RedisStore({
    client: redisClient,
    prefix: "nyush_exchange_platform_redis",
})



const app: Application = express();
app.use(express.json()) // this line is needed to access req.body, which is in json form.
app.use(cookieParser());
const port: number = 3001;

app.use(session({
    store: redisStore,
    secret: process.env.COOKIE_SECRET || 'default_secret',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        path: "/", // path that the cooke is saved
        secure: false, // false because tested in http in localhost
        httpOnly: true, // client cannot use javascript to access the cookie.
        maxAge: 1000 * 60 * 3, // 3 minutes

     }, // Secure cookies in production
}));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use(express.static(path.join(__dirname, '../../nyush_exchange_platform/build')));
app.use('/api/auth/login', loginApi);
app.use('/api/auth/signup', signupApi);
app.use('/api/auth/check-verification-code-session-exists', checkVerificationCodeSessionApi);
app.use('/api/auth/verify-user', verfiyUserApi);
app.use('/api/auth/check-login', checkLoginApi);
app.use('/api/auth/keep-alive', keepAliveApi);
app.use('/api/auth/logout', logoutApi);
app.use('/api/post/create-post', createPostApi);
app.use('/api/post/my-available-post', myAvailablePostApi);
app.use('/api/post/my-draft-post', myDraftPostApi);
app.use('/api/post/my-archived-post', myArchivedPostApi);
app.use('/api/post/market-post', marketPostApi);
app.use('/api/post/my-saved-post', mySavedPostApi);
app.use('/api/post/save-post', savePostApi);
app.use('/api/post/unsave-post', unsavePostApi);
app.use('/api/post/increment-saved-count', incrementSavedCountApi);
app.use('/api/post/decrement-saved-count', decrementSavedCountApi);
app.use('/api/post/get-post-full', getPostFullApi);
app.use('/api/user/get-user-info', getUserInfoApi);
app.use('/api/user/request-update-user-info', requestUpdateUserInfoApi);
app.use('/api/user/update-user-pending-state', updateUserPendingStateApi);
app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../../nyush_exchange_platform/build/index.html'));
})

app.use((req: Request, res: Response) => {
    res.status(404).send('404 Not Found'); // Or serve a custom 404 page
});

app.listen(port, function () {
    console.log(`App is listening on port ${port} !`)
})