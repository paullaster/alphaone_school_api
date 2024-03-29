export const database = {
    dialect: process.env.DB_CONNECTION,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    timezone: process.env.TIME_ZONE,
    pool: {
        max: parseInt(process.env.DB_POOL_CONNECTION_MAX)
    },
    loggin: process.env.DB_LOGGING,
}