import {Response} from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

export function generateAccessToken(res:Response, userId: string) {
    const payload = {
        userId
    }
    const accessToken = jwt.sign(payload,process.env.JWT_ACCESS_SECRET, {expiresIn: '20s'});

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60 * 2
    })
    return accessToken;
}

export function generateRefreshToken(res:Response,userId:string){
    const payload = {
        userId
    }
    const refreshToken = jwt.sign(payload,process.env.JWT_REFRESH_SECRET, {expiresIn: '30s'})

    res.cookie('refreshToken',refreshToken,{
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 24 * 7
    })
    return refreshToken;
}
