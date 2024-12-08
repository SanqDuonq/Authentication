import nodemailer, { SendMailOptions } from 'nodemailer';
import log from './logger';
import createErrors from 'http-errors'
import IEmail from '../interface/mail.interface';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD
    }
})

async function sendEmail(email:IEmail){
    const mailOptions: SendMailOptions = {
        from: `Auth-App`,
        to: email.to,
        subject: email.subject,
        text: email.text,
        html: email.html
    }
    try {
        await transporter.verify();
        const info = await transporter.sendMail(mailOptions);
        log.info(`Email sent to ${email.to}`);
        log.info(`MessengerID: ${info.messageId}}`)
    } catch (error) {
        log.error(error, `Error sending email to ${email.to}`);
        throw createErrors(500,`Fail to sent email to ${email.to}`);
    }
}

export default {
    sendEmail
}