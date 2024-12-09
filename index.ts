import express from 'express'
import log from './utils/logger';
import dotenv from 'dotenv';
import NotFoundRoute from './middlewares/not-found-route';
import connectMongoDB from './database/connect-mongoDB';
import authRoute from './routes/auth.route'
import cookieParser from 'cookie-parser'
import cors from 'cors'
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials:true}));

app.use('/api/auth',authRoute)
app.use(NotFoundRoute);

app.listen(port,() => {
    log.info(`App started at http://localhost:${port}`);
    connectMongoDB();
})