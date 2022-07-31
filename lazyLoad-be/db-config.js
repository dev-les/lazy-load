const createConnectionPool = require('@databases/pg');
const dotenv = require('dotenv');
dotenv.config();
const db = createConnectionPool(
    `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@127.0.0.1/${process.env.POSTGRES_DB}`
);

module.exports = db;