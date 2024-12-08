import { Request, Response } from 'express';
import { userInput } from "../utils/validate";
import services from '../services/auth.services';
import sendVerifyEmail from "../services/email.services";
import { verifyEmailInput } from "../schema/user.schema";
import User from '../models/user.model';

async function signup(req:Request<userInput>,res:Response) {
    const body = req.body;
    try {
        const user = await services.createUser(body);
        res.status(201).json({
            status: 'Created user successful',
            data: user
        })
    } catch (error:any){
        res.status(500).json(error.message)
    }
}

async function verifyEmail(req:Request<verifyEmailInput>,res:Response) {
    const body = req.body;
    try {
        await services.verifyEmail(body.email,body.code);
        res.status(200).json({
            message: 'Verify email is successful'
        })
    } catch (error:any) {
        res.status(500).json(error.message);
    }
}

async function resetPassword(req:Request,res: Response) {
    const email = req.body.email;
    const user = await services.findUserByEmail(email);
    if (!user) {
        res.status(400).json({
            message: 'Email not found!'
        })
    }
    res.status(200).json({
        message: `Verification code sent to ${email}`
    })
}


async function login(req:Request,res:Response){

}

export default {
    signup,
    login,
    verifyEmail,
    resetPassword
}