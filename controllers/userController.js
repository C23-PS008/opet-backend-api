import User from '../models/userModel.js';
import requestResponse from '../response.js';
import bcrypt from 'bcrypt';

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



