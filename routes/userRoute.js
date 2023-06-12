import express from 'express';
import { getProfile, updateProfile, } from '../controllers/userController.js';
import { verifyToken } from '../middleware/authJwt.js';
const router = express.Router();

router.get('/users/me', verifyToken, getProfile)
router.put('/users/edit', verifyToken, updateProfile)

export default router;