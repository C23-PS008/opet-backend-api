const { Sequelize } = require('sequelize');
const db = require('../config/database');

const { DataTypes } = Sequelize;
const PetCategory = db.define('pet_category', {
    categoryId: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },
    categoryName: {
        type: DataTypes.STRING,
        allowNull: false,}
}, {
    freezeTableName: true,
    timestamps: false,
});

module.exports = PetCategory;