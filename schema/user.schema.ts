import { object, string, z } from "zod";
import dotenv from 'dotenv';
dotenv.config();

const patternPassword = '^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).{8,32}$'

export const verifyEmailSchema = object({
    body: object({
        email: string({required_error: 'Email is required'}).email().endsWith('@gmail.com'),
        code: string({required_error: 'Code is required'}).length(6,'Verify code must be 6 character(s)')
    })
})

export const loginSchema = object({
    body: object({
        email: string({required_error: 'Email is required'}).email().endsWith('@gmail.com'),
        password: string({required_error: 'Password is required'}).min(8,'Password must be at least 8 character(s)')
    })
})

export const forgotPasswordSchema = object({
    body: object({
        email: string({required_error: 'Email is required'}).email().endsWith('@gmail.com')
    })
})

export const resetPasswordSchema = object({
    body: object({
        code: string({required_error: 'Code is required'}).length(6,'Code must be 6 character(s)'),
        password: string({required_error: 'Password is required'}).regex(new RegExp(patternPassword),'Password must be at least 8 character(s), including 1 uppercase, 1 lowercase, 1 number and 1 special number ')
    })
})

export type verifyEmailInput = z.infer<typeof verifyEmailSchema>['body'];
export type loginInput = z.infer<typeof loginSchema>['body'];
export type forgotPasswordInput = z.infer<typeof forgotPasswordSchema>['body'];
export type resetPasswordInput = z.infer<typeof resetPasswordSchema>['body'];