import mongoose, { Schema } from "mongoose";
import IUser from "../interface/user.interface";

const userSchema:Schema<IUser> = new Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isVerifyEmail: {
        type: Boolean,
        default: false
    }
},  {timestamps: true})

const User = mongoose.model('User',userSchema);

export default User;