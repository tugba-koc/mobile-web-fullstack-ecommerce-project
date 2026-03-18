import dotenv from 'dotenv';

dotenv.config();

export const ENV = {
        NODE_ENV: process.env.NODE_ENV || 'development',
        PORT: process.env.PORT || 3000,
        DB_URL: process.env.DATABASE_URL || 'mongodb://localhost:27017/ecommerce',
        CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY || '',
        CLERK_SECRET_KEY: process.env.CLERK_PUBLISHABLE_KEY,
        CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
        INNGEST_SIGNIN_KEY: process.env.INNGEST_SIGNIN_KEY,
        CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
        CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
        CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET
}