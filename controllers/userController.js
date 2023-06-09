import User from '../models/userModel.js';
import requestResponse from '../response.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const getProfile = async (req, res) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) return res.status(403).json(requestResponse.failed('Authorization header required!'));

    const token = authorization.split(' ').pop();

    jwt.verify (token, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) return res.status(401).json(requestResponse.failed('Invalid token!'));
      const userId = decoded.uid;

      const result = await User.findOne({
        attributes: ['name', 'email', 'phoneNumber'],
        where: {
          uid: userId,
        },
      });

      if (!result) return res.status(404).json(requestResponse.failed('Invalid user!'));
      res.status(200).json(requestResponse.successWithData('Get profile success!', result));
    });
  } catch (error) {
    res.status(400).json(requestResponse.failed(error.message));
  }
}

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        uid: req.params.id,
      },
    });
    if (!user) return res.status(404).json(requestResponse.failed('User not found!'));

    const {
      name,
      email,
      password,
      phoneNumber,
    } = req.body;

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashPassword = await bcrypt.hash(password, salt);

    await User.update({
      name,
      email,
      password: hashPassword,
      phoneNumber,
    }, {
      where: {
        uid: user.uid,
      },
    });
    res.status(200).json(requestResponse.success('Update profile successful!'));
  } catch (error) {
    res.status(400).json(requestResponse.failed(error.message));
  }
}



