import { object, string, z } from "zod";
import dotenv from 'dotenv';
dotenv.config();

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

export type verifyEmailInput = z.infer<typeof verifyEmailSchema>['body'];
export type loginInput = z.infer<typeof loginSchema>['body'];