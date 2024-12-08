import { Request,Response } from "express";
import { userInput } from "../utils/validate";
import services from '../services/auth.services';
import sendVerifyEmail from "../services/email.services";
import { verifyEmailInput } from "../schema/user.schema";

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
    } catch (error) {
        res.status(500).json(error);
    }
}


async function login(req:Request,res:Response){

}

export default {
    signup,
    login,
    verifyEmail
}