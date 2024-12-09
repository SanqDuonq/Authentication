import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import log from '../utils/logger';
dotenv.config();

function verifyAccessToken(req:Request,res:Response,next: NextFunction) {
    const accessToken = req.cookies.accessToken;
    if (!accessToken){
        res.status(401).json({
            message: 'Unauthorized - no token provided'
        })
        return;
    }
    try {
        jwt.verify(accessToken,process.env.JWT_ACCESS_SECRET);
        next();
    } catch (error) {
        log.error(`Error in verify token ${error}`)
        res.status(401).json({
            message: 'Unauthorized - invalid or expired token'
        })
        return;
    }
}

export default {
    verifyAccessToken
};