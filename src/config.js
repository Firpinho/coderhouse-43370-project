require('dotenv/config');

module.exports = {
    NODE_ENV: process.env.NODE_ENV,
    MONGO_LOCAL: process.env.MONGO_LOCAL,
    MONGO_ATLAS: process.env.MONGO_ATLAS,
    SECRET_KEY_JWP: process.env.SECRET_KEY_JWP,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_SECRET_KEY: process.env.GITHUB_SECRET_KEY,
    GITHUB_CALLBACK_URL: process.env.GITHUB_CALLBACK_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_SECRET_KEY: process.env.GOOGLE_SECRET_KEY,
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
    PORT: process.env.PORT,
    MAIL_HOST: process.env.MAIL_HOST,
    MAIL_PORT: process.env.MAIL_PORT,
    MAIL_USER: process.env.MAIL_USER,
    MAIL_PASS: process.env.MAIL_PASS,
}