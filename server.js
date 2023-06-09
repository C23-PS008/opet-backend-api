import express from 'express';
import dotenv from 'dotenv';
import db from './config/database.js';
import UserRoute from './routes/userRoute.js';
import AuthRoute from './routes/authRoute.js';
import PetRoute from './routes/petRoute.js';
import bodyParser from 'body-parser';
import multer from 'multer';

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

app.use(upload.single('image'))
app.use(bodyParser.json());
app.use(express.json({ limit: '10mb' }));
app.use(UserRoute);
app.use(AuthRoute);
app.use(PetRoute);

app.get('/', (req, res) => {
  res.send(`<h1>Welcome to OPet API<h1>`);
});

app.listen(PORT, () => {
  console.log(`OPet app listening on port http://localhost:${PORT}`);
});