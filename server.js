import express from 'express';
import dotenv from 'dotenv';
import multer from 'multer';
import { fileStorage, fileFilter } from './config/multer.js';
import db from './config/database.js';
import UserRoute from './routes/userRoute.js';
import AuthRoute from './routes/authRoute.js';
import PetRoute from './routes/petRoute.js';
import bodyParser from 'body-parser';

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

/* Synchronize database (uncomment this if you want to create table) */
// (async () => {
//     db.sync({ force: true });
// })();

app.use(multer({
  storage: fileStorage,
  fileFilter: fileFilter
}).single('image'));
app.use(bodyParser.json());
app.use(express.json());
app.use(UserRoute);
app.use(AuthRoute);
app.use(PetRoute);

app.get('/', (req, res) => {
  res.send(`<h1>Welcome to OPet API<h1>`);
})

app.listen(PORT, () => {
  console.log(`OPet app listening on port http://localhost:${PORT}`)
})