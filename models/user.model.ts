import mongoose, { Schema } from "mongoose";
import IUser from "../interface/user.interface";
import bcrypt from 'bcrypt';
import log from "../utils/logger";
import createErrors from 'http-errors';

interface IUserMethod extends IUser {
    validatePassword(candidatePassword:string):Promise<boolean>;
}

const userSchema:Schema<IUserMethod> = new Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isVerifyEmail: {
        type: Boolean,
        default: false
    },
    verifyOTP: {
        type: String
    },
    verifyOTPExpireAt: {
        type: Date
    },
    resetOTP: {
        type: String
    },
    resetOTPExpireAt: {
        type: Date
    }
},  {timestamps: true})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')){
        return next();
    }
    try {
        const hash = await bcrypt.hash(this.password,10);
        this.password = hash;
        next();
    } catch (error) {
        log.error(error, 'Fail to hash password');
        next(error as mongoose.CallbackError);
    }
})

userSchema.methods.validatePassword = async function (candidatePassword:string) {
    try {
        return await bcrypt.compare(candidatePassword,this.password);
    } catch (error) {
        log.error(`Error comparing password`)
        throw createErrors(400, 'Email or password is wrong!')
    }

}

//* Delete password user before
userSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    return user;
}

const User = mongoose.model('User',userSchema);

export default User;