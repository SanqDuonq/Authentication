import express from 'express'
import log from './utils/logger';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT
app.listen(port,() => {
    log.info(`App started at http://localhost:${port}`)
})