import { object, string, z } from "zod";

export const verifyEmailSchema = object({
    body: object({
        email: string().email().endsWith('@gmail.com'),
        code: string().length(6,'Verify code must be 6 character(s)')
    })
})

export type verifyEmailInput = z.infer<typeof verifyEmailSchema>['body']