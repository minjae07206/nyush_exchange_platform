import express, { Application, Request, Response } from 'express'
import path from 'path';
import loginApi from './api/auth/login';
import signupApi from './api/auth/signup';
const app: Application = express();
app.use(express.json()) // this line is needed to access req.body, which is in json form.
const port: number = 3001;
app.use(express.static(path.join(__dirname, '../build')));
app.use('/api/auth/login', loginApi);
app.use('/api/auth/signup', signupApi);
app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
})

app.use((req: Request, res: Response) => {
    res.status(404).send('404 Not Found'); // Or serve a custom 404 page
});

app.listen(port, function () {
    console.log(`App is listening on port ${port} !`)
})