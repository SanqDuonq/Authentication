import {Response} from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

function generateAccessToken(res:Response, userId: string) {
    const accessToken = jwt.sign(userId,process.env.JWT_SECRET, {expiresIn: '1d'});

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 24
    })
}

export default generateAccessToken;