import {object, string, z} from 'zod'

const userSchema = z.object({
    body: object({
        userName: string({
            required_error: 'userName is required'
        })
        .min(1,'User name must be at least 1 character(s)')
        .max(20, 'User name is not more 20 character(s)'),

        email: string({
            required_error: 'email is required'
        })
        .email('Email not valid')
        .endsWith('@gmail.com'),

        password: string({
            required_error: 'password is required'
        })
        .regex(process.env.PatternPassword, 'Password must be at least 8 character(s)'),

        confirmPassword: string({
            required_error: 'Confirm password is required'
        })
    }).refine((data) => data.password === data.confirmPassword, {
        message: 'Confirm password do not match',
        path: ['confirmPassword']
    })
})

export type userInput = z.infer<typeof userSchema>['body'];