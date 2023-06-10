import express from 'express';
import {
  uploadPet,
  getPetsList,
  getPetById,
  getMyPets,
  updatePet,
  deletePet,
} from '../controllers/petController.js';
import { verifyToken } from '../middleware/authJwt.js';
const router = express.Router();

router.get('/pets', verifyToken, getPetsList);
router.get('/pets/:id', verifyToken, getPetById);
router.post('/mypets', verifyToken, uploadPet);
router.get('/mypets', verifyToken, getMyPets);
router.put('/mypets/:id', verifyToken, updatePet);
router.delete('/mypets/:id', verifyToken, deletePet);

export default router;