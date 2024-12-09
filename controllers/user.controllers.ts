import { Request, Response } from 'express';
import User from '../models/user.model';

async function getProfileUser(req:Request,res:Response) {
    const {id} = req.params;
    const user = await User.findOne({_id: id});
    if (!user) {
        res.status(404).json({
            message: 'User not found!'
        })
    }
    res.status(200).json({
        message: 'Get user successful!',
        data: user
    })
}

export default {
    getProfileUser
};