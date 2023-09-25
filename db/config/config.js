const dotenv = require('dotenv');
dotenv.config({
    path: '../.env',
});

const config = {
    development: {
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10),
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_DATABASE,
        dialect: process.env.DIALECT,
        pool: JSON.parse(process.env.POOL),
    },
    production: {
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10),
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_DATABASE,
        dialect: process.env.DIALECT,
        pool: JSON.parse(process.env.POOL),
    },
};

module.exports = config[process.env.NODE_ENV];
