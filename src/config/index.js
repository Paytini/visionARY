import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
    // This error should crash whole process
    throw new Error("Couldn't find .env file");
}

export default {
    /**
     * Your favorite port
     */
    port: parseInt(process.env.PORT, 10),
    api: {
        prefix: '/vision',
    },
    databaseURL: process.env.DATABASE_URL,
};
