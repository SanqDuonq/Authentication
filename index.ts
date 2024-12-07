import express from 'express'
import log from './utils/logger';
import dotenv from 'dotenv';
import NotFoundRoute from './middlewares/not-found-route';
import connectMongoDB from './database/connect-mongoDB';
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get('/',(req,res,next) => {
    res.send('Home Page')
});
app.use(NotFoundRoute);


app.listen(port,() => {
    log.info(`App started at http://localhost:${port}`);
    connectMongoDB();
})