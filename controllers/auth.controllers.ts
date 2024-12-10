import { Request, Response } from 'express';
import { userInput, userSchema } from "../utils/validate";
import services from '../services/auth.services';
import { forgotPasswordInput, forgotPasswordSchema, loginInput, loginSchema, resetPasswordInput, resetPasswordSchema, verifyEmailInput } from "../schema/user.schema";
import { z, ZodError } from 'zod';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt';
import { sendForgotPasswordEmail, sendVerifyEmail } from '../services/email.services';
import User from '../models/user.model';

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
        const otp = await sendVerifyEmail(validateBody.email);
        if (!otp) {
            res.status(500).json({
                message: 'Sent OTP fail'
            })
            return;
        }
        user.verifyOTP = otp;
        const accessToken = generateAccessToken(res,user.id);
        const refreshToken = generateRefreshToken(res,user.id);
        await user.save();
        res.status(200).json({
            message: 'Login successful!',
            accessToken,
            refreshToken
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

async function forgotPassword(req:Request<forgotPasswordInput>,res: Response) {
    try {
        const validateBody:forgotPasswordInput = forgotPasswordSchema.parse({
            body: req.body
        }).body
        const user = await services.findUserByEmail(validateBody.email);
        if (!user) {
            res.status(404).json({
                message: 'Email not found!'
            })
            return;
        }
        const otp = await sendForgotPasswordEmail(user.email);
        if (!otp) {
            res.status(400).json({
                message: 'OTP sent fail'
            })
            return;
        }
        user.resetOTP = otp;
        await user.save();
        res.status(200).json({
            message: `Verification code sent to ${validateBody.email}`
        })
    } catch (error:any) {
        if (error instanceof ZodError){
            res.status(400).json({
                message: error.errors.map((data) => data.message)
            })
            return;
        }
        res.status(500).json(error.message)
    }
}

async function resetPassword(req:Request<resetPasswordInput>,res:Response){
    try {
        const validateBody: resetPasswordInput = resetPasswordSchema.parse({
            body: req.body
        }).body
        const user = await User.findOne({
            resetOTP: validateBody.code
        })
        if (!user){
            res.status(400).json({
                message: 'Reset code is wrong!'
            })
            return;
        }
        user.password = validateBody.password;
        await user.save();
        res.status(200).json({
            message: 'Reset password successful!'
        })
    } catch (error:any) {
        if (error instanceof ZodError) {
            res.status(400).json({
                message: error.errors.map((data) => data.message)
            })
            return;
        }
        res.status(500).json(error.message)
    }
}

async function logout(req:Request,res:Response){

}


export default {
    signup,
    login,
    verifyEmail,
    forgotPassword,
    resetPassword,
    logout
}