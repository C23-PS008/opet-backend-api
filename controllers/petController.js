import User from '../models/userModel.js';
import PetCategory from '../models/petCategoryModel.js';
import Pet from '../models/petModel.js';
import requestResponse from '../response.js';
import { Op, Sequelize } from 'sequelize';
import { imgUpload } from './imgUploadController.js';

export const uploadPet = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json(requestResponse.failed("Please upload the image!"));
    
    const myImage = req.file
    const imageUrl = await imgUpload(myImage);

    const {
      name,
      petCategory,
      breed,
      characters,
      age,
      size,
      gender,
      about,
      lon,
      lat,
    } = req.body

    await Pet.create({
      name,
      photoUrl: imageUrl,
      petCategory,
      breed,
      characters,
      age,
      size,
      gender,
      about,
      lon,
      lat,
      ownerId: req.userId,
    });
    res.status(201).json(requestResponse.successWithData('Upload pet success!'));
  } catch (error) {
    res.status(500).json(requestResponse.serverError(error.message));
  }
}

export const getPetsList = async (req, res) => {
  try {
    const where = {};
    const {type, page, size, breed} = req.query;

    const getPagination = (page, size) => {
      const limit = size ? +size : 10;
      const offset = page ? page * limit : 0;
      return {limit, offset};
    };
    const {limit, offset} = getPagination(page, size);

    switch (type) {
      case 'all':
        where.petCategory = {[Sequelize.Op.or]: [1, 2]};
        break;
      case 'cat':
        where.petCategory = 1;
        break;
      case 'dog':
        where.petCategory = 2;
        break;
      default:
        return res.status(404).json(requestResponse.failed('Valid type is required!'));
    };
    
    if(breed) where.breed = {[Sequelize.Op.like]: `%${breed}%`};

    const result = await Pet.findAndCountAll({
      where: {
        ...where,
      }, 
      limit, 
      offset,
      attributes: {exclude: ['ownerId', 'petCategory']},
      include: [{
        model: User,
        attributes: ['name', 'email', 'phoneNumber'],
      }, {
        model: PetCategory,
        attributes: ['categoryName']
      }],
    });
    res.status(200).json(requestResponse.successWithData("Get All Pets Success!", result));
  } catch (error) {
    res.status(500).json(requestResponse.serverError(error.message));
  }
}

export const getPetById = async (req, res) => {
  try {
    const pet = await Pet.findOne({
      where: {
        petId: req.params.id,
      }
    });
    if (!pet) return res.status(404).json(requestResponse.failed('Pet not found'));

    const result = await Pet.findOne({
      attributes: {exclude: ['ownerId', 'petCategory']},
      where: {
        petId: pet.petId,
      },
      include: [{
        model: User,
        attributes: ['name', 'email', 'phoneNumber'],
      }, {
        model: PetCategory,
        attributes: ['categoryName']
      }],
    });
    res.status(200).json(requestResponse.successWithData("Get a specific pet success!", result));
  } catch (error) {
    res.status(500).json(requestResponse.serverError(error.message));
  }
}

export const getMyPets = async (req, res) => {
  try {
    const result = await Pet.findAll({
      attributes: {exclude: ['ownerId', 'petCategory']},
      where: {
        ownerId: req.userId,
      },
      include: [{
        model: User,
        attributes: ['name', 'email', 'phoneNumber'],
      }, {
        model: PetCategory,
        attributes: ['categoryName']
      }],
    });
    res.status(200).json(requestResponse.successWithData("Get My Pets Success!", result));
  } catch (error) {
    res.status(500).json(requestResponse.serverError(error.message));
  }
}

export const updatePet = async (req, res) => {
  try {
    const pet = await Pet.findOne({
      where: {
        petId: req.params.id,
      },
    });
    if (!pet) return res.status(404).json(requestResponse.failed('Pet not found!'));

    const {
      name,
      breed,
      characters,
      age,
      size,
      gender,
      about,
      lon,
      lat,
    } = req.body

    let imageUrl = "";
    if (!req.file) {
      imageUrl = pet.photoUrl;
    } else {
      imageUrl = await imgUpload(req.file);
    }

    if (req.userId !== pet.ownerId) return res.status(403)
      .json(requestResponse.failed('You have no credential to access this action'));

    await Pet.update({
      name,
      photoUrl: imageUrl,
      breed,
      characters,
      age,
      size,
      gender,
      about,
      lon,
      lat,
      ownerId: req.userId,
    }, {
      where: {
        [Op.and]: [
          { petId: pet.petId },
          { ownerId: req.userId }]
      },
      include: [{
        model: User,
        attributes: ['name', 'email', 'phoneNumber'],
      }, {
        model: PetCategory,
        attributes: ['categoryName']
      }],
    });
    res.status(200).json(requestResponse.success('Update pet success!'));
  } catch (error) {
    res.status(500).json(requestResponse.serverError(error.message));
  }
}

export const deletePet = async (req, res) => {
  try {
    const pet = await Pet.findOne({
      where: {
        petId: req.params.id,
      },
    });
    if (!pet) return res.status(404).json(requestResponse.failed('Pet not found!'));

    if (req.userId !== pet.ownerId) return res.status(403)
      .json(requestResponse.failed('You have no credential to access this action'));

    await Pet.destroy({
      where: {
        [Op.and]: [
          { petId: pet.petId },
          { ownerId: req.userId }]
      },
    });
    res.status(200).json(requestResponse.success('Delete pet success!'));
  } catch (error) {
    res.status(500).json(requestResponse.serverError(error.message));
  }
}