// Untuk Connect ke mySQL

const { Sequelize } = require('sequelize')
const dotenv = require('dotenv');
dotenv.config();

const {
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,
    DB_HOST,
} = process.env

const db = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql'
});

module.exports = db;