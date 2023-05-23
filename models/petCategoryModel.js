import { Sequelize } from 'sequelize';
import db from '../config/database.js';

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

export default PetCategory;