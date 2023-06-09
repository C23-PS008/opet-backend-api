import express from 'express';
import { getProfileById, updateProfile, } from '../controllers/userController.js';
import { verifyToken } from '../middleware/authJwt.js';
const router = express.Router();

router.get('/users/:id', verifyToken, getProfileById)
router.put('/users/:id', verifyToken, updateProfile)

export default router;