import { Dialect } from 'sequelize/types';

export const config = {
    database: {
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10),
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_DATABASE,
        dialect: process.env.DIALECT as Dialect,
        pool: JSON.parse(process.env.POOL),
        logging: false,
    },
    jwtPrivateKey: process.env.JWT_PRIVATE_KEY,
};
