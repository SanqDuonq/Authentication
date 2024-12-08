import { Request,Response } from "express";
import { userInput } from "../utils/validate";
import services from '../services/auth.services';
import createErrors from 'http-errors';
import sendVerifyEmail from "../services/email.services";

async function signup(req:Request<userInput>,res:Response) {
    const body = req.body;
    try {
        const existUser = await services.findUserByEmail(body.email);
        if (existUser){
            res.status(409).json('Account already exists');
        }
        const user = await services.createUser(body);
        await sendVerifyEmail(user.email);
        res.status(201).json({
            status: 'Created user successful',
            data: user
        })
    } catch (error){
        res.status(500).json(error)
    }
}

export default {
    signup
}