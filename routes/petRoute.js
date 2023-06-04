import express from 'express';
import { 
    uploadPet, 
    getAllPets, 
    getPetById, 
    getMyPets, 
    updatePet, 
    deletePet, } from '../controllers/petController.js';
import { verifyToken } from '../middleware/authJwt.js';
const router = express.Router();

router.get('/pets', getAllPets);
router.get('/pets/:id', getPetById);
router.post('/mypets', verifyToken, uploadPet);
router.get('/mypets', verifyToken, getMyPets);
router.put('/mypets/:id', verifyToken, updatePet);
router.delete('/mypets/:id', verifyToken, deletePet);

export default router;