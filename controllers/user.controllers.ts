import { Request, Response } from 'express';
import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import { generateAccessToken, generateRefreshToken } from '../utils/jwt';
dotenv.config();

async function getProfileUser(req:Request,res:Response) {
    const {id} = req.params;
    const user = await User.findOne({_id: id});
    if (!user) {
        res.status(404).json({
            message: 'User not found!'
        })
    }
    res.status(200).json({
        message: 'Get user successful!',
        data: user
    })
}

async function refreshToken(req:Request,res:Response){
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        res.status(401).json({
            message: 'Unauthorize - no token provided'  
        })
    }
    try {
        const decode:any = jwt.verify(refreshToken,process.env.JWT_REFRESH_SECRET);
        const userId = decode.userId;
        
        const newAccessToken = generateAccessToken(res,userId);
        res.status(200).json({
            accessToken: newAccessToken
        })
    } catch (error) {
        res.status(403).json({
            message: 'Invalid or expired refresh token'
        });
    } 
}


export default {
    getProfileUser,
    refreshToken
};