import express from 'express';
import {register, updateProfile, } from '../controllers/userController.js';
import { verifUser } from '../middleware/authUser.js';
const router = express.Router();

router.post('/register', register);
router.put('/users/:id', verifUser, updateProfile)

export default router;