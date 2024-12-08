import IUser from "../interface/user.interface";
import User from "../models/user.model";
import createErrors from 'http-errors';
import sendVerifyEmail from "./email.services";
import OTP from "../utils/otp-code";

async function createUser(body: Partial<IUser>) {
    const user = await User.findOne({email: body.email})
    if (user) {
        throw createErrors.Conflict('Email is already exists');
    }
    const newUser = new User({
        email: body.email,
        password: body.password,
        userName: body.userName,
        verificationCode: OTP.OTP(),
        verificationCodeExpireAt: OTP.OTPExpireAt()
    })
    return await newUser.save();
}

async function findUserByEmail(email:string) {
    return await User.findOne({email});
}

async function verifyEmail(email:string,code:string){
    const user = await User.findOne({email});
    if (!user){
        throw createErrors(404, 'User not found!')
    }
    if (user.verificationCode !== code){
        throw createErrors(400, 'Verification code is wrong!');
    }
    if (user.verificationCodeExpireAt.toString() < OTP.OTPExpireAt.toString()) {
        throw createErrors(400, 'OTP has expired!')
    }
    user.isVerifyEmail = true;
    return await user.save();
}

async function generateOTPCode(email:string){
    const user = await User.findOne({email});
    if (!user){
        throw createErrors(404, 'Email not found!');
    }
    return await sendVerifyEmail(email);
}

export default {
    createUser,
    findUserByEmail,
    verifyEmail,
    generateOTPCode
}