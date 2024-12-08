interface IUser {
    userName: string,
    email: string,
    password: string,
    isVerifyEmail: boolean,
    verificationCode: string,
    verificationCodeExpireAt: Date
}

export default IUser;