import User from '../models/userModel.js';
import requestResponse from'../response.js';
import bcrypt from 'bcrypt';

export const register = async (req, res) => {
    const {
        name, email, password
    } = req.body;

    const user = await User.findOne({ 
        where:{ email } 
    });
    if(user) return res.status(400).json(requestResponse.failed("Email already exist!"))

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashPassword = await bcrypt.hash(password, salt);

    try {
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

  

export const updateProfile = async (req, res) => {
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

    try {
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



