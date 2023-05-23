import express from 'express';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import db from './config/database.js';
import User from './models/userModel.js';
import Pet from './models/petModel.js';
import PetCategory from './models/petCategoryModel.js';
import UserRoute from './routes/userRoute.js';

dotenv.config();


const PORT = process.env.PORT || 5000;
const app = express();

// Synchronize database (uncomment this if you want to create table)
// (async () => {
//     await User.sync({ force: true });
//     await PetCategory.sync({ force: true });
//     await Pet.sync({ force: true });
// })();

app.use(express.json());
app.use(UserRoute);
  
app.get('/', (req, res) => {
  res.send(`<h1>Welcome to OPet API<h1>`);
})

app.listen(PORT, () => {
  console.log(`OPet app listening on port http://localhost:${PORT}`)
})