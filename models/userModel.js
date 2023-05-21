// Berisi properti tabel user

const { Sequelize } = require('sequelize');
const db = require('../config/database');

const { DataTypes } = Sequelize;
const User = db.define('user', {
    uid: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },
    phoneNumber: {
       type: DataTypes.STRING,
       allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
     },
}, {
    freezeTableName: true,
});

module.exports = User;