import log from '../utils/logger';
import mail from '../utils/mail'
import OTP from '../utils/otp-code'
export async function sendVerifyEmail(email:string) { 
    try {
        const otp = OTP.OTP();
        await mail.sendEmail({
            to: email,
            subject: 'Verify Email',
            text: 'Verify your email',
            html: `Your OTP - ${otp}`
        });
        log.info('Email sent successful');
        return otp;
    } catch (error) {
        log.error(`Error occurred: ${error}`)
    }
}

export async function sendForgotPasswordEmail(email:string) {
    try {
        const otp = OTP.OTP();
        await mail.sendEmail({
            to: email,
            subject: 'Forgot Password Email',
            text: 'Forgot Password Email',
            html: `Your OTP - ${otp}`
        })
        log.info('Email sent successful');
        return otp;
    } catch (error) {
        log.error(`Error occurred ${error}`)
    }
}
