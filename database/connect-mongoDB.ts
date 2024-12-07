import mongoose from 'mongoose'
import log from '../utils/logger';
import createErrors from 'http-errors'
async function connectMongoDB(){
    try {
        const connect = await mongoose.connect(process.env.MongoURI);
        log.info(`Connected mongoDB success ${connect.connection.host}`);
    } catch (error) {
        const errors = createErrors(500, `Connect mongoDB fail ${error}`)
        log.error(`Connected mongoDB fail ${errors}`);
    }
}

export default connectMongoDB;

