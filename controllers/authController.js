import User from '../models/userModel.js';
import requestResponse from '../response.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const register = async (req, res) => {
  try {
    const {
      name, email, password
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json(requestResponse.failed("Please fill all of the required data!"));
    }

    const user = await User.findOne({
      where: { email }
    });
    if (user) return res.status(400).json(requestResponse.failed("Email already exist!"));

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashPassword = await bcrypt.hash(password, salt);

    await User.create({
      name,
      email,
      password: hashPassword,
    });
    res.status(201).json(requestResponse.success('Successfull registration'))
  } catch (error) {
    res.status(400).json(requestResponse.failed(error.message));
  }
}

export const login = async (req, res) => {
  try {
    const {
      uid,
      name,
      email,
      password
    } = req.body;
    if (!email || !password) return res.status(404).json(requestResponse.failed('Email and password required!'));

    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) return res.status(404).json(requestResponse.failed('User not found'));

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json(requestResponse.failed('Incorrect password'));

    const token = jwt.sign({ uid: user.uid }, process.env.SECRET_KEY, { expiresIn: 86400 });
    const data = { uid, name, email, token }
    res.status(200).json(requestResponse.successWithData('Login success!', data))

  } catch (error) {
    res.status(500).json(requestResponse.serverError(error.message));
  }
}