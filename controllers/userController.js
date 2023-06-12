import User from '../models/userModel.js';
import requestResponse from '../response.js';

export const getProfile = async (req, res) => {
  try {
    const result = await User.findOne({
      attributes: ['name', 'email', 'phoneNumber'],
      where: {
        uid: req.userId,
      },
    });

    res.status(200).json(requestResponse.successWithData('Get profile success!', result));
  } catch (error) {
    res.status(400).json(requestResponse.failed(error.message));
  }
}

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        uid: req.userId,
      },
    });
  
    if (!user) return res.status(404).json(requestResponse.failed('User not found!'));

      const {
        name,
        email,
        phoneNumber,
      } = req.body;

      await User.update({
        name,
        email,
        phoneNumber,
      }, {
        where: {
          uid: req.userId,
        },
      });
      res.status(200).json(requestResponse.success('Update profile successful!'));
  } catch (error) {
    res.status(400).json(requestResponse.failed(error.message));
  }
}



