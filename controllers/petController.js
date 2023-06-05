import User from '../models/userModel.js';
import PetCategory from '../models/petCategoryModel.js';
import Pet from '../models/petModel.js';
import requestResponse from '../response.js';
import { Op } from 'sequelize';

export const uploadPet = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json(requestResponse.failed("Please upload the image"))

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
    const image = req.file.path;

    await Pet.create({
      name,
      photoUrl: image,
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

export const getAllPets = async (req, res) => {
  try {
    const result = await Pet.findAll({
      attributes: [
        'petId',
        'name',
        'photoUrl',
        'petCategory',
        'breed',
        'characters',
        'age',
        'size',
        'gender',
        'about',
        'lon',
        'lat',
      ],
      include: [{
        model: User,
        attributes: ['name', 'phoneNumber'],
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
      attributes: [
        'petId',
        'name',
        'photoUrl',
        'petCategory',
        'breed',
        'characters',
        'age',
        'size',
        'gender',
        'about',
        'lon',
        'lat',
      ],
      where: {
        petId: pet.petId,
      },
      include: [{
        model: User,
        attributes: ['name', 'phoneNumber'],
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
      attributes: [
        'petId',
        'name',
        'photoUrl',
        'petCategory',
        'breed',
        'characters',
        'age',
        'size',
        'gender',
        'about',
        'lon',
        'lat',
      ],
      where: {
        ownerId: req.userId,
      },
      include: [{
        model: User,
        attributes: ['name', 'phoneNumber'],
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

    let image = "";
    if (!req.file) {
      image = pet.photoUrl;
    } else {
      image = req.file.path;
    }

    if (req.userId !== pet.ownerId) return res.status(403)
      .json(requestResponse.failed('You have no credential to access this action'));

    await Pet.update({
      name,
      photoUrl: image,
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
        attributes: ['name', 'phoneNumber'],
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