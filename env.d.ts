declare namespace NodeJS{
    interface ProcessEnv {
        PORT: string,
        MongoURI: string,
        SMTP_HOST: string,
        SMTP_PORT: number,
        SMTP_EMAIL: string,
        SMTP_PASSWORD: string,
        SMTP_EMAIL_SYSTEM: string,
        JWT_ACCESS_SECRET: string,
        JWT_REFRESH_SECRET: string,
        NODE_ENV: string
    }
}