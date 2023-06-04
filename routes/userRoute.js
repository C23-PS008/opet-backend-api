import express from 'express';
import { updateProfile, } from '../controllers/userController.js';
import { verifyToken } from '../middleware/authJwt.js';
const router = express.Router();

router.put('/users/:id', verifyToken, updateProfile)

export default router;