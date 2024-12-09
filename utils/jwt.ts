import {Response} from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

function generateAccessToken(res:Response, userId: string) {
    const payload = {
        userId
    }
    const accessToken = jwt.sign(payload,process.env.JWT_SECRET, {expiresIn: '30s'});

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 24
    })

    return accessToken;
}

export default generateAccessToken;