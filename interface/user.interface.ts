interface IUser {
    userName: string,
    email: string,
    password: string,
    isVerifyEmail: boolean,
    verifyOTP: string,
    verifyOTPExpireAt: Date,
    resetOTP: string,
    resetOTPExpireAt: Date
}

export default IUser;