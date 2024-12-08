import log from '../utils/logger';
import mail from '../utils/mail'
import OTP from '../utils/otp-code'
async function sendVerifyEmail(email:string) {
    try {
        await mail.sendEmail({
            to: email,
            subject: 'Verify Email',
            text: 'Verify your email',
            html: `Your OTP - ${OTP()}`
        });
        log.info('Email sent successful')
    } catch (error) {
        log.error(`Error occurred: ${error}`)
    }
}

export default sendVerifyEmail;