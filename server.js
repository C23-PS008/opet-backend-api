import express from 'express';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import session from 'express-session';
import db from './config/database.js';
import SequelizeStore from 'connect-session-sequelize'
import User from './models/userModel.js';
import Pet from './models/petModel.js';
import PetCategory from './models/petCategoryModel.js';
import UserRoute from './routes/userRoute.js';
import AuthRoute from './routes/authRoute.js'

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

// Synchronize database (uncomment this if you want to create table)
// (async () => {
//     await User.sync({ force: true });
//     await PetCategory.sync({ force: true });
//     await Pet.sync({ force: true });
// })();

const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
  db : db,
});

app.use(session({
  secret: 'secretsecret',
  resave: false,
  saveUninitialized: false,
  store: store,
}));
app.use(express.json());
app.use(UserRoute);
app.use(AuthRoute);

// store.sync();

app.get('/', (req, res) => {
  res.send(`<h1>Welcome to OPet API<h1>`);
})

app.listen(PORT, () => {
  console.log(`OPet app listening on port http://localhost:${PORT}`)
})