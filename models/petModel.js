import { Sequelize } from 'sequelize';
import db from '../config/database.js';
import User from './userModel.js';
import PetCategory from './petCategoryModel.js';

const { DataTypes } = Sequelize;
const Pet = db.define('pet', {
  petId: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  ownerId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  photoUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  petCategory: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  breed: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  characters: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.ENUM('baby', 'young', 'adult'),
    allowNull: false,
  },
  size: {
    type: DataTypes.ENUM('small', 'large'),
    allowNull: false,
  },
  gender: {
    type: DataTypes.ENUM('unknown', 'male', 'female'),
    allowNull: false,
  },
  about: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  lon: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  lat: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
}, {
  freezeTableName: true,
});

Pet.belongsTo(User, {
  foreignKey: 'ownerId'
});

Pet.belongsTo(PetCategory, {
  foreignKey: 'petCategory'
})

export default Pet;