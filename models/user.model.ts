import mongoose, { Schema } from "mongoose";
import IUser from "../interface/user.interface";
import bcrypt from 'bcrypt';
import log from "../utils/logger";

const userSchema:Schema<IUser> = new Schema({
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
    verificationCode: {
        type: String
    },
    verificationCodeExpireAt: {
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

//* Delete password user before
userSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    return user;
}

const User = mongoose.model('User',userSchema);

export default User;