import express from 'express';
import dotenv from 'dotenv';
import db from './config/database.js';
import UserRoute from './routes/userRoute.js';
import AuthRoute from './routes/authRoute.js';
import PetRoute from './routes/petRoute.js';
import bodyParser from 'body-parser';
import { uploadFile } from './config/multer.js';

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

/* Synchronize database (uncomment this if you want to create table) */
// (async () => {
//     db.sync({ force: true });
// })();

app.use(bodyParser.json());
app.use(express.json({ limit: '10mb' }));
app.use(UserRoute);
app.use(AuthRoute);
app.use(PetRoute);

app.post('/upload', uploadFile);

app.get('/', (req, res) => {
  res.send(`<h1>Welcome to OPet API<h1>`);
});

app.listen(PORT, () => {
  console.log(`OPet app listening on port http://localhost:${PORT}`);
});