import { Request, Response } from 'express';
import { userInput, userSchema } from "../utils/validate";
import services from '../services/auth.services';
import sendVerifyEmail from "../services/email.services";
import { loginInput, loginSchema, verifyEmailInput } from "../schema/user.schema";
import { z, ZodError } from 'zod';
import generateAccessToken from '../utils/jwt';

async function signup(req:Request<userInput>,res:Response) {
    try {
        const validateBody:userInput = userSchema.parse({
            body: req.body
        }).body
        const user = await services.createUser(validateBody);

        res.status(201).json({
            status: 'Created user successful',
            data: user
        })
    } catch (error:any){
        if (error instanceof z.ZodError){
            res.status(400).json({
                message: 'Validation fail',
                errors: error.errors.map((data) => data.message)
            }); 
        }
        else {
            res.status(500).json({
                message: error.message
            })
        }
    }
}


async function login(req:Request<loginInput>,res:Response) {
    try {
        const validateBody:loginInput = loginSchema.parse({
            body: req.body
        }).body
        const user = await services.findUserByEmail(validateBody.email);
        if (!user) {
            res.status(404).json({
                message: 'Email is not exists'
            })
            return;
        }

        const password = await user?.validatePassword(validateBody.password);
        if (!password){
            res.status(400).json({
                message: 'Email or password is incorrect'
            })
            return;
        }

        const accessToken = generateAccessToken(res,user.id);
        res.status(200).json({
            message: 'Login successful!',
            accessToken
        })
    } catch (error) {
        if (error instanceof ZodError){
            res.status(400).json({
                error: error.errors.map((data) => data.message)
            })
            return;
        }
        res.status(500).json(`Server error ${error}`)
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

async function forgotPassword(req:Request,res: Response) {
    const email = req.body.email;
    const user = await services.findUserByEmail(email);
    if (!user) {
        res.status(404).json({
            message: 'Email not found!'
        })
    }
    res.status(200).json({
        message: `Verification code sent to ${email}`
    })
}


export default {
    signup,
    login,
    verifyEmail,
    forgotPassword
}