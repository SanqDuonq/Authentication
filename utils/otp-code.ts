const OTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

const OTPExpireAt = () => {
    return new Date(Date.now() + 1000 * 60 * 10);
}
export default {
    OTP,
    OTPExpireAt
}