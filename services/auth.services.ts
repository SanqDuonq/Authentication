import IUser from "../interface/user.interface";
import User from "../models/user.model";

function createUser(input: Partial<IUser>) {
    return User.create(input);
}

function findUserByEmail(email:string) {
    return User.findOne({email})
}

export default {
    createUser,
    findUserByEmail
}