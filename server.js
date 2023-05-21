const express = require('express');
const dotenv  = require('dotenv');
const { Sequelize } = require('sequelize');
const db = require('./config/database');
const User = require('./models/userModel');
const Pet = require('./models/petModel');
const PetCategory = require('./models/petCategoryModel');

dotenv.config();


const PORT = process.env.PORT || 5000;
const app = express();

// Synchronize database (uncomment this if you want to create table)
// (async () => {
//     await User.sync({ force: true });
//     await PetCategory.sync({ force: true });
//     await Pet.sync({ force: true });
// })();
  
app.get('/', (req, res) => {
  res.send(`<h1>Welcome to OPet API<h1>`);
})

app.listen(PORT, () => {
  console.log(`OPet app listening on port http://localhost:${PORT}`)
})